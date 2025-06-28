"use client";

import { useState, useEffect, useCallback } from 'react';

export function useNetworkStatus() {
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);

  const updateNetworkStatus = useCallback(() => {
    if (!('connection' in navigator)) {
      // Fallback: test network speed with a small request
      const start = performance.now();
      fetch('/favicon.ico', { cache: 'no-cache' })
        .then(() => {
          const duration = performance.now() - start;
          // If favicon takes more than 500ms, consider it slow
          setIsSlowNetwork(duration > 500);
        })
        .catch(() => {
          // Network error, assume slow
          setIsSlowNetwork(true);
        });
      return;
    }

    const connection = (navigator as any).connection;
    const effectiveType = connection?.effectiveType || '4g';
    
    // Consider 2g, slow-2g as slow networks
    // Also consider saveData mode as indication of slow network preference
    const slow = 
      effectiveType === '2g' || 
      effectiveType === 'slow-2g' ||
      connection?.saveData === true ||
      (effectiveType === '3g' && connection?.downlink < 1.5);

    setIsSlowNetwork(slow);
  }, []);

  useEffect(() => {
    // Initial check
    updateNetworkStatus();

    // Listen for connection changes if supported
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection?.addEventListener('change', updateNetworkStatus);
      
      return () => {
        connection?.removeEventListener('change', updateNetworkStatus);
      };
    }
  }, [updateNetworkStatus]);

  return { isSlowNetwork };
}