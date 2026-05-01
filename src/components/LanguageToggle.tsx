"use client";

import { useResume } from "@/context/ResumeContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useResume();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLanguage('ko')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          language === 'ko' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        KO
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          language === 'en' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        EN
      </button>
    </div>
  );
}
