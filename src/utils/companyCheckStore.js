// Local overlays for companycheck_gpt without mutating shared static data

const KEY = 'companycheck_gpt_overrides_v1';

function readOverrides() {
  const base = { savedJobs: {}, applications: [], follows: {}, likes: {}, notes: {}, recentSearches: [] };
  if (typeof window === 'undefined') return base;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : base;
    return { ...base, ...parsed };
  } catch {
    return base;
  }
}

function writeOverrides(o) {
  if (typeof window === 'undefined') return;
  try { window.localStorage.setItem(KEY, JSON.stringify(o)); } catch {}
  try { window.dispatchEvent(new CustomEvent('companycheck_overrides_changed')); } catch {}
}

export function getOverlayState() {
  return readOverrides();
}

export function toggleSaveJob(jobId) {
  const s = readOverrides();
  s.savedJobs[jobId] = !s.savedJobs[jobId];
  writeOverrides(s);
  return !!s.savedJobs[jobId];
}

export function applyJob(application) {
  const s = readOverrides();
  if (!Array.isArray(s.applications)) s.applications = [];
  s.applications.push(application);
  writeOverrides(s);
}

export function getApplications() {
  return readOverrides().applications || [];
}

export function toggleFollowCompany(companyId) {
  const s = readOverrides();
  s.follows[companyId] = !s.follows[companyId];
  writeOverrides(s);
  return !!s.follows[companyId];
}

export function addRecentSearch(term) {
  const s = readOverrides();
  const t = String(term || '').trim();
  if (!t) return;
  s.recentSearches = [t, ...(s.recentSearches||[]).filter(x => x !== t)].slice(0, 8);
  writeOverrides(s);
}

export default {
  getOverlayState,
  toggleSaveJob,
  applyJob,
  getApplications,
  toggleFollowCompany,
  addRecentSearch,
};


