import React from 'react';
import { BookOpen, Globe2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-purple-100 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Student Project Context */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#6C3BEF] text-white flex items-center justify-center font-bold text-sm">
                V
              </div>
              <span className="font-bold text-lg text-[#3F207C]">Vidyabot</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-100 text-[#6C3BEF] font-semibold">
                Secondary Education
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1.5 max-w-md">
              Multilingual Adaptive Learning Platform aligned with State Board & NCERT curricula for Secondary School Education.
            </p>
          </div>

          {/* Scope badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-600">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg">
              <BookOpen className="w-3.5 h-3.5 text-[#6C3BEF]" />
              State Board & NCERT Standards
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg">
              <Globe2 className="w-3.5 h-3.5 text-[#6C3BEF]" />
              English • मराठी • हिंदी
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-50/70 border border-purple-100 rounded-lg text-purple-700 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Powered by n8n Workflow Automation
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
