import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, VolumeX, Sparkles, BookOpen, Lightbulb, AlertTriangle, Calculator, CheckCircle2, ArrowRight, MessageSquare, Bot, Target } from 'lucide-react';
import { UserProfile, LanguageCode, LearnerProfile } from '../types';
import { TOPIC_LESSONS } from '../data/lawsOfMotionData';
import { InteractiveDiagram } from '../components/InteractiveDiagram';
import { DoubtAssistant } from '../components/DoubtAssistant';
import { PageBackButton } from '../components/PageBackButton';
import { ttsService } from '../services/ttsService';
import { storageService } from '../services/storageService';
import { aiService } from '../services/aiService';

interface LessonPageProps {
  topicId: string;
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const LessonPage: React.FC<LessonPageProps> = ({
  topicId,
  userProfile,
  onNavigate,
  onLanguageChange,
}) => {
  const currentLang = userProfile.currentLanguage || 'en';
  const isMr = currentLang === 'mr';
  const isHi = currentLang === 'hi';

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [personalizedTip, setPersonalizedTip] = useState<string | null>(null);

  const lesson = TOPIC_LESSONS[topicId] || TOPIC_LESSONS.force;
  const learnerProfile: LearnerProfile | null = storageService.getLearnerProfile(topicId);

  // Set topic status to in-progress and fetch personalized AI lesson guidance
  useEffect(() => {
    storageService.setTopicStatus(topicId, 'in_progress');

    if (learnerProfile) {
      aiService
        .getLessonGuidance({
          topicId,
          language: currentLang,
          weakConcepts: learnerProfile.weakConcepts,
          strongConcepts: learnerProfile.strongConcepts,
          preTestScore: learnerProfile.preTestScore,
          preTestTotal: learnerProfile.preTestTotal,
        })
        .then((guidance) => {
          if (guidance) {
            setPersonalizedTip(guidance);
          }
        });
    }
  }, [topicId, currentLang]);

  const handleToggleTTS = (textToSpeak: string) => {
    if (isSpeaking) {
      ttsService.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      ttsService.speak(textToSpeak, currentLang, () => setIsSpeaking(false));
    }
  };

  const titleText = lesson.title[currentLang] || lesson.title.en;
  const simpleExpText = lesson.simpleExplanation[currentLang] || lesson.simpleExplanation.en;

  return (
    <div className="py-6 space-y-6 max-w-5xl mx-auto px-4">
      {/* Top Navigation Bar with Back button, breadcrumbs, and language switcher */}
      <div className="space-y-3">
        <PageBackButton
          onNavigate={onNavigate}
          fallbackPath="/chapters/laws-of-motion"
          label={isMr ? 'धड्याकडे परत' : isHi ? 'पाठ पर वापस' : 'Back to Chapter'}
          currentLang={currentLang}
          breadcrumbs={[
            { label: isMr ? 'विषय' : isHi ? 'विषय' : 'Subjects', path: '/subjects' },
            { label: isMr ? 'गतीचे नियम' : isHi ? 'गति के नियम' : 'Laws of Motion', path: '/chapters/laws-of-motion' },
            { label: titleText },
          ]}
        />

        {/* Language switcher bar */}
        <div className="flex items-center justify-end gap-2">
          <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">
            {isMr ? 'धड्याची भाषा:' : isHi ? 'पाठ भाषा:' : 'Lesson Language:'}
          </span>
          {(['en', 'mr', 'hi'] as LanguageCode[]).map((code) => {
            const isSelected = currentLang === code;
            return (
              <button
                key={code}
                onClick={() => onLanguageChange(code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#3F207C] text-white shadow-xs'
                    : 'bg-white hover:bg-purple-50 text-slate-700 border border-slate-200'
                }`}
              >
                {code === 'mr' ? 'मराठी' : code === 'hi' ? 'हिंदी' : 'English'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Lesson Header */}
      <div className="bg-gradient-to-r from-[#3F207C] via-[#52299E] to-[#6C3BEF] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold backdrop-blur-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Chapter 1: Laws of Motion</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">{titleText}</h1>
          </div>

          {/* Audio Read-aloud button */}
          <button
            onClick={() => handleToggleTTS(simpleExpText)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md shrink-0 ${
              isSpeaking
                ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                : 'bg-white hover:bg-purple-50 text-[#3F207C]'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#6C3BEF]" />}
            <span>{isSpeaking ? 'Stop Audio' : isMr ? 'धडा ऐका' : isHi ? 'पाठ सुनें' : 'Listen Aloud'}</span>
          </button>
        </div>
      </div>

      {/* Personalized AI Diagnostic Focus Note if available */}
      {learnerProfile && (
        <div className="bg-gradient-to-r from-purple-50 via-indigo-50/40 to-purple-50 border border-purple-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#3F207C] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#6C3BEF]" />
              <span>
                {isMr ? 'विद्याबॉट वैयक्तिकृत मार्गदर्शन (Gemini AI)' : isHi ? 'विद्याबॉट वैयक्तिकृत सलाह (Gemini AI)' : 'Vidyabot AI Personalized Focus Pathway'}
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-[#6C3BEF]">
              Diagnostic: {learnerProfile.preTestScore}/{learnerProfile.preTestTotal}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {personalizedTip ||
              (learnerProfile.weakConcepts.length > 0
                ? isMr
                  ? `पूर्व-चाचणी विश्लेषण: "${learnerProfile.weakConcepts.join(', ')}" या घटकावर विशेष लक्ष केंद्रित करून हा धडा डिझाइन केला आहे.`
                  : isHi
                  ? `प्री-टेस्ट विश्लेषण: "${learnerProfile.weakConcepts.join(', ')}" अवधारणा पर विशेष ध्यान देने हेतु यह पाठ अनुकूलित किया गया है।`
                  : `Diagnostic insight: Your lesson is calibrated to reinforce "${learnerProfile.weakConcepts.join(', ')}". Focus on the worked examples and simulator below!`
                : isMr
                ? 'तुमची प्राथमिक तयारी उत्तम आहे! आता सिम्युलेटर आणि सूत्रांचा सखोल अभ्यास करूया.'
                : isHi
                ? 'आपकी बुनियादी तैयारी मजबूत है! अब सिमुलेटर और सूत्रों का गहरा अभ्यास करें।'
                : 'Great baseline foundation! Explore the interactive forces simulator and worked numericals to achieve mastery.')}
          </p>
        </div>
      )}

      {/* SECTION 1: Intuitive Concept Explanation */}
      <div className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6C3BEF] uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>{isMr ? 'संकल्पना परिचय' : isHi ? 'अवधारणा परिचय' : 'Concept Overview'}</span>
        </div>

        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
          {simpleExpText}
        </p>
      </div>

      {/* SECTION 2: Interactive Simulator */}
      <InteractiveDiagram type={lesson.diagramType} language={currentLang} />

      {/* SECTION 3: Key Definitions */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#3F207C] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#6C3BEF]" />
          <span>{isMr ? 'महत्त्वाच्या व्याख्या व सूत्रे' : isHi ? 'मुख्य परिभाषाएं व सूत्र' : 'Key Definitions & Scientific Terms'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {lesson.keyDefinitions.map((def, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs hover:border-purple-300 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#3F207C]">
                  {def.term[currentLang] || def.term.en}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-50 text-[#6C3BEF]">
                  Term {idx + 1}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {def.definition[currentLang] || def.definition.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: Real-life Indian Context Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#3F207C] flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span>{isMr ? 'दैनंदिन जीवनातील उदाहरणे' : isHi ? 'दैनिक जीवन से उदाहरण' : 'Real-Life Everyday Applications'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {lesson.dailyLifeExamples.map((ex, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-purple-50/40 via-white to-purple-50/20 p-5 rounded-2xl border border-purple-100 shadow-xs space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#6C3BEF] text-white text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  {ex.title[currentLang] || ex.title.en}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                {ex.description[currentLang] || ex.description.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: Common Misconceptions / Myths vs Reality */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>
            {isMr ? 'सामान्य गैरसमज विरुद्ध वैज्ञानिक सत्य' : isHi ? 'सामान्य भ्रांतियां और वैज्ञानिक सत्य' : 'Common Misconceptions & Scientific Realities'}
          </span>
        </div>

        <div className="space-y-3">
          {lesson.commonMistakes.map((cm, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-amber-200/80 space-y-2">
              <div className="text-xs text-rose-700 font-semibold flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-bold">
                  {isMr ? 'गैरसमज' : isHi ? 'भ्रांति' : 'Myth'}
                </span>
                <span>{cm.myth[currentLang] || cm.myth.en}</span>
              </div>
              <div className="text-xs sm:text-sm text-emerald-800 font-semibold flex items-start gap-2 pt-1">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0 mt-0.5">
                  {isMr ? 'वैज्ञानिक सत्य' : isHi ? 'सत्य' : 'Reality'}
                </span>
                <span className="leading-relaxed">{cm.reality[currentLang] || cm.reality.en}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: Worked Numerical Formula Example */}
      {lesson.workedExample && (
        <div className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#6C3BEF] uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>{isMr ? 'सोडवलेले संख्यात्मक उदाहरण' : isHi ? 'हल किया गया संख्यात्मक उदाहरण' : 'Worked Numerical Example'}</span>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-100 text-[#6C3BEF]">
              {lesson.workedExample.formula}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-800">
            📝 {lesson.workedExample.problem[currentLang] || lesson.workedExample.problem.en}
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium whitespace-pre-wrap leading-relaxed">
            🎯 {lesson.workedExample.answer[currentLang] || lesson.workedExample.answer.en}
          </div>
        </div>
      )}

      {/* SECTION 7: Recap Points */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50 rounded-3xl border border-purple-200 p-6 space-y-3">
        <h4 className="text-sm font-bold text-[#3F207C] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{isMr ? 'धड्याचा मुख्य सारांश' : isHi ? 'मुख्य सारांश' : 'Quick Summary Takeaways'}</span>
        </h4>
        <ul className="space-y-2">
          {lesson.recapPoints.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6C3BEF] mt-2 shrink-0" />
              <span className="leading-relaxed">{pt[currentLang] || pt.en}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Embedded Doubt Assistant Section */}
      <div className="pt-4">
        <DoubtAssistant
          topicId={topicId}
          topicTitle={titleText}
          language={currentLang}
        />
      </div>

      {/* Sticky / Bottom Navigation CTA */}
      <div className="pt-6 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('/chapters/laws-of-motion')}
          className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer w-full sm:w-auto"
        >
          {isMr ? 'धड्याकडे परत जा' : isHi ? 'पाठ सूची पर जाएं' : 'Back to Topic List'}
        </button>

        <button
          id="lesson-proceed-posttest-btn"
          onClick={() => onNavigate(`/post-test/${topicId}`)}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#3F207C] to-[#6C3BEF] hover:from-[#351b69] hover:to-[#582dc9] text-white font-bold text-sm rounded-2xl shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
        >
          <span>{isMr ? 'मूल्यांकन चाचणी द्या' : isHi ? 'मूल्यांकन परीक्षा दें' : 'Take Post-Test Evaluation'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
