// The 'export' keyword is added here to make the URL available to other files.
// All other code and functionality remains unchanged.
export const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8083/api');

class MainApiService {
  constructor() {
    // Trim any trailing slash just in case someone sets VITE_API_URL ending with "/"
    this.baseURL = BASE_URL.replace(/\/+$/, '');
  }

  /** Core fetch wrapper --------------------------------------------------- */
  async request(endpoint, options = {}) {
    const url =
      this.baseURL + (endpoint.startsWith('/') ? '' : '/') + endpoint;

    const cfg = {
      method: 'GET',
      credentials: 'include',      // keep cookies when needed
      ...options
    };

    /* If the body is NOT FormData we assume JSON ------------------------- */
    if (!(cfg.body instanceof FormData)) {
      cfg.headers = {
        'Content-Type': 'application/json',
        ...cfg.headers
      };
    } else {
      // leave headers alone – the browser will set multipart boundary
      cfg.headers = { ...cfg.headers };
    }

    try {
      const resp = await fetch(url, cfg);

      if (!resp.ok) {
        const msg = await resp.text();
        throw new Error(`HTTP ${resp.status} – ${msg}`);
      }

      // 204 No Content
      if (resp.status === 204) return null;

      return await resp.json();
    } catch (err) {
      console.error(`[MainApiService] ${cfg.method} ${url} failed:`, err);
      throw err;
    }
  }

  /** Public‑facing endpoints --------------------------------------------- */
  getSiteConfig()      { return this.request('/config'); }
  getSpeakers()        { return this.request('/speakers'); }
  getSessions()        { return this.request('/sessions'); }

  /** Convenience: fetch everything needed for the landing page in parallel */
  async getSiteData() {
    const [config, speakers, sessions] = await Promise.all([
      this.getSiteConfig(),
      this.getSpeakers(),
      this.getSessions()
    ]);
    return { config, speakers, sessions };
  }

  /** Registrations -------------------------------------------------------- */
  submitRegistration(registration, paymentProofFile) {
    if (paymentProofFile) {
      /* multipart/form‑data */
      const formData = new FormData();
      formData.append(
        'registration',
        new Blob([JSON.stringify(registration)], { type: 'application/json' })
      );
      formData.append('paymentProof', paymentProofFile);

      return this.request('/registrations', {
        method: 'POST',
        body: formData
      });
    }

    /* plain JSON */
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(registration)
    });
  }

  getRegistrationStatus() { return this.request('/registration-status'); }
  getPublicStats()        { return this.request('/stats'); }

  /** Real‑time config polling (long‑poll / SSE) -------------------------- */
  pollForUpdates(lastUpdateTime) {
    return this.request(
      `/config/check-updates?lastUpdate=${encodeURIComponent(lastUpdateTime)}`
    );
  }
}

export default new MainApiService();