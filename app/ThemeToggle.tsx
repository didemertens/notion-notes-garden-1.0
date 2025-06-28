"use client";

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme, isReady } = useTheme();

  if (!isReady) {
    return <span className="h-12 w-12" />;
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="theme-toggle h-12 w-12"
      tabIndex={1}
    >
      {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
} 