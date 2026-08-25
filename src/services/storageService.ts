/**
 * ==============================================================================
 * Vidyabot Storage Service (Demo Mode - Local Storage Engine)
 * ==============================================================================
 *
 * Current Status: DEMO MODE (Browser LocalStorage)
 * - Zero network latency, offline-friendly, and persistent across page reloads.
 * - Manages student profile, diagnostic pre-test results, lesson progress,
 *   post-test evaluations, personal error book, spaced revision schedule,
 *   and uploaded study documents.
 *
 * Future Integration Plan:
 * - When cloud sync is enabled, sync functions from `firebase.ts` or a cloud API
 *   can be hooked in seamlessly without altering component consumers.
 * ==============================================================================
 */

import {
  UserProfile,
  LearnerProfile,
  QuizAttempt,
  TopicStatus,
  ErrorBookItem,
  RevisionSchedule,
  UploadedMaterial,
  Badge,
  LanguageCode,
} from '../types';
import { LAWS_OF_MOTION_CHAPTER, TOPIC_LESSONS } from '../data/lawsOfMotionData';
import {
  syncUserProfileToFirestore,
  syncQuizAttemptToFirestore,
  syncBatchErrorBookItemsToFirestore,
  syncErrorBookItemToFirestore,
  syncRevisionScheduleToFirestore,
  syncBadgesToFirestore,
  syncUploadedMaterialToFirestore,
  deleteUploadedMaterialFromFirestore,
} from './firebase';

const STORAGE_KEYS = {
  USER_PROFILE: 'vidyabot_user_profile',
  LEARNER_PROFILES: 'vidyabot_learner_profiles',
  QUIZ_ATTEMPTS: 'vidyabot_quiz_attempts',
  TOPIC_STATUSES: 'vidyabot_topic_statuses',
  ERROR_BOOK: 'vidyabot_error_book',
  REVISION_SCHEDULES: 'vidyabot_revision_schedules',
  UPLOADED_MATERIALS: 'vidyabot_uploaded_materials',
  BADGES: 'vidyabot_badges',
};

const INITIAL_BADGES: Badge[] = [
  {
    id: 'first_topic',
    title: 'First Topic Completed',
    description: 'Complete the full learning loop for your first physics topic!',
    icon: 'Sparkles',
    unlocked: false,
    progress: 0,
  },
  {
    id: 'science_explorer',
    title: 'Science Explorer',
    description: 'Complete at least 2 topics in Laws of Motion.',
    icon: 'Compass',
    unlocked: false,
    progress: 0,
  },
  {
    id: 'accuracy_star',
    title: 'Accuracy Star',
    description: 'Score 80% or higher (4/5) in any post-test evaluation.',
    icon: 'Star',
    unlocked: false,
    progress: 0,
  },
  {
    id: 'revision_champion',
    title: 'Revision Champion',
    description: 'Complete Day 3 or Day 7 spaced revision session.',
    icon: 'Trophy',
    unlocked: false,
    progress: 0,
  },
];

