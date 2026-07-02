'use client';

import React, { createContext, useContext, useState } from 'react';

interface PreloaderContextType {
  preloaderDone: boolean;
  setPreloaderDone: (val: boolean) => void;
}

export const PreloaderContext = createContext<PreloaderContextType>({
  preloaderDone: false,
  setPreloaderDone: () => {},
});

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [preloaderDone, setPreloaderDone] = useState(false);
  return (
    <PreloaderContext.Provider value={{ preloaderDone, setPreloaderDone }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}
