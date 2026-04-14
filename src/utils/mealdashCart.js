// mealdash_gpt cart utilities (namespaced localStorage)
const CART_KEY = 'mealdash_gpt_cart_v1';

function safeRead() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function safeWrite(items) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {}
}

export function getCartItems() {
  return safeRead();
}

export function setCartItems(items) {
  safeWrite(items);
}

export function clearCart() {
  setCartItems([]);
}

export function addMenuItem(restaurantId, menuItem, quantity = 1, options = {}) {
  const cart = safeRead();
  const key = `${restaurantId}::${menuItem.id}::${JSON.stringify(options)}`;
  const existing = cart.find((c) => c.key === key);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      key,
      restaurantId,
      itemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity,
      options,
    });
  }
  safeWrite(cart);
  return cart;
}

export function updateItemQuantity(key, quantity) {
  const cart = safeRead();
  const next = cart.map((c) => (c.key === key ? { ...c, quantity: Math.max(1, quantity) } : c));
  safeWrite(next);
  return next;
}

export function removeItem(key) {
  const cart = safeRead();
  const next = cart.filter((c) => c.key !== key);
  safeWrite(next);
  return next;
}

export function computeCartTotals(items = safeRead()) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const deliveryFee = subtotal >= 25 ? 0 : 3.99; // simple rule: free over $25
  const serviceFee = Math.max(1.49, subtotal * 0.05);
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + serviceFee + tax;
  return { subtotal, deliveryFee, serviceFee, tax, total };
}


