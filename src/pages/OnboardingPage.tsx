import React, { useState } from 'react';
import { User, MapPin, School, GraduationCap, Languages, Check, ArrowRight, Sparkles } from 'lucide-react';
import { UserProfile, LanguageCode, IndianBoard, ClassLevel } from '../types';
import { INDIAN_STATES_AND_UTS, BOARDS, CLASSES, SUPPORTED_LANGUAGES } from '../data/statesAndBoards';
import { storageService } from '../services/storageService';
import { PageBackButton } from '../components/PageBackButton';

interface OnboardingPageProps {
  initialProfile: UserProfile | null;
  onComplete: (profile: UserProfile) => void;
  onNavigate?: (path: string) => void;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = ({ initialProfile, onComplete, onNavigate }) => {
  const [name, setName] = useState(initialProfile?.name || 'Aarav');
  const [state, setState] = useState(initialProfile?.state || 'Maharashtra');
  const [board, setBoard] = useState<IndianBoard>(initialProfile?.board || 'State Board');
  const [classLevel, setClassLevel] = useState<ClassLevel>(initialProfile?.classLevel || '9');
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageCode[]>(
    initialProfile?.selectedLanguages || ['en', 'mr', 'hi']
  );
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(
    initialProfile?.currentLanguage || 'en'
  );

  const toggleLanguage = (code: LanguageCode) => {
    if (selectedLanguages.includes(code)) {
      if (selectedLanguages.length > 1) {
        const next = selectedLanguages.filter((l) => l !== code);
        setSelectedLanguages(next);
        if (currentLanguage === code) {
          setCurrentLanguage(next[0]);
        }
      }
    } else {
      setSelectedLanguages([...selectedLanguages, code]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: UserProfile = {
      name: name.trim() || 'Student',
      state,
      board,
      classLevel,
      selectedLanguages,
      currentLanguage,
      createdAt: initialProfile?.createdAt || new Date().toISOString(),
      streakDays: initialProfile?.streakDays || 3,
      lastActiveDate: new Date().toISOString(),
    };

    storageService.saveUserProfile(profile);
    onComplete(profile);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Top Back Button if user is already registered / editing profile */}
      {initialProfile && onNavigate && (
        <PageBackButton
          onNavigate={onNavigate}
          fallbackPath="/dashboard"
          label={currentLanguage === 'mr' ? 'डॅशबोर्डकडे परत' : currentLanguage === 'hi' ? 'डैशबोर्ड पर वापस' : 'Back to Dashboard'}
          currentLang={currentLanguage}
          breadcrumbs={[
            { label: 'Profile Settings' },
          ]}
        />
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3F207C] to-[#6C3BEF] text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-purple-500/25">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3F207C]">
          {initialProfile ? 'Edit Your Student Profile' : 'Configure Your Student Profile'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Select your State Board, Standard, and Multilingual preferences across all curriculum subjects.
        </p>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSave}
        className="bg-white p-6 sm:p-8 rounded-3xl border border-purple-100 shadow-xl space-y-6"
      >
        {/* 1. Student Name */}
        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            <User className="w-4 h-4 text-[#6C3BEF]" />
            <span>Student Name</span>
          </label>
          <input
            type="text"
            id="onboarding-name-input"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Aarav Patil / Ananya"
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#6C3BEF] focus:ring-2 focus:ring-purple-100 focus:outline-none text-sm font-medium text-slate-800 transition-all"
          />
        </div>

        {/* 2. State & Board Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4 text-[#6C3BEF]" />
              <span>State / Union Territory</span>
            </label>
            <select
              id="onboarding-state-select"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#6C3BEF] focus:ring-2 focus:ring-purple-100 focus:outline-none text-sm font-medium text-slate-800 bg-white cursor-pointer"
            >
              {INDIAN_STATES_AND_UTS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <School className="w-4 h-4 text-[#6C3BEF]" />
              <span>Education Board</span>
            </label>
            <select
              id="onboarding-board-select"
              value={board}
              onChange={(e) => setBoard(e.target.value as IndianBoard)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#6C3BEF] focus:ring-2 focus:ring-purple-100 focus:outline-none text-sm font-medium text-slate-800 bg-white cursor-pointer"
            >
              {BOARDS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Class Level */}
        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4 text-[#6C3BEF]" />
            <span>Class / Standard</span>
          </label>
          <div className="grid grid-cols-4 gap-2">
            {CLASSES.map((cls) => {
              const isSelected = classLevel === cls.value;
              return (
                <button
                  key={cls.value}
                  type="button"
                  id={`onboarding-class-${cls.value}`}
                  onClick={() => setClassLevel(cls.value)}
                  className={`py-2.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#6C3BEF] text-white border-[#6C3BEF] shadow-md shadow-purple-500/20'
                      : 'bg-slate-50 hover:bg-purple-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {cls.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Language Selection (Multilingual) */}
        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            <Languages className="w-4 h-4 text-[#6C3BEF]" />
            <span>Languages You Understand (Select all that apply)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isChecked = selectedLanguages.includes(lang.code);
              return (
                <button
                  key={lang.code}
                  type="button"
                  id={`onboarding-lang-${lang.code}`}
                  onClick={() => toggleLanguage(lang.code)}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    isChecked
                      ? 'bg-purple-50 border-[#6C3BEF] text-[#3F207C]'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">{lang.nativeName}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{lang.name}</div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      isChecked ? 'bg-[#6C3BEF] text-white' : 'border border-slate-300'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Primary Lesson Language */}
        <div>
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
            Default Lesson Language
          </label>
          <div className="flex flex-wrap gap-2">
            {selectedLanguages.map((code) => {
              const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === code);
              const isActive = currentLanguage === code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrentLanguage(code)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#3F207C] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {langObj?.nativeName} ({langObj?.name})
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit CTA */}
        <div className="pt-2">
          <button
            type="submit"
            id="onboarding-save-btn"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#3F207C] to-[#6C3BEF] hover:from-[#351b69] hover:to-[#582dc9] text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>{initialProfile ? 'Save Profile Changes' : 'Start Learning with Vidyabot'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
