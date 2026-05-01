"use client";

import { useResume } from "@/context/ResumeContext";
import resumeData from "@/data/resume.json";
import { Globe, ExternalLink } from "lucide-react";

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

export default function Sidebar() {
  const { language, viewMode, setViewMode, activeId, setActiveId } = useResume();

  const handleItemClick = (id: string) => {
    setActiveId(id);
    const element = document.getElementById('main-content');
    if (element) element.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const listItems = viewMode === 'experience' ? resumeData.experience : resumeData.projects;

  return (
    <aside className="hidden md:block w-full md:w-96 border-r border-gray-100 h-full overflow-y-auto bg-white/50 backdrop-blur-sm">
      <div className="p-8">
        <section className="mb-10">
          <div className="flex bg-gray-100 p-1 rounded-xl mb-12">
            <button 
              onClick={() => setViewMode('experience')}
              className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${
                viewMode === 'experience' ? "bg-white shadow-sm text-black" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              History
            </button>
            <button 
              onClick={() => setViewMode('projects')}
              className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${
                viewMode === 'projects' ? "bg-white shadow-sm text-black" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Projects
            </button>
          </div>

          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-gray-300" />
            {viewMode === 'experience' 
              ? (language === 'ko' ? '경력 이력' : 'Work History')
              : (language === 'ko' ? '프로젝트' : 'GitHub Projects')}
          </h2>
          <div className="space-y-3">
            {listItems.map((item: any) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 group ${
                  activeId === item.id
                    ? "bg-black text-white shadow-xl shadow-black/10 scale-[1.02]"
                    : "bg-white text-gray-700 border border-gray-100 hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${
                  activeId === item.id ? "text-gray-400" : "text-gray-400"
                }`}>
                  {item.period}
                </p>
                <h3 className="font-black text-lg leading-tight group-hover:translate-x-1 transition-transform">
                  {viewMode === 'experience' 
                    ? item.company[language as keyof typeof item.company]
                    : item.name[language as keyof typeof item.name]}
                </h3>
                <p className={`text-xs mt-2 font-medium ${
                  activeId === item.id ? "text-gray-300" : "text-gray-500"
                }`}>
                  {viewMode === 'experience'
                    ? item.department[language as keyof typeof item.department]
                    : item.type[language as keyof typeof item.type]}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-gray-300" />
            {language === 'ko' ? '학력' : 'Education'}
          </h2>
          <div className="space-y-6 pl-2">
            {resumeData.education.map((edu: any) => (
              <div key={edu.id} className="relative pl-6 border-l border-gray-100 py-1">
                <div className="absolute left-[-4.5px] top-3 w-2 h-2 rounded-full bg-gray-200" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{edu.period}</p>
                <h4 className="font-bold text-gray-900 leading-tight">{edu.school[language as keyof typeof edu.school]}</h4>
                <p className="text-xs text-gray-500 mt-1 font-medium">{edu.major ? edu.major[language as keyof typeof edu.major] : ''}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
            <span className="w-4 h-[1px] bg-gray-300" />
            {language === 'ko' ? '링크' : 'Links'}
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <a 
              href={resumeData.profile.links.blog} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-black hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                </div>
                <span className="text-sm font-black text-gray-900">Blog</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-200 group-hover:text-black transition-colors" />
            </a>
            <a 
              href={resumeData.profile.links.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl hover:border-black hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  <GitHubIcon className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                </div>
                <span className="text-sm font-black text-gray-900">GitHub</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-200 group-hover:text-black transition-colors" />
            </a>
          </div>
        </section>
      </div>
    </aside>
  );
}
