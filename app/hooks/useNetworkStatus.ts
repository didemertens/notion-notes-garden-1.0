"use client";

import { useState, useEffect } from 'react';

interface NetworkStatus {
  isOnline: boolean;
  isSlowNetwork: boolean;
  effectiveType: string;
}

export function useNetworkStatus(): NetworkStatus {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: true,
    isSlowNetwork: false,
    effectiveType: '4g'
  });

  useEffect(() => {
    const updateNetworkStatus = () => {
      const isOnline = navigator.onLine;
      let isSlowNetwork = false;
      let effectiveType = '4g';

      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        effectiveType = connection?.effectiveType || '4g';
        
        // Consider 2g, slow-2g as slow networks
        // Also consider saveData mode as indication of slow network preference
        isSlowNetwork = 
          effectiveType === '2g' || 
          effectiveType === 'slow-2g' ||
          connection?.saveData === true ||
          (effectiveType === '3g' && connection?.downlink < 1.5);
      } else {
        // Fallback: test network speed with a small request
        const start = performance.now();
        fetch('/favicon.ico', { cache: 'no-cache' })
          .then(() => {
            const duration = performance.now() - start;
            // If favicon takes more than 500ms, consider it slow
            if (duration > 500) {
              setNetworkStatus(prev => ({ ...prev, isSlowNetwork: true }));
            }
          })
          .catch(() => {
            // Network error, assume slow
            setNetworkStatus(prev => ({ ...prev, isSlowNetwork: true, isOnline: false }));
          });
      }

      setNetworkStatus({
        isOnline,
        isSlowNetwork,
        effectiveType
      });
    };

    // Initial check
    updateNetworkStatus();

    // Listen for online/offline events
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    // Listen for connection changes if supported
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection?.addEventListener('change', updateNetworkStatus);
    }

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        connection?.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);

  return networkStatus;
}