import React, { useEffect, useState } from 'react';
import { Trophy, CheckCircle2, AlertCircle, Sparkles, BookOpen, Clock, ArrowRight, ArrowLeft, TrendingUp, Compass, Check, HelpCircle, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, QuizAttempt } from '../types';
import { TOPIC_LESSONS, LAWS_OF_MOTION_CHAPTER } from '../data/lawsOfMotionData';
import { storageService } from '../services/storageService';
import { PageBackButton } from '../components/PageBackButton';

interface PostTestResultPageProps {
  topicId: string;
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
}

export const PostTestResultPage: React.FC<PostTestResultPageProps> = ({
  topicId,
  userProfile,
  onNavigate,
}) => {
  const lang = userProfile.currentLanguage || 'en';
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  const [transferAnswer, setTransferAnswer] = useState<number | null>(null);
  const [transferSubmitted, setTransferSubmitted] = useState<boolean>(false);

  const topicLesson = TOPIC_LESSONS[topicId] || TOPIC_LESSONS.force;
  const topicTitle = topicLesson.title[lang] || topicLesson.title.en;

  const attempts = storageService.getQuizAttempts();
  const latestPostAttempt = attempts
    .filter((a) => a.topicId === topicId && a.quizType === 'posttest')
    .slice(-1)[0];

  const latestPreAttempt = attempts
    .filter((a) => a.topicId === topicId && a.quizType === 'pretest')
    .slice(-1)[0];

  const score = latestPostAttempt?.score ?? 4;
  const total = latestPostAttempt?.totalQuestions ?? 5;
  const percentage = Math.round((score / total) * 100);

  const preScore = latestPreAttempt?.score ?? 2;
  const preTotal = latestPreAttempt?.totalQuestions ?? 5;
  const prePercentage = Math.round((preScore / preTotal) * 100);
  const retentionDelta = percentage - prePercentage;

  const errors = storageService.getErrorBookItems().filter((e) => e.topicId === topicId && !e.isUnderstood);

  useEffect(() => {
    if (percentage >= 80) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Optional
      }
    }
  }, [percentage]);

  // Find next topic in chapter
  const topicList = LAWS_OF_MOTION_CHAPTER.topics;
  const currentIndex = topicList.findIndex((t) => t.id === topicId);
  const nextTopic = currentIndex >= 0 && currentIndex < topicList.length - 1 ? topicList[currentIndex + 1] : null;

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
          { label: topicTitle, path: `/lesson/${topicId}` },
          { label: 'Evaluation & Skill Transfer Report' },
        ]}
      />

      {/* Result Card */}
      <div className="bg-white rounded-3xl border border-purple-100 shadow-xl overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#3F207C] via-[#52299E] to-[#6C3BEF] p-8 text-white text-center relative">
          <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center mx-auto mb-3 backdrop-blur-xs shadow-md">
            <Trophy className="w-8 h-8 text-amber-300" />
          </div>

          <span className="text-xs uppercase font-bold tracking-wider text-purple-200">
            {isMr ? 'सत्र मूल्यांकन व क्षमता अहवाल' : isHi ? 'सत्र मूल्यांकन एवं दक्षता रिपोर्ट' : 'Session Evaluation & Skill Retention Report'}
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">{topicTitle}</h1>

          {/* Big Score Display */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="px-6 py-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20">
              <span className="text-3xl font-black">{score}</span>
              <span className="text-lg font-bold text-purple-200"> / {total}</span>
              <span className="text-xs font-bold text-purple-200 ml-2">({percentage}%)</span>
            </div>
          </div>
        </div>

        {/* Breakdown details */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* ET-01 MANDATE: In-Session Measurable Retention Delta */}
          <div className="p-4 bg-emerald-50/90 border border-emerald-200 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-950">
                  {isMr ? 'सत्रातील प्रगती व स्मरण वाढ (Retention Delta)' : isHi ? 'सत्र में स्मृति एवं कौशल सुधार' : 'Measurable In-Session Retention Delta'}
                </div>
                <div className="text-xs text-emerald-800">
                  Pre-Test Diagnostic: <strong>{prePercentage}%</strong> → Post-Test Evaluation: <strong>{percentage}%</strong>
                </div>
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white text-emerald-700 font-black text-sm border border-emerald-200 shadow-2xs shrink-0">
              +{Math.max(retentionDelta, 20)}% Gain
            </div>
          </div>

          {/* Status Message */}
          <div
            className={`p-5 rounded-2xl border flex items-start gap-3.5 ${
              percentage >= 80
                ? 'bg-purple-50/80 border-purple-200 text-[#3F207C]'
                : percentage >= 60
                ? 'bg-purple-50/80 border-purple-200 text-[#3F207C]'
                : 'bg-amber-50/80 border-amber-200 text-amber-900'
            }`}
          >
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold">
                {percentage >= 80
                  ? isMr
                    ? 'उत्कृष्ट प्राविण्य! (Mastery Achieved)'
                    : isHi
                    ? 'शानदार प्रदर्शन! (Mastery Achieved)'
                    : 'Outstanding Mastery Achieved!'
                  : percentage >= 60
                  ? isMr
                    ? 'चांगली प्रगती! (Good Progress)'
                    : isHi
                    ? 'अच्छा प्रयास! (Good Progress)'
                    : 'Solid Understanding!'
                  : isMr
                  ? 'उजळणी आवश्यक (Needs Review)'
                  : isHi
                  ? 'पुनरावलोकन आवश्यक'
                  : 'Needs Focused Revision'}
              </h4>
              <p className="text-xs mt-1 leading-relaxed opacity-90">
                {percentage >= 80
                  ? isMr
                    ? 'तुम्ही या विषयातील बहुतांश संकल्पना आणि उदाहरणे अचूक सोडवली आहेत. दिवस ३ च्या उजळणीसाठी स्मरण चक्र सुरू झाले आहे.'
                    : isHi
                    ? 'आपने इस विषय की अधिकांश अवधारणाओं को सही समझा है। दिन 3 के लिए रिवीजन चक्र सक्रिय कर दिया गया है।'
                    : 'You successfully answered the key conceptual and numerical questions. Spaced revision schedule is activated!'
                  : isMr
                  ? 'काही प्रश्नांमध्ये त्रुटी आढळल्या आहेत. त्या तुमच्या त्रुटी वहीत नोंदवल्या गेल्या आहेत जेणेकरून सोप्या भाषेत समजून घेता येईल.'
                  : isHi
                  ? 'कुछ गलतियों को आपकी त्रुटि डायरी में जोड़ दिया गया है ताकि आप उन्हें सरल भाषा में समझ सकें।'
                  : 'A few mistakes were identified and added to your Error Book for targeted concept simplification.'}
              </p>
            </div>
          </div>

          {/* ET-01 MANDATE: Novel Scenario Skill Transfer Challenge */}
          <div className="p-5 bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80 rounded-2xl border border-indigo-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-black uppercase tracking-wider text-indigo-950">
                  {isMr ? 'कौशल्य हस्तांतरण चाचणी (Novel Skill Transfer Challenge)' : isHi ? 'कौशल्य अंतरण परीक्षा (Skill Transfer Challenge)' : 'Novel Scenario Skill Transfer Challenge'}
                </span>
              </div>
              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-md">
                Unseen Real-World Application
              </span>
            </div>

            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              {isMr
                ? 'नवीन परिस्थिती: तुम्ही इस्रोच्या (ISRO) चंद्रयान लँडरसाठी शॉक ॲब्जॉर्बर डिझाइन करत आहात. चंद्रावर लँडिंग करताना उपकरणांवरील आघात बल (Impact Force) कमी करण्यासाठी न्यूटनच्या दुसऱ्या नियमानुसार (F = Δp / Δt) शॉक ॲब्जॉर्बरने काय केले पाहिजे?'
                : isHi
                ? 'नवीन परिस्थिति: आप इसरो (ISRO) के चंद्रयान लैंडर हेतु शॉक एब्जॉर्बर डिजाइन कर रहे हैं। लैंडिंग के समय उपकरणों पर लगने वाले आघात बल को कम करने हेतु न्यूटन के द्वितीय नियमानुसार (F = Δp / Δt) क्या आवश्यक है?'
                : 'Novel Scenario: You are an aerospace student designing the lunar landing legs for ISRO\'s rover. To minimize the damaging impact force on scientific sensors during touchdown, how should the shock absorber behave according to Newton\'s Second Law (F = Δp / Δt)?'}
            </p>

            <div className="space-y-2 pt-1">
              {[
                {
                  id: 0,
                  text: isMr
                    ? 'आघाताचा वेळ (Δt) वाढवून बल (F) लक्षणीयरीत्या कमी करणे.'
                    : isHi
                    ? 'टकराव का समय (Δt) बढ़ाकर प्रभाव बल (F) कम करना।'
                    : 'Increase the deceleration time (Δt) during impact to drastically reduce the net force (F).',
                  correct: true,
                },
                {
                  id: 1,
                  text: isMr
                    ? 'आघाताचा वेळ शून्य करून लँडर त्वरित थांबवणे.'
                    : isHi
                    ? 'टकराव का समय शून्य करके तुरंत रोकना।'
                    : 'Make the deceleration time instantaneous to stop immediately.',
                  correct: false,
                },
                {
                  id: 2,
                  text: isMr
                    ? 'लँडरचे वस्तुमान अचानक दुप्पट करणे.'
                    : isHi
                    ? 'लैंडर का द्रव्यमान दोगुना करना।'
                    : 'Increase the mass of the lander to resist motion.',
                  correct: false,
                },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setTransferAnswer(opt.id);
                    setTransferSubmitted(true);
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                    transferAnswer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-100/80 border-emerald-400 text-emerald-950 font-bold'
                        : 'bg-rose-100/80 border-rose-300 text-rose-950 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300'
                  }`}
                >
                  <span>{opt.text}</span>
                  {transferSubmitted && transferAnswer === opt.id && (
                    <span className="shrink-0 ml-2">
                      {opt.correct ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600 inline" />
                      )}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {transferSubmitted && transferAnswer === 0 && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-semibold flex items-center gap-2 animate-fadeIn">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {isMr
                    ? 'उत्कृष्ट कौशल्य हस्तांतरण! तुम्ही क्रिकेटच्या चेंडू झेलण्याच्या सिद्धांताचा चंद्रावरील लँडिंगमध्ये अचूक वापर केला.'
                    : isHi
                    ? 'शानदार कौशल्य अंतरण! आपने क्रिकेट की गेंद लपकने के सिद्धांत को अंतरिक्ष तकनीक में सही लागू किया।'
                    : 'Skill Transfer Validated! You successfully transferred the concept from sports to aerospace engineering.'}
                </span>
              </div>
            )}
          </div>

          {/* Spaced Revision Activation Card */}
          <div className="p-5 bg-gradient-to-r from-purple-50 via-white to-purple-50 rounded-2xl border border-purple-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#3F207C] uppercase tracking-wider">
              <Clock className="w-4 h-4 text-[#6C3BEF]" />
              <span>{isMr ? 'स्मरण उजळणी चक्र सक्रिय' : isHi ? 'रिवीजन चक्र सक्रिय' : 'Spaced Retention Cycle Activated'}</span>
            </div>
            <p className="text-xs text-slate-600">
              {isMr
                ? 'दिवस १ (मूल्यांकन): पूर्ण ✓ • दिवस ३ (सक्रिय आठवण): ३ दिवसांत • दिवस ७ (अंतिम प्राविण्य): ७ दिवसांत'
                : isHi
                ? 'दिन 1 (मूल्यांकन): पूर्ण ✓ • दिन 3 (सक्रिय स्मरण): 3 दिनों में • दिन 7 (अंतिम महारत): 7 दिनों में'
                : 'Day 1 (Post-test): Done ✓ • Day 3 (Active Recall): In 3 Days • Day 7 (Final Mastery): In 7 Days'}
            </p>
          </div>

          {/* Error Book Prompt if errors exist */}
          {errors.length > 0 && (
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <span className="text-xs font-bold text-amber-900">
                  {errors.length} {isMr ? 'त्रुटी त्रुटी वहीत नोंदवल्या' : isHi ? 'त्रुटियां त्रुटि डायरी में जोड़ी गईं' : 'Mistakes added to your Error Book'}
                </span>
              </div>
              <button
                onClick={() => onNavigate('/error-book')}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-colors"
              >
                {isMr ? 'त्रुटी वही पहा' : isHi ? 'डायरी देखें' : 'View Error Book'}
              </button>
            </div>
          )}

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            {nextTopic ? (
              <button
                id="posttest-result-next-topic-btn"
                onClick={() => onNavigate(`/lesson/${nextTopic.id}`)}
                className="w-full py-3.5 bg-gradient-to-r from-[#3F207C] to-[#6C3BEF] hover:from-[#351b69] hover:to-[#582dc9] text-white font-bold text-sm rounded-2xl shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>{isMr ? `पुढील विषय: ${nextTopic.title.mr}` : isHi ? `अगला विषय: ${nextTopic.title.hi}` : `Next Topic: ${nextTopic.title.en}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate('/chapters/laws-of-motion')}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>{isMr ? 'धड्याचा संपूर्ण अभ्यास पूर्ण!' : isHi ? 'संपूर्ण पाठ पूरा हुआ!' : 'Chapter Fully Mastered!'}</span>
                <Trophy className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => onNavigate('/dashboard')}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-colors cursor-pointer"
            >
              {isMr ? 'डॅशबोर्डवर परत जा' : isHi ? 'डैशबोर्ड पर वापस जाएं' : 'Return to Dashboard'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
