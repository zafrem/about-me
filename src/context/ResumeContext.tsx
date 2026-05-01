"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ko' | 'en';
type ViewMode = 'experience' | 'projects';

interface ResumeContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeId: string;
  setActiveId: (id: string) => void;
  activeDetailIdx: number | null;
  setActiveDetailIdx: (idx: number | null) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko');
  const [viewMode, setViewMode] = useState<ViewMode>('experience');
  const [activeId, setActiveId] = useState<string>('coupang');
  const [activeDetailIdx, setActiveDetailIdx] = useState<number | null>(null);

  const handleSetViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === 'experience') setActiveId('coupang');
    else setActiveId('desk-tools');
    setActiveDetailIdx(null);
  };

  return (
    <ResumeContext.Provider value={{ 
      language, setLanguage, viewMode, setViewMode: handleSetViewMode, 
      activeId, setActiveId, activeDetailIdx, setActiveDetailIdx 
    }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
