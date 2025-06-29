import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback
} from 'react';
import ApiService from '../services/api';

const AppDataContext = createContext();

const initialState = {
  websiteName: '',
  logoPath: '',
  registrationOpenDate: '',  
  registrationCloseDate: '',
  eventDate: '',
  location: '',
  speakers: [],
  sessions: [],
  registrations: [],
  loading: {
    speakers: false,
    sessions: false,
    registrations: false,
    config: false,
  },
  errors: {
    speakers: null,
    sessions: null,
    registrations: null,
    config: null,
  }
};

function appDataReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: { ...state.loading, [action.key]: action.value }
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      };
    case 'SET_SITE_CONFIG':
      return {
        ...state,
        websiteName: action.config.websiteName || '',
        logoPath: action.config.logoPath || '',
        registrationOpenDate: action.config.registrationOpenDate || '',
        registrationCloseDate: action.config.registrationCloseDate || '',
        eventDate: action.config.eventDate || '',
        location: action.config.location || '',
      };
    case 'SET_SPEAKERS':
      return { ...state, speakers: action.speakers };
    case 'ADD_SPEAKER':
      return { ...state, speakers: [...state.speakers, action.speaker] };
    case 'UPDATE_SPEAKER':
      return {
        ...state,
        speakers: state.speakers.map(speaker =>
          speaker.id === action.speaker.id ? action.speaker : speaker
        )
      };
    case 'DELETE_SPEAKER':
      return {
        ...state,
        speakers: state.speakers.filter(speaker => speaker.id !== action.id)
      };
    case 'SET_SESSIONS':
      return { ...state, sessions: action.sessions };
    case 'ADD_SESSION':
      return { ...state, sessions: [...state.sessions, action.session] };
    case 'UPDATE_SESSION':
      return {
        ...state,
        sessions: state.sessions.map(session =>
          session.id === action.session.id ? action.session : session
        )
      };
    case 'DELETE_SESSION':
      return {
        ...state,
        sessions: state.sessions.filter(session => session.id !== action.id)
      };
    case 'SET_REGISTRATIONS':
      return { ...state, registrations: action.registrations };
    case 'ADD_REGISTRATION':
      return { ...state, registrations: [...state.registrations, action.registration] };
    case 'UPDATE_REGISTRATION':
      return {
        ...state,
        registrations: state.registrations.map(reg =>
          reg.id === action.registration.id ? action.registration : reg
        )
      };
    case 'DELETE_REGISTRATION':
      return {
        ...state,
        registrations: state.registrations.filter(reg => reg.id !== action.id)
      };
    default:
      return state;
  }
}

export const AppDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appDataReducer, initialState);

  const handleAsync = async (key, asyncFunction) => {
    dispatch({ type: 'SET_LOADING', key, value: true });
    dispatch({ type: 'SET_ERROR', key, value: null });
    try {
      const result = await asyncFunction();
      return result;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', key, value: error.message });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', key, value: false });
    }
  };

  // ✅ useCallback hooks for stable dependencies
  const loadSiteConfig = useCallback(async () => {
    return handleAsync('config', async () => {
      const config = await ApiService.getSiteConfig();
      if (config) {
        dispatch({ type: 'SET_SITE_CONFIG', config });
      }
      return config;
    });
  }, []);

  const loadSpeakers = useCallback(async () => {
    return handleAsync('speakers', async () => {
      const speakers = await ApiService.getAllSpeakers();
      dispatch({ type: 'SET_SPEAKERS', speakers });
      return speakers;
    });
  }, []);

  const loadSessions = useCallback(async () => {
    return handleAsync('sessions', async () => {
      const sessions = await ApiService.getAllSessions();
      dispatch({ type: 'SET_SESSIONS', sessions });
      return sessions;
    });
  }, []);

  const loadRegistrations = useCallback(async () => {
    return handleAsync('registrations', async () => {
      const registrations = await ApiService.getAllRegistrations();
      dispatch({ type: 'SET_REGISTRATIONS', registrations });
      return registrations;
    });
  }, []);

  // Non-critical ones (not needed in useEffect)
  const updateSiteConfig = async (config, logoFile) => {
    return handleAsync('config', async () => {
      const updatedConfig = await ApiService.updateSiteConfig(config, logoFile);
      dispatch({ type: 'SET_SITE_CONFIG', config: updatedConfig });
      return updatedConfig;
    });
  };

  const addSpeaker = async (speaker) => {
  return handleAsync('speakers', async () => {
    const newSpeaker = await ApiService.createSpeaker(speaker);
    dispatch({ type: 'ADD_SPEAKER', speaker: newSpeaker });
    return newSpeaker;
  });
};


  const updateSpeaker = async (id, speaker) => {
    return handleAsync('speakers', async () => {
      const updatedSpeaker = await ApiService.updateSpeaker(id, speaker);
      dispatch({ type: 'UPDATE_SPEAKER', speaker: updatedSpeaker });
      return updatedSpeaker;
    });
  };

  const deleteSpeaker = async (id) => {
    return handleAsync('speakers', async () => {
      await ApiService.deleteSpeaker(id);
      dispatch({ type: 'DELETE_SPEAKER', id });
    });
  };

  const addSession = async (session) => {
    return handleAsync('sessions', async () => {
      const newSession = await ApiService.createSession(session);
      dispatch({ type: 'ADD_SESSION', session: newSession });
      return newSession;
    });
  };

  const updateSession = async (id, session) => {
    return handleAsync('sessions', async () => {
      const updatedSession = await ApiService.updateSession(id, session);
      dispatch({ type: 'UPDATE_SESSION', session: updatedSession });
      return updatedSession;
    });
  };

  const deleteSession = async (id) => {
    return handleAsync('sessions', async () => {
      await ApiService.deleteSession(id);
      dispatch({ type: 'DELETE_SESSION', id });
    });
  };

  const addRegistration = async (registration, paymentProofFile) => {
    return handleAsync('registrations', async () => {
      const newRegistration = await ApiService.createRegistration(registration, paymentProofFile);
      dispatch({ type: 'ADD_REGISTRATION', registration: newRegistration });
      return newRegistration;
    });
  };

  const updateRegistration = async (id, registration) => {
    return handleAsync('registrations', async () => {
      const updatedRegistration = await ApiService.updateRegistration(id, registration);
      dispatch({ type: 'UPDATE_REGISTRATION', registration: updatedRegistration });
      return updatedRegistration;
    });
  };

  const deleteRegistration = async (id) => {
    return handleAsync('registrations', async () => {
      await ApiService.deleteRegistration(id);
      dispatch({ type: 'DELETE_REGISTRATION', id });
    });
  };

  // ✅ useEffect with stable function references
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await Promise.allSettled([
          loadSiteConfig(),
          loadSpeakers(),
          loadSessions(),
          loadRegistrations(),
        ]);
      } catch (error) {
        console.error('Failed to load initial data:', error);
      }
    };

    loadInitialData();
  }, [loadSiteConfig, loadSpeakers, loadSessions, loadRegistrations]);

  const value = {
    appData: state,
    loadSiteConfig,
    updateSiteConfig,
    loadSpeakers,
    addSpeaker,
    updateSpeaker,
    deleteSpeaker,
    loadSessions,
    addSession,
    updateSession,
    deleteSession,
    loadRegistrations,
    addRegistration,
    updateRegistration,
    deleteRegistration,
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};
