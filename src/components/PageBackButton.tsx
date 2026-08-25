import React from 'react';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';
import { LanguageCode } from '../types';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageBackButtonProps {
  onNavigate: (path: string) => void;
  fallbackPath?: string;
  label?: string;
  currentLang?: LanguageCode;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

export const PageBackButton: React.FC<PageBackButtonProps> = ({
  onNavigate,
  fallbackPath = '/dashboard',
  label,
  currentLang = 'en',
  breadcrumbs,
  className = '',
}) => {
  const isMr = currentLang === 'mr';
  const isHi = currentLang === 'hi';

  const defaultLabel = isMr ? 'मागे जा' : isHi ? 'वापस जाएं' : 'Back';
  const displayLabel = label || defaultLabel;

  const handleBack = () => {
    if (fallbackPath) {
      onNavigate(fallbackPath);
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      onNavigate('/dashboard');
    }
  };

  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 mb-4 ${className}`}>
      {/* Back button button */}
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-[#6C3BEF] border border-slate-200 hover:border-purple-200 font-bold text-xs shadow-2xs transition-all cursor-pointer group select-none active:scale-95"
        title="Go to previous page"
        aria-label="Back button"
      >
        <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-[#6C3BEF] group-hover:-translate-x-0.5 transition-transform" />
        <span>{displayLabel}</span>
      </button>

      {/* Optional Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto py-1 no-scrollbar">
          <button
            onClick={() => onNavigate('/dashboard')}
            className="hover:text-[#6C3BEF] transition-colors flex items-center gap-1 cursor-pointer font-medium"
            title="Home / Dashboard"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                {crumb.path && !isLast ? (
                  <button
                    onClick={() => onNavigate(crumb.path!)}
                    className="hover:text-[#6C3BEF] transition-colors cursor-pointer font-medium truncate max-w-[140px] sm:max-w-[200px]"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span className={`truncate max-w-[160px] sm:max-w-[240px] ${isLast ? 'font-bold text-slate-800' : 'font-medium'}`}>
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      )}
    </div>
  );
};
