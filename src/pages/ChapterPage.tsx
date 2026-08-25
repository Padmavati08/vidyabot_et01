import React from 'react';
import { Sparkles, BookOpen, Clock, CheckCircle2, ArrowRight, Play, Award, FileQuestion, HelpCircle } from 'lucide-react';
import { UserProfile, TopicStatus } from '../types';
import { LAWS_OF_MOTION_CHAPTER } from '../data/lawsOfMotionData';
import { storageService } from '../services/storageService';
import { PageBackButton } from '../components/PageBackButton';

interface ChapterPageProps {
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
}

export const ChapterPage: React.FC<ChapterPageProps> = ({ userProfile, onNavigate }) => {
  const topicStatuses = storageService.getTopicStatuses();
  const lang = userProfile.currentLanguage || 'en';
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  const topics = LAWS_OF_MOTION_CHAPTER.topics;
  const completedCount = Object.values(topicStatuses).filter((s) => s === 'completed').length;
  const progressPercent = Math.round((completedCount / topics.length) * 100);

  return (
    <div className="py-6 space-y-6">
      {/* Top Back Navigation Bar */}
      <PageBackButton
        onNavigate={onNavigate}
        fallbackPath="/subjects"
        label={isMr ? 'विषयांकडे परत' : isHi ? 'विषयों पर वापस' : 'Back to Subjects'}
        currentLang={lang}
        breadcrumbs={[
          { label: isMr ? 'विषय' : isHi ? 'विषय' : 'Subjects', path: '/subjects' },
          { label: isMr ? 'विज्ञान व तंत्रज्ञान' : isHi ? 'विज्ञान एवं प्रौद्योगिकी' : 'Science & Tech', path: '/subjects' },
          { label: isMr ? 'गतीचे नियम' : isHi ? 'गति के नियम' : 'Laws of Motion' },
        ]}
      />

      {/* Chapter Banner */}
      <div className="bg-gradient-to-r from-[#3F207C] via-[#52299E] to-[#6C3BEF] rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold backdrop-blur-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Chapter 1 • Science Part 1</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              {LAWS_OF_MOTION_CHAPTER.title[lang] || LAWS_OF_MOTION_CHAPTER.title.en}
            </h1>

            <p className="text-xs sm:text-sm text-purple-100/90 max-w-2xl leading-relaxed">
              {LAWS_OF_MOTION_CHAPTER.description[lang] || LAWS_OF_MOTION_CHAPTER.description.en}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-purple-200 font-semibold">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> 4 Topics (~60 mins total)
              </span>
              <span>•</span>
              <span>Maharashtra State Board / NCERT Aligned</span>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 text-center shrink-0 min-w-[180px]">
            <div className="text-3xl font-black text-white">{progressPercent}%</div>
            <div className="text-xs text-purple-200 font-medium mt-0.5">
              {completedCount} of {topics.length} Completed
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Topic Deep Dive Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#3F207C]">
            {isMr ? 'अभ्यास घटक (Topics in this Chapter)' : isHi ? 'अध्ययन विषय (Topics)' : 'Chapter Topics & Learning Loop'}
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            Pre-Test → Lesson + Simulator → Post-Test
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {topics.map((topic, index) => {
            const status = topicStatuses[topic.id] || 'not_started';
            const isCompleted = status === 'completed';
            const isInProgress = status === 'in_progress';

            return (
              <div
                key={topic.id}
                className="bg-white rounded-3xl border border-purple-100 p-6 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : isInProgress
                        ? 'bg-[#6C3BEF] text-white shadow-md shadow-purple-500/20'
                        : 'bg-purple-100 text-[#6C3BEF]'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {topic.title[lang] || topic.title.en}
                      </h3>
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isInProgress
                            ? 'bg-purple-100 text-[#6C3BEF]'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
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

                    <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                      {topic.description[lang] || topic.description.en}
                    </p>

                    <div className="text-xs text-slate-500 font-medium pt-1">
                      ⏱️ {topic.estimatedMinutes} minutes • Multilingual (EN, MR, HI) • Interactive Simulator
                    </div>
                  </div>
                </div>

                {/* 3 Step Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center shrink-0">
                  {/* Step 1: Pre-test */}
                  <button
                    id={`topic-${topic.id}-pretest-btn`}
                    onClick={() => onNavigate(`/pre-test/${topic.id}`)}
                    className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-[#3F207C] text-xs font-bold rounded-xl border border-purple-200 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <FileQuestion className="w-3.5 h-3.5 text-[#6C3BEF]" />
                    <span>{isMr ? 'निदान चाचणी' : isHi ? 'निदान टेस्ट' : 'Pre-Test'}</span>
                  </button>

                  {/* Step 2: Main Lesson & Simulator */}
                  <button
                    id={`topic-${topic.id}-lesson-btn`}
                    onClick={() => onNavigate(`/lesson/${topic.id}`)}
                    className="px-4 py-2 bg-[#6C3BEF] hover:bg-[#582dc9] text-white text-xs font-bold rounded-xl shadow-md shadow-purple-500/20 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isMr ? 'धडा व सिम्युलेटर' : isHi ? 'पाठ व सिमुलेटर' : 'Learn & Sim'}</span>
                  </button>

                  {/* Step 3: Post-test */}
                  <button
                    id={`topic-${topic.id}-posttest-btn`}
                    onClick={() => onNavigate(`/post-test/${topic.id}`)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{isMr ? 'मूल्यांकन' : isHi ? 'मूल्यांकन टेस्ट' : 'Post-Test'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
