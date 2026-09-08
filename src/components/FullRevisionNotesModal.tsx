import React, { useState } from 'react';
import { X, BookOpen, Volume2, VolumeX, Copy, Check, Sparkles, AlertTriangle, Calculator, Compass, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TOPIC_LESSONS } from '../data/lawsOfMotionData';
import { LanguageCode, RevisionSchedule } from '../types';
import { ttsService } from '../services/ttsService';

interface FullRevisionNotesModalProps {
  schedule: RevisionSchedule;
  currentLang: LanguageCode;
  onClose: () => void;
  onStartQuiz?: () => void;
}

export const FullRevisionNotesModal: React.FC<FullRevisionNotesModalProps> = ({
  schedule,
  currentLang,
  onClose,
  onStartQuiz,
}) => {
  const [lang, setLang] = useState<LanguageCode>(currentLang);
  const [activeTab, setActiveTab] = useState<'summary' | 'definitions' | 'worked_example' | 'misconceptions' | 'analogies'>('summary');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  const topicData = TOPIC_LESSONS[schedule.topicId] || TOPIC_LESSONS['force'];

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      ttsService.stop();
      setIsSpeaking(false);
    } else {
      const summaryText = `${topicData.title[lang] || topicData.title.en}. ${topicData.simpleExplanation[lang] || topicData.simpleExplanation.en}. ${topicData.recapPoints.map((r) => r[lang] || r.en).slice(0, 3).join('. ')}`;
      setIsSpeaking(true);
      ttsService.speak(summaryText, lang, () => {
        setIsSpeaking(false);
      });
    }
  };

  const handleCopy = () => {
    const fullText = `=== ${topicData.title.en} (${topicData.title.mr} / ${topicData.title.hi}) ===\n\n` +
      `Overview: ${topicData.simpleExplanation.en}\n\n` +
      `Key Definitions:\n` +
      topicData.keyDefinitions.map((d) => `• ${d.term.en}: ${d.definition.en}`).join('\n') +
      `\n\nWorked Example:\nFormula: ${topicData.workedExample.formula}\nProblem: ${topicData.workedExample.problem.en}\nAnswer: ${topicData.workedExample.answer.en}\n\n` +
      `Recap Points:\n` +
      topicData.recapPoints.map((r) => `• ${r.en}`).join('\n');

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl border border-purple-100 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3F207C] to-[#6C3BEF] text-white p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-purple-100">
                Spaced Revision Hub • Chapter 1
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900">
                Master Retention Notes
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {topicData.title[lang] || topicData.title.en}
            </h2>
            <p className="text-xs text-purple-100/90 max-w-xl">
              {topicData.shortDesc[lang] || topicData.shortDesc.en}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Language Switcher */}
            <div className="flex bg-white/15 p-1 rounded-xl gap-1">
              {(['en', 'mr', 'hi'] as LanguageCode[]).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    ttsService.stop();
                    setIsSpeaking(false);
                    setLang(l);
                  }}
                  className={`px-2 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                    lang === l ? 'bg-white text-[#3F207C] shadow-xs' : 'text-purple-100 hover:text-white'
                  }`}
                >
                  {l === 'en' ? 'EN' : l === 'mr' ? 'मराठी' : 'हिंदी'}
                </button>
              ))}
            </div>

            {/* Audio Button */}
            <button
              onClick={handleToggleSpeak}
              title={isSpeaking ? 'Stop Audio' : 'Listen to Revision Notes'}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-900 ring-2 ring-white animate-pulse'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              title="Copy Revision Notes"
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                ttsService.stop();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-purple-100 bg-purple-50/50 px-4 sm:px-6 pt-2 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'summary'
                ? 'border-[#6C3BEF] text-[#3F207C] bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 hover:text-[#6C3BEF]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isMr ? 'सारांश व संकल्पना' : isHi ? 'सारांश एवं संकल्पना' : 'Master Summary'}</span>
          </button>

          <button
            onClick={() => setActiveTab('definitions')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'definitions'
                ? 'border-[#6C3BEF] text-[#3F207C] bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 hover:text-[#6C3BEF]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{isMr ? 'व्याख्या व सूत्रे' : isHi ? 'परिभाषाएं एवं सूत्र' : 'Definitions & Formulas'}</span>
          </button>

          <button
            onClick={() => setActiveTab('worked_example')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'worked_example'
                ? 'border-[#6C3BEF] text-[#3F207C] bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 hover:text-[#6C3BEF]'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-indigo-600" />
            <span>{isMr ? 'सोडवलेले उदाहरण' : isHi ? 'हल किया गया उदाहरण' : 'Numerical Problem'}</span>
          </button>

          <button
            onClick={() => setActiveTab('misconceptions')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'misconceptions'
                ? 'border-[#6C3BEF] text-[#3F207C] bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 hover:text-[#6C3BEF]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>{isMr ? 'सामान्य चुका व सत्य' : isHi ? 'भ्रांतियां व वास्तविकता' : 'Misconceptions'}</span>
          </button>

          <button
            onClick={() => setActiveTab('analogies')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'analogies'
                ? 'border-[#6C3BEF] text-[#3F207C] bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 hover:text-[#6C3BEF]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isMr ? 'दैनंदिन उदाहरणे' : isHi ? 'दैनिक उदाहरण' : 'Daily Life Examples'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-sm leading-relaxed">
          {/* TAB 1: SUMMARY */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#3F207C]">
                  {isMr ? 'संकल्पना स्पष्टीकरण' : isHi ? 'संकल्पना स्पष्टीकरण' : 'Conceptual Overview'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {topicData.simpleExplanation[lang] || topicData.simpleExplanation.en}
                </p>
              </div>

              {/* Key Concept Chips */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#3F207C] mb-2.5">
                  Core Syllabus Concepts
                </h4>
                <div className="flex flex-wrap gap-2">
                  {topicData.keyConcepts.map((kc, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white border border-purple-200 text-[#3F207C] font-semibold text-xs rounded-xl shadow-2xs"
                    >
                      ✓ {kc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recap Summary Points */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#3F207C] mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{isMr ? 'पुनरावलोकन महत्त्वाचे मुद्दे' : isHi ? 'मुख्य पुनरावलोकन बिंदु' : 'High-Yield Memory Bullets'}</span>
                </h4>
                <div className="space-y-2">
                  {topicData.recapPoints.map((rp, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-[#6C3BEF] font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{rp[lang] || rp.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DEFINITIONS & FORMULAS */}
          {activeTab === 'definitions' && (
            <div className="space-y-6">
              {/* Definitions */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#3F207C] mb-3">
                  {isMr ? 'वैज्ञानिक व्याख्या' : isHi ? 'वैज्ञानिक परिभाषाएं' : 'Formal Scientific Definitions'}
                </h4>
                <div className="space-y-3">
                  {topicData.keyDefinitions.map((kd, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-purple-100 shadow-2xs space-y-1"
                    >
                      <div className="text-xs font-black text-[#3F207C]">
                        {kd.term[lang] || kd.term.en}
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {kd.definition[lang] || kd.definition.en}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formula & Units */}
              {topicData.workedExample && (
                <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200 space-y-2">
                  <div className="text-xs font-black text-indigo-900 uppercase tracking-wider">
                    Mathematical Formula
                  </div>
                  <div className="text-sm font-mono font-bold text-indigo-950 bg-white p-3 rounded-xl border border-indigo-200">
                    {topicData.workedExample.formula}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WORKED EXAMPLE */}
          {activeTab === 'worked_example' && (
            <div className="space-y-5">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#6C3BEF]">
                    Step-by-Step Textbook Problem
                  </span>
                  <span className="text-xs font-mono font-bold bg-purple-100 text-[#3F207C] px-2.5 py-1 rounded-lg">
                    Formula: {topicData.workedExample.formula}
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-semibold text-slate-900">
                  {topicData.workedExample.problem[lang] || topicData.workedExample.problem.en}
                </div>

                <div className="text-xs text-indigo-900 bg-indigo-50 p-2.5 rounded-xl border border-indigo-200">
                  <strong>Given:</strong> {topicData.workedExample.given[lang] || topicData.workedExample.given.en}
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-slate-700">Calculation Steps:</div>
                  {topicData.workedExample.steps.map((st, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-slate-800 bg-white p-2.5 rounded-xl border border-slate-200 font-mono flex items-center gap-2"
                    >
                      <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{st[lang] || st.en}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Answer: {topicData.workedExample.answer[lang] || topicData.workedExample.answer.en}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: MISCONCEPTIONS */}
          {activeTab === 'misconceptions' && (
            <div className="space-y-3">
              {topicData.commonMistakes.map((cm, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 space-y-2"
                >
                  <div className="text-xs text-rose-800 font-bold flex items-start gap-1.5">
                    <span className="bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded text-[10px] uppercase font-black shrink-0">
                      Myth / सामान्य चूक
                    </span>
                    <span>{cm.myth[lang] || cm.myth.en}</span>
                  </div>

                  <div className="text-xs text-emerald-900 font-semibold flex items-start gap-1.5 bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                    <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[10px] uppercase font-black shrink-0">
                      Reality / वैज्ञानिक सत्य
                    </span>
                    <span>{cm.reality[lang] || cm.reality.en}</span>
                  </div>

                  <p className="text-[11px] text-slate-600 pl-2 border-l-2 border-amber-300">
                    <strong>Why?</strong> {cm.why[lang] || cm.why.en}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: DAILY LIFE ANALOGIES */}
          {activeTab === 'analogies' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topicData.dailyLifeExamples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-purple-100 shadow-2xs space-y-2 hover:border-purple-300 transition-all"
                >
                  <div className="text-xs font-black text-[#3F207C] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-[#6C3BEF] flex items-center justify-center text-xs">
                      ⚡
                    </span>
                    <span>{ex.title[lang] || ex.title.en}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ex.description[lang] || ex.description.en}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            {schedule.topicTitle} • Retention Level Check
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onStartQuiz && (
              <button
                onClick={() => {
                  ttsService.stop();
                  onClose();
                  onStartQuiz();
                }}
                className="flex-1 sm:flex-none px-4 py-2 bg-[#6C3BEF] hover:bg-[#582dc9] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Take Spaced Recall Mini-Quiz</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => {
                ttsService.stop();
                onClose();
              }}
              className="flex-1 sm:flex-none px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
