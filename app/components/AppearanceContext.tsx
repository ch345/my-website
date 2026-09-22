'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react';

export type AppearanceMode = 'default' | 'light' | 'dark';

const STORAGE_KEY = 'appearance-mode';

const AppearanceContext = createContext<{
  mode: AppearanceMode;
  effectiveMode: AppearanceMode;
  setMode: (mode: AppearanceMode) => void;
  triggerPreview: (mode: AppearanceMode, duration?: number) => void;
}>({ mode: 'default', effectiveMode: 'default', setMode: () => {}, triggerPreview: () => {} });

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<AppearanceMode>('default');
  const [previewMode, setPreviewMode] = useState<AppearanceMode | null>(null);
  const previewTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'default') {
      setModeState(stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setModeState('dark');
    }
  }, []);

  const setMode = (next: AppearanceMode) => {
    setModeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const triggerPreview = (previewTo: AppearanceMode, duration = 3000) => {
    clearTimeout(previewTimeout.current);
    setPreviewMode(previewTo);
    previewTimeout.current = setTimeout(() => setPreviewMode(null), duration);
  };

  const effectiveMode = previewMode ?? mode;

  useEffect(() => {
    document.documentElement.dataset.theme = effectiveMode === 'dark' ? 'dark' : 'light';
  }, [effectiveMode]);

  return (
    <AppearanceContext.Provider value={{ mode, effectiveMode, setMode, triggerPreview }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  return useContext(AppearanceContext);
}
