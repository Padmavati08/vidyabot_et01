import React from 'react';
import { ArrowLeft, ArrowRight, Brain, AlertCircle, CheckCircle2, Sparkles, BookOpen, Target } from 'lucide-react';
import { UserProfile, LearnerProfile } from '../types';
import { TOPIC_LESSONS } from '../data/lawsOfMotionData';
import { storageService } from '../services/storageService';
import { PageBackButton } from '../components/PageBackButton';

interface PreTestResultPageProps {
  topicId: string;
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
}

export const PreTestResultPage: React.FC<PreTestResultPageProps> = ({ topicId, userProfile, onNavigate }) => {
  const lang = userProfile.currentLanguage || 'en';
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  const topicLesson = TOPIC_LESSONS[topicId] || TOPIC_LESSONS.force;
  const topicTitle = topicLesson.title[lang] || topicLesson.title.en;

  const learnerProfile: LearnerProfile | null = storageService.getLearnerProfile(topicId);
  const score = learnerProfile?.preTestScore ?? 2;
  const total = learnerProfile?.preTestTotal ?? 3;
  const weakConcepts = learnerProfile?.weakConcepts ?? [];
  const strongConcepts = learnerProfile?.strongConcepts ?? [];

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 space-y-6">
      {/* Top Back Navigation Bar */}
      <PageBackButton
        onNavigate={onNavigate}
        fallbackPath="/chapters/laws-of-motion"
        label={isMr ? 'धड्याकडे परत' : isHi ? 'पाठ पर वापस' : 'Back to Chapter'}
        currentLang={lang}
        breadcrumbs={[
          { label: isMr ? 'गतीचे नियम' : isHi ? 'गति के नियम' : 'Laws of Motion', path: '/chapters/laws-of-motion' },
          { label: `${topicTitle} (Diagnostic Report)` },
        ]}
      />

      {/* Result Card */}
      <div className="bg-white rounded-3xl border border-purple-100 shadow-xl overflow-hidden">
        {/* Header banner */}
        <div className="bg-gradient-to-r from-[#3F207C] to-[#6C3BEF] p-6 sm:p-8 text-white text-center">
          <div className="w-14 h-14 rounded-3xl bg-white/10 flex items-center justify-center mx-auto mb-3 backdrop-blur-xs">
            <Brain className="w-7 h-7 text-purple-200" />
          </div>

          <span className="text-xs uppercase font-bold tracking-wider text-purple-200">
            Diagnostic Assessment Report
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">{topicTitle}</h1>

          {/* Score Badge */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xs border border-white/20 text-sm font-bold">
            <span>
              {isMr ? `प्राथमिक गुण: ${total} पैकी ${score}` : isHi ? `स्कोर: ${total} में से ${score}` : `Diagnostic Score: ${score} / ${total}`}
            </span>
          </div>
        </div>

        {/* Diagnosis Insights */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Personalized Learning Pathway Note */}
          <div className="p-5 bg-gradient-to-r from-purple-50 via-white to-purple-50 rounded-2xl border border-purple-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#3F207C] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#6C3BEF]" />
              <span>
                {isMr ? 'विद्याबॉटचे वैयक्तिकृत मार्गदर्शन' : isHi ? 'विद्याबॉट की वैयक्तिकृत सलाह' : 'Personalized Lesson Pathway'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {weakConcepts.length > 0
                ? isMr
                  ? `आम्हाला आढळले की "${weakConcepts.join(', ')}" या संकल्पनेवर अधिक लक्ष देणे आवश्यक आहे. तुमच्या पुढील धड्यात यावर विशेष भर दिला जाईल!`
                  : isHi
                  ? `हमने पाया कि "${weakConcepts.join(', ')}" अवधारणा को अधिक स्पष्ट करने की आवश्यकता है। आपके अगले पाठ में इस पर विशेष ध्यान दिया जाएगा!`
                  : `We identified focus areas in: "${weakConcepts.join(', ')}". Your interactive lesson has been calibrated to emphasize these concepts!`
                : isMr
                ? 'उत्कृष्ट! तुमची पूर्वतयारी उत्तम आहे. चला आता प्रत्यक्ष भौतिकशास्त्र सिम्युलेटर आणि सखोल संकल्पना शिकूया.'
                : isHi
                ? 'शानदार! आपकी बुनियादी समझ मजबूत है। आइए अब भौतिकी सिमुलेटर और गहन अवधारणाओं का अभ्यास करें।'
                : 'Excellent foundation! Your baseline understanding is strong. Let’s dive straight into the interactive physics simulators and worked examples.'}
            </p>
          </div>

          {/* Concepts Breakdown Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Focus Needed */}
            <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>{isMr ? 'पुनरावलोकन आवश्यक घटक' : isHi ? 'सुधार हेतु विषय' : 'Concepts to Strengthen'}</span>
              </div>
              {weakConcepts.length > 0 ? (
                <ul className="space-y-1 text-xs text-amber-800 font-medium">
                  {weakConcepts.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-amber-700 italic">No major weak spots detected!</p>
              )}
            </div>

            {/* Strengths */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isMr ? 'पक्के झालेले घटक' : isHi ? 'मजबूत अवधारणाएं' : 'Strong Concepts'}</span>
              </div>
              {strongConcepts.length > 0 ? (
                <ul className="space-y-1 text-xs text-emerald-800 font-medium">
                  {strongConcepts.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-emerald-700 italic">Ready to build mastery in lesson.</p>
              )}
            </div>
          </div>

          {/* CTA to Lesson */}
          <div className="pt-2">
            <button
              id="pretest-result-start-lesson-btn"
              onClick={() => onNavigate(`/lesson/${topicId}`)}
              className="w-full py-3.5 bg-gradient-to-r from-[#3F207C] to-[#6C3BEF] hover:from-[#351b69] hover:to-[#582dc9] text-white font-bold text-sm rounded-2xl shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <BookOpen className="w-4 h-4" />
              <span>{isMr ? 'वैयक्तिकृत धडा सुरू करा' : isHi ? 'वैयक्तिकृत पाठ शुरू करें' : 'Start Personalized Lesson'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
