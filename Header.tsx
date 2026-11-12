import React, { useState } from 'react';
import {
  BookOpen,
  RotateCcw,
  Home,
  GraduationCap,
  AlertTriangle,
  Clock,
  Languages,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface HeaderProps {
  currentScreen: 'home' | 'exam' | 'results' | 'theory';
  onNavigateHome: () => void;
  onNavigateTheory: () => void;
  onResetProgress: () => void;
  mistakesCount: number;
  onNavigateErrors?: () => void;
  timerSeconds?: number;
  showTimer?: boolean;
  globalTranslateOpen: boolean;
  onToggleGlobalTranslate: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigateHome,
  onNavigateTheory,
  onResetProgress,
  mistakesCount,
  onNavigateErrors,
  timerSeconds,
  showTimer,
  globalTranslateOpen,
  onToggleGlobalTranslate,
  soundEnabled,
  onToggleSound,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleConfirmReset = () => {
    onResetProgress();
    setShowConfirmReset(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0B132B] border-b-2 border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          {/* Logo & Title */}
          <div
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base sm:text-lg tracking-tight text-white">
                  El Gran Examen
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-bold rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                  7.º Curso
                </span>
              </div>
              <div className="text-xs text-slate-400 hidden sm:block">
                Lengua Castellana y Literatura • <span className="font-hy text-slate-300">Իսպաներեն և Գրականություն</span>
              </div>
            </div>
          </div>

          {/* Action controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Optional Timer */}
            {showTimer && timerSeconds !== undefined && currentScreen === 'exam' && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 text-xs sm:text-sm font-mono font-bold">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{formatTime(timerSeconds)}</span>
              </div>
            )}

            {/* MUTE / UNMUTE SOUND BUTTON */}
            <button
              type="button"
              onClick={onToggleSound}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors border cursor-pointer ${
                soundEnabled
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
                  : 'bg-rose-950 hover:bg-rose-900 text-rose-200 border-rose-800'
              }`}
              title={soundEnabled ? 'Silenciar sonidos • Անջատել ձայնը' : 'Activar sonido • Միացնել ձայնը'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span className="hidden md:inline">Sonido: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-rose-400" />
                  <span className="hidden md:inline">Sin sonido</span>
                </>
              )}
            </button>

            {/* Global translation toggle */}
            <button
              type="button"
              onClick={onToggleGlobalTranslate}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors border cursor-pointer ${
                globalTranslateOpen
                  ? 'bg-amber-500 text-slate-950 border-amber-600'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="Mostrar u ocultar todas las traducciones al armenio"
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">
                {globalTranslateOpen ? 'Ocultar armenio' : 'Traducir todo'}
              </span>
              <span className="sm:hidden font-hy text-xs">🇦🇲 ՀԱՅ</span>
            </button>

            {/* Theory link */}
            <button
              type="button"
              onClick={onNavigateTheory}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors border cursor-pointer ${
                currentScreen === 'theory'
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">Teoría</span>
            </button>

            {/* Mistakes count button (if any) */}
            {mistakesCount > 0 && onNavigateErrors && (
              <button
                type="button"
                onClick={onNavigateErrors}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800 transition-colors cursor-pointer"
                title="Practicar mis errores"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>{mistakesCount}</span>
                <span className="hidden lg:inline">errores</span>
              </button>
            )}

            {/* Home button (if not already home) */}
            {currentScreen !== 'home' && (
              <button
                type="button"
                onClick={onNavigateHome}
                className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Volver al menú principal"
              >
                <Home className="w-4 h-4 text-slate-300" />
                <span className="hidden md:inline">Inicio</span>
              </button>
            )}

            {/* Global reset button ("Сброс") */}
            <button
              type="button"
              onClick={() => setShowConfirmReset(true)}
              className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-red-950 hover:bg-red-900 text-red-200 border border-red-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Сброс / Reiniciar todo el progreso"
            >
              <RotateCcw className="w-4 h-4 text-red-400" />
              <span className="font-extrabold">Сброс</span>
            </button>
          </div>
        </div>
      </header>

      {/* Global Reset Confirmation Modal */}
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
                onClick={handleConfirmReset}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-black bg-red-600 hover:bg-red-500 text-white transition-colors cursor-pointer"
              >
                Sí, reiniciar todo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
