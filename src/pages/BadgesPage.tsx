import React, { useEffect } from 'react';
import { Trophy, Star, Sparkles, Compass, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, Badge } from '../types';
import { storageService } from '../services/storageService';
import { PageBackButton } from '../components/PageBackButton';

interface BadgesPageProps {
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
}

export const BadgesPage: React.FC<BadgesPageProps> = ({ userProfile, onNavigate }) => {
  const lang = userProfile.currentLanguage || 'en';
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  const badges = storageService.getBadges();
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  useEffect(() => {
    if (unlockedCount > 0) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.5 },
        });
      } catch {
        // Optional
      }
    }
  }, [unlockedCount]);

  const getBadgeIcon = (iconName: string, isUnlocked: boolean) => {
    const className = `w-8 h-8 ${isUnlocked ? 'text-amber-500' : 'text-slate-400'}`;
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      case 'Star':
        return <Star className={className} />;
      case 'Trophy':
      default:
        return <Trophy className={className} />;
    }
  };

  return (
    <div className="py-6 space-y-6 max-w-5xl mx-auto px-4">
      {/* Top Back Navigation Bar */}
      <PageBackButton
        onNavigate={onNavigate}
        fallbackPath="/dashboard"
        label={isMr ? 'डॅशबोर्डकडे परत' : isHi ? 'डैशबोर्ड पर वापस' : 'Back to Dashboard'}
        currentLang={lang}
        breadcrumbs={[
          { label: isMr ? 'माझे बॅजेस आणि पुरस्कार' : isHi ? 'बैज और पुरस्कार' : 'Badges & Achievements' },
        ]}
      />

      {/* Header */}
      <div className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>{isMr ? 'प्राविण्य आणि गौरव' : isHi ? 'उपलब्धियां' : 'Achievements & Gamification'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3F207C]">
              {isMr ? 'माझे बॅजेस आणि पुरस्कार' : isHi ? 'मेरे बैज और पुरस्कार' : 'Badges & Milestone Honors'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {isMr
                ? 'प्रत्येक धडा, अचूक चाचणी आणि नियमित उजळणी पूर्ण करून नवीन बॅजेस अनलॉक करा.'
                : isHi
                ? 'प्रत्येक पाठ, सटीक क्विज और नियमित पुनरावलोकन से नए बैज अनलॉक करें।'
                : 'Earn achievements as you complete topics, achieve high accuracy in post-tests, and maintain spaced revision cycles.'}
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center shrink-0">
            <div className="text-2xl font-black text-amber-900">{unlockedCount} / {badges.length}</div>
            <div className="text-xs font-bold text-amber-800">
              {isMr ? 'अनलॉक केलेले' : isHi ? 'अनलॉक हुए' : 'Unlocked Badges'}
            </div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
              badge.unlocked
                ? 'bg-gradient-to-br from-amber-50/60 via-white to-amber-50/20 border-amber-300 shadow-md hover:shadow-lg'
                : 'bg-white border-slate-200 opacity-75'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 shadow-sm ${
                  badge.unlocked ? 'bg-amber-100 border-2 border-amber-300' : 'bg-slate-100'
                }`}
              >
                {getBadgeIcon(badge.icon, badge.unlocked)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-bold text-slate-900">{badge.title}</h3>
                  {badge.unlocked ? (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> In Progress
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>

            {/* Progress bar or unlock timestamp */}
            <div className="pt-2">
              {badge.unlocked ? (
                <div className="text-[11px] text-amber-800 font-semibold flex items-center gap-1">
                  <span>🎉 Achieved on {badge.unlockedAt ? new Date(badge.unlockedAt).toLocaleDateString() : 'Active Session'}</span>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-1">
                    <span>Progress</span>
                    <span>{badge.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#6C3BEF] h-full rounded-full transition-all duration-300"
                      style={{ width: `${badge.progress || 0}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA to Chapter */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50 rounded-3xl border border-purple-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-[#3F207C]">Want to unlock all 4 honors?</h4>
          <p className="text-xs text-slate-600 mt-0.5">
            Complete the 4 topics in Laws of Motion and master your spaced revision quizzes.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/chapters/laws-of-motion')}
          className="px-6 py-2.5 bg-[#6C3BEF] hover:bg-[#582dc9] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-1.5 shrink-0"
        >
          <span>Continue Learning</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
