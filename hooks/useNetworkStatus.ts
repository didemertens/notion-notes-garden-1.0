"use client";

import { useState, useEffect, useCallback } from 'react';

// Network speed thresholds
const SLOW_NETWORK_TIMEOUT_MS = 500; // Threshold for considering network slow via timing
const MIN_3G_SPEED_MBPS = 1.5; // Minimum 3g speed to not be considered slow

// TypeScript interface for Navigator with connection property
interface NavigatorConnection extends Navigator {
  connection?: {
    effectiveType: string;
    saveData: boolean;
    downlink: number;
    addEventListener: (event: string, handler: () => void) => void;
    removeEventListener: (event: string, handler: () => void) => void;
  };
}

// Type guard to check if navigator has connection property
function hasConnection(nav: Navigator): nav is NavigatorConnection {
  return 'connection' in nav;
}

export function useNetworkStatus() {
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);

  const updateNetworkStatus = useCallback(() => {
    if (!hasConnection(navigator)) {
      // Fallback: test network speed with a small request
      const start = performance.now();
      fetch('/api/health', { cache: 'no-cache' })
        .then(() => {
          const duration = performance.now() - start;
          // If health check takes more than threshold, consider it slow
          setIsSlowNetwork(duration > SLOW_NETWORK_TIMEOUT_MS);
        })
        .catch(() => {
          // Network error, assume slow
          setIsSlowNetwork(true);
        });
      return;
    }

    const connection = (navigator as NavigatorConnection).connection;
    const effectiveType = connection?.effectiveType || '4g';
    
    // Consider 2g, slow-2g as slow networks
    // Also consider saveData mode as indication of slow network preference
    const slow = 
      effectiveType === '2g' || 
      effectiveType === 'slow-2g' ||
      connection?.saveData === true ||
      (effectiveType === '3g' && connection?.downlink != null && connection.downlink < MIN_3G_SPEED_MBPS);

    setIsSlowNetwork(slow);
  }, []);

  useEffect(() => {
    // Initial check
    updateNetworkStatus();

    // Listen for connection changes if supported
    if (hasConnection(navigator)) {
      const connection = (navigator as NavigatorConnection).connection;
      connection?.addEventListener('change', updateNetworkStatus);
      
      return () => {
        connection?.removeEventListener('change', updateNetworkStatus);
      };
    }
  }, [updateNetworkStatus]);

  return { isSlowNetwork };
}