'use client';

import React, { createContext, useContext, useState } from 'react';

interface PreloaderContextType {
  preloaderDone: boolean;
  setPreloaderDone: (val: boolean) => void;
  loadProgress: number;
  setLoadProgress: (val: number) => void;
}

export const PreloaderContext = createContext<PreloaderContextType>({
  preloaderDone: false,
  setPreloaderDone: () => {},
  loadProgress: 0,
  setLoadProgress: () => {},
});

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  return (
    <PreloaderContext.Provider value={{ preloaderDone, setPreloaderDone, loadProgress, setLoadProgress }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
