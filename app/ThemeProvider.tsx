"use client";

import React, { createContext, useContext, useState, useLayoutEffect } from 'react';
import { useNetworkStatus } from './hooks/useNetworkStatus';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isReady: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function getSystemTheme(): Theme {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('theme-light', 'theme-dark');
  root.classList.add(`theme-${theme}`);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isSlowNetwork } = useNetworkStatus();
  const [theme, setTheme] = useState<Theme>('light');
  const [isReady, setIsReady] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useLayoutEffect(() => {
    if (!isInitialized) {
      // Initial theme setup - only runs once
      let initialTheme: Theme;

      if (isSlowNetwork) {
        // On slow networks, always use system theme initially
        initialTheme = getSystemTheme();
      } else {
        // On fast networks, use saved theme or fall back to system
        const savedTheme = localStorage.getItem('theme') as Theme;
        initialTheme = (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : getSystemTheme();
      }

      setTheme(initialTheme);
      applyTheme(initialTheme);
      setIsReady(true);
      setIsInitialized(true);
    }

  }, [isSlowNetwork, isInitialized]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);

    // Only persist on fast networks
    if (!isSlowNetwork) {
      localStorage.setItem('theme', newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isReady }}>
      {children}
    </ThemeContext.Provider>
  );
}