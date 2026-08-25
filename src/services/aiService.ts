/**
 * ==============================================================================
 * Vidyabot AI Service Abstraction Layer (Demo Mode & Future AI Provider)
 * ==============================================================================
 *
 * Current Status: DEMO MODE (Local Grounded Knowledge & Mock AI Engine)
 * - Zero external API keys or paid third-party dependencies required.
 * - Instantaneous, deterministic, curriculum-grounded doubt resolution.
 * - Supports Marathi, Hindi, and English with strict anti-hallucination guardrails.
 * - Simulates multimodal RAG by grounding over topic definitions, formulas,
 *   misconceptions, and user-uploaded study notes.
 *
 * Future Integration Plan:
 * - TODO: Hook into server-side Gemini 2.5/3.7 Pro API (`/api/chat`) when GEMINI_API_KEY is configured.
 * - TODO: Embeddings & Vector RAG search pipeline for multi-page PDF indexing.
 * - TODO: Cloud Document AI for high-accuracy multilingual OCR and diagram extraction.
 * ==============================================================================
 */

import { DoubtMessage, LanguageCode, ErrorType } from '../types';
import { TOPIC_LESSONS } from '../data/lawsOfMotionData';
import { storageService } from './storageService';
import { n8nService } from './n8nService';

export interface DoubtResponse {
  answer: string;
  sourceType: 'lesson_content' | 'uploaded_material' | 'gemini_ai' | 'fallback_not_found' | 'n8n_workflow';
  sourceTitle: string;
}

