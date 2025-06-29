import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import mainApiService from '../services/mainApi';

/**
 * Context that provides site‑wide configuration, speakers and sessions.
 */
const ConfigContext = createContext();

/* -------------------------------------------------------------------------- */
/*                                    Hook                                    */
/* -------------------------------------------------------------------------- */
export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

/* -------------------------------------------------------------------------- */
/*                                Provider                                    */
/* -------------------------------------------------------------------------- */
export const ConfigProvider = ({ children }) => {
  /**
   * Note: we start with `null` so we can detect “not yet loaded”.
   * The component that consumes the context can use `loading` to
   * decide what to render meanwhile (spinner / skeleton / etc.).
   */
  const [config, setConfig]       = useState(null);
  const [speakers, setSpeakers]   = useState([]);
  const [sessions, setSessions]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  /* ────────────────────────────────────────────────────────────────────── */
  /* 1. Fetch config from backend                                          */
  /* ────────────────────────────────────────────────────────────────────── */
  const loadConfig = useCallback(async () => {
    try {
      setLoading(true);

      // 1‑a) Basic site configuration ------------------------------------
      const cfg = await mainApiService.getSiteConfig();

      setConfig({
        site: {
          title:          cfg.websiteName,
          logo:           cfg.logoPath,
          description:    cfg.description       || 'SITE International Conference',
          primaryColor:   cfg.primaryColor      || '#3b82f6',
          secondaryColor: cfg.secondaryColor    || '#1e40af',
          accentColor:    cfg.accentColor       || '#f59e0b'
        },
        contact: {
          email:   cfg.contactEmail   || 'contact@site2025.com',
          phone:   cfg.contactPhone   || '+216 XX XXX XXX',
          address: cfg.contactAddress || 'Default Address'
        },
        social: {
          facebook: cfg.facebookUrl || '',
          linkedin: cfg.linkedinUrl || ''
        },
        dates: {
          registrationOpen:  cfg.registrationOpenDate,
          registrationClose: cfg.registrationCloseDate
        },
        lastUpdated: new Date().toISOString()
      });

      // 1‑b) Optional parallel calls for speakers & sessions --------------
      const [spk, ses] = await Promise.allSettled([
        mainApiService.getSpeakers(),
        mainApiService.getSessions()
      ]);

      if (spk.status === 'fulfilled') setSpeakers(spk.value);
      if (ses.status === 'fulfilled') setSessions(ses.value);
    } catch (err) {
      console.error('Failed to load site configuration:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /* ────────────────────────────────────────────────────────────────────── */
  /* 2. Apply CSS custom properties + <title>                              */
  /* ────────────────────────────────────────────────────────────────────── */
  const applyDynamicStyles = useCallback(() => {
    if (!config?.site) return; // nothing to apply yet

    const { primaryColor, secondaryColor, accentColor, title, description } = config.site;
    const root = document.documentElement;

    root.style.setProperty('--primary-color', primaryColor);
    root.style.setProperty('--secondary-color', secondaryColor);
    root.style.setProperty('--accent-color', accentColor);

    document.title = title;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [config]);

  /* ────────────────────────────────────────────────────────────────────── */
  /* 3. Effects                                                            */
  /* ────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  useEffect(() => {
    applyDynamicStyles();
  }, [config, applyDynamicStyles]);

  /* ────────────────────────────────────────────────────────────────────── */
  /* 4. Exposed value                                                      */
  /* ────────────────────────────────────────────────────────────────────── */
  const value = {
    config,
    speakers,
    sessions,
    loading,
    error,
    refreshConfig: loadConfig,
    setConfig // expose setter in case admin UI wants to override locally
  };

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

export default ConfigContext;
