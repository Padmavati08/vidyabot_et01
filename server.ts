import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { TOPIC_LESSONS, LAWS_OF_MOTION_CHAPTER } from './src/data/lawsOfMotionData';

dotenv.config();

// Lazy Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (err) {
      console.error('Failed to initialize Gemini AI client:', err);
    }
  }
  return aiClient;
}

/**
 * Builds structured grounding context from seeded curriculum and any user-uploaded study notes.
 */
function buildGroundingContext(topicId: string, uploadedMaterials: Array<{ title: string; extractedSummary?: string }> = []) {
  const activeTopic = TOPIC_LESSONS[topicId] || TOPIC_LESSONS['force'];

  const curriculumSections: string[] = [];

  // Active topic comprehensive details
  curriculumSections.push(`=== PRIMARY TOPIC: ${activeTopic.title.en} (Marathi: ${activeTopic.title.mr}, Hindi: ${activeTopic.title.hi}) ===`);
  curriculumSections.push(`Overview: ${activeTopic.simpleExplanation.en}`);
  curriculumSections.push(`Marathi Overview: ${activeTopic.simpleExplanation.mr}`);
  curriculumSections.push(`Hindi Overview: ${activeTopic.simpleExplanation.hi}`);
  curriculumSections.push(`Key Concepts: ${activeTopic.keyConcepts.join(', ')}`);

  curriculumSections.push('--- KEY DEFINITIONS & FORMULAS ---');
  for (const def of activeTopic.keyDefinitions) {
    curriculumSections.push(`• [${def.term.en} | ${def.term.mr} | ${def.term.hi}]: ${def.definition.en} (MR: ${def.definition.mr}) (HI: ${def.definition.hi})`);
  }

  if (activeTopic.workedExample) {
    curriculumSections.push('--- WORKED NUMERICAL EXAMPLE ---');
    curriculumSections.push(`Formula: ${activeTopic.workedExample.formula}`);
    curriculumSections.push(`Problem: ${activeTopic.workedExample.problem.en}`);
    curriculumSections.push(`Given: ${activeTopic.workedExample.given.en}`);
    curriculumSections.push(`Steps: ${activeTopic.workedExample.steps.map((s) => s.en).join(' -> ')}`);
    curriculumSections.push(`Solution: ${activeTopic.workedExample.answer.en}`);
  }

  if (activeTopic.commonMistakes && activeTopic.commonMistakes.length > 0) {
    curriculumSections.push('--- COMMON MISCONCEPTIONS & SCIENTIFIC REALITY ---');
    for (const cm of activeTopic.commonMistakes) {
      curriculumSections.push(`• Myth: ${cm.myth.en} (MR: ${cm.myth.mr}) -> Reality: ${cm.reality.en} (MR: ${cm.reality.mr})`);
    }
  }

  if (activeTopic.dailyLifeExamples && activeTopic.dailyLifeExamples.length > 0) {
    curriculumSections.push('--- REAL-LIFE APPLICATIONS & EXAMPLES ---');
    for (const ex of activeTopic.dailyLifeExamples) {
      curriculumSections.push(`• ${ex.title.en}: ${ex.description.en}`);
    }
  }

  if (activeTopic.recapPoints && activeTopic.recapPoints.length > 0) {
    curriculumSections.push('--- RECAP SUMMARY POINTS ---');
    for (const rp of activeTopic.recapPoints) {
      curriculumSections.push(`• ${rp.en}`);
    }
  }

  // Cross-topic chapter reference
  curriculumSections.push('\n=== ALL CHAPTER 1 TOPICS REFERENCE ===');
  for (const [key, t] of Object.entries(TOPIC_LESSONS)) {
    if (key !== topicId) {
      curriculumSections.push(`Topic [${t.title.en}]: ${t.shortDesc.en}. Key Concepts: ${t.keyConcepts.join(', ')}`);
    }
  }

  // Uploaded study materials context
  const uploadedSections: string[] = [];
  if (uploadedMaterials && uploadedMaterials.length > 0) {
    uploadedSections.push('\n=== USER UPLOADED STUDY MATERIALS ===');
    for (const mat of uploadedMaterials) {
      if (mat.extractedSummary) {
        uploadedSections.push(`• Document "${mat.title}": ${mat.extractedSummary}`);
      }
    }
  }

  return {
    curriculumText: curriculumSections.join('\n'),
    uploadedText: uploadedSections.join('\n'),
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      app: 'Vidyabot',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // 2. Chat / Doubt Answering Endpoint (Strictly Grounded in Seeded Content & Uploaded Notes)
  app.post('/api/chat', async (req, res) => {
    try {
      const {
        message,
        topicId = 'force',
        language = 'en',
        uploadedMaterials = [],
        conversationHistory = [],
      } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Valid message string is required' });
      }

      const client = getGeminiClient();

      // If no Gemini key is configured on the server, return fallback flag
      if (!client) {
        return res.status(200).json({
          reply: null,
          sourceType: 'lesson_content',
          isGrounded: true,
          note: 'Server running in local seeded mode (No GEMINI_API_KEY configured).',
        });
      }

      const langMap: Record<string, string> = {
        mr: 'Marathi (मराठी)',
        hi: 'Hindi (हिंदी)',
        en: 'English',
      };
      const targetLang = langMap[language] || 'English';

      const { curriculumText, uploadedText } = buildGroundingContext(topicId, uploadedMaterials);

      const historyFormatted = conversationHistory
        .slice(-4)
        .map((h: { sender: string; text: string }) => `${h.sender === 'user' ? 'Student' : 'Vidyabot'}: ${h.text}`)
        .join('\n');

      const systemInstruction = `You are "Vidyabot", a dedicated multilingual science tutor for Class 9 Indian school students (NCERT and Maharashtra State Board syllabus).

YOUR MISSION:
Answer student science doubts with clarity, empathy, and absolute factual accuracy, strictly grounded in the provided curriculum lessons and student-uploaded study materials.

STRICT GROUNDING & CITATION RULES:
1. Ground all answers ONLY in the PROVIDED CURRICULUM CONTEXT and UPLOADED STUDY MATERIALS below.
2. CITATION REQUIREMENT: In "sourceTitle", cite the specific section or document name that provided the factual evidence (e.g., "Chapter 1: Force & Types of Forces — Balanced vs Unbalanced Forces", "Chapter 1: Newton's 2nd Law — Formula Guide", or "Uploaded Note: [Filename]").
3. STRICT IGNORANCE RULE (DO NOT INVENT): If the question CANNOT be answered from or directly deduced from the provided context (e.g. unrelated general knowledge, movies, personal opinions, unmentioned biology, or out-of-syllabus questions), you MUST:
   - Set "isGrounded" to false
   - Set "sourceType" to "fallback_not_found"
   - Set "sourceTitle" to "No relevant context found in study material"
   - Set "answer" to an honest, polite, encouraging statement in ${targetLang} explaining that this concept is not in the current Class 9 Laws of Motion materials or uploaded study notes, and warmly invite the student to ask questions about force, inertia, momentum, Newton's laws, or upload relevant notes.
4. LANGUAGE: Always respond strictly in ${targetLang} (natural, supportive Marathi, Hindi, or English).
5. TONE & LENGTH: Keep explanations under 160 words, engaging, easy for a 14-year-old student, with everyday relatable analogies when in the context.`;

      const userContentPrompt = `PROVIDED CURRICULUM CONTEXT:
${curriculumText}

${uploadedText}

RECENT CONVERSATION HISTORY:
${historyFormatted || 'None'}

STUDENT QUESTION: "${message}"
TARGET RESPONSE LANGUAGE: ${targetLang}

Provide a structured response following the schema.`;

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: userContentPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              answer: {
                type: Type.STRING,
                description: 'Clear, grounded answer to the student in the target language. If context was insufficient, state politely that the answer is not in the material.',
              },
              sourceType: {
                type: Type.STRING,
                enum: ['lesson_content', 'uploaded_material', 'gemini_ai', 'fallback_not_found'],
                description: 'The source category of the response.',
              },
              sourceTitle: {
                type: Type.STRING,
                description: 'Citation label indicating which lesson section or uploaded file provided the answer, or "No relevant context found in study material"',
              },
              isGrounded: {
                type: Type.BOOLEAN,
                description: 'True if answer was found in the provided context; false if answer was unknown/missing from context.',
              },
            },
            required: ['answer', 'sourceType', 'sourceTitle', 'isGrounded'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');

      return res.json({
        reply: parsed.answer || 'I could not find this in the current learning material.',
        sourceType: parsed.sourceType || (parsed.isGrounded ? 'gemini_ai' : 'fallback_not_found'),
        sourceTitle: parsed.sourceTitle || 'Vidyabot AI Tutor (Gemini)',
        isGrounded: Boolean(parsed.isGrounded),
      });
    } catch (err: any) {
      console.error('Gemini grounded chat error:', err);
      return res.status(200).json({
        reply: null,
        error: err.message,
        sourceType: 'lesson_content',
      });
    }
  });

  // 3. Error Simplification Endpoint
  app.post('/api/simplify', async (req, res) => {
    try {
      const {
        questionText,
        studentAnswer,
        correctAnswer,
        explanation,
        errorType,
        language = 'en',
      } = req.body;

      const client = getGeminiClient();

      if (!client) {
        return res.status(200).json({ simplifiedText: null, sourceTitle: null });
      }

      const langMap: Record<string, string> = {
        mr: 'Marathi (मराठी)',
        hi: 'Hindi (हिंदी)',
        en: 'English',
      };
      const targetLang = langMap[language] || 'English';

      const prompt = `You are "Vidyabot", an expert and empathetic physics teacher for Class 9 Indian students (NCERT/State Board).
A student made a mistake in a quiz. Break down why their choice was incorrect and anchor the correct concept in simple terms in ${targetLang}.

Question: "${questionText}"
Student selected: "${studentAnswer}"
Correct answer: "${correctAnswer}"
Textbook explanation: "${explanation}"
Error Classification: ${errorType}
Response Language: ${targetLang}

Provide the breakdown in 3 brief, high-impact sections:
1. 💡 What went wrong (gentle explanation of why option "${studentAnswer}" was misleading or incorrect)
2. 🎯 The Core Principle (clear, memorable concept explanation using an intuitive real-life analogy)
3. ⚡ Golden Rule / Formula Tip (1-sentence rule to remember during exams)`;

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              simplifiedText: {
                type: Type.STRING,
                description: 'The 3-step breakdown in the target language.',
              },
              sourceTitle: {
                type: Type.STRING,
                description: 'Citation of the relevant scientific law/topic.',
              },
            },
            required: ['simplifiedText', 'sourceTitle'],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');

      return res.json({
        simplifiedText: parsed.simplifiedText || null,
        sourceTitle: parsed.sourceTitle || 'Vidyabot Error Simplification (Gemini)',
      });
    } catch (err: any) {
      console.error('Gemini simplify error:', err);
      return res.status(200).json({ simplifiedText: null, sourceTitle: null });
    }
  });

  // 4. Personalized Diagnostic Guidance Endpoint
  app.post('/api/lesson-guidance', async (req, res) => {
    try {
      const {
        topicId = 'force',
        language = 'en',
        weakConcepts = [],
        strongConcepts = [],
        preTestScore = 0,
        preTestTotal = 3,
      } = req.body;

      const client = getGeminiClient();

      if (!client) {
        return res.status(200).json({ guidance: null });
      }

      const langMap: Record<string, string> = {
        mr: 'Marathi (मराठी)',
        hi: 'Hindi (हिंदी)',
        en: 'English',
      };
      const targetLang = langMap[language] || 'English';
      const topicData = TOPIC_LESSONS[topicId] || TOPIC_LESSONS['force'];

      const prompt = `A Class 9 student just completed a diagnostic pre-test for "${topicData.title.en}".
Diagnostic Performance:
- Score: ${preTestScore} out of ${preTestTotal}
- Weak Concepts requiring focus: ${weakConcepts.join(', ') || 'None identified'}
- Strong Concepts: ${strongConcepts.join(', ') || 'Good baseline'}

Generate a short, encouraging 2-sentence study guidance note in ${targetLang} that motivates the student and highlights exactly what to pay attention to in the upcoming lesson.`;

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
      });

      return res.json({
        guidance: response.text || null,
        sourceTitle: `Vidyabot Personalized Pathway: ${topicData.title.en}`,
      });
    } catch (err: any) {
      console.error('Gemini lesson guidance error:', err);
      return res.status(200).json({ guidance: null });
    }
  });

  // 5. Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Vidyabot full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