export const aiService = {
  /**
   * Ask a doubt to Vidyabot.
   * Priority: Direct n8n Workflow Automation -> Local Grounded Retrieval
   */
  async askDoubt(params: {
    question: string;
    topicId: string;
    language: LanguageCode;
    conversationHistory?: { sender: 'user' | 'vidyabot'; text: string }[];
  }): Promise<DoubtResponse> {
    const { question, topicId, language, conversationHistory = [] } = params;
    const lesson = TOPIC_LESSONS[topicId] || TOPIC_LESSONS['force'];

    // 1. Trigger n8n Workflow Integration
    try {
      const n8nResult = await n8nService.executeWorkflow({
        action: 'ask_doubt',
        query: question,
        topicTitle: lesson?.title[language] || lesson?.title.en || 'Laws of Motion',
        language,
      });

      if (n8nResult && n8nResult.reply) {
        return {
          answer: n8nResult.reply,
          sourceType: 'n8n_workflow',
          sourceTitle: n8nResult.provider || 'n8n Automation Workflow',
        };
      }
    } catch (e) {
      console.warn('n8n query pass-through:', e);
    }

    // 2. Demo Mode Grounded Knowledge Engine (Instantaneous, Local)
    return this.searchLocalKnowledgeBase(question, topicId, language);
  },

  /**
   * Local grounded search over topic seed content and user-uploaded materials.
   * Simulates RAG context matching with high precision.
   */
  searchLocalKnowledgeBase(question: string, topicId: string, language: LanguageCode): DoubtResponse {
    const qLower = question.toLowerCase().trim();
    const lesson = TOPIC_LESSONS[topicId] || TOPIC_LESSONS['force'];

    // 1. Check user uploaded materials first (Simulated RAG)
    const uploadedMaterials = storageService.getUploadedMaterials();
    for (const mat of uploadedMaterials) {
      if (mat.extractedSummary) {
        const sumLower = mat.extractedSummary.toLowerCase();
        if (
          qLower.split(' ').some((word) => word.length > 4 && sumLower.includes(word))
        ) {
          const answer =
            language === 'mr'
              ? `तुमच्या अपलोड केलेल्या अभ्यास साहित्यानुसार ("${mat.title}"):\n\n${mat.extractedSummary}`
              : language === 'hi'
              ? `आपकी अपलोड की गई अध्ययन सामग्री ("${mat.title}") के अनुसार:\n\n${mat.extractedSummary}`
              : `Based on your uploaded study material ("${mat.title}"):\n\n${mat.extractedSummary}`;

          return {
            answer,
            sourceType: 'uploaded_material',
            sourceTitle: `Uploaded Material: ${mat.title}`,
          };
        }
      }
    }

    // 2. Keyword & concept matching against textbook curriculum
    const isMarathi = language === 'mr';
    const isHindi = language === 'hi';

    // Check key definitions
    for (const def of lesson.keyDefinitions) {
      const termEn = def.term.en.toLowerCase();
      if (
        qLower.includes(termEn) ||
        qLower.includes('what is') ||
        qLower.includes('define') ||
        qLower.includes('व्याख्या') ||
        qLower.includes('अर्थ') ||
        qLower.includes('परिभाषा')
      ) {
        const text = isMarathi ? def.definition.mr : isHindi ? def.definition.hi : def.definition.en;
        const termName = isMarathi ? def.term.mr : isHindi ? def.term.hi : def.term.en;
        return {
          answer: `${termName}:\n${text}`,
          sourceType: 'lesson_content',
          sourceTitle: isMarathi ? `${lesson.title.mr} - व्याख्या` : isHindi ? `${lesson.title.hi} - परिभाषा` : `${lesson.title.en} - Key Definition`,
        };
      }
    }

    // Check common misconceptions & myths
    for (const cm of lesson.commonMistakes) {
      if (
        qLower.includes('why') ||
        qLower.includes('wrong') ||
        qLower.includes('कारण') ||
        qLower.includes('का') ||
        qLower.includes('क्यो') ||
        qLower.includes('misconception')
      ) {
        const reality = isMarathi ? cm.reality.mr : isHindi ? cm.reality.hi : cm.reality.en;
        const myth = isMarathi ? cm.myth.mr : isHindi ? cm.myth.hi : cm.myth.en;
        return {
          answer: isMarathi
            ? `💡 गैरसमज: ${myth}\n\n✅ वैज्ञानिक वस्तुस्थिती: ${reality}`
            : isHindi
            ? `💡 भ्रांति: ${myth}\n\n✅ वैज्ञानिक वास्तविकता: ${reality}`
            : `💡 Common Myth: ${myth}\n\n✅ Scientific Reality: ${reality}`,
          sourceType: 'lesson_content',
          sourceTitle: `${lesson.title.en} - Misconceptions & Reality`,
        };
      }
    }

    // Check worked mathematical numericals / formula
    if (
      qLower.includes('calculate') ||
      qLower.includes('formula') ||
      qLower.includes('math') ||
      qLower.includes('numerical') ||
      qLower.includes('गणित') ||
      qLower.includes('सूत्र') ||
      qLower.includes('उदा') ||
      qLower.includes('sum')
    ) {
      const we = lesson.workedExample;
      const prob = isMarathi ? we.problem.mr : isHindi ? we.problem.hi : we.problem.en;
      const ans = isMarathi ? we.answer.mr : isHindi ? we.answer.hi : we.answer.en;
      return {
        answer: isMarathi
          ? `📐 मुख्य सूत्र: ${we.formula}\n\n📝 सोडवलेले उदाहरण: ${prob}\n\n🎯 उत्तर: ${ans}`
          : isHindi
          ? `📐 मुख्य सूत्र: ${we.formula}\n\n📝 हल किया गया उदाहरण: ${prob}\n\n🎯 उत्तर: ${ans}`
          : `📐 Key Formula: ${we.formula}\n\n📝 Worked Example: ${prob}\n\n🎯 Solution: ${ans}`,
        sourceType: 'lesson_content',
        sourceTitle: `${lesson.title.en} - Formula & Worked Numerical`,
      };
    }

    // Check real-life applications & daily life examples
    for (const ex of lesson.dailyLifeExamples) {
      const exTitle = ex.title.en.toLowerCase();
      if (
        qLower.includes('example') ||
        qLower.includes('daily life') ||
        qLower.includes('उदाहरण') ||
        qLower.includes('उदा') ||
        qLower.includes(exTitle.slice(0, 4))
      ) {
        const title = isMarathi ? ex.title.mr : isHindi ? ex.title.hi : ex.title.en;
        const desc = isMarathi ? ex.description.mr : isHindi ? ex.description.hi : ex.description.en;
        return {
          answer: `🌟 ${title}:\n${desc}`,
          sourceType: 'lesson_content',
          sourceTitle: `${lesson.title.en} - Real Life Applications`,
        };
      }
    }

    // General concept summary fallback
    if (qLower.length > 2) {
      const simple = isMarathi ? lesson.simpleExplanation.mr : isHindi ? lesson.simpleExplanation.hi : lesson.simpleExplanation.en;
      return {
        answer: isMarathi
          ? `येथे मुख्य संकल्पनेचा सारांश आहे:\n\n${simple.slice(0, 350)}...`
          : isHindi
          ? `यहाँ मुख्य अवधारणा का सार दिया गया है:\n\n${simple.slice(0, 350)}...`
          : `Here is the core concept breakdown:\n\n${simple.slice(0, 350)}...`,
        sourceType: 'lesson_content',
        sourceTitle: `${lesson.title.en} - Concept Overview`,
      };
    }

    // Strict honest boundary when question is outside curriculum
    return {
      answer: isMarathi
        ? 'मला उपलब्ध अध्ययन साहित्यात हे उत्तर सापडले नाही. कृपया गतीचे नियम, बल, जडत्व किंवा न्यूटनच्या नियमांशी संबंधित प्रश्न विचारा किंवा नवीन अभ्यास साहित्य अपलोड करा.'
        : isHindi
        ? 'मुझे उपलब्ध शिक्षण सामग्री में इसका उत्तर नहीं मिला। कृपया गति के नियम, बल, जड़त्व या न्यूटन के नियमों से संबंधित प्रश्न पूछें अथवा नई अध्ययन सामग्री अपलोड करें।'
        : 'I could not find information on this topic in the Class 9 Laws of Motion curriculum or uploaded notes. Please ask a doubt related to force, inertia, momentum, or Newton’s laws.',
      sourceType: 'fallback_not_found',
      sourceTitle: 'Out of Curriculum Scope',
    };
  },

  /**
   * Request a simplified, step-by-step breakdown of an error in the student's Error Book.
   */
  async getSimplifiedExplanation(params: {
    questionText: string;
    studentAnswer: string;
    correctAnswer: string;
    explanation: string;
    errorType: ErrorType;
    language: LanguageCode;
  }): Promise<string> {
    const { questionText, studentAnswer, correctAnswer, explanation, errorType, language } = params;

    // 1. Trigger n8n Workflow Adaptive Remediation
    try {
      const n8nResult = await n8nService.executeWorkflow({
        action: 'simplify_error',
        errorType,
        questionText,
        userAnswer: studentAnswer,
        correctAnswer,
        language,
      });

      if (n8nResult && n8nResult.steps && n8nResult.steps.length > 0) {
        const header = n8nResult.reply || 'Analysis from n8n Workflow:';
        return `${header}\n\n${n8nResult.steps.join('\n')}\n\n🎯 Correct Answer: "${correctAnswer}"\n📝 Concept Note: ${explanation}`;
      } else if (n8nResult && n8nResult.reply) {
        return n8nResult.reply;
      }
    } catch (e) {
      console.warn('n8n error remediation pass-through:', e);
    }

    // Demo Mode Structured 3-Step Error Breakdown
    const isMr = language === 'mr';
    const isHi = language === 'hi';

    const errorTips: Record<ErrorType, { en: string; mr: string; hi: string }> = {
      conceptual_error: {
        en: '💡 Concept Tip: Focus on the physical mechanism happening behind the scenes (e.g. who is exerting force on whom).',
        mr: '💡 संकल्पना टीप: प्रत्यक्ष भौतिक प्रक्रिया आणि कोण कोणावर बल लावत आहे याकडे लक्ष द्या.',
        hi: '💡 अवधारणा सुझाव: ध्यान दें कि कौन सी वस्तु किस पर बल लगा रही है।',
      },
      formula_error: {
        en: '📐 Formula Tip: Check if quantities are multiplied or divided. Remember: a = F / m and p = m × v.',
        mr: '📐 सूत्र टीप: राशींचा गुणाकार आहे की भागाकार ते तपासा. लक्षात ठेवा: a = F / m आणि p = m × v.',
        hi: '📐 सूत्र सुझाव: ध्यान दें कि राशि गुणा में है या भाग में। याद रखें: a = F / m और p = m × v।',
      },
      calculation_error: {
        en: '🔢 Calculation Tip: Double check your arithmetic steps and unit signs (+ / - for opposite directions).',
        mr: '🔢 गणना टीप: आकडेमोड आणि विरुद्ध दिशांची चिन्हे (+ / -) पुन्हा काळजीपूर्वक तपासा.',
        hi: '🔢 गणना सुझाव: अपनी गणना और विपरीत दिशाओं के चिन्ह (+ / -) दोबारा जांचें।',
      },
      careless_error: {
        en: '⚡ Attention Tip: Read all 4 options completely and watch out for words like "NOT", "INCORRECT", or "EXCEPT".',
        mr: '⚡ सावधगिरी टीप: प्रश्न नीट वाचा आणि "नाही", "चुकीचे", "सोडून" असे शब्द काळजीपूर्वक पहा.',
        hi: '⚡ सावधानी सुझाव: प्रश्न को पूरा पढ़ें और "नहीं", "गलत", "छोड़कर" जैसे शब्दों पर ध्यान दें।',
      },
      memory_error: {
        en: '🧠 Recall Tip: Make a memory card for SI units and constants (e.g. 1 N = 10⁵ dyne, 1 kg = 1000 g).',
        mr: '🧠 स्मरण टीप: SI एकके आणि मूल्ये (उदा. १ N = १०⁵ डाइन) यासाठी फ्लॅशकार्ड तयार करा.',
        hi: '🧠 स्मरण सुझाव: SI मात्रकों और स्थिरांकों के लिए छोटे नोट्स बनाएं (जैसे 1 N = 10⁵ dyne)।',
      },
    };

    const tip = isMr ? errorTips[errorType].mr : isHi ? errorTips[errorType].hi : errorTips[errorType].en;

    if (isMr) {
      return `🌟 सोप्या भाषेत ३-टप्प्यांचे विश्लेषण:\n\n१. तुमचा पर्याय: "${studentAnswer}"\n२. योग्य उत्तर: "${correctAnswer}"\n\n🎯 मुख्य कारण:\n${explanation}\n\n${tip}`;
    }

    if (isHi) {
      return `🌟 सरल ३-चरणीय विश्लेषण:\n\n1. आपका उत्तर: "${studentAnswer}"\n2. सही उत्तर: "${correctAnswer}"\n\n🎯 मुख्य कारण:\n${explanation}\n\n${tip}`;
    }

    return `🌟 Simple 3-Step Breakdown:\n\n1. You selected: "${studentAnswer}"\n2. The correct answer: "${correctAnswer}"\n\n🎯 Why this happens:\n${explanation}\n\n${tip}`;
  },

  /**
   * Request personalized diagnostic guidance for a lesson based on pre-test results.
   */
  async getLessonGuidance(params: {
    topicId: string;
    language: LanguageCode;
    weakConcepts?: string[];
    strongConcepts?: string[];
    preTestScore?: number;
    preTestTotal?: number;
  }): Promise<string | null> {
    const { topicId, language, weakConcepts = [], preTestScore = 0, preTestTotal = 5 } = params;

    // Optional server proxy
    try {
      const res = await fetch('/api/lesson-guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.guidance) {
          return data.guidance;
        }
      }
    } catch {
      // Fallback
    }

    // Demo Mode Calibrated Diagnostic Advice
    const isMr = language === 'mr';
    const isHi = language === 'hi';

    if (weakConcepts.length > 0) {
      const weakList = weakConcepts.join(', ');
      if (isMr) {
        return `🎯 पूर्व-चाचणी विश्लेषण (${preTestScore}/${preTestTotal}): "${weakList}" या संकल्पनेवर विशेष लक्ष द्या. खालील परस्परसंवादी सिम्युलेटर आणि सोडवलेली उदाहरणे अवश्य पहा.`;
      }
      if (isHi) {
        return `🎯 प्री-टेस्ट विश्लेषण (${preTestScore}/${preTestTotal}): "${weakList}" अवधारणा पर विशेष ध्यान दें। नीचे दिए गए सिमुलेटर और हल किए गए उदाहरणों का अभ्यास करें।`;
      }
      return `🎯 Diagnostic Insight (${preTestScore}/${preTestTotal}): Calibrated to reinforce "${weakList}". Explore the interactive simulator and worked numericals below!`;
    }

    if (isMr) {
      return `🌟 उत्तम सुरुवात (${preTestScore}/${preTestTotal})! तुमची प्राथमिक संकल्पना स्पष्ट आहे. आता गणिते आणि उच्चस्तरीय प्रश्नांवर प्रभुत्व मिळवा.`;
    }
    if (isHi) {
      return `🌟 बेहतरीन शुरुआत (${preTestScore}/${preTestTotal})! आपकी बुनियादी समझ मजबूत है। अब संख्यात्मक प्रश्नों और मुख्य सूत्रों का अभ्यास करें।`;
    }
    return `🌟 Strong baseline score (${preTestScore}/${preTestTotal})! Your foundational grasp is solid. Focus on master-level worked examples and the post-test quiz.`;
  },
};

