import React, { useState, useEffect } from 'react';
import { X, Sparkles, Lightbulb, CheckCircle2, AlertCircle, Volume2, Loader2, Brain } from 'lucide-react';
import { ErrorBookItem, LanguageCode } from '../types';
import { aiService } from '../services/aiService';
import { ttsService } from '../services/ttsService';
import { storageService } from '../services/storageService';

interface SimplifiedExplanationModalProps {
  item: ErrorBookItem | null;
  language: LanguageCode;
  onClose: () => void;
}

export const SimplifiedExplanationModal: React.FC<SimplifiedExplanationModalProps> = ({
  item,
  language,
  onClose,
}) => {
  const [simplifiedText, setSimplifiedText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const isMr = language === 'mr';
  const isHi = language === 'hi';

  useEffect(() => {
    if (!item) return;

    if (item.simplifiedExplanation) {
      setSimplifiedText(item.simplifiedExplanation);
      return;
    }

    const fetchSimplification = async () => {
      setLoading(true);
      try {
        const text = await aiService.getSimplifiedExplanation({
          questionText: item.questionText,
          studentAnswer: item.studentAnswer,
          correctAnswer: item.correctAnswer,
          explanation: item.explanation,
          errorType: item.errorType,
          language,
        });
        setSimplifiedText(text);
        storageService.saveSimplifiedExplanation(item.id, text);
      } catch {
        setSimplifiedText(item.explanation);
      } finally {
        setLoading(false);
      }
    };

    fetchSimplification();
  }, [item, language]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3F207C] to-[#6C3BEF] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-xs">
              <Brain className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {isMr ? 'संकल्पना सोप्या भाषेत समजून घ्या' : isHi ? 'सरल भाषा में अवधारणा समझें' : 'Simplified Concept Breakdown'}
              </h3>
              <p className="text-xs text-purple-200/90 capitalize">
                Error classification: {item.errorType.replace('_', ' ')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-purple-200 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Original Question and answers comparison */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {isMr ? 'मूळ प्रश्न' : isHi ? 'मूल प्रश्न' : 'Original Question'}
            </div>
            <p className="text-sm font-semibold text-slate-800">{item.questionText}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-800">
                    {isMr ? 'तुमची निवड:' : isHi ? 'आपका चयन:' : 'Your Answer:'}
                  </span>
                  <div className="text-rose-900 font-medium">{item.studentAnswer}</div>
                </div>
              </div>

              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-800">
                    {isMr ? 'अचूक उत्तर:' : isHi ? 'सही उत्तर:' : 'Correct Answer:'}
                  </span>
                  <div className="text-emerald-900 font-medium">{item.correctAnswer}</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Simplified Breakdown */}
          <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#3F207C]">
                <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{isMr ? 'विद्याबॉटचे सोपे विश्लेषण' : isHi ? 'विद्याबॉट का सरल विश्लेषण' : 'Vidyabot Intuitive Explanation'}</span>
              </div>
              <button
                onClick={() => ttsService.speak(simplifiedText, language)}
                className="flex items-center gap-1 text-[11px] font-bold text-[#6C3BEF] hover:text-[#3F207C] cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isMr ? 'ऐका' : isHi ? 'सुनें' : 'Read Aloud'}</span>
              </button>
            </div>

            {loading ? (
              <div className="py-6 flex flex-col items-center justify-center gap-2 text-xs text-slate-500">
                <Loader2 className="w-5 h-5 text-[#6C3BEF] animate-spin" />
                <span>{isMr ? 'सोपे स्पष्टीकरण तयार करत आहे...' : isHi ? 'सरल व्याख्या तैयार हो रही है...' : 'Crafting personalized simplified explanation...'}</span>
              </div>
            ) : (
              <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                {simplifiedText}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
          <button
            onClick={() => {
              storageService.toggleErrorUnderstood(item.id);
              onClose();
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            ✓ {isMr ? 'समजले म्हणून चिन्हांकित करा' : isHi ? 'समझ आ गया मार्क करें' : 'Mark as Understood'}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            {isMr ? 'बंद करा' : isHi ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