export const storageService = {
  // Remote Hydration Hook (Placeholder for future Firestore / Cloud SQL sync)
  async initAndSyncRemoteData(): Promise<void> {
    // In Demo Mode, localStorage is the immediate, synchronous source of truth.
    // TODO: Future Integration - Hydrate from Firestore if user is authenticated
    return Promise.resolve();
  },

  // USER PROFILE
  getUserProfile(): UserProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
      syncUserProfileToFirestore(profile);
    } catch (e) {
      console.error('Failed to save profile to localStorage', e);
    }
  },

  updateCurrentLanguage(lang: LanguageCode): void {
    const profile = this.getUserProfile();
    if (profile) {
      profile.currentLanguage = lang;
      this.saveUserProfile(profile);
    }
  },

  // LEARNER PROFILES (Per Topic Diagnostic Cache)
  getLearnerProfile(topicId: string): LearnerProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEARNER_PROFILES);
      const profiles = data ? JSON.parse(data) : {};
      return profiles[topicId] || null;
    } catch {
      return null;
    }
  },

  saveLearnerProfile(topicId: string, learnerProfile: LearnerProfile): void {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEARNER_PROFILES);
      const profiles = data ? JSON.parse(data) : {};
      profiles[topicId] = learnerProfile;
      localStorage.setItem(STORAGE_KEYS.LEARNER_PROFILES, JSON.stringify(profiles));
    } catch (e) {
      console.error('Failed to save learner profile', e);
    }
  },

  // TOPIC STATUS
  getTopicStatuses(): Record<string, TopicStatus> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TOPIC_STATUSES);
      return data
        ? JSON.parse(data)
        : {
            force: 'not_started',
            'newtons-first-law': 'not_started',
            'newtons-second-law': 'not_started',
            'newtons-third-law': 'not_started',
          };
    } catch {
      return {
        force: 'not_started',
        'newtons-first-law': 'not_started',
        'newtons-second-law': 'not_started',
        'newtons-third-law': 'not_started',
      };
    }
  },

  setTopicStatus(topicId: string, status: TopicStatus): void {
    const statuses = this.getTopicStatuses();
    statuses[topicId] = status;
    try {
      localStorage.setItem(STORAGE_KEYS.TOPIC_STATUSES, JSON.stringify(statuses));
      this.checkAndUnlockBadges();
    } catch (e) {
      console.error('Failed to save topic status', e);
    }
  },

  // QUIZ ATTEMPTS
  getQuizAttempts(): QuizAttempt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveQuizAttempt(attempt: QuizAttempt): void {
    const attempts = this.getQuizAttempts();
    attempts.push(attempt);
    try {
      localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(attempts));
      syncQuizAttemptToFirestore(attempt);
      this.checkAndUnlockBadges();
    } catch (e) {
      console.error('Failed to save quiz attempt', e);
    }
  },

  // ERROR BOOK
  getErrorBookItems(): ErrorBookItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ERROR_BOOK);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addErrorBookItems(items: ErrorBookItem[]): void {
    const existing = this.getErrorBookItems();
    const map = new Map<string, ErrorBookItem>();
    existing.forEach((item) => map.set(item.id, item));
    items.forEach((item) => map.set(item.id, item));
    const merged = Array.from(map.values());
    try {
      localStorage.setItem(STORAGE_KEYS.ERROR_BOOK, JSON.stringify(merged));
      syncBatchErrorBookItemsToFirestore(items);
    } catch (e) {
      console.error('Failed to save error book items', e);
    }
  },

  toggleErrorUnderstood(itemId: string): void {
    const items = this.getErrorBookItems();
    let updatedItem: ErrorBookItem | null = null;
    const updated = items.map((item) => {
      if (item.id === itemId) {
        updatedItem = { ...item, isUnderstood: !item.isUnderstood };
        return updatedItem;
      }
      return item;
    });
    try {
      localStorage.setItem(STORAGE_KEYS.ERROR_BOOK, JSON.stringify(updated));
      if (updatedItem) {
        syncErrorBookItemToFirestore(updatedItem);
      }
    } catch (e) {
      console.error('Failed to update error book item', e);
    }
  },

  saveSimplifiedExplanation(itemId: string, explanation: string): void {
    const items = this.getErrorBookItems();
    let updatedItem: ErrorBookItem | null = null;
    const updated = items.map((item) => {
      if (item.id === itemId) {
        updatedItem = { ...item, simplifiedExplanation: explanation };
        return updatedItem;
      }
      return item;
    });
    try {
      localStorage.setItem(STORAGE_KEYS.ERROR_BOOK, JSON.stringify(updated));
      if (updatedItem) {
        syncErrorBookItemToFirestore(updatedItem);
      }
    } catch (e) {
      console.error('Failed to update error book item with simplified explanation', e);
    }
  },

  // REVISION SCHEDULES (Spaced Repetition)
  getRevisionSchedules(): RevisionSchedule[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REVISION_SCHEDULES);
      if (data) return JSON.parse(data);

      // Default seeded revision schedule for immediate demo preview
      const today = new Date();
      const format = (d: Date) => d.toISOString().split('T')[0];
      const addDays = (d: Date, days: number) => {
        const copy = new Date(d);
        copy.setDate(copy.getDate() + days);
        return format(copy);
      };

      const defaultSchedules: RevisionSchedule[] = [
        {
          topicId: 'force',
          topicTitle: 'Force & Types of Forces',
          postTestCompletedAt: format(today),
          levels: [
            { level: 1, dayLabel: 'Day 1', targetDate: format(today), status: 'completed', completedDate: format(today), miniQuizScore: 5 },
            { level: 2, dayLabel: 'Day 3', targetDate: addDays(today, 3), status: 'due' },
            { level: 3, dayLabel: 'Day 7', targetDate: addDays(today, 7), status: 'upcoming' },
          ],
          compactNotes: {
            definitions: [
              'Force (F): Push or pull changing state of rest, motion, or shape. SI Unit: Newton (N).',
              'Balanced Force: Net force = 0, no acceleration. Unbalanced Force: Net force ≠ 0, causes acceleration.',
            ],
            formulae: ['1 N = 1 kg·m/s²', '1 N = 10⁵ dyne', 'F_net = F₁ - F₂ (in 1D opposite directions)'],
            keyPoints: [
              'Force is a vector quantity (magnitude + direction).',
              'Contact forces: Friction, Muscular, Tension. Non-contact forces: Gravitational, Electrostatic, Magnetic.',
            ],
            myCommonErrors: ['Confusing dyne conversion (10⁵, not 10³)', 'Assuming moving objects always need unbalanced force (only true when friction is present)'],
          },
        },
      ];
      return defaultSchedules;
    } catch {
      return [];
    }
  },

  createRevisionScheduleForTopic(topicId: string): void {
    const schedules = this.getRevisionSchedules();
    const existingIndex = schedules.findIndex((s) => s.topicId === topicId);
    const today = new Date();
    const format = (d: Date) => d.toISOString().split('T')[0];
    const addDays = (d: Date, days: number) => {
      const copy = new Date(d);
      copy.setDate(copy.getDate() + days);
      return format(copy);
    };

    const topicLesson = TOPIC_LESSONS[topicId];
    const topicTitle = topicLesson ? topicLesson.title.en : topicId;

    const topicErrors = this.getErrorBookItems().filter((e) => e.topicId === topicId);
    const myCommonErrors = topicErrors.map((e) => e.questionText.slice(0, 80) + '... (Fix: ' + e.explanation.slice(0, 80) + ')');

    const newSchedule: RevisionSchedule = {
      topicId,
      topicTitle,
      postTestCompletedAt: format(today),
      levels: [
        { level: 1, dayLabel: 'Day 1 (Post-test)', targetDate: format(today), status: 'completed', completedDate: format(today), miniQuizScore: 5 },
        { level: 2, dayLabel: 'Day 3 (Active Recall)', targetDate: addDays(today, 3), status: 'due' },
        { level: 3, dayLabel: 'Day 7 (Mastery)', targetDate: addDays(today, 7), status: 'upcoming' },
      ],
      compactNotes: {
        definitions: topicLesson?.keyDefinitions.map((d) => `${d.term.en}: ${d.definition.en}`) || [],
        formulae: topicLesson?.workedExample ? [topicLesson.workedExample.formula] : [],
        keyPoints: topicLesson?.recapPoints.map((r) => r.en) || [],
        myCommonErrors: myCommonErrors.length > 0 ? myCommonErrors : ['All post-test questions solved accurately! Keep revising key formulas.'],
      },
    };

    if (existingIndex >= 0) {
      schedules[existingIndex] = newSchedule;
    } else {
      schedules.push(newSchedule);
    }

    try {
      localStorage.setItem(STORAGE_KEYS.REVISION_SCHEDULES, JSON.stringify(schedules));
      syncRevisionScheduleToFirestore(newSchedule);
      this.checkAndUnlockBadges();
    } catch (e) {
      console.error('Failed to save revision schedule', e);
    }
  },

  completeRevisionLevel(topicId: string, level: number, score: number): void {
    const schedules = this.getRevisionSchedules();
    const schedule = schedules.find((s) => s.topicId === topicId);
    if (schedule) {
      const lvl = schedule.levels.find((l) => l.level === level);
      if (lvl) {
        lvl.status = 'completed';
        lvl.completedDate = new Date().toISOString().split('T')[0];
        lvl.miniQuizScore = score;
      }
      try {
        localStorage.setItem(STORAGE_KEYS.REVISION_SCHEDULES, JSON.stringify(schedules));
        syncRevisionScheduleToFirestore(schedule);
        this.checkAndUnlockBadges();
      } catch (e) {
        console.error('Failed to complete revision level', e);
      }
    }
  },

  // UPLOADED STUDY MATERIALS (Stored locally)
  getUploadedMaterials(): UploadedMaterial[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.UPLOADED_MATERIALS);
      if (data) return JSON.parse(data);

      // Default demo PDF summary
      const defaultMaterials: UploadedMaterial[] = [
        {
          id: 'mat-demo-1',
          title: 'Laws_of_Motion_Class9_Summary.pdf',
          type: 'pdf',
          fileOrUrl: 'Laws_of_Motion_Class9_Summary.pdf',
          fileSize: '1.4 MB',
          subject: 'Science',
          chapterId: 'laws-of-motion',
          uploadedAt: new Date().toISOString().split('T')[0],
          status: 'ready',
          extractedSummary:
            'Class 9 Physics chapter summary covering Force, Newton’s 1st Law (Inertia), Newton’s 2nd Law (F=ma and momentum), and Newton’s 3rd Law (Action-Reaction).',
        },
      ];
      return defaultMaterials;
    } catch {
      return [];
    }
  },

  addUploadedMaterial(item: UploadedMaterial): void {
    const materials = this.getUploadedMaterials();
    materials.unshift(item);
    try {
      localStorage.setItem(STORAGE_KEYS.UPLOADED_MATERIALS, JSON.stringify(materials));
      syncUploadedMaterialToFirestore(item);
    } catch (e) {
      console.error('Failed to add uploaded material', e);
    }
  },

  deleteUploadedMaterial(id: string): void {
    const materials = this.getUploadedMaterials().filter((m) => m.id !== id);
    try {
      localStorage.setItem(STORAGE_KEYS.UPLOADED_MATERIALS, JSON.stringify(materials));
      deleteUploadedMaterialFromFirestore(id);
    } catch (e) {
      console.error('Failed to delete uploaded material', e);
    }
  },

  // BADGES & ACHIEVEMENTS
  getBadges(): Badge[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BADGES);
      if (data) return JSON.parse(data);
      return INITIAL_BADGES;
    } catch {
      return INITIAL_BADGES;
    }
  },

  checkAndUnlockBadges(): { newlyUnlocked: Badge[] } {
    const badges = this.getBadges();
    const statuses = this.getTopicStatuses();
    const completedCount = Object.values(statuses).filter((s) => s === 'completed').length;
    const attempts = this.getQuizAttempts();
    const revisionSchedules = this.getRevisionSchedules();
    const newlyUnlocked: Badge[] = [];

    // Badge 1: First topic completed
    const firstTopicBadge = badges.find((b) => b.id === 'first_topic');
    if (firstTopicBadge && !firstTopicBadge.unlocked) {
      firstTopicBadge.progress = Math.min(100, completedCount * 100);
      if (completedCount >= 1) {
        firstTopicBadge.unlocked = true;
        firstTopicBadge.unlockedAt = new Date().toISOString();
        newlyUnlocked.push(firstTopicBadge);
      }
    }

    // Badge 2: Science Explorer (2 topics)
    const explorerBadge = badges.find((b) => b.id === 'science_explorer');
    if (explorerBadge && !explorerBadge.unlocked) {
      explorerBadge.progress = Math.min(100, (completedCount / 2) * 100);
      if (completedCount >= 2) {
        explorerBadge.unlocked = true;
        explorerBadge.unlockedAt = new Date().toISOString();
        newlyUnlocked.push(explorerBadge);
      }
    }

    // Badge 3: Accuracy Star (>= 80% on posttest)
    const accuracyBadge = badges.find((b) => b.id === 'accuracy_star');
    if (accuracyBadge && !accuracyBadge.unlocked) {
      const postTests = attempts.filter((a) => a.quizType === 'posttest');
      const hasHighScoring = postTests.some((a) => a.score / a.totalQuestions >= 0.8);
      accuracyBadge.progress = hasHighScoring ? 100 : postTests.length > 0 ? 50 : 0;
      if (hasHighScoring) {
        accuracyBadge.unlocked = true;
        accuracyBadge.unlockedAt = new Date().toISOString();
        newlyUnlocked.push(accuracyBadge);
      }
    }

    // Badge 4: Revision Champion (completed Day 3 or Day 7 revision)
    const revisionBadge = badges.find((b) => b.id === 'revision_champion');
    if (revisionBadge && !revisionBadge.unlocked) {
      const hasRevisionCompleted = revisionSchedules.some((s) =>
        s.levels.some((l) => (l.level === 2 || l.level === 3) && l.status === 'completed')
      );
      revisionBadge.progress = hasRevisionCompleted ? 100 : 0;
      if (hasRevisionCompleted) {
        revisionBadge.unlocked = true;
        revisionBadge.unlockedAt = new Date().toISOString();
        newlyUnlocked.push(revisionBadge);
      }
    }

    try {
      localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
      syncBadgesToFirestore(badges);
    } catch (e) {
      console.error('Failed to update badges in localStorage', e);
    }

    return { newlyUnlocked };
  },

  // OVERALL STATS
  getOverallStats() {
    const statuses = this.getTopicStatuses();
    const totalTopics = LAWS_OF_MOTION_CHAPTER.topics.length;
    const completedTopics = Object.values(statuses).filter((s) => s === 'completed').length;
    const attempts = this.getQuizAttempts();
    const postTestAttempts = attempts.filter((a) => a.quizType === 'posttest');

    let totalScore = 0;
    let totalQuestions = 0;
    postTestAttempts.forEach((a) => {
      totalScore += a.score;
      totalQuestions += a.totalQuestions;
    });

    const quizAccuracy = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 85;
    const errorBookItems = this.getErrorBookItems();
    const unresolvedErrors = errorBookItems.filter((e) => !e.isUnderstood).length;

    const profile = this.getUserProfile();
    const streakDays = profile?.streakDays || 3;

    return {
      totalTopics,
      completedTopics,
      completionPercentage: Math.round((completedTopics / totalTopics) * 100),
      quizAccuracy,
      unresolvedErrors,
      streakDays,
    };
  },
};
