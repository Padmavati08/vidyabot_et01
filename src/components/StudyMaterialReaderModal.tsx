import React, { useState } from 'react';
import { X, BookOpen, Volume2, VolumeX, Copy, Check, Sparkles, FileText, CheckCircle2, MessageSquareText, HelpCircle, ArrowRight } from 'lucide-react';
import { UploadedMaterial, LanguageCode } from '../types';
import { ttsService } from '../services/ttsService';

interface StudyMaterialReaderModalProps {
  material: UploadedMaterial;
  currentLang: LanguageCode;
  onClose: () => void;
  onAskDoubt?: (questionPrompt: string) => void;
}

export const StudyMaterialReaderModal: React.FC<StudyMaterialReaderModalProps> = ({
  material,
  currentLang,
  onClose,
  onAskDoubt,
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'key_points' | 'quiz'>('notes');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<Record<number, number>>({});
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<Record<number, boolean>>({});

  const isMr = currentLang === 'mr';
  const isHi = currentLang === 'hi';

  const defaultFullNotes = material.fullNotes || `### Class 9 Science: Laws of Motion & Mechanics
**Chapter Reference:** Maharashtra State Board Science (Chapter 1) & NCERT Chapter 9

#### 1. Understanding Force & Motion
Force is an external influence in the form of a push or a pull that can alter the state of rest, the velocity of uniform motion, or the geometrical shape and dimensions of an object.
- **SI Unit:** Newton (N)
- **CGS Unit:** Dyne (1 N = 10⁵ dyne)
- **Vector Nature:** Force has both magnitude and specific spatial direction.

#### 2. Balanced vs. Unbalanced Forces
- **Balanced Forces:** When multiple forces act simultaneously on a body such that their vector sum (resultant net force) equals zero ($F_{net} = 0$). Balanced forces cannot accelerate an object, though they can deform its shape (e.g., compressing a rubber ball).
- **Unbalanced Forces:** When the vector sum of forces acting on a body is non-zero ($F_{net} \\neq 0$). Unbalanced forces generate an acceleration ($a$) in the direction of the resultant force.

#### 3. Newton's Three Laws of Motion
1. **First Law (Law of Inertia):** An object remains in a state of rest or of uniform motion in a straight line unless acted upon by an unbalanced external force.
   - *Inertia of Rest:* Inability of a stationary body to move on its own (e.g., passengers jerk backward when a bus suddenly starts).
   - *Inertia of Motion:* Tendency of a moving object to continue moving at the same speed (e.g., passengers lurch forward when brakes are applied).
   - *Inertia of Direction:* Tendency to maintain direction (e.g., leaning outward on sharp curves).
2. **Second Law (Momentum & Acceleration):** The rate of change of momentum of an object is directly proportional to the applied unbalanced force and occurs in the direction of the force.
   - *Formula:* $F = m \\times a$ (Force = Mass $\\times$ Acceleration)
   - *Momentum:* $p = m \\times v$ (Unit: kg·m/s)
3. **Third Law (Action and Reaction):** To every action force, there is always an equal, instantaneous, and opposite reaction force.
   - Action and reaction forces act on **two different bodies**, never canceling each other out.
   - Example: Rocket propulsion expelling burnt exhaust gases downward while the rocket accelerates upward.`;

  const defaultKeyConcepts = material.keyConcepts || [
    'Force is a vector quantity having both magnitude and direction.',
    'Net force zero = Balanced force (velocity remains constant).',
    'Mass is the quantitative measure of inertia: higher mass means higher inertia.',
    'Linear momentum is the product of mass and velocity: p = m × v.',
    '1 Newton is the force needed to accelerate a 1 kg mass at 1 m/s².',
    'Action and reaction pairs act on distinct interacting bodies, never on the same object.',
  ];

  const defaultKeyFormulas = material.keyFormulas || [
    'F_net = m × a (Force = Mass × Acceleration)',
    'p = m × v (Linear Momentum = Mass × Velocity)',
    '1 N = 1 kg·m/s² = 10⁵ dyne',
    'a = (v - u) / t (Acceleration definition)',
    'F_AB = - F_BA (Newton’s 3rd Law Action-Reaction Vector Equality)',
  ];

  const defaultPracticeQuestions = material.practiceQuestions || [
    'Why does an athlete run some distance before taking a long jump? (Inertia of motion assists forward momentum)',
    'If a net force of 20 N acts on a mass of 4 kg, what is its acceleration? (a = F/m = 20/4 = 5 m/s²)',
    'Why do action and reaction forces not cancel each other out? (Because they act on two different interacting bodies)',
  ];

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      ttsService.stop();
      setIsSpeaking(false);
    } else {
      const textToSpeak = `${material.title}. ${material.extractedSummary || ''}. ${defaultKeyConcepts.slice(0, 3).join('. ')}`;
      setIsSpeaking(true);
      ttsService.speak(textToSpeak, currentLang, () => {
        setIsSpeaking(false);
      });
    }
  };

  const handleCopyNotes = () => {
    const fullText = `${material.title}\n\n${material.extractedSummary || ''}\n\n${defaultFullNotes}\n\nKey Formulas:\n${defaultKeyFormulas.join('\n')}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl border border-purple-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3F207C] to-[#582dc9] text-white p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-purple-100">
                {material.type.toUpperCase()} • {material.subject}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-300 font-bold bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                Indexed for AI Grounding
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">{material.title}</h2>
            <p className="text-xs text-purple-200">
              Uploaded: {material.uploadedAt} • Size: {material.fileSize || 'Standard Note'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Audio narration button */}
            <button
              onClick={handleToggleSpeak}
              title={isSpeaking ? 'Stop Reading' : 'Listen to Study Notes'}
              className={`p-2.5 rounded-2xl transition-all cursor-pointer ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-900 ring-2 ring-white shadow-md animate-pulse'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopyNotes}
              title="Copy notes to clipboard"
              className="p-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-300" /> : <Copy className="w-5 h-5" />}
            </button>

            {/* Close button */}
            <button
              onClick={() => {
                ttsService.stop();
                onClose();
              }}
              className="p-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-purple-100 bg-purple-50/50 px-4 sm:px-6 pt-2 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'notes'
                ? 'border-[#6C3BEF] text-[#3F207C] bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 hover:text-[#6C3BEF]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{isMr ? 'संपूर्ण नोट्स वाचा' : isHi ? 'संपूर्ण नोट्स पढ़ें' : 'Full Study Notes'}</span>
          </button>

          <button
            onClick={() => setActiveTab('key_points')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'key_points'
                ? 'border-[#6C3BEF] text-[#3F207C] bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 hover:text-[#6C3BEF]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{isMr ? 'महत्त्वाचे नियम व सूत्रे' : isHi ? 'मुख्य नियम एवं सूत्र' : 'Formulas & Concepts'}</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'border-[#6C3BEF] text-[#3F207C] bg-white rounded-t-xl shadow-xs'
                : 'border-transparent text-slate-600 hover:text-[#6C3BEF]'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-[#6C3BEF]" />
            <span>{isMr ? 'स्वयं-मूल्यांकन प्रश्न' : isHi ? 'आत्म-परीक्षण प्रश्न' : 'Self-Check Questions'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-sm leading-relaxed">
          {/* Summary Callout */}
          {material.extractedSummary && (
            <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4">
              <div className="text-xs font-black text-[#3F207C] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#6C3BEF]" />
                <span>Executive Summary</span>
              </div>
              <p className="text-xs text-slate-700">{material.extractedSummary}</p>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4 prose prose-slate max-w-none">
              <div className="whitespace-pre-line text-xs sm:text-sm text-slate-700 leading-relaxed font-sans space-y-3 bg-slate-50/60 p-5 rounded-2xl border border-slate-200">
                {defaultFullNotes}
              </div>
            </div>
          )}

          {activeTab === 'key_points' && (
            <div className="space-y-6">
              {/* Formula Bank */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#3F207C] mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Key Mathematical Formulas & Units</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {defaultKeyFormulas.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-xs font-mono font-bold text-indigo-950 flex items-center justify-between"
                    >
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Concepts */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#3F207C] mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Crucial Concepts & Definitions</span>
                </h4>
                <div className="space-y-2.5">
                  {defaultKeyConcepts.map((c, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-700 flex items-start gap-2.5 shadow-2xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-[#6C3BEF] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 font-medium">
                Review these high-yield conceptual questions to solidify your understanding of this note:
              </div>
              <div className="space-y-3">
                {defaultPracticeQuestions.map((q, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-purple-100 bg-white shadow-2xs space-y-2"
                  >
                    <div className="text-xs font-bold text-slate-900 flex items-start gap-2">
                      <span className="text-[#6C3BEF] font-black">Q{idx + 1}.</span>
                      <span>{q.split('(')[0].trim()}</span>
                    </div>
                    {q.includes('(') && (
                      <div className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 font-medium">
                        💡 <strong>Key Explanation:</strong> {q.split('(')[1].replace(')', '')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <span>Need clarification on this note?</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onAskDoubt && (
              <button
                onClick={() => {
                  ttsService.stop();
                  onClose();
                  onAskDoubt(`Explain this concept from my note: "${material.title}"`);
                }}
                className="flex-1 sm:flex-none px-4 py-2 bg-[#6C3BEF] hover:bg-[#582dc9] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquareText className="w-4 h-4" />
                <span>Ask Vidyabot about this note</span>
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
