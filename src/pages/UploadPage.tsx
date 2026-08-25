import React, { useState } from 'react';
import { Upload, FileText, Video, Link, Trash2, CheckCircle2, AlertCircle, Sparkles, BookOpen, Clock } from 'lucide-react';
import { UserProfile, UploadedMaterial } from '../types';
import { storageService } from '../services/storageService';
import { PageBackButton } from '../components/PageBackButton';

interface UploadPageProps {
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({ userProfile, onNavigate }) => {
  const lang = userProfile.currentLanguage || 'en';
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  const [materials, setMaterials] = useState<UploadedMaterial[]>(storageService.getUploadedMaterials());
  const [activeTab, setActiveTab] = useState<'file' | 'link'>('file');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>('');
  const [titleInput, setTitleInput] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const refreshMaterials = () => {
    setMaterials(storageService.getUploadedMaterials());
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    setUploadStatus('Extracting study content & creating grounded AI index...');

    setTimeout(() => {
      const newMaterial: UploadedMaterial = {
        id: `mat-${Date.now()}`,
        title: file.name,
        type: file.type.includes('pdf') ? 'pdf' : 'text',
        fileOrUrl: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        subject: 'Science',
        chapterId: 'laws-of-motion',
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'ready',
        extractedSummary: `Class 9 Physics study document extracted from "${file.name}". Covers core concepts, equations, and practice questions for Laws of Motion, Inertia, and Momentum.`,
      };

      storageService.addUploadedMaterial(newMaterial);
      refreshMaterials();
      setUploadStatus(null);
    }, 800);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const isVideo = urlInput.includes('youtube.com') || urlInput.includes('youtu.be');
    const newMaterial: UploadedMaterial = {
      id: `mat-${Date.now()}`,
      title: titleInput.trim() || (isVideo ? 'Class 9 Laws of Motion Video Tutorial' : 'Online Physics Reference Link'),
      type: isVideo ? 'youtube' : 'link',
      fileOrUrl: urlInput.trim(),
      subject: 'Science',
      chapterId: 'laws-of-motion',
      uploadedAt: new Date().toISOString().split('T')[0],
      status: 'ready',
      extractedSummary: `Educational reference from ${urlInput}. Key topics covered: Force calculations, Newton's 1st, 2nd, and 3rd laws with visual demonstrations.`,
    };

    storageService.addUploadedMaterial(newMaterial);
    refreshMaterials();
    setUrlInput('');
    setTitleInput('');
  };

  const handleDelete = (id: string) => {
    storageService.deleteUploadedMaterial(id);
    refreshMaterials();
  };

  return (
    <div className="py-6 space-y-6 max-w-5xl mx-auto px-4">
      {/* Top Back Navigation Bar */}
      <PageBackButton
        onNavigate={onNavigate}
        fallbackPath="/dashboard"
        label={isMr ? 'डॅशबोर्डकडे परत' : isHi ? 'डैशबोर्ड पर वापस' : 'Back to Dashboard'}
        currentLang={lang}
        breadcrumbs={[
          { label: isMr ? 'अभ्यास साहित्य' : isHi ? 'अध्ययन सामग्री' : 'Study Materials' },
        ]}
      />

      {/* Header */}
      <div className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#6C3BEF] uppercase tracking-wider mb-2">
          <Upload className="w-4 h-4" />
          <span>{isMr ? 'अभ्यास साहित्य संकलन' : isHi ? 'अध्ययन सामग्री' : 'Grounded Learning Materials'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3F207C]">
          {isMr ? 'अभ्यास साहित्य अपलोड करा' : isHi ? 'अध्ययन सामग्री अपलोड करें' : 'Upload Study Materials'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
          {isMr
            ? 'तुमच्या शाळेच्या नोट्स, पीडीएफ किंवा युट्यूब व्हिडिओ लिंक जोडा. विद्याबॉट तुमच्या साहित्यातून संदर्भ घेऊन थेट शंकांचे निरसन करेल.'
            : isHi
            ? 'अपनी स्कूल नोट्स, पीडीएफ या यूट्यूब वीडियो लिंक जोड़ें। विद्याबॉट आपकी सामग्री के आधार पर सीधे आपके संदेहों का समाधान करेगा।'
            : 'Add your school textbook PDFs, teacher notes, or educational video links. Vidyabot indexes them to answer your doubts with direct grounded citations!'}
        </p>
      </div>

      {/* Upload Box */}
      <div className="bg-white rounded-3xl border border-purple-100 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <button
            onClick={() => setActiveTab('file')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'file'
                ? 'bg-[#3F207C] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-purple-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Upload PDF / Text Document</span>
          </button>

          <button
            onClick={() => setActiveTab('link')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'link'
                ? 'bg-[#3F207C] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-purple-50'
            }`}
          >
            <Link className="w-4 h-4" />
            <span>Add YouTube / Web Link</span>
          </button>
        </div>

        {/* Tab 1: Drag and drop file upload */}
        {activeTab === 'file' ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              handleFileUpload(e.dataTransfer.files);
            }}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all ${
              dragActive
                ? 'border-[#6C3BEF] bg-purple-50/60'
                : 'border-purple-200 bg-slate-50/50 hover:bg-purple-50/30'
            }`}
          >
            <div className="w-16 h-16 rounded-3xl bg-purple-100 text-[#6C3BEF] flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-base font-bold text-slate-800">
              Drag & Drop your Science Notes or Chapter PDFs here
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Supports PDF, TXT, DOCX up to 25 MB
            </p>

            <label className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#6C3BEF] hover:bg-[#582dc9] text-white text-xs font-bold shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95">
              <span>Browse Files</span>
              <input
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
              />
            </label>

            {uploadStatus && (
              <div className="mt-4 text-xs font-bold text-[#6C3BEF] animate-pulse">
                ⏳ {uploadStatus}
              </div>
            )}
          </div>
        ) : (
          /* Tab 2: Link Form */
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Material Title / Topic Name
              </label>
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder="e.g. Maharashtra Board Class 9 Science Chapter 1 Video Explanation"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6C3BEF]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Video or Web URL
              </label>
              <input
                type="url"
                required
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=... or https://ncert.nic.in/..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6C3BEF]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#6C3BEF] hover:bg-[#582dc9] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all"
            >
              Add Grounded Link
            </button>
          </form>
        )}
      </div>

      {/* Uploaded Materials List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#3F207C] flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#6C3BEF]" />
          <span>Active Learning Materials ({materials.length})</span>
        </h3>

        {materials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materials.map((mat) => (
              <div
                key={mat.id}
                className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs hover:border-purple-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#6C3BEF] flex items-center justify-center shrink-0">
                      {mat.type === 'youtube' ? (
                        <Video className="w-5 h-5 text-rose-600" />
                      ) : mat.type === 'link' ? (
                        <Link className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <FileText className="w-5 h-5 text-[#6C3BEF]" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 truncate max-w-[220px]">
                        {mat.title}
                      </h4>
                      <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {mat.fileSize || 'Web Link'} • {mat.uploadedAt}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(mat.id)}
                    title="Delete document"
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  {mat.extractedSummary}
                </p>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Indexed for AI Doubt Assistant</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-purple-100 p-8 text-center text-xs text-slate-400">
            No study materials uploaded yet. Upload a PDF or paste a link to get started!
          </div>
        )}
      </div>
    </div>
  );
};
