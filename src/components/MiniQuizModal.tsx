import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Award, Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LanguageCode, QuizQuestion } from '../types';
import { POST_TEST_QUESTIONS } from '../data/lawsOfMotionData';
import { storageService } from '../services/storageService';

interface MiniQuizModalProps {
  topicId: string;
  level: number;
  dayLabel: string;
  language: LanguageCode;
  onClose: () => void;
  onCompleted: (score: number) => void;
}

export const MiniQuizModal: React.FC<MiniQuizModalProps> = ({
  topicId,
  level,
  dayLabel,
  language,
  onClose,
  onCompleted,
}) => {
  const isMr = language === 'mr';
  const isHi = language === 'hi';

  const questions: QuizQuestion[] = (POST_TEST_QUESTIONS[topicId] || POST_TEST_QUESTIONS.force).slice(0, 3);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const currentQ = questions[currentIndex];
  const qText = currentQ.question[language] || currentQ.question.en;
  const options = currentQ.options[language] || currentQ.options.en;

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: optIdx });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) score++;
    });
    return score;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    storageService.completeRevisionLevel(topicId, level, score);
    if (score >= 2) {
      try {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      } catch {
        // Confetti optional
      }
    }
  };

  const finalScore = calculateScore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3F207C] to-[#6C3BEF] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-200" />
            <div>
              <h3 className="font-bold text-sm">
                {dayLabel} {isMr ? 'उजळणी मिनी-चाचणी' : isHi ? 'पुनरावलोकन मिनी-क्विज' : 'Active Recall Mini-Quiz'}
              </h3>
              <p className="text-[11px] text-purple-200/90">
                {isMr ? '३ जलद प्रश्नांसह संकल्पना पक्की करा' : isHi ? '3 त्वरित प्रश्नों से अवधारणा मजबूत करें' : 'Reinforce memory with 3 quick recall questions'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-purple-200 hover:text-white cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {!isSubmitted ? (
            <div>
              {/* Progress counter */}
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-2">
                <span>
                  {isMr ? `प्रश्न ${currentIndex + 1} पैकी ३` : isHi ? `प्रश्न ${currentIndex + 1} / 3` : `Question ${currentIndex + 1} of 3`}
                </span>
                <span className="text-[#6C3BEF]">
                  {Math.round(((currentIndex + 1) / 3) * 100)}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-[#6C3BEF] h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / 3) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h4 className="text-sm sm:text-base font-bold text-slate-800 mb-4 leading-relaxed">
                {qText}
              </h4>

              {/* Options */}
              <div className="space-y-2">
                {options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-purple-50 border-[#6C3BEF] text-[#3F207C] font-semibold shadow-xs'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{opt}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 ml-2 ${
                          isSelected
                            ? 'border-[#6C3BEF] bg-[#6C3BEF] text-white font-bold'
                            : 'border-slate-300'
                        }`}
                      >
                        {isSelected && '✓'}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  {isMr ? 'मागील' : isHi ? 'पिछला' : 'Previous'}
                </button>

                {currentIndex < 2 ? (
                  <button
                    disabled={selectedAnswers[currentIndex] === undefined}
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="px-4 py-2 bg-[#6C3BEF] hover:bg-[#582dc9] disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1"
                  >
                    <span>{isMr ? 'पुढील' : isHi ? 'अगला' : 'Next'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    disabled={selectedAnswers[currentIndex] === undefined}
                    onClick={handleSubmit}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                  >
                    ✓ {isMr ? 'चाचणी सबमिट करा' : isHi ? 'क्विज सबमिट करें' : 'Submit Revision Quiz'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-purple-100 text-[#6C3BEF] flex items-center justify-center mx-auto shadow-md">
                <Trophy className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#3F207C]">
                  {isMr ? 'उजळणी यशस्वी झाली!' : isHi ? 'पुनरावलोकन पूरा हुआ!' : 'Revision Session Completed!'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {isMr ? `तुमचा गुण: ३ पैकी ${finalScore}` : isHi ? `आपका स्कोर: 3 में से ${finalScore}` : `You scored ${finalScore} out of 3`}
                </p>
              </div>

              {/* Review questions summary */}
              <div className="space-y-2 text-left text-xs max-h-48 overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const studentAns = selectedAnswers[idx];
                  const isCorrect = studentAns === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                        isCorrect ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50/70 border-rose-200'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-semibold text-slate-800">{q.question[language] || q.question.en}</p>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {q.explanation[language] || q.explanation.en}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  onCompleted(finalScore);
                  onClose();
                }}
                className="w-full py-2.5 bg-[#6C3BEF] hover:bg-[#582dc9] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
              >
                {isMr ? 'डॅशबोर्डकडे जा' : isHi ? 'डैशबोर्ड पर जाएं' : 'Back to Revision'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
