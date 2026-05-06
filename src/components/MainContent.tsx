"use client";

import { useResume } from "@/context/ResumeContext";
import resumeData from "@/data/resume.json";
import { X, ArrowRight, ExternalLink } from "lucide-react";

export default function MainContent() {
  const { language, viewMode, activeId, setActiveId, activeDetailIdx, setActiveDetailIdx } = useResume();

  const activeItem = viewMode === 'experience' 
    ? resumeData.experience.find((exp) => exp.id === activeId)
    : (resumeData as any).projects.find((proj: any) => proj.id === activeId);

  if (!activeItem) return (
    <div className="flex-1 flex items-center justify-center bg-gray-50/30">
      <p className="text-gray-400 font-bold uppercase tracking-widest animate-pulse">
        {language === 'ko' ? '항목을 선택해주세요' : 'Please select an item'}
      </p>
    </div>
  );

  const handleRelatedClick = (id: string) => {
    const element = document.getElementById('main-content');
    if (element) element.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveId(id);
    setActiveDetailIdx(null);
  };

  const activeDetail = activeDetailIdx !== null ? activeItem.details[activeDetailIdx] : null;

  return (
    <main id="main-content" className="flex-1 overflow-y-auto bg-gray-50/30 p-6 md:p-12 scroll-smooth relative">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-gray-100 pb-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="px-2.5 py-1 bg-gray-100 text-gray-900 text-[9px] font-bold uppercase tracking-widest rounded">
              {activeItem.period}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-gray-900 uppercase tracking-tight">
                {viewMode === 'experience' 
                  ? activeItem.company[language as keyof typeof activeItem.company]
                  : activeItem.name[language as keyof typeof activeItem.name]}
              </span>
              <span className="text-gray-300 text-xs">/</span>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">
                {viewMode === 'experience'
                  ? activeItem.department[language as keyof typeof activeItem.department]
                  : activeItem.type[language as keyof typeof activeItem.type]}
              </span>
            </div>
            {viewMode === 'projects' && activeItem.url && (
              <a 
                href={activeItem.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] font-black text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-widest"
              >
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <div className="flex items-center gap-3 md:ml-auto">
              <div className="w-1 h-1 rounded-full bg-blue-500" />
              <span className="text-xs font-black text-gray-800">
                {activeItem.role[language as keyof typeof activeItem.role]}
              </span>
              {viewMode === 'experience' && (
                <>
                  <span className="text-gray-300 text-xs">•</span>
                  <span className="text-xs font-bold text-gray-400">
                    {typeof activeItem.position === 'string' 
                      ? activeItem.position 
                      : activeItem.position[language as keyof typeof activeItem.position]}
                  </span>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {activeItem.details.map((detail: any, idx: number) => (
            <button 
              key={idx} 
              onClick={() => setActiveDetailIdx(idx)}
              className="group relative text-left"
            >
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 group-hover:-translate-y-1 w-full">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-black text-gray-900 pr-8">
                    {detail.title[language as keyof typeof detail.title]}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line font-medium line-clamp-3">
                  {detail.description[language as keyof typeof detail.description]}
                </p>
              </div>
            </button>
          ))}
        </div>

        {viewMode === 'experience' && activeItem.related && activeItem.related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-100">
            <h4 className="text-xs font-black text-gray-400 uppercase mb-8 tracking-[0.3em] flex items-center gap-4">
              {language === 'ko' ? '함께 보기' : 'Related Experience'}
              <span className="flex-1 h-[1px] bg-gray-100" />
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeItem.related.map((relId: string) => {
                const relExp = resumeData.experience.find((e) => e.id === relId);
                if (!relExp) return null;
                return (
                  <button
                    key={relId}
                    onClick={() => handleRelatedClick(relId)}
                    className="flex flex-col items-start p-6 bg-white border border-gray-100 rounded-3xl text-left hover:border-black hover:shadow-lg transition-all group"
                  >
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{relExp.period}</span>
                    <span className="text-lg font-black text-gray-900 group-hover:underline underline-offset-4 decoration-2">
                      {relExp.company[language as keyof typeof relExp.company]}
                    </span>
                    <span className="text-xs text-gray-500 mt-2 font-bold">{relExp.department[language as keyof typeof relExp.department]}</span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        <footer className="mt-24 border-t border-gray-100 pt-16 flex flex-col md:flex-row justify-between items-start gap-12">
          <div id="cert-section" className="max-w-md">
            <h4 className="text-xs font-black text-gray-400 uppercase mb-8 tracking-[0.2em]">
              {language === 'ko' ? '주요 보유 기술' : 'Core Expertise'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.advance.map((skill, idx) => (
                <span key={idx} className="px-4 py-2 bg-gray-900 text-white rounded-2xl text-xs font-black tracking-tight">
                  {skill[language as keyof typeof skill]}
                </span>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => {
              const element = document.getElementById('main-content');
              if (element) element.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] hover:text-black transition-colors self-end md:self-auto"
          >
            ↑ {language === 'ko' ? '맨 위로' : 'Back to Top'}
          </button>
        </footer>
      </div>

      {/* Detailed Information Overlay */}
      {activeDetail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={() => setActiveDetailIdx(null)}
          />
          <div className="relative bg-white w-full max-w-3xl max-h-full overflow-y-auto rounded-3xl shadow-2xl p-10 md:p-16 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setActiveDetailIdx(null)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            
            <header className="mb-12">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">
                {viewMode === 'experience' 
                  ? activeItem.company[language as keyof typeof activeItem.company]
                  : activeItem.name[language as keyof typeof activeItem.name]} • {activeItem.period}
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                {activeDetail.title[language as keyof typeof activeDetail.title]}
              </h2>
            </header>

            <div className="prose prose-gray max-w-none">
              <p className="text-xl text-gray-600 leading-loose whitespace-pre-line font-medium mb-12">
                {activeDetail.description[language as keyof typeof activeDetail.description]}
              </p>
              
              {(activeItem as any).images && (activeItem as any).images.length > 0 && (
                <div className="space-y-6 mb-12">
                  {(activeItem as any).images.map((imgUrl: string, i: number) => (
                    <div key={i} className="rounded-3xl overflow-hidden border border-gray-100 shadow-lg">
                      <img 
                        src={imgUrl} 
                        alt={`${activeItem.name?.[language] || 'Project'} screenshot ${i + 1}`}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-16 p-8 bg-blue-50 rounded-3xl border border-blue-100">
                <h4 className="text-sm font-black text-blue-900 uppercase tracking-widest mb-4">Note</h4>
                <p className="text-blue-700 font-medium">
                  {language === 'ko' 
                    ? "추가적인 상세 성과 및 기술적 구현 내용은 추후 업데이트될 예정입니다."
                    : "Additional detailed achievements and technical implementation details will be updated soon."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
