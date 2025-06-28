"use client";

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme, isReady } = useTheme();

  if (!isReady) {
    return <span className="h-12 w-12" aria-hidden="true" />;
  }

  const isDark = theme === 'dark';
  const icon = isDark ? <Sun size={24} aria-hidden="true" /> : <Moon size={24} aria-hidden="true" />;
  const label = `Switch to ${isDark ? 'light' : 'dark'} theme`;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={toggleTheme}
      className="theme-toggle theme-toggle--ready h-12 w-12 flex items-center justify-center"
    >
      {icon}
    </button>
  );
} 