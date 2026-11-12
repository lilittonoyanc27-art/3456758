import React from 'react';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  Home,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BarChart,
} from 'lucide-react';
import { ExamResult } from './types';
import { TOPICS, ALL_QUESTIONS } from './questionsData';
import { TransText } from './TransText';

interface ResultsScreenProps {
  result: ExamResult;
  onRestartExam: () => void;
  onReviewErrors: () => void;
  onOpenTheory: () => void;
  onBackToHome: () => void;
  globalTranslate: boolean;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  result,
  onRestartExam,
  onReviewErrors,
  onOpenTheory,
  onBackToHome,
  globalTranslate,
}) => {
  const incorrectCount = result.totalQuestions - result.correctAnswers;
  const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
  const score = result.scoreOutOfTen;

  // Grade messages
  let gradeTitleEs = '';
  let gradeTitleHy = '';
  let gradeBadgeColor = '';

  if (score >= 9) {
    gradeTitleEs = '¡Excelente trabajo! Sobresaliente';
    gradeTitleHy = 'Գերազանց աշխատանք։ Փայլո՛ւն է։';
    gradeBadgeColor = 'bg-emerald-600 text-white border border-emerald-500';
  } else if (score >= 7) {
    gradeTitleEs = '¡Muy bien! Notable';
    gradeTitleHy = 'Շատ լավ է։ Ուշագրավ առաջընթաց։';
    gradeBadgeColor = 'bg-blue-600 text-white border border-blue-500';
  } else if (score >= 5) {
    gradeTitleEs = '¡Bien! Aprobado. Sigue practicando';
    gradeTitleHy = 'Լավ է։ Դրական է, բայց շարունակիր պարապել։';
    gradeBadgeColor = 'bg-amber-500 text-slate-950 border border-amber-600';
  } else {
    gradeTitleEs = 'Necesitas repasar algunos temas';
    gradeTitleHy = 'Անհրաժեշտ է կրկնել որոշ թեմաներ։ Չհուսահատվե՛ս։';
    gradeBadgeColor = 'bg-rose-600 text-white border border-rose-500';
  }

  // Calculate score breakdown by topic for questions in this exam
  const topicStats: Record<string, { total: number; correct: number }> = {};
  result.questionIds.forEach((qId) => {
    const q = ALL_QUESTIONS.find((item) => item.id === qId);
    if (q) {
      if (!topicStats[q.topicId]) {
        topicStats[q.topicId] = { total: 0, correct: 0 };
      }
      topicStats[q.topicId].total += 1;
      if (result.userAnswers[qId] === q.correctOptionId) {
        topicStats[q.topicId].correct += 1;
      }
    }
  });

  // Weak topics (accuracy < 70%) for recommendations
  const weakTopics = Object.entries(topicStats)
    .filter(([_, data]) => data.total > 0 && (data.correct / data.total) < 0.7)
    .map(([topicId]) => TOPICS.find((t) => t.id === topicId))
    .filter(Boolean);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700 text-xs sm:text-sm font-bold uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Evaluación Finalizada</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          RESULTADOS DEL EXAMEN
        </h1>
        <TransText
          es="Consulta tu nota escolar sobre 10 y el desglose detallado por áreas de conocimiento."
          hy="Տե՛ս քո դպրոցական գնահատականը (10-բալանոց համակարգով) և ըստ թեմաների մանրամասն արդյունքները։"
          className="text-slate-200 text-base sm:text-lg max-w-xl mx-auto"
          forceOpen={globalTranslate}
        />
      </div>

      {/* Main Score Hero Card */}
      <div className="rounded-3xl bg-[#1C2541] border-2 border-slate-700 p-6 sm:p-10 shadow-xl text-center space-y-6">
        <div className="space-y-3">
          <div className="inline-block">
            <div className="text-6xl sm:text-8xl font-black text-amber-400">
              {score.toFixed(1)}
              <span className="text-2xl sm:text-4xl text-slate-300 font-bold"> / 10</span>
            </div>
          </div>

          <div>
            <div
              className={`inline-block px-5 py-2 rounded-xl text-base sm:text-lg font-black ${gradeBadgeColor}`}
            >
              {gradeTitleEs}
            </div>
            <div className="mt-1 text-sm font-hy text-slate-200 font-semibold">
              {gradeTitleHy}
            </div>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-700">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs sm:text-sm text-slate-300">Preguntas</div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              {result.totalQuestions}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs sm:text-sm text-emerald-300 flex items-center justify-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Aciertos</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
              {result.correctAnswers}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs sm:text-sm text-red-300 flex items-center justify-center gap-1.5 font-bold">
              <XCircle className="w-4 h-4" />
              <span>Fallos</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-red-400 mt-1">
              {incorrectCount}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="text-xs sm:text-sm text-amber-300 flex items-center justify-center gap-1.5 font-bold">
              <Clock className="w-4 h-4" />
              <span>Tiempo</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 mt-1">
              {formatTime(result.timeSpentSeconds)}
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown By Topic */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BarChart className="w-6 h-6 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Rendimiento por temas del examen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(topicStats).map(([topicId, data]) => {
            const topic = TOPICS.find((t) => t.id === topicId);
            if (!topic || data.total === 0) return null;
            const topicPercent = Math.round((data.correct / data.total) * 100);
            const topicScore = ((data.correct / data.total) * 10).toFixed(1);

            return (
              <div
                key={topicId}
                className="p-5 rounded-2xl bg-[#1C2541] border-2 border-slate-700 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <TransText
                      es={topic.titleEs}
                      hy={topic.titleHy}
                      esClassName="font-extrabold text-white text-base"
                      hyClassName="text-sm font-hy"
                      forceOpen={globalTranslate}
                    />
                    <div className="text-sm text-slate-300 mt-1">
                      {data.correct} de {data.total} aciertos ({topicPercent}%)
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1.5 rounded-xl text-sm font-black border shrink-0 ${
                      Number(topicScore) >= 7
                        ? 'bg-emerald-950 text-emerald-200 border-emerald-700'
                        : Number(topicScore) >= 5
                        ? 'bg-amber-950 text-amber-200 border-amber-700'
                        : 'bg-rose-950 text-rose-200 border-rose-700'
                    }`}
                  >
                    {topicScore} / 10
                  </span>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      Number(topicScore) >= 7
                        ? 'bg-emerald-500'
                        : Number(topicScore) >= 5
                        ? 'bg-amber-400'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${topicPercent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personalized Recommendations */}
      {weakTopics.length > 0 && (
        <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border-2 border-amber-500 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-lg">
            <Sparkles className="w-5 h-5" />
            <span>Recomendaciones personalizadas para subir nota</span>
          </div>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
            Te recomendamos repasar especialmente los siguientes temas antes de tu examen de clase:
          </p>

          <div className="flex flex-wrap gap-2.5 pt-1">
            {weakTopics.map((t) => (
              <span
                key={t?.id}
                className="px-4 py-2 rounded-xl bg-slate-800 text-amber-300 border border-slate-700 text-sm font-extrabold"
              >
                {t?.titleEs}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenTheory}
              className="text-sm font-bold text-amber-400 hover:text-amber-300 underline flex items-center gap-1.5 cursor-pointer"
            >
              <span>Abrir manual de teoría para repasar estos conceptos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        {incorrectCount > 0 && (
          <button
            onClick={onReviewErrors}
            className="px-7 py-4 rounded-2xl font-extrabold text-base bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <AlertTriangle className="w-5 h-5" />
            <span>Revisar y repetir errores ({incorrectCount})</span>
          </button>
        )}

        <button
          onClick={onRestartExam}
          className="px-7 py-4 rounded-2xl font-extrabold text-base bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Repetir examen (preguntas barajadas)</span>
        </button>

        <button
          onClick={onOpenTheory}
          className="px-6 py-4 rounded-2xl font-bold text-base bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>Repasar teoría</span>
        </button>

        <button
          onClick={onBackToHome}
          className="px-6 py-4 rounded-2xl font-bold text-base bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Home className="w-5 h-5 text-slate-300" />
          <span>Volver al menú</span>
        </button>
      </div>
    </div>
  );
};
