import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { UserProfile } from '../types';

interface WelcomePageProps {
  onStart: () => void;
  userProfile: UserProfile | null;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onStart, userProfile }) => {
  return (
    <div className="py-12 sm:py-16">
      {/* Action Gateway */}
      <div className="text-center max-w-xl mx-auto px-4">
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            id="welcome-get-started-btn"
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#3F207C] to-[#6C3BEF] hover:from-[#351b69] hover:to-[#582dc9] text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{userProfile ? 'Go to Learning Dashboard' : 'Open Curriculum Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="welcome-demo-topic-btn"
            onClick={onStart}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-purple-50 border border-purple-200 text-[#3F207C] font-bold text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#6C3BEF]" />
            <span>Browse All Subjects & Syllabus</span>
          </button>
        </div>
      </div>
    </div>
  );
};

