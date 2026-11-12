import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Trophy,
  AlertTriangle,
  Play,
  RotateCcw,
  Zap,
  BookmarkCheck,
  Feather,
  Music,
  Scroll,
  Drama,
  Wand2,
  Layers,
  ChevronRight,
  BarChart2,
} from 'lucide-react';
import { ExamMode, TopicId, UserStats } from './types';
import { TOPICS } from './questionsData';
import { TransText } from './TransText';

interface HomeScreenProps {
  onStartExam: (mode: ExamMode, topicId?: TopicId) => void;
  onOpenTheory: () => void;
  onOpenResults: () => void;
  onResetProgress: () => void;
  stats: UserStats;
  hasSavedExam: boolean;
  onResumeExam: () => void;
  globalTranslate: boolean;
}

const getTopicIcon = (iconName: string) => {
  switch (iconName) {
    case 'BookOpen':
      return <BookOpen className="w-5 h-5 text-amber-400" />;
    case 'Feather':
      return <Feather className="w-5 h-5 text-amber-400" />;
    case 'Music':
      return <Music className="w-5 h-5 text-amber-400" />;
    case 'Sparkles':
      return <Sparkles className="w-5 h-5 text-amber-400" />;
    case 'Scroll':
      return <Scroll className="w-5 h-5 text-amber-400" />;
    case 'Drama':
      return <Drama className="w-5 h-5 text-amber-400" />;
    case 'Wand2':
      return <Wand2 className="w-5 h-5 text-amber-400" />;
    case 'Layers':
      return <Layers className="w-5 h-5 text-amber-400" />;
    default:
      return <BookOpen className="w-5 h-5 text-amber-400" />;
  }
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartExam,
  onOpenTheory,
  onOpenResults,
  onResetProgress,
  stats,
  hasSavedExam,
  onResumeExam,
  globalTranslate,
}) => {
  const [showResetModal, setShowResetModal] = useState(false);

  const accuracy =
    stats.totalAnswered > 0
      ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      {/* Resume Active Exam Banner if any */}
      {hasSavedExam && (
        <div className="p-5 rounded-2xl bg-[#1C2541] border-2 border-amber-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-base sm:text-lg">
                Tienes un examen en curso sin terminar
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-hy mt-0.5">
                Դուք ունեք անավարտ քննություն. կարող եք շարունակել այնտեղից, որտեղ կանգ եք առել։
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onResumeExam}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Continuar examen</span>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="rounded-3xl bg-[#1C2541] border-2 border-slate-700 p-6 sm:p-10 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-600 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Trenažor Escolar • 7.º Curso de la ESO</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                EL GRAN EXAMEN DE LENGUA Y LITERATURA
              </h1>
              <TransText
                es="Prepárate para tu examen de 7.º curso."
                hy="Պատրաստվի՛ր 7-րդ դասարանի իսպաներենի և գրականության դպրոցական քննությանը։"
                className="text-lg sm:text-xl text-slate-200 font-semibold"
                forceOpen={globalTranslate}
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 text-sm text-slate-200 leading-relaxed">
              <span className="font-bold text-amber-400">💡 Función bilingüe:</span> Haz clic sobre cualquier pregunta, opción o explicación en español para abrir su traducción en armenio.
              <div className="text-sm font-hy text-slate-300 mt-1">
                🇦🇲 Սեղմեք ցանկացած իսպաներեն տեքստի կամ «Թարգմանել» կոճակի վրա՝ հայերեն ճշգրիտ թարգմանությունը տեսնելու համար։
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 justify-center lg:justify-start">
              <button
                onClick={() => onStartExam('all')}
                className="px-7 py-4 rounded-2xl font-black text-base sm:text-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-2.5 cursor-pointer shadow-lg"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Empezar examen (150 preguntas)</span>
              </button>

              <button
                onClick={() => onStartExam('quick')}
                className="px-6 py-4 rounded-2xl font-bold text-base bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Zap className="w-5 h-5 text-amber-300" />
                <span>Examen rápido (20 preguntas)</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Widget */}
          <div className="w-full lg:w-88 bg-slate-900 border-2 border-slate-700 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-amber-400" />
                <span>Mis estadísticas</span>
              </span>
              <button
                onClick={onOpenResults}
                className="text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                Ver informe
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700">
                <div className="text-xs text-slate-300">Respondidas</div>
                <div className="text-2xl font-black text-white mt-0.5">
                  {stats.totalAnswered}{' '}
                  <span className="text-xs font-normal text-slate-400">/ 150</span>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800 border border-slate-700">
                <div className="text-xs text-slate-300">Aciertos</div>
                <div className="text-2xl font-black text-emerald-400 mt-0.5">
                  {stats.totalCorrect}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm text-slate-200">
                <span>Porcentaje de acierto</span>
                <span className="font-extrabold text-amber-400">{accuracy}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${accuracy}%` }}
                />
              </div>
            </div>

            {stats.mistakes.length > 0 ? (
              <button
                onClick={() => onStartExam('errors')}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Examen de errores ({stats.mistakes.length} fallos)</span>
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs sm:text-sm text-center font-bold">
                ¡Sin errores pendientes por ahora! 🎉
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modes Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Mode: Examen Completo */}
        <div
          onClick={() => onStartExam('all')}
          className="cursor-pointer p-6 rounded-2xl bg-[#1C2541] border-2 border-slate-700 hover:border-slate-500 transition-colors shadow-md space-y-3"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center border border-slate-700">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg">
              Examen completo
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Las 150 preguntas con orden y opciones aleatorias en cada intento.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between text-xs sm:text-sm font-bold text-amber-400">
            <span>150 preguntas</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Mode: Examen Rápido */}
        <div
          onClick={() => onStartExam('quick')}
          className="cursor-pointer p-6 rounded-2xl bg-[#1C2541] border-2 border-slate-700 hover:border-slate-500 transition-colors shadow-md space-y-3"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-800 text-indigo-400 flex items-center justify-center border border-slate-700">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg">
              Examen rápido
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              20 preguntas variadas ideales para una sesión de repaso express.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between text-xs sm:text-sm font-bold text-indigo-400">
            <span>20 preguntas</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Mode: Repasar Teoría */}
        <div
          onClick={onOpenTheory}
          className="cursor-pointer p-6 rounded-2xl bg-[#1C2541] border-2 border-slate-700 hover:border-slate-500 transition-colors shadow-md space-y-3"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center border border-slate-700">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg">
              Repasar teoría
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Explicaciones completas con ejemplos de romance, métrica, teatro y figuras.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-400">
            <span>Manual escolar</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Mode: Mis Errores */}
        <div
          onClick={() => {
            if (stats.mistakes.length > 0) {
              onStartExam('errors');
            }
          }}
          className={`p-6 rounded-2xl border-2 transition-colors shadow-md space-y-3 ${
            stats.mistakes.length > 0
              ? 'cursor-pointer bg-[#1C2541] border-rose-700 hover:border-rose-500'
              : 'bg-slate-900/60 border-slate-800 opacity-60 cursor-not-allowed'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-slate-800 text-rose-400 flex items-center justify-center border border-slate-700">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-lg">
              Examen de errores
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Repite únicamente las preguntas falladas hasta dominar el 100%.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between text-xs sm:text-sm font-bold text-rose-400">
            <span>{stats.mistakes.length} preguntas guardadas</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Practicar por Temas Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <BookmarkCheck className="w-7 h-7 text-amber-400" />
            <span>Practicar por temas (8 bloques)</span>
          </h2>
          <TransText
            es="Elige un tema específico para practicar todas sus preguntas individualmente."
            hy="Ընտրե՛ք կոնկրետ թեման՝ նրա բոլոր հարցերը առանձին մարզելու համար։"
            className="text-sm sm:text-base text-slate-300 mt-1"
            forceOpen={globalTranslate}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOPICS.map((topic) => {
            const topicStats = stats.byTopic[topic.id] || { answered: 0, correct: 0 };
            return (
              <div
                key={topic.id}
                onClick={() => onStartExam('topic', topic.id)}
                className="cursor-pointer rounded-2xl p-6 bg-[#1C2541] border-2 border-slate-700 hover:border-slate-500 transition-colors shadow-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                      {getTopicIcon(topic.icon)}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700">
                      {topic.questionCount} preg.
                    </span>
                  </div>

                  <div>
                    <TransText
                      es={topic.titleEs}
                      hy={topic.titleHy}
                      esClassName="font-extrabold text-white text-base"
                      hyClassName="text-sm font-hy"
                      forceOpen={globalTranslate}
                    />
                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                      {topic.descriptionEs}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-300">
                  <span>
                    Progreso: {topicStats.correct}/{topic.questionCount}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <span>Practicar</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Bottom Actions */}
      <div className="p-6 rounded-3xl bg-slate-900 border-2 border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-extrabold text-white text-base sm:text-lg">
            Control general del examen y progreso
          </div>
          <div className="text-sm text-slate-300">
            Reinicia todos los datos o consulta tu historial de exámenes y notas escolares.
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onOpenResults}
            className="flex-1 sm:flex-none px-5 py-3 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <BarChart2 className="w-4 h-4 text-amber-400" />
            <span>Mis resultados</span>
          </button>

          <button
            onClick={() => setShowResetModal(true)}
            className="flex-1 sm:flex-none px-5 py-3 rounded-xl text-sm font-bold bg-red-950 hover:bg-red-900 text-red-200 border border-red-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-red-400" />
            <span>Reiniciar progreso</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#1C2541] border-2 border-red-600 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-black text-white">
                ¿Reiniciar todo el progreso?
              </h3>
              <p className="text-sm text-slate-300">
                Esta acción borrará todas las preguntas respondidas, estadísticas de aciertos y la lista de errores guardados.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 font-hy text-sm leading-relaxed text-left">
                🇦🇲 <strong>Վերակայե՞լ ամբողջ առաջընթացը։</strong><br />
                Այս գործողությունը կջնջի բոլոր պատասխանները, միավորները և պահպանված սխալների ցանկը։
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onResetProgress();
                  setShowResetModal(false);
                }}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-500 text-white transition-colors cursor-pointer"
              >
                Sí, reiniciar todo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
