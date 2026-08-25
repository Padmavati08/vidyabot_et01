import React from 'react';
import { BookOpen, ChevronRight, X, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface DemoScopeBannerProps {
  userProfile: UserProfile | null;
  onNavigate?: (path: string) => void;
}

export const DemoScopeBanner: React.FC<DemoScopeBannerProps> = ({ userProfile, onNavigate }) => {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed || !userProfile) return null;

  return (
    <div className="bg-gradient-to-r from-[#3F207C] via-[#52299E] to-[#6C3BEF] text-white px-5 py-3.5 rounded-2xl shadow-md mb-6 relative overflow-hidden">
      <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-28 h-28 bg-white/5 rounded-full pointer-events-none blur-xl" />
      <div className="flex items-start sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 bg-white/10 rounded-xl shrink-0 mt-0.5 sm:mt-0">
            <Sparkles className="w-4 h-4 text-purple-200" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm tracking-wide">
                Class {userProfile.classLevel} Curriculum • {userProfile.board}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-400/20 text-emerald-200 rounded-md border border-emerald-400/30">
                Interactive Modules Active
              </span>
            </div>
            <p className="text-xs text-purple-100/90 mt-0.5">
              Access complete syllabus units across Science, Mathematics, Social Sciences, and Languages. Full interactive diagnostics and physics simulations are live for Science & Tech.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {onNavigate && (
            <button
              onClick={() => onNavigate('/subjects')}
              className="hidden md:flex items-center gap-1 px-3 py-1 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              <span>View Subjects</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-white/10 rounded-lg text-purple-200 hover:text-white transition-colors cursor-pointer"
            title="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
