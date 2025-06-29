// src/hooks/useRealTimeUpdates.js
import { useEffect, useRef } from 'react';
import { useConfig } from '../contexts/ConfigContext';
import mainApiService from '../services/mainApi';

export const useRealTimeUpdates = (intervalMs = 30000) => {
  const { refreshConfig, config } = useConfig();
  const intervalRef = useRef(null);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        if (!config?.lastUpdated) return;
        
        const response = await mainApiService.pollForUpdates(config.lastUpdated);
        
        if (response?.hasUpdates) {
          console.log('Configuration updates detected, refreshing...');
          await refreshConfig();
        }
      } catch (error) {
        console.error('Failed to check for updates:', error);
      }
    };

    intervalRef.current = setInterval(checkForUpdates, intervalMs);
    
    // Initial check
    checkForUpdates();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refreshConfig, intervalMs, config?.lastUpdated]);

  const forceRefresh = async () => {
    try {
      await refreshConfig();
    } catch (error) {
      console.error('Failed to force refresh:', error);
    }
  };

  return { forceRefresh };
};