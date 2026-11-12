import React, { useState, useEffect } from 'react';
import { Languages, ChevronDown, ChevronUp } from 'lucide-react';

interface TransTextProps {
  es: string;
  hy?: string;
  className?: string;
  esClassName?: string;
  hyClassName?: string;
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4';
  showBadge?: boolean;
  defaultOpen?: boolean;
  forceOpen?: boolean;
}

export const TransText: React.FC<TransTextProps> = ({
  es,
  hy,
  className = '',
  esClassName = '',
  hyClassName = '',
  as: Component = 'div',
  showBadge = true,
  defaultOpen = false,
  forceOpen,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen || Boolean(forceOpen));

  // Synchronize when parent toggles global translate mode
  useEffect(() => {
    if (forceOpen !== undefined) {
      setIsOpen(forceOpen);
    }
  }, [forceOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    // Stop propagation so clicking text/badge doesn't trigger parent clicks (like selecting option)
    e.stopPropagation();
    e.preventDefault();
    if (hy) {
      setIsOpen((prev) => !prev);
    }
  };

  if (!hy) {
    return (
      <Component className={className}>
        <span className={esClassName}>{es}</span>
      </Component>
    );
  }

  return (
    <Component className={`relative select-text ${className}`}>
      {/* Spanish text row with direct toggle click */}
      <div
        onClick={handleToggle}
        className="flex items-start justify-between gap-3 cursor-pointer"
        title="Haz clic para ver u ocultar la traducción al armenio • Սեղմեք՝ հայերեն թարգմանությունը տեսնելու համար"
      >
        <span className={`flex-1 ${esClassName}`}>
          {es}
        </span>

        {showBadge && (
          <button
            type="button"
            onClick={handleToggle}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 cursor-pointer transition-colors border ${
              isOpen
                ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
          >
            <Languages className="w-3.5 h-3.5" />
            <span className="font-hy text-xs">
              {isOpen ? 'Փակել' : '🇦🇲 Թարգմանել'}
            </span>
            {isOpen ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
        )}
      </div>

      {/* Armenian translation block shown directly below */}
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`mt-2.5 p-3.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-200 font-hy text-base sm:text-lg leading-relaxed shadow-md animate-in fade-in duration-150 ${hyClassName}`}
        >
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-400 mb-1 font-bold">
            <span>🇦🇲 Հայերեն թարգմանություն:</span>
          </div>
          <div className="text-slate-100 font-medium">
            {hy}
          </div>
        </div>
      )}
    </Component>
  );
};
