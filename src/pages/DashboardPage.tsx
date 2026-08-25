import React from 'react';
import { Sparkles, BookOpen, Flame, Award, AlertCircle, ArrowRight, Play, CheckCircle2, Clock, Upload, Trophy, ChevronRight, Atom, Calculator, Globe, BookMarked, Languages } from 'lucide-react';
import { UserProfile, TopicStatus } from '../types';
import { LAWS_OF_MOTION_CHAPTER } from '../data/lawsOfMotionData';
import { CLASS_9_CURRICULUM } from '../data/curriculumData';
import { storageService } from '../services/storageService';
import { DemoScopeBanner } from '../components/DemoScopeBanner';

interface DashboardPageProps {
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ userProfile, onNavigate }) => {
  const stats = storageService.getOverallStats();
  const topicStatuses = storageService.getTopicStatuses();
  const revisionSchedules = storageService.getRevisionSchedules();
  const errorBookItems = storageService.getErrorBookItems();
  const badges = storageService.getBadges();
  const unlockedBadges = badges.filter((b) => b.unlocked);

  const lang = userProfile.currentLanguage || 'en';
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  // Greeting based on time of day
  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? isMr
        ? 'शुभ प्रभात'
        : isHi
        ? 'शुभ प्रभात'
        : 'Good morning'
      : hour < 17
      ? isMr
        ? 'शुभ दुपार'
        : isHi
        ? 'शुभ दोपहर'
        : 'Good afternoon'
      : isMr
      ? 'शुभ संध्या'
      : isHi
      ? 'शुभ संध्या'
      : 'Good evening';

  return (
    <div className="py-6 space-y-8">
      {/* Demo Scope Banner */}
      <DemoScopeBanner userProfile={userProfile} onNavigate={onNavigate} />

      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-[#3F207C] via-[#52299E] to-[#6C3BEF] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-white/5 rounded-full pointer-events-none blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{userProfile.board} • Class {userProfile.classLevel}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {greeting}, {userProfile.name}! 👋
            </h1>

            <p className="text-xs sm:text-sm text-purple-100/90 max-w-xl">
              {isMr
                ? 'आज आपण विज्ञान व तंत्रज्ञान आणि इतर विषयांचा अभ्यास पुढे नेऊया. आपल्या त्रुटी वहीत सुधारणा करा आणि नवीन बॅज मिळवा!'
                : isHi
                ? 'आज हम विज्ञान एवं प्रौद्योगिकी और अन्य विषयों का अध्ययन आगे बढ़ाएंगे। त्रुटि डायरी से सीखें और अपनी स्ट्रीक बनाए रखें!'
                : 'Welcome back to your personalized curriculum dashboard. Explore all syllabus subjects, master interactive science units, and turn mistakes into mastery.'}
            </p>
          </div>

          {/* Quick CTA to continue chapter */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
            <button
              id="dash-resume-chapter-btn"
              onClick={() => onNavigate('/chapters/laws-of-motion')}
              className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-purple-50 text-[#3F207C] font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 text-[#6C3BEF] fill-[#6C3BEF]" />
              <span>{isMr ? 'विज्ञान: गतीचे नियम' : isHi ? 'विज्ञान: गति के नियम' : 'Continue Science: Laws of Motion'}</span>
            </button>
            <button
              onClick={() => onNavigate('/subjects')}
              className="w-full sm:w-auto px-4 py-3.5 bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm rounded-2xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>{isMr ? 'सर्व विषय' : isHi ? 'सभी विषय' : 'All Subjects'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Topics Completed */}
        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#6C3BEF] flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#3F207C]">
              {stats.completedTopics}/{stats.totalTopics}
            </div>
            <div className="text-xs text-slate-500 font-semibold">
              {isMr ? 'विषय पूर्ण' : isHi ? 'विषय पूर्ण' : 'Topics Done'}
            </div>
          </div>
        </div>

        {/* Metric 2: Quiz Accuracy */}
        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-800">
              {stats.quizAccuracy}%
            </div>
            <div className="text-xs text-slate-500 font-semibold">
              {isMr ? 'चाचणी अचूकता' : isHi ? 'क्विज सटीकता' : 'Quiz Accuracy'}
            </div>
          </div>
        </div>

        {/* Metric 3: Error Book Count */}
        <button
          onClick={() => onNavigate('/error-book')}
          className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs flex items-center gap-4 text-left hover:border-amber-300 transition-colors cursor-pointer"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-amber-800">
              {stats.unresolvedErrors}
            </div>
            <div className="text-xs text-slate-500 font-semibold">
              {isMr ? 'त्रुटी वही (सुधारणा)' : isHi ? 'त्रुटि डायरी' : 'Errors to Review'}
            </div>
          </div>
        </button>

        {/* Metric 4: Streak */}
        <div className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6 fill-rose-500 text-rose-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-rose-700">
              {userProfile.streakDays || 3} Days
            </div>
            <div className="text-xs text-slate-500 font-semibold">
              {isMr ? 'सातत्य' : isHi ? 'अध्ययन स्ट्रीक' : 'Study Streak'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Main Chapter Card & Topics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6C3BEF]">
                    Science & Technology • Chapter 1
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Interactive Physics Module
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-[#3F207C] mt-0.5">
                  {LAWS_OF_MOTION_CHAPTER.title[lang] || LAWS_OF_MOTION_CHAPTER.title.en}
                </h2>
              </div>

              <div className="text-right">
                <span className="text-sm font-bold text-[#6C3BEF]">
                  {stats.completionPercentage}% Complete
                </span>
                <div className="w-28 bg-slate-100 h-2 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-[#6C3BEF] h-full rounded-full transition-all duration-500"
                    style={{ width: `${stats.completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              {LAWS_OF_MOTION_CHAPTER.description[lang] || LAWS_OF_MOTION_CHAPTER.description.en}
            </p>

            {/* 4 Topic Cards List */}
            <div className="space-y-3">
              {LAWS_OF_MOTION_CHAPTER.topics.map((topic, index) => {
                const status = topicStatuses[topic.id] || 'not_started';
                const isCompleted = status === 'completed';
                const isInProgress = status === 'in_progress';

                return (
                  <div
                    key={topic.id}
                    className="p-4 rounded-2xl border border-purple-50 bg-slate-50/70 hover:bg-purple-50/50 hover:border-purple-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : isInProgress
                            ? 'bg-[#6C3BEF] text-white'
                            : 'bg-purple-100 text-[#6C3BEF]'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">
                          {topic.title[lang] || topic.title.en}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                          <span>{topic.estimatedMinutes} mins</span>
                          <span>•</span>
                          <span className="capitalize text-slate-600">
                            {isCompleted
                              ? isMr
                                ? 'पूर्ण झाले'
                                : isHi
                                ? 'पूर्ण'
                                : 'Completed'
                              : isInProgress
                              ? isMr
                                ? 'सुरू आहे'
                                : isHi
                                ? 'प्रगति पर'
                                : 'In Progress'
                              : isMr
                              ? 'सुरू करा'
                              : isHi
                              ? 'शुरू करें'
                              : 'Not Started'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => onNavigate(`/pre-test/${topic.id}`)}
                        className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-[#3F207C] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        {isMr ? 'निदान चाचणी' : isHi ? 'निदान टेस्ट' : 'Pre-Test'}
                      </button>
                      <button
                        onClick={() => onNavigate(`/lesson/${topic.id}`)}
                        className="px-3.5 py-1.5 bg-[#6C3BEF] hover:bg-[#582dc9] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>{isMr ? 'धडा शिका' : isHi ? 'पाठ सीखें' : 'Learn'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Secondary Curriculum Subjects Exploration Grid */}
          <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {userProfile.board} • Standard {userProfile.classLevel}
                </span>
                <h3 className="text-lg font-bold text-[#3F207C]">
                  {isMr ? 'सर्व अभ्यासक्रम विषय' : isHi ? 'संपूर्ण पाठ्यक्रम विषय' : 'All Curriculum Subjects'}
                </h3>
              </div>
              <button
                onClick={() => onNavigate('/subjects')}
                className="text-xs font-bold text-[#6C3BEF] hover:text-[#3F207C] flex items-center gap-1 cursor-pointer"
              >
                <span>{isMr ? 'सर्व पहा' : isHi ? 'सभी देखें' : 'View Full Syllabus'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CLASS_9_CURRICULUM.map((sub) => {
                const isScience = sub.id === 'science-and-technology';
                return (
                  <div
                    key={sub.id}
                    onClick={() => isScience ? onNavigate('/chapters/laws-of-motion') : onNavigate('/subjects')}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isScience
                        ? 'bg-purple-50/60 border-purple-200 hover:border-[#6C3BEF]'
                        : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">
                        {sub.name[lang] || sub.name.en}
                      </span>
                      {isScience ? (
                        <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                          Live
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-semibold">
                          {sub.chaptersCount} Ch
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {sub.overview[lang] || sub.overview.en}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Spaced Revision & Badges */}
        <div className="space-y-6">
          {/* Spaced Revision Card */}
          <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#6C3BEF]" />
                <h3 className="font-bold text-sm text-[#3F207C]">
                  {isMr ? 'स्मरण उजळणी (Spaced Revision)' : isHi ? 'स्थानिक पुनरावलोकन' : 'Spaced Revision'}
                </h3>
              </div>
              <button
                onClick={() => onNavigate('/revision')}
                className="text-xs font-bold text-[#6C3BEF] hover:text-[#3F207C] cursor-pointer"
              >
                View all
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              {isMr
                ? 'दीर्घकालीन स्मरणशक्तीसाठी दिवस १, ३, आणि ७ उजळणी वेळापत्रक.'
                : isHi
                ? 'दीर्घकालिक स्मृति के लिए दिन 1, 3, और 7 का पुनरावलोकन चक्र।'
                : 'Day 1, 3, and 7 active recall cycles to ensure 100% exam retention.'}
            </p>

            <div className="space-y-3">
              {revisionSchedules.length > 0 ? (
                revisionSchedules.slice(0, 2).map((schedule) => (
                  <div key={schedule.topicId} className="p-3.5 bg-purple-50/50 rounded-2xl border border-purple-100">
                    <div className="text-xs font-bold text-slate-800 mb-2 truncate">
                      {schedule.topicTitle}
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 text-center">
                      {schedule.levels.map((lvl) => {
                        const isDone = lvl.status === 'completed';
                        const isDue = lvl.status === 'due';
                        return (
                          <div
                            key={lvl.level}
                            className={`p-2 rounded-xl text-[11px] font-bold border ${
                              isDone
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : isDue
                                ? 'bg-amber-50 text-amber-800 border-amber-300 animate-pulse'
                                : 'bg-white text-slate-400 border-slate-200'
                            }`}
                          >
                            <div>{lvl.dayLabel.split(' ')[0]}</div>
                            <div className="text-[10px] font-normal capitalize">
                              {isDone ? '✓ Done' : isDue ? '⚡ Due' : 'Upcoming'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-slate-400">
                  Complete your first topic post-test to activate spaced revision!
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate('/revision')}
              className="w-full mt-4 py-2.5 bg-purple-100 hover:bg-purple-200 text-[#3F207C] text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{isMr ? 'उजळणी सुरू करा' : isHi ? 'रिवीजन शुरू करें' : 'Open Revision Hub'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Badges / Gamification Preview */}
          <div className="bg-white rounded-3xl border border-purple-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-sm text-[#3F207C]">
                  {isMr ? 'माझे बॅजेस' : isHi ? 'मेरे बैज' : 'My Achievements'}
                </h3>
              </div>
              <button
                onClick={() => onNavigate('/badges')}
                className="text-xs font-bold text-[#6C3BEF] hover:text-[#3F207C] cursor-pointer"
              >
                {unlockedBadges.length}/{badges.length} Unlocked
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    b.unlocked
                      ? 'bg-gradient-to-b from-amber-50 to-white border-amber-200 text-amber-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 opacity-60 text-slate-500'
                  }`}
                >
                  <div className="text-xl mb-1">{b.unlocked ? '🏆' : '🔒'}</div>
                  <div className="text-xs font-bold truncate">{b.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
