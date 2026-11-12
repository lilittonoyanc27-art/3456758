import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  Home,
  Check,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  RotateCcw,
} from 'lucide-react';
import { ShuffledQuestion } from './types';
import { TransText } from './TransText';
import { playCorrectSound, playIncorrectSound, playFanfareSound } from './sound';

interface ExamScreenProps {
  questions: ShuffledQuestion[];
  currentIndex: number;
  userAnswers: Record<string, string>; // questionId -> optionId
  confirmedQuestions: Record<string, boolean>; // questionId -> boolean
  onSelectOption: (questionId: string, optionId: string) => void;
  onConfirmAnswer: (questionId: string) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onFinishExam: () => void;
  onExitToMenu: () => void;
  globalTranslate: boolean;
  onToggleGlobalTranslate: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetProgress: () => void;
}

export const ExamScreen: React.FC<ExamScreenProps> = ({
  questions,
  currentIndex,
  userAnswers,
  confirmedQuestions,
  onSelectOption,
  onConfirmAnswer,
  onNextQuestion,
  onPrevQuestion,
  onFinishExam,
  onExitToMenu,
  globalTranslate,
  onToggleGlobalTranslate,
  soundEnabled,
  onToggleSound,
  onResetProgress,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  if (!currentQuestion) {
    return (
      <div className="max-w-xl mx-auto p-8 text-center space-y-4">
        <p className="text-slate-300 text-lg">No hay preguntas disponibles.</p>
        <button
          onClick={onExitToMenu}
          className="px-6 py-3 bg-amber-500 text-slate-950 rounded-xl font-bold text-base cursor-pointer"
        >
          Volver al menú
        </button>
      </div>
    );
  }

  const selectedOptionId = userAnswers[currentQuestion.id];
  const isConfirmed = confirmedQuestions[currentQuestion.id] === true;

  const isCorrect = selectedOptionId === currentQuestion.correctOptionId;
  const selectedOption = currentQuestion.shuffledOptions.find(
    (opt) => opt.id === selectedOptionId
  );
  const correctOption = currentQuestion.shuffledOptions.find(
    (opt) => opt.id === currentQuestion.correctOptionId
  );

  const progressPercentage = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleOptionSelect = (optionId: string) => {
    if (!isConfirmed) {
      onSelectOption(currentQuestion.id, optionId);
    }
  };

  const handleConfirm = () => {
    if (selectedOptionId && !isConfirmed) {
      onConfirmAnswer(currentQuestion.id);
      // Play sound effect
      if (selectedOptionId === currentQuestion.correctOptionId) {
        playCorrectSound();
      } else {
        playIncorrectSound();
      }
    }
  };

  const handleFinish = () => {
    playFanfareSound();
    onFinishExam();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Top Header Bar & Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-sm">
              Pregunta {currentIndex + 1} de {totalQuestions}
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-300 hidden sm:inline font-semibold text-sm">
              {currentQuestion.topicNameEs}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Sound Mute Toggle */}
            <button
              type="button"
              onClick={onToggleSound}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-lg border text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-slate-800 text-slate-200 border-slate-700'
                  : 'bg-rose-950 text-rose-200 border-rose-800'
              }`}
              title={soundEnabled ? 'Silenciar sonidos • Անջատել ձայնը' : 'Activar sonido • Միացնել ձայնը'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Sonido</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-rose-400" />
                  <span className="hidden sm:inline">Sin sonido</span>
                </>
              )}
            </button>

            {/* Reset Button */}
            <button
              type="button"
              onClick={() => setShowConfirmReset(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-red-950 hover:bg-red-900 text-red-200 border border-red-800 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Сброс / Reiniciar todo el progreso"
            >
              <RotateCcw className="w-4 h-4 text-red-400" />
              <span className="hidden sm:inline">Сброс</span>
            </button>

            {/* Menu Button */}
            <button
              type="button"
              onClick={onExitToMenu}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Menú</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Main Question Card (Clean white card, solid borders, no glowing highlights) */}
      <div className="rounded-3xl bg-white text-slate-900 shadow-xl border-2 border-slate-300 overflow-hidden">
        {/* Card Header Strip */}
        <div className="bg-slate-900 px-6 py-3.5 flex items-center justify-between text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300">
              {currentQuestion.topicNameEs}
            </span>
          </div>
          <span className="text-xs font-hy text-slate-300">
            {currentQuestion.topicNameHy}
          </span>
        </div>

        <div className="p-6 sm:p-9 space-y-7">
          {/* Optional Passage / Literary Excerpt */}
          {currentQuestion.passageEs && (
            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Texto para análisis:</span>
              </div>
              <TransText
                es={currentQuestion.passageEs}
                hy={currentQuestion.passageHy}
                className="font-serif italic text-lg sm:text-xl leading-relaxed text-slate-900"
                esClassName="font-serif"
                hyClassName="font-sans not-italic"
                forceOpen={globalTranslate}
              />
            </div>
          )}

          {/* Question Text with Large Readability */}
          <div className="space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Pregunta del examen:
            </div>
            <TransText
              es={currentQuestion.textEs}
              hy={currentQuestion.textHy}
              className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-snug"
              forceOpen={globalTranslate}
            />
          </div>

          {/* 4 Options Grid with Large Clear Buttons and No Highlight Distractions */}
          <div className="space-y-3.5 pt-2">
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Elige una respuesta:
            </div>

            {currentQuestion.shuffledOptions.map((opt) => {
              const isThisSelected = selectedOptionId === opt.id;
              const isThisCorrect = opt.id === currentQuestion.correctOptionId;

              // Clean solid borders, without glowing lights
              let cardClass = 'border-slate-300 bg-white hover:border-slate-400 text-slate-900';
              let buttonClass = 'bg-slate-100 text-slate-800 border-slate-300';

              if (!isConfirmed && isThisSelected) {
                cardClass = 'border-blue-600 bg-blue-50/70 text-slate-950 border-2';
                buttonClass = 'bg-blue-600 text-white border-blue-700 font-black';
              } else if (isConfirmed) {
                if (isThisCorrect) {
                  cardClass = 'border-emerald-600 bg-emerald-50 text-emerald-950 border-2';
                  buttonClass = 'bg-emerald-600 text-white border-emerald-700 font-black';
                } else if (isThisSelected && !isThisCorrect) {
                  cardClass = 'border-red-600 bg-red-50 text-red-950 border-2';
                  buttonClass = 'bg-red-600 text-white border-red-700 font-black';
                } else {
                  cardClass = 'border-slate-200 bg-slate-50 opacity-60 text-slate-600';
                  buttonClass = 'bg-slate-200 text-slate-500 border-slate-300';
                }
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => handleOptionSelect(opt.id)}
                  className={`rounded-2xl border-2 p-4 sm:p-5 transition-colors flex items-start gap-4 ${cardClass} ${
                    !isConfirmed ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  {/* Left dedicated selection button with letter */}
                  <button
                    type="button"
                    disabled={isConfirmed}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionSelect(opt.id);
                    }}
                    className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center font-extrabold text-base sm:text-lg shrink-0 transition-transform ${
                      !isConfirmed ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
                    } ${buttonClass}`}
                    title={`Seleccionar opción ${opt.letter}`}
                  >
                    {isConfirmed && isThisCorrect ? (
                      <Check className="w-6 h-6 stroke-[3]" />
                    ) : (
                      opt.letter
                    )}
                  </button>

                  {/* Option Text with Click-to-Translate (click here reveals Armenian translation) */}
                  <div className="flex-1 select-text">
                    <TransText
                      es={opt.textEs}
                      hy={opt.textHy}
                      className="text-base sm:text-xl font-semibold leading-relaxed"
                      forceOpen={globalTranslate}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Confirm Button */}
          {!isConfirmed && (
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!selectedOptionId}
                className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base sm:text-lg transition-all shadow-md flex items-center justify-center gap-2 ${
                  selectedOptionId
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Comprobar respuesta</span>
                <Check className="w-5 h-5 stroke-[3]" />
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* VERIFICATION AND EXPLANATION SECTION                      */}
          {/* ======================================================== */}
          {isConfirmed && (
            <div className="pt-6 space-y-6 border-t-2 border-slate-200">
              {/* Correct / Incorrect Header */}
              {isCorrect ? (
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-100 border-2 border-emerald-500 flex items-center gap-4 text-emerald-950">
                  <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-950">
                      ¡Correcto!
                    </div>
                    <div className="text-sm font-hy text-emerald-900 font-semibold mt-0.5">
                      🇦🇲 Ճիշտ պատասխան է։
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 sm:p-5 rounded-2xl bg-red-100 border-2 border-red-500 flex items-center gap-4 text-red-950">
                  <div className="w-11 h-11 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                    <XCircle className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-red-950">
                      ¡Incorrecto!
                    </div>
                    <div className="text-sm font-hy text-red-900 font-semibold mt-0.5">
                      🇦🇲 Սխալ է։ Կարդա՛ բացատրությունը նյութը լավ յուրացնելու համար։
                    </div>
                  </div>
                </div>
              )}

              {/* Answers Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Tu respuesta */}
                <div
                  className={`p-4 rounded-xl border-2 ${
                    isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-red-50 border-red-300 text-red-950'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                    <span>1. Tu respuesta:</span>
                    <span className="font-extrabold text-sm">
                      Opción {selectedOption?.letter}
                    </span>
                  </div>
                  {selectedOption ? (
                    <TransText
                      es={selectedOption.textEs}
                      hy={selectedOption.textHy}
                      className="font-medium text-base sm:text-lg"
                      forceOpen={globalTranslate}
                    />
                  ) : (
                    <span className="italic text-slate-500">Sin responder</span>
                  )}
                </div>

                {/* 2. Respuesta correcta */}
                <div className="p-4 rounded-xl border-2 bg-emerald-50 border-emerald-300 text-emerald-950">
                  <div className="text-xs font-bold uppercase tracking-wider mb-1 text-emerald-900 flex items-center justify-between">
                    <span>2. Respuesta correcta:</span>
                    <span className="font-extrabold text-sm">
                      Opción {correctOption?.letter}
                    </span>
                  </div>
                  {correctOption && (
                    <TransText
                      es={correctOption.textEs}
                      hy={correctOption.textHy}
                      className="font-bold text-base sm:text-lg"
                      forceOpen={globalTranslate}
                    />
                  )}
                </div>
              </div>

              {/* 3. Explicación */}
              <div className="p-5 rounded-2xl bg-indigo-50 border-2 border-indigo-200 text-indigo-950 space-y-2">
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-700" />
                  <span>3. Explicación:</span>
                </div>
                <TransText
                  es={currentQuestion.explanationEs}
                  hy={currentQuestion.explanationHy}
                  className="text-base sm:text-lg leading-relaxed text-slate-900"
                  forceOpen={globalTranslate}
                />
              </div>

              {/* 4. ¿Por qué? */}
              <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-950 space-y-2">
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  <span>4. ¿Por qué es esta la opción correcta?</span>
                </div>
                <TransText
                  es={currentQuestion.whyEs}
                  hy={currentQuestion.whyHy}
                  className="text-base sm:text-lg leading-relaxed text-slate-900"
                  forceOpen={globalTranslate}
                />
              </div>

              {/* 5. Ejemplo o Desglose */}
              {currentQuestion.exampleEs && (
                <div className="p-5 rounded-2xl bg-slate-100 border-2 border-slate-300 text-slate-900 space-y-2">
                  <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>5. Ejemplo y cómputo métrico / literario:</span>
                  </div>
                  <TransText
                    es={currentQuestion.exampleEs}
                    hy={currentQuestion.exampleHy}
                    className="text-base sm:text-lg font-mono whitespace-pre-line leading-relaxed bg-white p-4 rounded-xl border border-slate-300"
                    forceOpen={globalTranslate}
                  />
                </div>
              )}

              {/* Advance Button: Entendido, siguiente pregunta */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onPrevQuestion}
                  disabled={currentIndex === 0}
                  className={`w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-sm sm:text-base border-2 flex items-center justify-center gap-2 transition-colors ${
                    currentIndex === 0
                      ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
                      : 'border-slate-300 hover:bg-slate-100 text-slate-800 cursor-pointer'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Pregunta anterior</span>
                </button>

                {isLastQuestion ? (
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="w-full sm:w-auto px-9 py-4 rounded-2xl font-extrabold text-base sm:text-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Ver resultados finales</span>
                    <ArrowRight className="w-5 h-5 stroke-[3]" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onNextQuestion}
                    className="w-full sm:w-auto px-9 py-4 rounded-2xl font-extrabold text-base sm:text-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Entendido, siguiente pregunta</span>
                    <ArrowRight className="w-5 h-5 stroke-[3]" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom status */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-300 px-2">
        <div>
          Respondidas: {Object.keys(confirmedQuestions).length} de {totalQuestions}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSound}
            className="hover:text-white underline font-semibold cursor-pointer flex items-center gap-1"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Silenciar sonidos</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                <span>Activar sonidos</span>
              </>
            )}
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={onToggleGlobalTranslate}
            className="hover:text-white underline font-semibold cursor-pointer"
          >
            {globalTranslate ? 'Ocultar todas las traducciones' : 'Mostrar todas las traducciones'}
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setShowConfirmReset(true)}
            className="hover:text-red-300 text-red-400 font-bold underline cursor-pointer"
          >
            Сброс прогресса
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#1C2541] border-2 border-red-600 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-black text-white">
                ¿Reiniciar todo el progreso? (Сброс)
              </h3>
              <p className="text-sm text-slate-200">
                Se borrarán todas las respuestas guardadas, estadísticas, historial de notas y la lista de errores guardados.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 font-hy text-sm leading-relaxed text-left">
                🇦🇲 <strong>Վերակայե՞լ ամբողջ առաջընթացը։</strong><br />
                Կջնջվեն բոլոր պահպանված պատասխանները, վիճակագրությունը, գնահատականների պատմությունը և սխալների ցանկը։
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmReset(false);
                  onResetProgress();
                }}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-black bg-red-600 hover:bg-red-500 text-white transition-colors cursor-pointer"
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
