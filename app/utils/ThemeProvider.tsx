"use client";

import React, { createContext, useContext, useState, useLayoutEffect, useCallback, useMemo } from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

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

function applyTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  root.classList.remove('theme-light', 'theme-dark');
  root.classList.add(`theme-${theme}`);
}

function getSavedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem('theme');
    return (saved === 'light' || saved === 'dark') ? saved : null;
  } catch {
    return null;
  }
}

function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Ignore localStorage errors
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isSlowNetwork } = useNetworkStatus();
  const [theme, setTheme] = useState<Theme>('light');
  const [isReady, setIsReady] = useState(false);
  const [hasUserToggled, setHasUserToggled] = useState(false);

  useLayoutEffect(() => {
    // Initial theme setup
    let initialTheme: Theme;

    if (isSlowNetwork) {
      if (!hasUserToggled) {
        // On slow networks, always start with light theme unless user toggles
        initialTheme = 'light';
        setTheme(initialTheme);
        applyTheme(initialTheme);
      }
      // If user has toggled, do not change theme, but still set isReady
    } else {
      // On fast networks, use saved theme or fall back to system
      initialTheme = getSavedTheme() ?? getSystemTheme();
      setTheme(initialTheme);
      applyTheme(initialTheme);
    }
    setIsReady(true);
  }, [isSlowNetwork, hasUserToggled]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    setHasUserToggled(true);

    // Only persist on fast networks
    if (!isSlowNetwork) {
      saveTheme(newTheme);
    }
  }, [theme, isSlowNetwork]);

  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
    isReady
  }), [theme, toggleTheme, isReady]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}