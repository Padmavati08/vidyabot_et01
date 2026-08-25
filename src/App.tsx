import React, { useState, useEffect } from 'react';
import { UserProfile, LanguageCode } from './types';
import { storageService } from './services/storageService';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { WelcomePage } from './pages/WelcomePage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { SubjectPage } from './pages/SubjectPage';
import { ChapterPage } from './pages/ChapterPage';
import { PreTestPage } from './pages/PreTestPage';
import { PreTestResultPage } from './pages/PreTestResultPage';
import { LessonPage } from './pages/LessonPage';
import { PostTestPage } from './pages/PostTestPage';
import { PostTestResultPage } from './pages/PostTestResultPage';
import { ErrorBookPage } from './pages/ErrorBookPage';
import { RevisionPage } from './pages/RevisionPage';
import { UploadPage } from './pages/UploadPage';
import { BadgesPage } from './pages/BadgesPage';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname !== '/' ? window.location.pathname : '/';
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const existing = storageService.getUserProfile();
    if (existing) return existing;

    // Default seeded profile for immediate preview richness
    const defaultProfile: UserProfile = {
      name: 'Aarav',
      state: 'Maharashtra',
      board: 'State Board',
      classLevel: '9',
      selectedLanguages: ['en', 'mr', 'hi'],
      currentLanguage: 'en',
      createdAt: new Date().toISOString(),
      streakDays: 3,
      lastActiveDate: new Date().toISOString(),
    };
    storageService.saveUserProfile(defaultProfile);
    return defaultProfile;
  });

  // Keep browser history in sync
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    
    // Asynchronously synchronize Firestore data in background
    storageService.initAndSyncRemoteData().then(() => {
      const refreshedProfile = storageService.getUserProfile();
      if (refreshedProfile) {
        setUserProfile(refreshedProfile);
      }
    });

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLanguageChange = (lang: LanguageCode) => {
    if (userProfile) {
      const updated = { ...userProfile, currentLanguage: lang };
      setUserProfile(updated);
      storageService.saveUserProfile(updated);
    }
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    navigate('/dashboard');
  };

  // Route matching helper
  const renderCurrentPage = () => {
    if (currentPath === '/') {
      return (
        <WelcomePage
          onStart={() => navigate(userProfile ? '/dashboard' : '/onboarding')}
          userProfile={userProfile}
        />
      );
    }

    if (currentPath === '/onboarding') {
      return (
        <OnboardingPage
          initialProfile={userProfile}
          onComplete={handleOnboardingComplete}
          onNavigate={navigate}
        />
      );
    }

    // Default user profile fallback
    const activeProfile: UserProfile = userProfile || {
      name: 'Aarav',
      state: 'Maharashtra',
      board: 'State Board',
      classLevel: '9',
      selectedLanguages: ['en', 'mr', 'hi'],
      currentLanguage: 'en',
      createdAt: new Date().toISOString(),
      streakDays: 3,
      lastActiveDate: new Date().toISOString(),
    };

    if (currentPath === '/dashboard') {
      return <DashboardPage userProfile={activeProfile} onNavigate={navigate} />;
    }

    if (currentPath === '/subjects/science' || currentPath === '/subjects') {
      return <SubjectPage userProfile={activeProfile} onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/chapters/laws-of-motion') || currentPath === '/chapter') {
      return <ChapterPage userProfile={activeProfile} onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/pre-test-result/')) {
      const topicId = currentPath.replace('/pre-test-result/', '');
      return <PreTestResultPage topicId={topicId} userProfile={activeProfile} onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/pre-test/')) {
      const topicId = currentPath.replace('/pre-test/', '');
      return <PreTestPage topicId={topicId} userProfile={activeProfile} onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/post-test-result/')) {
      const topicId = currentPath.replace('/post-test-result/', '');
      return <PostTestResultPage topicId={topicId} userProfile={activeProfile} onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/post-test/')) {
      const topicId = currentPath.replace('/post-test/', '');
      return <PostTestPage topicId={topicId} userProfile={activeProfile} onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/lesson/')) {
      const topicId = currentPath.replace('/lesson/', '');
      return (
        <LessonPage
          topicId={topicId}
          userProfile={activeProfile}
          onNavigate={navigate}
          onLanguageChange={handleLanguageChange}
        />
      );
    }

    if (currentPath === '/error-book') {
      return <ErrorBookPage userProfile={activeProfile} onNavigate={navigate} />;
    }

    if (currentPath === '/revision') {
      return <RevisionPage userProfile={activeProfile} onNavigate={navigate} />;
    }

    if (currentPath === '/upload') {
      return <UploadPage userProfile={activeProfile} onNavigate={navigate} />;
    }

    if (currentPath === '/badges') {
      return <BadgesPage userProfile={activeProfile} onNavigate={navigate} />;
    }

    // Default Fallback
    return <DashboardPage userProfile={activeProfile} onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-purple-200 selection:text-purple-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        userProfile={userProfile}
        onLanguageChange={handleLanguageChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
