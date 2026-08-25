import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Award, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserProfile, QuizQuestion, QuizAttempt, ErrorBookItem, ErrorType } from '../types';
import { POST_TEST_QUESTIONS, TOPIC_LESSONS } from '../data/lawsOfMotionData';
import { storageService } from '../services/storageService';
import { PageBackButton } from '../components/PageBackButton';

interface PostTestPageProps {
  topicId: string;
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
}

export const PostTestPage: React.FC<PostTestPageProps> = ({ topicId, userProfile, onNavigate }) => {
  const lang = userProfile.currentLanguage || 'en';
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  const questions: QuizQuestion[] = POST_TEST_QUESTIONS[topicId] || POST_TEST_QUESTIONS.force;
  const topicLesson = TOPIC_LESSONS[topicId] || TOPIC_LESSONS.force;
  const topicTitle = topicLesson.title[lang] || topicLesson.title.en;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const currentQ = questions[currentIndex];
  const qText = currentQ.question[lang] || currentQ.question.en;
  const options = currentQ.options[lang] || currentQ.options.en;

  const handleSelect = (idx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: idx });
  };

  const handleSubmit = () => {
    let score = 0;
    const errorsToSave: ErrorBookItem[] = [];

    questions.forEach((q, idx) => {
      const selectedIdx = selectedAnswers[idx];
      const isCorrect = selectedIdx === q.correctIndex;

      if (isCorrect) {
        score++;
      } else {
        const studentAns = selectedIdx !== undefined && selectedIdx >= 0 ? q.options.en[selectedIdx] : 'No Option Selected';
        const correctAns = q.options.en[q.correctIndex];

        errorsToSave.push({
          id: `err-${topicId}-${q.id}-${Date.now()}`,
          topicId,
          questionId: q.id,
          questionText: q.question.en,
          studentAnswer: studentAns,
          correctAnswer: correctAns,
          explanation: q.explanation.en,
          errorType: q.errorType || 'conceptual_error',
          conceptKey: q.conceptKey || 'inertia',
          isUnderstood: false,
          createdAt: new Date().toISOString(),
        });
      }
    });

    if (errorsToSave.length > 0) {
      storageService.addErrorBookItems(errorsToSave);
    }

    const attempt: QuizAttempt = {
      id: `post-${topicId}-${Date.now()}`,
      topicId,
      quizType: 'posttest',
      score,
      totalQuestions: questions.length,
      timestamp: new Date().toISOString(),
      answers: questions.map((q, idx) => ({
        questionId: q.id,
        selectedOptionIndex: selectedAnswers[idx] ?? -1,
        isCorrect: selectedAnswers[idx] === q.correctIndex,
        errorType: q.errorType,
        conceptKey: q.conceptKey || 'inertia',
      })),
    };

    storageService.saveQuizAttempt(attempt);
    storageService.setTopicStatus(topicId, 'completed');
    storageService.createRevisionScheduleForTopic(topicId);
    storageService.checkAndUnlockBadges();

    onNavigate(`/post-test-result/${topicId}`);
  };

  const isAllAnswered = questions.every((_, idx) => selectedAnswers[idx] !== undefined);

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* Top Back Navigation Bar */}
      <PageBackButton
        onNavigate={onNavigate}
        fallbackPath={`/lesson/${topicId}`}
        label={isMr ? 'धड्याकडे परत' : isHi ? 'पाठ पर वापस' : 'Back to Lesson'}
        currentLang={lang}
        breadcrumbs={[
          { label: isMr ? 'गतीचे नियम' : isHi ? 'गति के नियम' : 'Laws of Motion', path: '/chapters/laws-of-motion' },
          { label: topicTitle, path: `/lesson/${topicId}` },
          { label: 'Post-Test Assessment' },
        ]}
      />

      {/* Card */}
      <div className="bg-white rounded-3xl border border-purple-100 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3F207C] to-[#6C3BEF] p-6 text-white">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-xs">
                <Award className="w-5 h-5 text-purple-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold text-purple-200 tracking-wider">
                    Post-Test Evaluation
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-300/20 font-semibold text-purple-100">
                    5 Questions
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold mt-0.5">{topicTitle}</h2>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold text-purple-200">
                {currentIndex + 1} / {questions.length}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/20 h-1.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-purple-300 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-xs font-bold text-[#6C3BEF] uppercase tracking-wider">
            {isMr ? `प्रश्न क्रमांक ${currentIndex + 1}` : isHi ? `प्रश्न संख्या ${currentIndex + 1}` : `Question ${currentIndex + 1}`}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
            {qText}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  id={`posttest-opt-${optIdx}`}
                  onClick={() => handleSelect(optIdx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-50 border-[#6C3BEF] text-[#3F207C] font-semibold shadow-xs'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-purple-50/40 hover:border-purple-200'
                  }`}
                >
                  <span className="text-xs sm:text-sm">{opt}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ml-3 ${
                      isSelected
                        ? 'border-[#6C3BEF] bg-[#6C3BEF] text-white font-bold'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && '✓'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              {isMr ? 'मागील' : isHi ? 'पिछला' : 'Previous'}
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                disabled={selectedAnswers[currentIndex] === undefined}
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="px-5 py-2.5 bg-[#6C3BEF] hover:bg-[#582dc9] disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{isMr ? 'पुढील' : isHi ? 'अगला' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                disabled={!isAllAnswered}
                onClick={handleSubmit}
                id="posttest-submit-btn"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{isMr ? 'चाचणी सबमिट करा' : isHi ? 'परीक्षा सबमिट करें' : 'Submit Evaluation'}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
