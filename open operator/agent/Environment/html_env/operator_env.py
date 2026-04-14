"""
OpenAI Operator Environment
Specifically dealing with environment interactions for OpenAI operators
"""

import os
import base64
import asyncio
import time
from typing import Dict, Any, Optional, List, Tuple, Union
from pathlib import Path
from playwright.async_api import async_playwright, Page, BrowserContext, Error as PWError
from sanic.log import logger
from beartype import beartype

from .operator_actions import (
    OperatorAction, OperatorActionExecutor, OperatorResponseParser,
    OperatorActionFactory, OperatorActionType
)


class OperatorEnvironment:
    """OpenAI Operator Environment"""
    
    def __init__(self,
                 headless: bool = True,
                 slow_mo: int = 50,
                 viewport_width: int = 1280,
                 viewport_height: int = 720,
                 save_trace_enabled: bool = True,
                 screenshot_dir: str = "screenshots"):
        """
        Initialize the Operator environment.

        Args:
            headless: Run browser in headless mode
            slow_mo: Action delay in milliseconds
            viewport_width: Browser viewport width
            viewport_height: Browser viewport height
            save_trace_enabled: Whether to save trace information
            screenshot_dir: Directory to save screenshots
        """
        self.headless = headless
        self.slow_mo = slow_mo
        self.viewport_width = viewport_width
        self.viewport_height = viewport_height
        self.save_trace_enabled = save_trace_enabled
        self.screenshot_dir = Path(screenshot_dir)
        self.screenshot_dir.mkdir(parents=True, exist_ok=True)
        
        # Playwright
        self.playwright = None
        self.browser = None
        self.context = None
        self.page = None

        # Action executor
        self.action_executor = None

        # Trace information
        self.trace_data = []
        self.step_count = 0
        
    async def start(self):
        """Start environment"""
        try:
            self.playwright = await async_playwright().start()
            self.browser = await self.playwright.chromium.launch(
                headless=self.headless,
                slow_mo=self.slow_mo
            )
            self.context = await self.browser.new_context(
                viewport={"width": self.viewport_width, "height": self.viewport_height}
            )
            self.page = await self.context.new_page()
            
            # action executor
            self.action_executor = OperatorActionExecutor(self.page)
            
            logger.info("OperatorEnvironment started successfully")
            
        except Exception as e:
            logger.error(f"Error starting OperatorEnvironment: {e}")
            raise
    
    async def close(self):
        """Close the environment and release all resources."""
        try:
            if self.page:
                await self.page.close()
            if self.context:
                await self.context.close()
            if self.browser:
                await self.browser.close()
            if self.playwright:
                await self.playwright.stop()
            
            logger.info("OperatorEnvironment closed successfully")
            
        except Exception as e:
            logger.error(f"Error closing OperatorEnvironment: {e}")
    
    async def navigate_to(self, url: str, max_retries: int = 3):
        """
        Navigate to the specified URL using multiple strategies for reliability.

        Args:
            url: Target URL
            max_retries: Maximum number of retry attempts
        """
        for attempt in range(max_retries):
            try:
                logger.info(f"🌐 Navigating to {url} (attempt {attempt + 1}/{max_retries})")
                
                # Step 1: Navigate to page with a generous timeout
                await self.page.goto(url, timeout=45000, wait_until="domcontentloaded")
                logger.info("✅ Page loaded (DOM content ready)")

                # Step 2: Try to wait for network idle with a shorter timeout
                try:
                    await self.page.wait_for_load_state("networkidle", timeout=8000)
                    logger.info("✅ Network idle achieved")
                    break

                except Exception as e:
                    if "Timeout" in str(e):
                        logger.warning(f"⚠️  Network idle timeout, trying alternative strategy...")

                        # Step 3: Fall back to waiting for the load state
                        try:
                            await self.page.wait_for_load_state("load", timeout=5000)
                            logger.info("✅ Page load state achieved")
                            break

                        except Exception as e2:
                            if "Timeout" in str(e2):
                                logger.warning(f"⚠️  Load state timeout, using minimal wait...")

                                # Step 4: Minimal wait as last resort
                                await asyncio.sleep(3)

                                # Check if the page is at least partially usable
                                try:
                                    title = await self.page.title()
                                    if title and title.strip():
                                        logger.info(f"✅ Page accessible with title: '{title}'")
                                        break
                                    else:
                                        raise Exception("Page title is empty")
                                except:
                                    if attempt < max_retries - 1:
                                        logger.warning(f"❌ Page not properly loaded, retrying...")
                                        continue
                                    else:
                                        raise Exception("Page failed to load after all strategies")
                            else:
                                raise e2
                    else:
                        raise e

            except Exception as e:
                if attempt < max_retries - 1:
                    wait_time = (attempt + 1) * 2  # incremental back-off
                    logger.warning(f"❌ Navigation attempt {attempt + 1} failed: {e}")
                    logger.info(f"⏳ Waiting {wait_time}s before retry...")
                    await asyncio.sleep(wait_time)
                else:
                    logger.error(f"❌ All navigation attempts failed for {url}: {e}")
                    raise Exception(f"Failed to navigate to {url} after {max_retries} attempts: {e}")

        # After successful navigation, wait for the page to be fully ready
        logger.info("🔄 Ensuring page is fully ready...")
        page_ready = await self.wait_for_page_ready()
        if not page_ready:
            logger.warning("⚠️  Page readiness check failed, but continuing...")
        
        logger.info(f"🎯 Successfully navigated to {url}")
    
    async def check_network_health(self, url: str) -> bool:
        """
        Check network health and reachability of the target URL.

        Args:
            url: URL to check

        Returns:
            bool: Whether the network is healthy
        """
        try:
            # Quickly probe the target domain
            from urllib.parse import urlparse
            domain = urlparse(url).netloc

            # Test connectivity with a lightweight HTTP request
            import aiohttp
            async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=10)) as session:
                async with session.head(f"https://{domain}", allow_redirects=True) as response:
                    if response.status < 500:  # allow 4xx errors as long as the server responds
                        logger.info(f"✅ Network health check passed for {domain}")
                        return True
                    else:
                        logger.warning(f"⚠️  Server error {response.status} for {domain}")
                        return False
                        
        except Exception as e:
            logger.warning(f"⚠️  Network health check failed for {url}: {e}")
            return False
    
    async def wait_for_page_ready(self, timeout: int = 15000) -> bool:
        """
        Wait for the page to be fully ready, including dynamic content.

        Args:
            timeout: Timeout in milliseconds

        Returns:
            bool: Whether the page is ready
        """
        try:
            logger.info("⏳ Waiting for page to be fully ready...")

            # Strategy 1: wait for DOM and initial resources
            await self.page.wait_for_load_state("domcontentloaded", timeout=timeout // 3)

            # Strategy 2: wait for basic elements to appear
            try:
                await self.page.wait_for_selector("body", timeout=5000)

                # Brief pause to let dynamic content render
                await asyncio.sleep(2)

                # Check that the page has meaningful content
                content_length = await self.page.evaluate("document.body.innerText.length")
                if content_length > 100:
                    logger.info(f"✅ Page ready with {content_length} characters of content")
                    return True

            except Exception:
                pass

            # Strategy 3: looser check if above failed
            try:
                title = await self.page.title()
                if title and len(title.strip()) > 0:
                    logger.info(f"✅ Page ready with title: '{title}'")
                    return True
            except Exception:
                pass

            # Strategy 4: last-resort fallback
            logger.warning("⚠️  Using fallback readiness check...")
            await asyncio.sleep(3)
            return True  # assume page is ready
            
        except Exception as e:
            logger.warning(f"⚠️  Page readiness check failed: {e}")
            return False
    
    async def take_screenshot(self, filename: Optional[str] = None) -> str:
        """
        Take a screenshot and return it as a base64-encoded string.

        Args:
            filename: Optional filename; auto-generated if not provided

        Returns:
            Base64-encoded PNG screenshot
        """
        try:
            if filename is None:
                filename = f"step_{self.step_count:03d}.png"

            screenshot_path = self.screenshot_dir / filename

            screenshot_data = await self.page.screenshot(
                path=str(screenshot_path),
                full_page=False,
                type="png"
            )

            screenshot_b64 = base64.b64encode(screenshot_data).decode()
            
            logger.info(f"Screenshot saved: {screenshot_path}")
            
            return screenshot_b64
            
        except Exception as e:
            logger.error(f"Error taking screenshot: {e}")
            raise
    
    async def _safe_scroll_top(self):
        """Safely scroll to the top of the page, retrying once on context destruction."""
        for _ in range(2):
            try:
                await self.page.evaluate("() => window.scrollTo(0,0)")
                return
            except PWError as e:
                if "Execution context was destroyed" in str(e):
                    await self.page.wait_for_load_state("load")
                    continue
                raise
    
    async def execute_operator_actions(self, actions: List[OperatorAction]) -> bool:
        """
        Execute a list of Operator actions sequentially.

        Args:
            actions: List of actions to execute

        Returns:
            True if all actions executed successfully, False otherwise
        """
        if not actions:
            return True
            
        try:
            for action in actions:
                logger.info(f"Executing operator action: {action.type}")
                
                if action.type != OperatorActionType.SCREENSHOT:
                    await self.action_executor.execute_action(action)
                
                # Record trace information
                if self.save_trace_enabled:
                    self.trace_data.append({
                        "step": self.step_count,
                        "action": action.to_dict(),
                        "timestamp": time.time(),
                        "url": self.page.url
                    })
                
                self.step_count += 1
                
            return True
            
        except Exception as e:
            logger.error(f"Error executing operator actions: {e}")
            return False
    
    async def get_current_state(self) -> Dict[str, Any]:
        """Return the current page state (URL, title, viewport, step count)."""
        try:
            return {
                "url": self.page.url,
                "title": await self.page.title(),
                "viewport": {
                    "width": self.viewport_width,
                    "height": self.viewport_height
                },
                "step_count": self.step_count
            }
            
        except Exception as e:
            logger.error(f"Error getting current state: {e}")
            return {}

    async def get_interactive_elements(self, max_elements: int = 300) -> List[Dict[str, Any]]:
        """
        Collect interactive DOM elements in the current viewport with bounding-box geometry.
        Used for Vision-to-DOM alignment in the operator pipeline.
        """
        if not self.page:
            return []
        max_elements = max(20, min(int(max_elements), 1000))
        script = """
() => {
  const selectors = [
    "a[href]",
    "button",
    "input",
    "textarea",
    "select",
    "[role='button']",
    "[role='link']",
    "[role='menuitem']",
    "[onclick]",
    "[tabindex]"
  ];
  const nodes = document.querySelectorAll(selectors.join(","));
  const results = [];
  const seen = new Set();

  for (const el of nodes) {
    if (!(el instanceof HTMLElement)) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) continue;
    if (rect.bottom < 0 || rect.right < 0) continue;
    if (rect.top > window.innerHeight || rect.left > window.innerWidth) continue;

    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") continue;

    const key = `${Math.round(rect.left)}|${Math.round(rect.top)}|${Math.round(rect.width)}|${Math.round(rect.height)}|${el.tagName}|${el.id}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const text = ((el.innerText || el.textContent || "").trim()).replace(/\\s+/g, " ").slice(0, 180);
    const item = {
      tag: (el.tagName || "").toLowerCase(),
      role: (el.getAttribute("role") || "").toLowerCase(),
      text: text,
      aria_label: (el.getAttribute("aria-label") || "").trim().slice(0, 180),
      placeholder: (el.getAttribute("placeholder") || "").trim().slice(0, 120),
      name: (el.getAttribute("name") || "").trim().slice(0, 120),
      dom_id: (el.id || "").trim().slice(0, 120),
      rect: {
        x: Math.round(rect.left),
        y: Math.round(rect.top),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        center_x: Math.round(rect.left + rect.width / 2),
        center_y: Math.round(rect.top + rect.height / 2)
      }
    };
    results.push(item);
    if (results.length >= MAX_ELEMENTS) break;
  }
  return results;
}
""".replace("MAX_ELEMENTS", str(max_elements))

        try:
            elements = await self.page.evaluate(script)
            if isinstance(elements, list):
                return elements
            return []
        except Exception as e:
            logger.warning(f"Failed to collect interactive DOM elements: {e}")
            return []
    
    def get_tool_spec(self) -> Dict[str, Any]:
        """Return the OpenAI computer_use_preview tool specification."""
        return {
            "type": "computer_use_preview",
            "display_width": self.viewport_width,
            "display_height": self.viewport_height,
            "environment": "browser"
        }
    
    def get_trace_data(self) -> List[Dict[str, Any]]:
        """Return a copy of the accumulated trace data."""
        return self.trace_data.copy()

    def clear_trace_data(self):
        """Clear all trace data and reset the step counter."""
        self.trace_data.clear()
        self.step_count = 0

    async def wait_for_load(self, timeout: int = 10000):
        """Wait for the page to reach network-idle state."""
        try:
            await self.page.wait_for_load_state("networkidle", timeout=timeout)
        except Exception as e:
            logger.warning(f"Wait for load timeout: {e}")


class OperatorEnvironmentManager:
    """Manager for multiple named OperatorEnvironment instances."""

    def __init__(self):
        self.environments = {}

    async def create_environment(self,
                                 env_id: str,
                                 **kwargs) -> OperatorEnvironment:
        """Create a new OperatorEnvironment, replacing any existing one with the same ID."""
        if env_id in self.environments:
            await self.close_environment(env_id)
        
        env = OperatorEnvironment(**kwargs)
        await env.start()
        self.environments[env_id] = env
        
        return env
    
    async def get_environment(self, env_id: str) -> Optional[OperatorEnvironment]:
        """Retrieve a managed environment by ID."""
        return self.environments.get(env_id)

    async def close_environment(self, env_id: str):
        """Close and remove a managed environment by ID."""
        if env_id in self.environments:
            await self.environments[env_id].close()
            del self.environments[env_id]
    
    async def close_all_environments(self):
        """Close all managed environments."""
        for env_id in list(self.environments.keys()):
            await self.close_environment(env_id)


operator_env_manager = OperatorEnvironmentManager() 
