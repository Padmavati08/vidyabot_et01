# Vidyabot — AI-Powered Personalized Learning Companion

> **Target Audience:** Indian School Students (Class 9 Science • Maharashtra State Board & NCERT)  
> **Created by:** Padmavati (3rd-year B.Tech CSE student, Maharashtra)

---

## 🌟 Overview
**Vidyabot** is a friendly, supportive educational web application that guides Indian school students through an adaptive, multilingual learning loop. 

Unlike generic flashcard apps, Vidyabot diagnoses student misconceptions prior to teaching, offers interactive physics vector and inertia simulators, explains in **English**, **मराठी (Marathi)**, and **हिंदी (Hindi)**, categorizes mistakes into a structured **Error Book**, and schedules active recall via a **Spaced Repetition (Day 1, 3, 7)** retention engine.

---

## 🚀 Key Features

### 1. Diagnostic Pre-Test
- 3–4 targeted questions per topic to identify specific misconceptions.
- Generates a customized learning pathway emphasizing the student's weak concepts.

### 2. Multilingual & Visual Lessons
- **Language Switcher:** Instant translation between English, Marathi, and Hindi.
- **Interactive Physics Simulators:**
  - *Force:* Push-Pull vector cart simulator with live net-force gauge.
  - *Newton’s 1st Law:* Inertia of rest/motion bus and cardboard coin experiment.
  - *Newton’s 2nd Law:* $F = m \times a$ acceleration engine and race track.
  - *Newton’s 3rd Law:* Action-reaction ISRO-inspired balloon rocket simulator.
- **Everyday Indian Examples:** Cricket ball catch, ST bus braking, bullock carts, Chandrayaan launches.
- **Text-to-Speech (TTS):** Audio narration for students in all 3 languages.

### 3. Grounded AI Doubt Tutor
- Embedded Q&A assistant searching seeded topic content and uploaded materials.
- Full server-side Gemini AI integration (`@google/genai` on `gemini-3.7-flash`).
- Strict source attributions: *"Based on Vidyabot lesson content"* vs *"Based on your uploaded material"*.

### 4. Categorized Error Book
- Automatically captures incorrect answers from quizzes.
- Categorizes errors into:
  - `conceptual_error`
  - `formula_error`
  - `calculation_error`
  - `careless_error`
  - `memory_error`
- **"Explain More Simply":** Generates child-friendly analogies and memorable rules of thumb.
- **"Mark as Understood":** Helps students track mastery progress.

### 5. Spaced Revision Engine
- Automatically schedules retention cycles on:
  - **Day 1:** Immediate post-test evaluation.
  - **Day 3:** Active recall mini-quiz.
  - **Day 7:** Long-term mastery verification.
- Generates compact formula sheets and common error review lists.

### 6. Study Material Upload
- Drag & drop PDFs, TXT summaries, or paste YouTube links.
- Extracts study concepts for grounded AI doubt tutoring.

### 7. Gamification & Badges
- Unlocks milestone badges (First Topic Completed, Science Explorer, Accuracy Star, Revision Champion) with confetti celebrations.

---

## 🛠️ Architecture & Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide React icons, Canvas Confetti.
- **Backend:** Express, Node.js, TSX, Vite middleware.
- **AI Service:** `@google/genai` TypeScript SDK running server-side (`server.ts`).
- **Data Persistence:** LocalStorage service (`src/services/storageService.ts`) with zero external database configuration needed for local development.

---

## 💻 Local Development Setup (VS Code)

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd vidyabot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key (optional for local seeded mode):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

---

## 📱 Future Development (Flutter Mobile Sync)
The core data types (`src/types/index.ts`) and lesson data (`src/data/lawsOfMotionData.ts`) are structured cleanly in JSON/Dart-friendly models. You can easily mirror these models into your local Flutter project at `C:\Users\DELL\Desktop\Vidyabot demo\vidyabot` or query the Express API routes (`/api/chat`, `/api/simplify`).
