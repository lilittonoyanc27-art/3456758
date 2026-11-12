import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  ArrowLeft,
  Play,
  Lightbulb,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { THEORY_SECTIONS } from './theoryData';
import { TopicId } from './types';
import { TransText } from './TransText';

interface TheoryScreenProps {
  onBackToHome: () => void;
  onPracticeTopic: (topicId: TopicId) => void;
  globalTranslate: boolean;
}

export const TheoryScreen: React.FC<TheoryScreenProps> = ({
  onBackToHome,
  onPracticeTopic,
  globalTranslate,
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(THEORY_SECTIONS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [collapsedSubsections, setCollapsedSubsections] = useState<Record<string, boolean>>({});

  const filteredSections = THEORY_SECTIONS.filter((sec) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      sec.titleEs.toLowerCase().includes(q) ||
      sec.titleHy.toLowerCase().includes(q) ||
      sec.introEs.toLowerCase().includes(q) ||
      sec.subsections.some(
        (sub) =>
          sub.subtitleEs.toLowerCase().includes(q) ||
          sub.contentEs.toLowerCase().includes(q) ||
          (sub.exampleEs && sub.exampleEs.toLowerCase().includes(q))
      )
    );
  });

  const activeSection =
    THEORY_SECTIONS.find((sec) => sec.id === activeSectionId) || filteredSections[0];

  const toggleSubsection = (key: string) => {
    setCollapsedSubsections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-300 hover:text-white transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al menú principal</span>
          </button>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-amber-400" />
            <span>MANUAL DE TEORÍA Y REGLAS</span>
          </h1>
          <TransText
            es="Explicaciones completas de métrica, romance, figuras literarias, teatro y géneros con ejemplos prácticos."
            hy="Չափագիտության, ռոմանսի, ոճաֆիգուրների, թատրոնի և ժանրերի ամբողջական տեսություն՝ գործնական օրինակներով։"
            className="text-sm sm:text-base text-slate-200 mt-1 max-w-2xl"
            forceOpen={globalTranslate}
          />
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar concepto (ej: sinalefa, metáfora)..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border-2 border-slate-700 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Main Grid: Section Tabs on Left, Content on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar Tabs */}
        <div className="lg:col-span-4 space-y-2 sticky top-20">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            Temas del temario:
          </div>
          {filteredSections.map((sec) => {
            const isActive = activeSection?.id === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 border-amber-500 text-white font-black shadow-md'
                    : 'bg-[#1C2541] border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                <div className="font-bold text-base leading-snug">
                  {sec.titleEs}
                </div>
                <div className="text-xs font-hy text-slate-300 mt-1">
                  {sec.titleHy}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Section Content */}
        {activeSection ? (
          <div className="lg:col-span-8 space-y-6">
            {/* Section Header Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1C2541] border-2 border-slate-700 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-2xl sm:text-3xl font-black text-amber-400">
                  {activeSection.titleEs}
                </h2>
                {activeSection.topicId && (
                  <button
                    onClick={() => onPracticeTopic(activeSection.topicId as TopicId)}
                    className="self-start sm:self-auto px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Practicar este tema</span>
                  </button>
                )}
              </div>

              <TransText
                es={activeSection.introEs}
                hy={activeSection.introHy}
                className="text-base sm:text-lg text-slate-100 leading-relaxed font-medium"
                forceOpen={globalTranslate}
              />
            </div>

            {/* Subsections List */}
            <div className="space-y-4">
              {activeSection.subsections.map((sub, idx) => {
                const subKey = `${activeSection.id}-${idx}`;
                const isCollapsed = collapsedSubsections[subKey] || false;

                return (
                  <div
                    key={subKey}
                    className="rounded-2xl bg-[#1C2541] border-2 border-slate-700 overflow-hidden shadow-md"
                  >
                    <div
                      onClick={() => toggleSubsection(subKey)}
                      className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/60 transition-colors"
                    >
                      <div>
                        <h3 className="font-extrabold text-lg sm:text-xl text-white">
                          {sub.subtitleEs}
                        </h3>
                        <div className="text-xs sm:text-sm font-hy text-slate-300 mt-1">
                          {sub.subtitleHy}
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                        {isCollapsed ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronUp className="w-5 h-5" />
                        )}
                      </div>
                    </div>

                    {!isCollapsed && (
                      <div className="px-5 sm:px-6 pb-6 space-y-5 border-t border-slate-800 pt-5">
                        {/* Main explanation content */}
                        <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800">
                          <TransText
                            es={sub.contentEs}
                            hy={sub.contentHy}
                            className="text-base sm:text-lg leading-relaxed text-slate-100 whitespace-pre-line"
                            forceOpen={globalTranslate}
                          />
                        </div>

                        {/* Example if present */}
                        {sub.exampleEs && (
                          <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border-2 border-slate-700 space-y-2">
                            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                              <Sparkles className="w-4 h-4 text-amber-400" />
                              <span>Ejemplo ilustrado:</span>
                            </div>
                            <TransText
                              es={sub.exampleEs}
                              hy={sub.exampleHy}
                              className="text-base sm:text-lg font-mono whitespace-pre-line text-slate-100 leading-relaxed"
                              forceOpen={globalTranslate}
                            />
                          </div>
                        )}

                        {/* Tips if present */}
                        {sub.tipsEs && sub.tipsEs.length > 0 && (
                          <div className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
                            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                              <Lightbulb className="w-4 h-4 text-amber-400" />
                              <span>Claves para no fallar en el examen:</span>
                            </div>
                            <ul className="space-y-2 text-sm sm:text-base text-slate-200">
                              {sub.tipsEs.map((tip, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                  <span className="text-amber-400 font-bold">•</span>
                                  <div className="flex-1">
                                    <TransText
                                      es={tip}
                                      hy={sub.tipsHy ? sub.tipsHy[i] : undefined}
                                      forceOpen={globalTranslate}
                                    />
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 p-12 text-center text-slate-300 text-lg">
            No se encontraron conceptos para la búsqueda «{searchQuery}».
          </div>
        )}
      </div>
    </div>
  );
};
