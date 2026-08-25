import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, FileText, AlertCircle, Volume2, Loader2, HelpCircle, Network } from 'lucide-react';
import { DoubtMessage, LanguageCode } from '../types';
import { aiService } from '../services/aiService';
import { ttsService } from '../services/ttsService';

interface DoubtAssistantProps {
  topicId: string;
  topicTitle: string;
  language: LanguageCode;
}

export const DoubtAssistant: React.FC<DoubtAssistantProps> = ({ topicId, topicTitle, language }) => {
  const [messages, setMessages] = useState<DoubtMessage[]>([
    {
      id: 'welcome-doubt-1',
      sender: 'vidyabot',
      text:
        language === 'mr'
          ? `नमस्कार! मी विद्याबॉट आहे. "${topicTitle}" या धड्यातील कोणतीही शंका असल्यास मला निःसंकोच विचारा.`
          : language === 'hi'
          ? `नमस्ते! मैं विद्याबॉट हूँ। "${topicTitle}" पाठ से संबंधित कोई भी संदेह हो तो बिना झिझक पूछें।`
          : `Hello! I am Vidyabot. Have any doubts about "${topicTitle}"? Ask me anything below!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sourceType: 'lesson_content',
      sourceTitle: 'Vidyabot AI Tutor',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isMr = language === 'mr';
  const isHi = language === 'hi';

  const suggestedQuestions: Record<string, { en: string[]; mr: string[]; hi: string[] }> = {
    force: {
      en: ['Why is net force zero in balanced forces?', 'Give a daily-life example of unbalanced force', 'What is the SI unit of force?'],
      mr: ['संतुलित बलांमध्ये परिणामी बल शून्य का असते?', 'असंतुलित बलाचे दैनंदिन जीवनातील उदाहरण द्या', 'बलाचे SI एकक कोणते?'],
      hi: ['संतुलित बलों में परिणामी बल शून्य क्यों होता है?', 'असंतुलित बल का दैनिक जीवन से उदाहरण दें', 'बल का SI मात्रक क्या है?'],
    },
    'newtons-first-law': {
      en: ['Why do passengers lean forward when a bus brakes?', 'What is inertia and how is it measured?', 'Explain coin and cardboard experiment'],
      mr: ['बसने ब्रेक लावल्यावर प्रवासी पुढे का झुकतात?', 'जडत्व म्हणजे काय आणि ते कसे मोजतात?', 'नाणे आणि पुठ्ठ्याचा प्रयोग समजावून सांगा'],
      hi: ['बस के ब्रेक लगाने पर यात्री आगे क्यों झुकते हैं?', 'जड़त्व क्या है और इसे कैसे मापा जाता है?', 'सिक्के और कार्डबोर्ड का प्रयोग समझाएं'],
    },
    'newtons-second-law': {
      en: ['How does a cricket player prevent hand injuries?', 'What is the formula for momentum?', 'Explain F = m * a with numericals'],
      mr: ['कॅच घेताना खेळाडू हात मागे का ओढतो?', 'संवेगाचे सूत्र काय आहे?', 'F = m * a हे सूत्र उदाहरणासह सांगा'],
      hi: ['कैच पकड़ते समय खिलाड़ी हाथ पीछे क्यों खींचता है?', 'संवेग का सूत्र क्या है?', 'F = m * a को उदाहरण सहित समझाएं'],
    },
    'newtons-third-law': {
      en: ['Why do action and reaction forces not cancel out?', 'How does a rocket fly into space?', 'Explain gun recoil in terms of 3rd law'],
      mr: ['क्रिया आणि प्रतिक्रिया बले एकमेकांना रद्द का करत नाहीत?', 'रॉकेट अवकाशात कसे उडते?', 'बंदुकीचा झटका ३ ऱ्या नियमाप्रमाणे समजावा'],
      hi: ['क्रिया और प्रतिक्रिया बल एक-दूसरे को निरस्त क्यों नहीं करते?', 'रॉकेट अंतरिक्ष में कैसे उड़ता है?', 'बंदूक का झटका तीसरे नियम से समझाएं'],
    },
  };

  const currentSuggestions = suggestedQuestions[topicId]
    ? suggestedQuestions[topicId][language] || suggestedQuestions[topicId].en
    : suggestedQuestions.force.en;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || loading) return;

    const userMsg: DoubtMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await aiService.askDoubt({
        question: query,
        topicId,
        language,
        conversationHistory: messages.map((m) => ({ sender: m.sender, text: m.text })),
      });

      const botMsg: DoubtMessage = {
        id: `bot-${Date.now()}`,
        sender: 'vidyabot',
        text: response.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceType: response.sourceType,
        sourceTitle: response.sourceTitle,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const fallbackMsg: DoubtMessage = {
        id: `bot-${Date.now()}`,
        sender: 'vidyabot',
        text: isMr
          ? 'मला उपलब्ध साहित्यात उत्तर शोधता आले नाही. कृपया प्रश्न पुन्हा विचारा.'
          : isHi
          ? 'मुझे उपलब्ध सामग्री में उत्तर नहीं मिला। कृपया पुनः प्रयास करें।'
          : 'I could not process this request right now. Please try asking again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceType: 'fallback_not_found',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-purple-100 shadow-lg overflow-hidden flex flex-col h-[520px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3F207C] to-[#6C3BEF] px-5 py-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xs border border-white/20">
            <Bot className="w-5 h-5 text-purple-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm">Vidyabot Tutor</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Grounded Q&A
              </span>
            </div>
            <p className="text-[11px] text-purple-200/90 truncate max-w-[240px] sm:max-w-md">
              {isMr ? `सध्याचा विषय: ${topicTitle}` : isHi ? `वर्तमान विषय: ${topicTitle}` : `Active Context: ${topicTitle}`}
            </p>
          </div>
        </div>

        <div className="text-[11px] font-semibold text-purple-200/80 hidden sm:block">
          {isMr ? 'भाषा: मराठी' : isHi ? 'भाषा: हिंदी' : 'Language: English'}
        </div>
      </div>

      {/* Suggested chips */}
      <div className="px-4 py-2 bg-purple-50/70 border-b border-purple-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
        <span className="text-slate-400 font-bold text-[11px] whitespace-nowrap flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-[#6C3BEF]" />
          {isMr ? 'सूचना:' : isHi ? 'सुझाव:' : 'Try:'}
        </span>
        {currentSuggestions.map((sq, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(sq)}
            className="px-2.5 py-1 bg-white hover:bg-purple-100 border border-purple-200/80 rounded-full text-slate-700 hover:text-[#3F207C] font-medium whitespace-nowrap transition-colors cursor-pointer text-[11px]"
          >
            {sq}
          </button>
        ))}
      </div>

      {/* Messages Thread */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
        {messages.map((msg) => {
          const isBot = msg.sender === 'vidyabot';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[88%] ${isBot ? 'self-start' : 'ml-auto flex-row-reverse'}`}
            >
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isBot
                    ? 'bg-[#6C3BEF] text-white shadow-xs'
                    : 'bg-slate-700 text-white'
                }`}
              >
                {isBot ? 'V' : 'You'}
              </div>

              <div className="space-y-1">
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    isBot
                      ? 'bg-white text-slate-800 border border-purple-100/80 shadow-xs'
                      : 'bg-[#6C3BEF] text-white rounded-tr-xs shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Source attribution & audio read badge */}
                <div className={`flex items-center gap-2 text-[10px] ${isBot ? 'text-slate-400' : 'text-slate-400 justify-end'}`}>
                  <span>{msg.timestamp}</span>

                  {isBot && msg.sourceType && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-semibold border ${
                          msg.sourceType === 'n8n_workflow'
                            ? 'bg-purple-50 text-[#6C3BEF] border-purple-200 shadow-xs'
                            : msg.sourceType === 'lesson_content'
                            ? 'bg-purple-50 text-[#6C3BEF] border-purple-200'
                            : msg.sourceType === 'uploaded_material'
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : msg.sourceType === 'gemini_ai'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {msg.sourceType === 'n8n_workflow' && <Network className="w-3 h-3 text-[#6C3BEF]" />}
                        {msg.sourceType === 'lesson_content' && <BookOpen className="w-3 h-3" />}
                        {msg.sourceType === 'uploaded_material' && <FileText className="w-3 h-3" />}
                        {msg.sourceType === 'gemini_ai' && <Sparkles className="w-3 h-3" />}
                        {msg.sourceType === 'fallback_not_found' && <AlertCircle className="w-3 h-3" />}
                        {msg.sourceType === 'n8n_workflow' && 'n8n Workflow Engine'}
                        {msg.sourceType === 'lesson_content' && (isMr ? 'धड्यावर आधारित' : isHi ? 'पाठ्य सामग्री आधारित' : 'Curriculum Grounded')}
                        {msg.sourceType === 'uploaded_material' && (isMr ? 'तुमच्या फाइलीवर आधारित' : isHi ? 'आपकी फ़ाइल पर आधारित' : 'Uploaded Material')}
                        {msg.sourceType === 'gemini_ai' && 'Gemini Grounded Tutor'}
                        {msg.sourceType === 'fallback_not_found' && (isMr ? 'साहित्यात उपलब्ध नाही' : isHi ? 'सामग्री में अनुपलब्ध' : 'Out of Scope / Not Found')}
                      </span>

                      {msg.sourceTitle && (
                        <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 truncate max-w-[200px]" title={msg.sourceTitle}>
                          📌 {msg.sourceTitle}
                        </span>
                      )}
                    </div>
                  )}

                  {isBot && (
                    <button
                      onClick={() => ttsService.speak(msg.text, language)}
                      className="p-1 text-slate-400 hover:text-[#6C3BEF] rounded-md transition-colors cursor-pointer"
                      title="Read aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-2.5 max-w-[80%] items-center text-xs text-slate-500 bg-white p-3 rounded-2xl border border-purple-100 shadow-xs">
            <Loader2 className="w-4 h-4 text-[#6C3BEF] animate-spin" />
            <span>
              {isMr ? 'विद्याबॉट उत्तर शोधत आहे...' : isHi ? 'विद्याबॉट उत्तर खोज रहा है...' : 'Vidyabot is researching and formulating explanation...'}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <div className="p-3 bg-white border-t border-purple-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            id="doubt-assistant-input"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              isMr
                ? 'काही शंका आहे? विद्याबॉटला विचारा...'
                : isHi
                ? 'कोई संदेह है? विद्याबॉट से पूछें...'
                : 'Any doubt? Ask Vidyabot (e.g. Why does bus lean?)...'
            }
            className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-100/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C3BEF] rounded-2xl text-xs sm:text-sm text-slate-800 transition-all"
          />

          <button
            type="submit"
            id="doubt-assistant-send-btn"
            disabled={!inputQuery.trim() || loading}
            className="w-10 h-10 rounded-2xl bg-[#6C3BEF] hover:bg-[#582dc9] disabled:opacity-40 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/25 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
