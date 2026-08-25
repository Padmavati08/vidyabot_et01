import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Sparkles, Filter, Brain, Lightbulb, Search, BookOpen } from 'lucide-react';
import { UserProfile, ErrorBookItem, ErrorType } from '../types';
import { storageService } from '../services/storageService';
import { SimplifiedExplanationModal } from '../components/SimplifiedExplanationModal';
import { PageBackButton } from '../components/PageBackButton';

interface ErrorBookPageProps {
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
}

export const ErrorBookPage: React.FC<ErrorBookPageProps> = ({ userProfile, onNavigate }) => {
  const lang = userProfile.currentLanguage || 'en';
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  const [items, setItems] = useState<ErrorBookItem[]>(storageService.getErrorBookItems());
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'unresolved' | 'understood'>('all');
  const [selectedErrorType, setSelectedErrorType] = useState<string>('all');
  const [selectedItemForModal, setSelectedItemForModal] = useState<ErrorBookItem | null>(null);

  const refreshItems = () => {
    setItems(storageService.getErrorBookItems());
  };

  const handleToggleUnderstood = (id: string) => {
    storageService.toggleErrorUnderstood(id);
    refreshItems();
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    if (selectedStatus === 'unresolved' && item.isUnderstood) return false;
    if (selectedStatus === 'understood' && !item.isUnderstood) return false;
    if (selectedErrorType !== 'all' && item.errorType !== selectedErrorType) return false;
    return true;
  });

  const unresolvedCount = items.filter((i) => !i.isUnderstood).length;

  const errorTypeLabels: Record<ErrorType, { en: string; mr: string; hi: string; color: string }> = {
    conceptual_error: { en: 'Conceptual Error', mr: 'संकल्पनात्मक चूक', hi: 'अवधारणा संबंधी त्रुटि', color: 'bg-purple-100 text-[#6C3BEF] border-purple-200' },
    formula_error: { en: 'Formula Error', mr: 'सूत्र चूक', hi: 'सूत्र संबंधी त्रुटि', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    calculation_error: { en: 'Calculation Error', mr: 'गणना चूक', hi: 'गणना संबंधी त्रुटि', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    careless_error: { en: 'Attention / Reading', mr: 'वाचन / सावधगिरी चूक', hi: 'सावधानी संबंधी त्रुटि', color: 'bg-rose-100 text-rose-800 border-rose-200' },
    memory_error: { en: 'Memory / Recall', mr: 'स्मरण / एकक चूक', hi: 'स्मरण संबंधी त्रुटि', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
  };

  return (
    <div className="py-6 space-y-6 max-w-5xl mx-auto px-4">
      {/* Top Back Navigation Bar */}
      <PageBackButton
        onNavigate={onNavigate}
        fallbackPath="/dashboard"
        label={isMr ? 'डॅशबोर्डकडे परत' : isHi ? 'डैशबोर्ड पर वापस' : 'Back to Dashboard'}
        currentLang={lang}
        breadcrumbs={[
          { label: isMr ? 'माझी त्रुटी वही' : isHi ? 'त्रुटि डायरी' : 'Error Book' },
        ]}
      />

      {/* Header */}
      <div className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>{isMr ? 'वैयक्तिक त्रुटी वही' : isHi ? 'व्यक्तिगत त्रुटि डायरी' : 'Personal Error Notebook'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3F207C]">
              {isMr ? 'माझी त्रुटी वही (Error Book)' : isHi ? 'मेरी त्रुटि डायरी (Error Book)' : 'My Error Book'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {isMr
                ? 'चाचण्यांमध्ये झालेल्या चुकांचा मागोवा घ्या, सोप्या भाषेत संकल्पना समजून घ्या आणि चुकांचे रूपांतर १००% प्राविण्यात करा.'
                : isHi
                ? 'परीक्षाओं में हुई गलतियों को ट्रैक करें, सरल भाषा में समझें और गलतियों को सफलता में बदलें।'
                : 'Track, review, and permanently fix mistakes from pre-tests and post-tests with personalized simplified breakdowns.'}
            </p>
          </div>

          <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-2xl border border-amber-200 shrink-0">
            <AlertCircle className="w-6 h-6 text-amber-600" />
            <div>
              <div className="text-lg font-black text-amber-900">{unresolvedCount}</div>
              <div className="text-[11px] font-bold text-amber-800">
                {isMr ? 'सुधारणा बाकी' : isHi ? 'सुधार बाकी' : 'To Understand'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-purple-100 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Status Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline">Status:</span>
          {(['all', 'unresolved', 'understood'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedStatus === st
                  ? 'bg-[#3F207C] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-purple-50 text-slate-600'
              }`}
            >
              {st === 'all' && (isMr ? 'सर्व' : isHi ? 'सभी' : 'All Errors')}
              {st === 'unresolved' && (isMr ? 'सुधारणा आवश्यक' : isHi ? 'अस्पष्ट' : 'Needs Review')}
              {st === 'understood' && (isMr ? 'समजलेले ✓' : isHi ? 'समझा गया ✓' : 'Understood ✓')}
            </button>
          ))}
        </div>

        {/* Error Type Selector */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedErrorType}
            onChange={(e) => setSelectedErrorType(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white cursor-pointer focus:outline-none focus:border-[#6C3BEF]"
          >
            <option value="all">All Error Classifications</option>
            <option value="conceptual_error">Conceptual Errors</option>
            <option value="formula_error">Formula Errors</option>
            <option value="calculation_error">Calculation Errors</option>
            <option value="careless_error">Attention / Careless</option>
            <option value="memory_error">Memory / Units</option>
          </select>
        </div>
      </div>

      {/* Items List */}
      {filteredItems.length > 0 ? (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const errTypeInfo = errorTypeLabels[item.errorType] || errorTypeLabels.conceptual_error;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl border p-6 transition-all shadow-xs ${
                  item.isUnderstood
                    ? 'border-emerald-100 bg-emerald-50/20 opacity-80'
                    : 'border-purple-100 hover:border-purple-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-100 text-[#3F207C]">
                      {item.topicTitle}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${errTypeInfo.color}`}>
                      {errTypeInfo[lang] || errTypeInfo.en}
                    </span>
                  </div>

                  {/* Toggle Understood checkbox */}
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none self-end sm:self-auto">
                    <input
                      type="checkbox"
                      checked={item.isUnderstood}
                      onChange={() => handleToggleUnderstood(item.id)}
                      className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                    />
                    <span className={item.isUnderstood ? 'text-emerald-700 font-bold' : ''}>
                      {isMr ? 'समजले म्हणून नोंदवा' : isHi ? 'समझ आ गया मार्क करें' : 'Mark as Understood'}
                    </span>
                  </label>
                </div>

                {/* Question */}
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3 leading-relaxed">
                  {item.questionText}
                </h3>

                {/* Answers Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl">
                    <span className="font-bold text-rose-800">
                      {isMr ? 'तुमची निवड:' : isHi ? 'आपका उत्तर:' : 'You Selected:'}
                    </span>
                    <div className="text-rose-900 font-semibold mt-0.5">{item.studentAnswer}</div>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                    <span className="font-bold text-emerald-800">
                      {isMr ? 'अचूक उत्तर:' : isHi ? 'सही उत्तर:' : 'Correct Answer:'}
                    </span>
                    <div className="text-emerald-900 font-semibold mt-0.5">{item.correctAnswer}</div>
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  <strong className="text-slate-700">Explanation: </strong>
                  {item.explanation}
                </p>

                {/* Simplified Breakdown CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedItemForModal(item)}
                    className="px-4 py-2 bg-gradient-to-r from-[#3F207C] to-[#6C3BEF] hover:from-[#351b69] hover:to-[#582dc9] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isMr ? 'सोप्या भाषेत समजावून सांगा' : isHi ? 'सरल भाषा में समझें' : 'Explain More Simply'}</span>
                  </button>

                  <span className="text-[11px] text-slate-400 font-medium">
                    Added: {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-purple-100 p-12 text-center shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {isMr ? 'त्रुटी वही स्वच्छ आहे!' : isHi ? 'त्रुटि डायरी साफ है!' : 'No Mistakes in Error Book!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
              {isMr
                ? 'तुम्ही सोडवलेल्या सर्व चाचण्यांमध्ये १००% अचूकता ठेवली आहे किंवा सर्व चुका समजून घेतल्या आहेत.'
                : isHi
                ? 'आपने सभी प्रश्नों के सही उत्तर दिए हैं या सभी त्रुटियों को समझ लिया है।'
                : 'All questions across your pre-tests and post-tests were answered correctly or marked as fully understood!'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('/chapters/laws-of-motion')}
            className="px-6 py-2.5 bg-[#6C3BEF] hover:bg-[#582dc9] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all"
          >
            {isMr ? 'धड्याकडे जा' : isHi ? 'पाठ पर जाएं' : 'Continue Learning Topics'}
          </button>
        </div>
      )}

      {/* Simplified Explanation Modal */}
      {selectedItemForModal && (
        <SimplifiedExplanationModal
          item={selectedItemForModal}
          language={lang}
          onClose={() => {
            setSelectedItemForModal(null);
            refreshItems();
          }}
        />
      )}
    </div>
  );
};
