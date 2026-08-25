/**
 * ==============================================================================
 * Vidyabot Database & Cloud Sync Module (Demo Mode & Future Firebase Adapter)
 * ==============================================================================
 *
 * Current Status: DEMO MODE (100% Local Browser Storage)
 * - No Firebase API keys, credentials, or Firestore network connections required.
 * - All user profiles, quiz attempts, error books, and revision schedules are stored
 *   in browser `localStorage` via `storageService.ts`.
 *
 * Future Integration Plan:
 * - To enable real-time multi-device cloud persistence, supply the standard Firebase
 *   configuration parameters in environment variables (see .env.example).
 * - When configured, this adapter will automatically initialize Firebase App and
 *   Firestore without requiring any UI refactoring.
 * ==============================================================================
 */

import type {
  UserProfile,
  QuizAttempt,
  ErrorBookItem,
  RevisionSchedule,
  Badge,
  UploadedMaterial,
} from '../types';

export interface FirebaseConnectionStatus {
  app: any | null;
  db: any | null;
  isConnected: boolean;
  isDemoMode: boolean;
}

let isFirebaseInitialized = false;

/**
 * Initializes Firebase in demo-safe mode.
 * In Demo Mode, this returns immediately with `isConnected: false` and `isDemoMode: true`.
 */
export function initFirebase(): FirebaseConnectionStatus {
  // In Demo Mode, we operate 100% locally with zero external network overhead
  if (isFirebaseInitialized) {
    return { app: null, db: null, isConnected: false, isDemoMode: true };
  }

  isFirebaseInitialized = true;
  console.info('[Vidyabot Demo Mode] Operating in standalone Local Storage mode. No Firebase credentials required.');
  return { app: null, db: null, isConnected: false, isDemoMode: true };
}

export function getOrCreateUserId(): string {
  const USER_ID_KEY = 'vidyabot_user_id';
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = 'demo_student_' + Math.random().toString(36).substring(2, 9);
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}

// ==============================================================================
// FUTURE FIRESTORE CLOUD PERSISTENCE HOOKS (Mocked for Demo Mode)
// ==============================================================================

// TODO: Future Integration - Enable Firestore sync when VITE_FIREBASE_PROJECT_ID is provided
export async function syncUserProfileToFirestore(_profile: UserProfile): Promise<void> {
  // In demo mode, local storage is the source of truth.
  return Promise.resolve();
}

// TODO: Future Integration - Fetch user profile from Firestore on multi-device sign-in
export async function fetchUserProfileFromFirestore(): Promise<UserProfile | null> {
  return Promise.resolve(null);
}

// TODO: Future Integration - Persist quiz attempt history to Firestore collection
export async function syncQuizAttemptToFirestore(_attempt: QuizAttempt): Promise<void> {
  return Promise.resolve();
}

export async function fetchQuizAttemptsFromFirestore(): Promise<QuizAttempt[]> {
  return Promise.resolve([]);
}

// TODO: Future Integration - Persist Error Book entries for AI diagnostic aggregation
export async function syncErrorBookItemToFirestore(_item: ErrorBookItem): Promise<void> {
  return Promise.resolve();
}

export async function syncBatchErrorBookItemsToFirestore(_items: ErrorBookItem[]): Promise<void> {
  return Promise.resolve();
}

export async function fetchErrorBookFromFirestore(): Promise<ErrorBookItem[]> {
  return Promise.resolve([]);
}

// TODO: Future Integration - Spaced Repetition cron scheduler on Firebase Cloud Functions
export async function syncRevisionScheduleToFirestore(_schedule: RevisionSchedule): Promise<void> {
  return Promise.resolve();
}

export async function fetchRevisionSchedulesFromFirestore(): Promise<RevisionSchedule[]> {
  return Promise.resolve([]);
}

// TODO: Future Integration - Sync student achievements and mastery badges
export async function syncBadgeToFirestore(_badge: Badge): Promise<void> {
  return Promise.resolve();
}

export async function syncBadgesToFirestore(_badges: Badge[]): Promise<void> {
  return Promise.resolve();
}

export async function fetchBadgesFromFirestore(): Promise<Badge[]> {
  return Promise.resolve([]);
}

// TODO: Future Integration - Firebase Storage / Google Cloud Storage for PDF study notes
export async function syncUploadedMaterialToFirestore(_material: UploadedMaterial): Promise<void> {
  return Promise.resolve();
}

export async function deleteUploadedMaterialFromFirestore(_id: string): Promise<void> {
  return Promise.resolve();
}

export async function fetchUploadedMaterialsFromFirestore(): Promise<UploadedMaterial[]> {
  return Promise.resolve([]);
}
