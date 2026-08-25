import React, { useState } from 'react';
import { BookOpen, ChevronRight, CheckCircle2, Atom, Calculator, Globe, BookMarked, Languages, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { UserProfile } from '../types';
import { storageService } from '../services/storageService';
import { CLASS_9_CURRICULUM, CurriculumSubject } from '../data/curriculumData';
import { PageBackButton } from '../components/PageBackButton';

interface SubjectPageProps {
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
}

export const SubjectPage: React.FC<SubjectPageProps> = ({ userProfile, onNavigate }) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const stats = storageService.getOverallStats();
  const lang = userProfile.currentLanguage || 'en';
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  const displayedSubjects = selectedSubjectId === 'all'
    ? CLASS_9_CURRICULUM
    : CLASS_9_CURRICULUM.filter((s) => s.id === selectedSubjectId);

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
        return Atom;
      case 'Calculator':
        return Calculator;
      case 'Globe':
        return Globe;
      case 'BookMarked':
        return BookMarked;
      case 'Languages':
        return Languages;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="py-6 space-y-6">
      {/* Top Back Navigation Bar */}
      <PageBackButton
        onNavigate={onNavigate}
        fallbackPath="/dashboard"
        label={isMr ? 'डॅशबोर्डकडे परत' : isHi ? 'डैशबोर्ड पर वापस' : 'Back to Dashboard'}
        currentLang={lang}
        breadcrumbs={[
          { label: isMr ? 'अभ्यासक्रम व विषय' : isHi ? 'पाठ्यक्रम एवं विषय' : 'Curriculum & Subjects' },
        ]}
      />

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6C3BEF] uppercase tracking-wider mb-2">
          <span>{userProfile.board} • Class {userProfile.classLevel}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3F207C]">
              {isMr ? 'अभ्यासक्रम व विषय (Syllabus & Subjects)' : isHi ? 'पाठ्यक्रम एवं विषय' : 'Curriculum & Subjects'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              {isMr
                ? 'महाराष्ट्र राज्य मंडळ व NCERT अभ्यासक्रमानुसार इयत्ता ९ वी चे सर्व विषय. विज्ञान शाखेतील धडे परस्परसंवादी सिम्युलेटर व निदान चाचण्यांसह उपलब्ध आहेत.'
                : isHi
                ? 'महाराष्ट्र स्टेट बोर्ड और NCERT के अनुसार कक्षा 9 के सभी विषय। विज्ञान विषय के अध्याय इंटरैक्टिव सिमुलेटर और डायग्नोस्टिक टेस्ट के साथ सक्रिय हैं।'
                : 'Standard 9 comprehensive curriculum across Science, Mathematics, Social Sciences, and Languages. Interactive diagnostics and physics simulations are fully active for Science.'}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-purple-50 px-4 py-2.5 rounded-2xl border border-purple-100 shrink-0">
            <Layers className="w-5 h-5 text-[#6C3BEF]" />
            <div className="text-left">
              <div className="text-xs font-bold text-[#3F207C]">6 Core Subjects</div>
              <div className="text-[10px] text-slate-500 font-medium">State Board & NCERT</div>
            </div>
          </div>
        </div>

        {/* Subject Filter Tabs */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedSubjectId('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedSubjectId === 'all'
                ? 'bg-[#6C3BEF] text-white shadow-md shadow-purple-500/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isMr ? 'सर्व विषय (All)' : isHi ? 'सभी विषय' : 'All Subjects'}
          </button>
          {CLASS_9_CURRICULUM.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                selectedSubjectId === sub.id
                  ? 'bg-[#6C3BEF] text-white shadow-md shadow-purple-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{sub.name[lang] || sub.name.en}</span>
              {sub.hasInteractiveUnits && (
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Subjects & Chapter Units Grid */}
      <div className="space-y-8">
        {displayedSubjects.map((subject) => {
          const Icon = getSubjectIcon(subject.iconName);

          return (
            <div
              key={subject.id}
              className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-sm space-y-6"
            >
              {/* Subject Title Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${subject.colorScheme.bg} ${subject.colorScheme.text} flex items-center justify-center font-extrabold text-base shrink-0 shadow-xs`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl font-bold text-slate-900">
                        {subject.name[lang] || subject.name.en}
                      </h2>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {subject.code}
                      </span>
                      {subject.hasInteractiveUnits && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Interactive Assessment Active
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                      {subject.overview[lang] || subject.overview.en}
                    </p>
                  </div>
                </div>

                {subject.activeUnitPath && (
                  <button
                    onClick={() => onNavigate(subject.activeUnitPath!)}
                    className="px-5 py-2.5 bg-[#6C3BEF] hover:bg-[#582dc9] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-purple-500/20 transition-all flex items-center gap-2 cursor-pointer self-start sm:self-center shrink-0"
                  >
                    <span>{isMr ? 'धडे अभ्यासा' : isHi ? 'अध्याय सीखें' : 'Start Interactive Units'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Chapters List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subject.chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      chapter.isInteractive
                        ? 'bg-gradient-to-br from-purple-50/50 to-white border-purple-200 shadow-xs hover:border-[#6C3BEF]'
                        : 'bg-slate-50/70 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            chapter.isInteractive
                              ? 'bg-[#6C3BEF] text-white shadow-xs'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {chapter.number}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-bold text-slate-900">
                              {chapter.title[lang] || chapter.title.en}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            {chapter.description[lang] || chapter.description.en}
                          </p>

                          <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                            <span>{chapter.topicsCount} Topics</span>
                            {chapter.isInteractive && (
                              <>
                                <span>•</span>
                                <span className="text-[#6C3BEF] font-semibold">
                                  {stats.completedTopics} of {stats.totalTopics} completed
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {chapter.isInteractive ? (
                        <button
                          onClick={() => onNavigate(chapter.path || '/chapters/laws-of-motion')}
                          className="px-3.5 py-1.5 bg-[#6C3BEF] hover:bg-[#582dc9] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0 flex items-center gap-1"
                        >
                          <span>{isMr ? 'उघडा' : isHi ? 'खोलें' : 'Open'}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-200 shrink-0">
                          Syllabus Unit
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
