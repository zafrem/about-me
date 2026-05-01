"use client";

import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import LanguageToggle from "@/components/LanguageToggle";
import MobileNav from "@/components/MobileNav";
import { useResume } from "@/context/ResumeContext";
import resumeData from "@/data/resume.json";

import { Shield } from "lucide-react";

export default function Home() {
  const { language } = useResume();

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-gray-900 md:pb-0 pb-[72px]">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-lg shadow-black/10 transition-transform hover:scale-105">
            <Shield className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-black leading-tight">
              {resumeData.profile.name[language as keyof typeof resumeData.profile.name]}
            </h1>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
              {resumeData.profile.title[language as keyof typeof resumeData.profile.title]}
            </p>
          </div>
        </div>
        <LanguageToggle />
      </header>

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <Sidebar />
        <MainContent />
      </div>

      <MobileNav />
    </div>
  );
}
