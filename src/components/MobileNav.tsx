"use client";

import React, { useState } from 'react';
import { useResume } from "@/context/ResumeContext";
import resumeData from "@/data/resume.json";
import { Briefcase, GraduationCap, Award, X, ChevronRight } from "lucide-react";

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function MobileNav() {
  const { language, viewMode, setViewMode, activeId, setActiveId } = useResume();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const listItems = viewMode === 'experience' ? resumeData.experience : resumeData.projects;

  const handleSelect = (id: string) => {
    setActiveId(id);
    setIsHistoryOpen(false);
    const element = document.getElementById('main-content');
    if (element) element.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-6 py-3 z-50 flex justify-around items-center shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <button 
          onClick={() => { setViewMode('experience'); setIsHistoryOpen(true); }}
          className={`flex flex-col items-center gap-1 transition-colors ${viewMode === 'experience' && isHistoryOpen ? 'text-black' : 'text-gray-400'}`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-tighter">History</span>
        </button>
        <button 
          onClick={() => { setViewMode('projects'); setIsHistoryOpen(true); }}
          className={`flex flex-col items-center gap-1 transition-colors ${viewMode === 'projects' && isHistoryOpen ? 'text-black' : 'text-gray-400'}`}
        >
          <GitHubIcon className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Projects</span>
        </button>
        <button 
          onClick={() => {
            const element = document.getElementById('cert-section');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <Award className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Skills</span>
        </button>
      </nav>

      {/* Slide-up Drawer */}
      <div 
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          isHistoryOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
          onClick={() => setIsHistoryOpen(false)}
        />
        
        {/* Drawer Content */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-8 shadow-2xl transition-transform duration-500 transform ${
            isHistoryOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black tracking-tight text-gray-900">
              {viewMode === 'experience' 
                ? (language === 'ko' ? '경력 선택' : 'Select History')
                : (language === 'ko' ? '프로젝트 선택' : 'Select Project')}
            </h2>
            <button 
              onClick={() => setIsHistoryOpen(false)}
              className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pb-8">
            {listItems.map((item: any) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left p-5 rounded-xl transition-all border flex items-center justify-between ${
                  activeId === item.id
                    ? "bg-black text-white border-black shadow-lg"
                    : "bg-gray-50 text-gray-700 border-gray-100"
                }`}
              >
                <div>
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                    activeId === item.id ? "text-gray-400" : "text-gray-400"
                  }`}>
                    {item.period}
                  </p>
                  <h3 className="font-black text-base">
                    {viewMode === 'experience' 
                      ? item.company[language as keyof typeof item.company]
                      : item.name[language as keyof typeof item.name]}
                  </h3>
                </div>
                <ChevronRight className={`w-5 h-5 ${activeId === item.id ? "text-white" : "text-gray-300"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
