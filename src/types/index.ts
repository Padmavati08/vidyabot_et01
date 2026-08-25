export type IndianBoard = 'State Board' | 'CBSE' | 'ICSE';
export type ClassLevel = '9' | '10' | '11' | '12';
export type LanguageCode = 'en' | 'mr' | 'hi';

export interface UserProfile {
  name: string;
  state: string;
  board: IndianBoard;
  classLevel: ClassLevel;
  selectedLanguages: LanguageCode[];
  currentLanguage: LanguageCode;
  createdAt: string;
  streakDays: number;
  lastActiveDate: string;
}

export type ErrorType = 
  | 'conceptual_error'
  | 'formula_error'
  | 'calculation_error'
  | 'careless_error'
  | 'memory_error';

export interface QuizQuestion {
  id: string;
  topicId: string;
  question: {
    en: string;
    mr: string;
    hi: string;
  };
  options: {
    en: string[];
    mr: string[];
    hi: string[];
  };
  correctIndex: number;
  explanation: {
    en: string;
    mr: string;
    hi: string;
  };
  errorType?: ErrorType;
  conceptKey: string; // e.g., 'inertia', 'balanced_force', 'f_equals_ma', 'action_reaction'
}

export interface QuizAttempt {
  id: string;
  topicId: string;
  quizType: 'pretest' | 'posttest' | 'revision';
  score: number;
  totalQuestions: number;
  answers: {
    questionId: string;
    selectedOptionIndex: number;
    isCorrect: boolean;
    errorType?: ErrorType;
    conceptKey: string;
  }[];
  timestamp: string;
}

export interface LearnerProfile {
  topicId?: string;
  weakConcepts: string[];
  strongConcepts: string[];
  preferredLanguage?: LanguageCode;
  preTestScore?: number;
  preTestTotal?: number;
  lastAssessedAt?: string;
}

export interface MultilingualText {
  en: string;
  mr: string;
  hi: string;
}

export interface DailyLifeExample {
  title: MultilingualText;
  description: MultilingualText;
  iconName: string;
}

export interface WorkedExample {
  problem: MultilingualText;
  given: MultilingualText;
  formula: string;
  steps: MultilingualText[];
  answer: MultilingualText;
}

export interface CommonMistake {
  myth: MultilingualText;
  reality: MultilingualText;
  why: MultilingualText;
}

export interface TopicLessonData {
  id: string;
  title: MultilingualText;
  shortDesc: MultilingualText;
  keyConcepts: string[];
  simpleExplanation: MultilingualText;
  keyDefinitions: { term: MultilingualText; definition: MultilingualText }[];
  dailyLifeExamples: DailyLifeExample[];
  workedExample: WorkedExample;
  commonMistakes: CommonMistake[];
  recapPoints: MultilingualText[];
  diagramType: 'force_vectors' | 'inertia_bus' | 'f_ma_calc' | 'action_reaction_rocket';
  interactiveSimHint: MultilingualText;
}

export type TopicStatus = 'not_started' | 'in_progress' | 'completed';

export interface Topic {
  id: string;
  number: number;
  title: MultilingualText;
  description: MultilingualText;
  estimatedMinutes: number;
}

export interface Chapter {
  id: string;
  number: number;
  title: MultilingualText;
  description: MultilingualText;
  boardReference: string; // e.g. "Maharashtra State Board Class 9 Science (Chapter 1) / NCERT Chapter 9"
  topics: Topic[];
}

export interface Subject {
  id: string;
  name: MultilingualText;
  chaptersCount: number;
  icon: string;
  color: string;
}

export interface ErrorBookItem {
  id: string;
  topicId: string;
  topicTitle?: string;
  questionId: string;
  questionText: string;
  studentAnswer: string;
  correctAnswer: string;
  explanation: string;
  errorType: ErrorType;
  conceptKey: string;
  createdAt: string;
  isUnderstood: boolean;
  simplifiedExplanation?: string;
}

export interface RevisionLevel {
  level: number;
  dayLabel: string; // "Day 1", "Day 3", "Day 7"
  targetDate: string; // YYYY-MM-DD
  status: 'due' | 'upcoming' | 'completed';
  completedDate?: string;
  miniQuizScore?: number;
}

export interface RevisionSchedule {
  topicId: string;
  topicTitle: string;
  postTestCompletedAt: string;
  levels: RevisionLevel[];
  compactNotes: {
    definitions: string[];
    formulae: string[];
    keyPoints: string[];
    myCommonErrors: string[];
  };
}

export interface UploadedMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'text' | 'youtube' | 'link' | 'video_link';
  fileOrUrl: string;
  fileSize?: string;
  subject: string;
  chapterId?: string;
  topicId?: string;
  uploadedAt: string;
  status: 'ready' | 'processing';
  extractedSummary?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0 to 100
}

export interface DoubtMessage {
  id: string;
  sender: 'user' | 'vidyabot';
  text: string;
  timestamp: string;
  sourceType?: 'lesson_content' | 'uploaded_material' | 'gemini_ai' | 'fallback_not_found' | 'n8n_workflow';
  sourceTitle?: string;
}
