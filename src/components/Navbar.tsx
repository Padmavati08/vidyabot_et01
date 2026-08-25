import React, { useState } from 'react';
import { Sparkles, BookOpen, AlertCircle, Award, Flame, Languages, Upload, CheckCircle2, ChevronDown, Network } from 'lucide-react';
import { UserProfile, LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/statesAndBoards';
import { storageService } from '../services/storageService';
import { N8nWorkflowModal } from './N8nWorkflowModal';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  userProfile: UserProfile | null;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  userProfile,
  onLanguageChange,
}) => {
  const [langMenuOpen, setLangMenuOpen] = React.useState(false);
  const [n8nModalOpen, setN8nModalOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: { en: 'Dashboard', mr: 'डॅशबोर्ड', hi: 'डैशबोर्ड' }, icon: BookOpen },
    { path: '/subjects', label: { en: 'Subjects', mr: 'विषय', hi: 'विषय' }, icon: Sparkles },
    { path: '/upload', label: { en: 'Study Notes', mr: 'अभ्यास साहित्य', hi: 'अध्ययन सामग्री' }, icon: Upload },
    { path: '/error-book', label: { en: 'Error Book', mr: 'त्रुटी वही', hi: 'त्रुटि डायरी' }, icon: AlertCircle },
    { path: '/revision', label: { en: 'Revision', mr: 'उजळणी', hi: 'पुनरावलोकन' }, icon: Award },
  ];

  const currentLang = userProfile?.currentLanguage || 'en';
  const streak = userProfile?.streakDays || 3;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <button
              id="nav-brand-logo"
              onClick={() => onNavigate(userProfile ? '/dashboard' : '/')}
              className="flex items-center gap-3 cursor-pointer group text-left"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#3F207C] to-[#6C3BEF] flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
                <span className="font-bold text-lg tracking-wider">V</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xl font-bold bg-gradient-to-r from-[#3F207C] to-[#6C3BEF] bg-clip-text text-transparent">
                    Vidyabot
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-[#6C3BEF]">
                    Class {userProfile?.classLevel || '9'} • {userProfile?.board || 'State Board'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium hidden sm:block">
                  Secondary Curriculum Learning Platform
                </p>
              </div>
            </button>

            {/* Navigation Links (If on-boarded) */}
            {userProfile && (
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath.startsWith(item.path);
                  return (
                    <button
                      key={item.path}
                      id={`nav-link-${item.path.replace('/', '')}`}
                      onClick={() => onNavigate(item.path)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-purple-50 text-[#6C3BEF] shadow-xs'
                          : 'text-slate-600 hover:text-[#3F207C] hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#6C3BEF]' : 'text-slate-400'}`} />
                      <span>{item.label[currentLang] || item.label.en}</span>
                    </button>
                  );
                })}
              </nav>
            )}

            {/* Right Action Area */}
            <div className="flex items-center gap-2.5">
              {/* AI & Automation Engine Settings / Status */}
              <button
                id="nav-n8n-workflow-btn"
                onClick={() => setN8nModalOpen(true)}
                title="AI & n8n Engine Status"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-slate-500 hover:text-[#6C3BEF] hover:bg-purple-50 border border-transparent hover:border-purple-200 text-xs font-semibold transition-all cursor-pointer"
              >
                <Network className="w-3.5 h-3.5 text-[#6C3BEF]" />
                <span className="hidden lg:inline text-slate-600 font-medium">AI Engine</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </button>

              {/* Streak Counter */}
              {userProfile && (
                <div
                  title="Learning Streak"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200/70 rounded-full text-amber-800 text-xs font-bold shadow-xs"
                >
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
                  <span>{streak}d Streak</span>
                </div>
              )}

              {/* Language Switcher Dropdown */}
              <div className="relative">
                <button
                  id="nav-language-switcher-btn"
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100/80 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 rounded-xl text-xs font-semibold text-slate-700 hover:text-[#6C3BEF] transition-all cursor-pointer"
                >
                  <Languages className="w-4 h-4 text-[#6C3BEF]" />
                  <span className="uppercase">{currentLang}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {langMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setLangMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-purple-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Select Lesson Language
                      </div>
                      {SUPPORTED_LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            onLanguageChange(lang.code);
                            storageService.updateCurrentLanguage(lang.code);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between cursor-pointer hover:bg-purple-50 transition-colors ${
                            currentLang === lang.code
                              ? 'text-[#6C3BEF] font-bold bg-purple-50/70'
                              : 'text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{lang.nativeName}</span>
                            <span className="text-slate-400 font-normal">({lang.name})</span>
                          </div>
                          {currentLang === lang.code && (
                            <CheckCircle2 className="w-4 h-4 text-[#6C3BEF]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Profile Avatar / Onboarding Link */}
              {userProfile ? (
                <button
                  id="nav-profile-btn"
                  onClick={() => onNavigate('/onboarding')}
                  title="Edit profile & preferences"
                  className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#3F207C] max-w-[100px] truncate hidden sm:inline">
                    {userProfile.name}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#6C3BEF] text-white flex items-center justify-center text-xs font-bold">
                    {userProfile.name.charAt(0).toUpperCase()}
                  </div>
                </button>
              ) : (
                <button
                  id="nav-get-started-btn"
                  onClick={() => onNavigate('/onboarding')}
                  className="px-4 py-2 rounded-xl bg-[#6C3BEF] hover:bg-[#582dc9] text-white text-xs font-bold shadow-md shadow-purple-500/25 transition-all cursor-pointer"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* n8n Automation Engine Modal */}
      <N8nWorkflowModal
        isOpen={n8nModalOpen}
        onClose={() => setN8nModalOpen(false)}
      />
    </>
  );
};

