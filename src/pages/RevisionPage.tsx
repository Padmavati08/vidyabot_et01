import React, { useState } from 'react';
import { Award, Clock, Sparkles, BookOpen, CheckCircle2, AlertCircle, Play, FileText, ChevronRight } from 'lucide-react';
import { UserProfile, RevisionSchedule } from '../types';
import { storageService } from '../services/storageService';
import { MiniQuizModal } from '../components/MiniQuizModal';
import { PageBackButton } from '../components/PageBackButton';

interface RevisionPageProps {
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
}

export const RevisionPage: React.FC<RevisionPageProps> = ({ userProfile, onNavigate }) => {
  const lang = userProfile.currentLanguage || 'en';
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  const [schedules, setSchedules] = useState<RevisionSchedule[]>(storageService.getRevisionSchedules());
  const [activeMiniQuiz, setActiveMiniQuiz] = useState<{
    topicId: string;
    level: number;
    dayLabel: string;
  } | null>(null);

  const refreshSchedules = () => {
    setSchedules(storageService.getRevisionSchedules());
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
          { label: isMr ? 'उजळणी आणि स्मरण हब' : isHi ? 'पुनरावलोकन केंद्र' : 'Spaced Revision Hub' },
        ]}
      />

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#6C3BEF] uppercase tracking-wider mb-2">
              <Clock className="w-4 h-4" />
              <span>{isMr ? 'दीर्घकालीन स्मरण प्रणाली' : isHi ? 'दीर्घकालिक स्मृति प्रणाली' : 'Spaced Repetition & Retention'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3F207C]">
              {isMr ? 'उजळणी आणि स्मरण हब (Revision Hub)' : isHi ? 'पुनरावलोकन केंद्र (Revision Hub)' : 'Spaced Revision Hub'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {isMr
                ? 'वैज्ञानिकदृष्ट्या सिद्ध स्मरण चक्र: दिवस १ (मूल्यांकन) → दिवस ३ (सक्रिय आठवण) → दिवस ७ (अंतिम प्राविण्य) सह विसरणे पूर्णपणे थांबवा.'
                : isHi
                ? 'वैज्ञानिक स्मृति चक्र: दिन 1 (मूल्यांकन) → दिन 3 (सक्रिय स्मरण) → दिन 7 (अंतिम महारत) द्वारा 100% याददाश्त सुनिश्चित करें।'
                : 'Scientifically proven 3-tier spaced retention cycle to ensure concepts, formulas, and definitions stay locked in your memory for exams.'}
            </p>
          </div>

          {/* Retention stats */}
          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-center gap-3 shrink-0">
            <Award className="w-8 h-8 text-[#6C3BEF]" />
            <div>
              <div className="text-xs font-bold text-[#3F207C]">3-Stage Spaced Loop</div>
              <div className="text-[11px] text-slate-500 font-medium">Day 1 • Day 3 • Day 7</div>
            </div>
          </div>
        </div>
      </div>

      {/* Revision Schedules List */}
      {schedules.length > 0 ? (
        <div className="space-y-6">
          {schedules.map((schedule) => (
            <div
              key={schedule.topicId}
              className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-xs hover:border-purple-300 transition-all space-y-6"
            >
              {/* Topic Header & 3-Step Timeline */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6C3BEF]">
                    Laws of Motion
                  </span>
                  <h3 className="text-xl font-bold text-[#3F207C] mt-0.5">
                    {schedule.topicTitle}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1">
                    First Completed: {schedule.postTestCompletedAt}
                  </div>
                </div>

                {/* 3 Step Cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {schedule.levels.map((lvl) => {
                    const isDone = lvl.status === 'completed';
                    const isDue = lvl.status === 'due';
                    return (
                      <div
                        key={lvl.level}
                        className={`p-3 rounded-2xl border text-center transition-all flex flex-col justify-between ${
                          isDone
                            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                            : isDue
                            ? 'bg-amber-50/90 border-amber-300 text-amber-900 ring-2 ring-amber-400/50'
                            : 'bg-slate-50 border-slate-200 text-slate-500'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-black">{lvl.dayLabel.split(' ')[0]}</div>
                          <div className="text-[10px] font-semibold mt-0.5">
                            {isDone ? '✓ Completed' : isDue ? '⚡ Due Today' : 'Upcoming'}
                          </div>
                        </div>

                        {/* CTA for due or review */}
                        <div className="mt-2">
                          {isDue ? (
                            <button
                              onClick={() =>
                                setActiveMiniQuiz({
                                  topicId: schedule.topicId,
                                  level: lvl.level,
                                  dayLabel: lvl.dayLabel,
                                })
                              }
                              className="w-full py-1 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold rounded-lg shadow-xs cursor-pointer"
                            >
                              Start Quiz
                            </button>
                          ) : isDone ? (
                            <span className="text-[10px] text-emerald-700 font-bold">
                              Score: {lvl.miniQuizScore ?? 3}/3
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-400">{lvl.targetDate}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Compact Revision Notes Box */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#3F207C] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#6C3BEF]" />
                  <span>{isMr ? 'जलद उजळणी सारांश नोट्स' : isHi ? 'त्वरित पुनरावलोकन नोट्स' : 'Compact Revision Notes & Formula Sheet'}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Box 1: Key Definitions */}
                  <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-2">
                    <div className="text-xs font-bold text-[#3F207C]">
                      📌 {isMr ? 'महत्त्वाच्या व्याख्या' : isHi ? 'मुख्य परिभाषाएं' : 'Key Definitions'}
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
                      {schedule.compactNotes.definitions.map((d, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#6C3BEF] mt-1.5 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Box 2: Formulae & Conversions */}
                  <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-2">
                    <div className="text-xs font-bold text-indigo-900">
                      📐 {isMr ? 'सूत्रे व एकके' : isHi ? 'सूत्र और मात्रक' : 'Formulae & SI Units'}
                    </div>
                    <ul className="space-y-1.5 text-xs text-indigo-950 font-mono font-medium leading-relaxed">
                      {schedule.compactNotes.formulae.map((f, i) => (
                        <li key={i} className="bg-white/80 px-2.5 py-1 rounded-lg border border-indigo-200">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Box 3: My Common Errors to Avoid */}
                  <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200 md:col-span-2 space-y-2">
                    <div className="text-xs font-bold text-amber-900">
                      ⚠️ {isMr ? 'माझ्या टाळायच्या सामान्य चुका' : isHi ? 'बचने योग्य सामान्य गलतियां' : 'My Common Errors To Watch Out For'}
                    </div>
                    <ul className="space-y-1 text-xs text-amber-900 leading-relaxed">
                      {schedule.compactNotes.myCommonErrors.map((err, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>{err}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-purple-100 p-12 text-center shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-purple-100 text-[#6C3BEF] flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {isMr ? 'कोणतेही उजळणी वेळापत्रक सक्रिय नाही' : isHi ? 'कोई पुनरावलोकन चक्र सक्रिय नहीं है' : 'No Active Revision Schedules Yet'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
              {isMr
                ? 'कोणत्याही विषयाची मूल्यांकन चाचणी (Post-Test) पूर्ण करा आणि तुमचे दिवस १, ३, ७ चे उजळणी चक्र आपोआप सुरू होईल.'
                : isHi
                ? 'किसी भी विषय का मूल्यांकन पूरा करें और आपका दिन 1, 3, 7 का रिवीजन चक्र अपने आप सक्रिय हो जाएगा।'
                : 'Complete a post-test for any topic in Laws of Motion to automatically activate spaced retention schedules!'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('/chapters/laws-of-motion')}
            className="px-6 py-2.5 bg-[#6C3BEF] hover:bg-[#582dc9] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all"
          >
            {isMr ? 'धड्याकडे जा' : isHi ? 'पाठ पर जाएं' : 'Go to Laws of Motion'}
          </button>
        </div>
      )}

      {/* Mini Quiz Modal */}
      {activeMiniQuiz && (
        <MiniQuizModal
          topicId={activeMiniQuiz.topicId}
          level={activeMiniQuiz.level}
          dayLabel={activeMiniQuiz.dayLabel}
          language={lang}
          onClose={() => {
            setActiveMiniQuiz(null);
            refreshSchedules();
          }}
          onCompleted={() => {
            refreshSchedules();
          }}
        />
      )}
    </div>
  );
};
