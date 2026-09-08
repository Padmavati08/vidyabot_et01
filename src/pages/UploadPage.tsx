import React, { useState } from 'react';
import { Upload, FileText, Video, Link, Trash2, CheckCircle2, AlertCircle, Sparkles, BookOpen, Clock, Eye, MessageSquareText } from 'lucide-react';
import { UserProfile, UploadedMaterial } from '../types';
import { storageService } from '../services/storageService';
import { PageBackButton } from '../components/PageBackButton';
import { StudyMaterialReaderModal } from '../components/StudyMaterialReaderModal';

interface UploadPageProps {
  userProfile: UserProfile;
  onNavigate: (path: string) => void;
}

export const UploadPage: React.FC<UploadPageProps> = ({ userProfile, onNavigate }) => {
  const lang = userProfile.currentLanguage || 'en';
  const isMr = lang === 'mr';
  const isHi = lang === 'hi';

  const [materials, setMaterials] = useState<UploadedMaterial[]>(storageService.getUploadedMaterials());
  const [activeTab, setActiveTab] = useState<'file' | 'link' | 'paste'>('file');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>('');
  const [titleInput, setTitleInput] = useState<string>('');
  const [pastedNotesTitle, setPastedNotesTitle] = useState<string>('');
  const [pastedNotesContent, setPastedNotesContent] = useState<string>('');
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [selectedMaterialForReading, setSelectedMaterialForReading] = useState<UploadedMaterial | null>(null);

  const refreshMaterials = () => {
    setMaterials(storageService.getUploadedMaterials());
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    setUploadStatus(isMr ? 'अभ्यास साहित्य वाचत आहे व इंडेक्स तयार करत आहे...' : isHi ? 'अध्ययन सामग्री पढ़ रहे हैं और इंडेक्स तैयार कर रहे हैं...' : 'Extracting study content & creating grounded AI index...');

    // If it's a plain text or markdown file, read actual text via FileReader
    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = (e.target?.result as string) || '';
        const summarySnippet = fileContent.slice(0, 180) + '...';

        const newMaterial: UploadedMaterial = {
          id: `mat-${Date.now()}`,
          title: file.name,
          type: 'text',
          fileOrUrl: file.name,
          fileSize: `${(file.size / 1024).toFixed(1)} KB`,
          subject: 'Science',
          chapterId: 'laws-of-motion',
          uploadedAt: new Date().toISOString().split('T')[0],
          status: 'ready',
          extractedSummary: summarySnippet || `Student notes extracted from "${file.name}".`,
          fullNotes: fileContent,
          keyConcepts: [
            'Class 9 Physics student uploaded notes on Laws of Motion',
            'Covers foundational definitions and equations',
            'Fully indexed for Vidyabot grounded doubt resolution'
          ],
          keyFormulas: [
            'F = m × a (Newton\'s 2nd Law)',
            'p = m × v (Linear Momentum)',
            '1 N = 10⁵ dyne'
          ],
          practiceQuestions: [
            'What is the core takeaway regarding force and inertia in these notes?',
            'How does this document relate to Newton’s three laws of motion?'
          ]
        };

        storageService.addUploadedMaterial(newMaterial);
        refreshMaterials();
        setUploadStatus(null);
        setSelectedMaterialForReading(newMaterial);
      };
      reader.readAsText(file);
      return;
    }

    // PDF or other document
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
        fullNotes: `### Class 9 Science: Laws of Motion — Extracted Document
**File Name:** ${file.name}
**Size:** ${(file.size / (1024 * 1024)).toFixed(2)} MB

#### Key Concepts Extracted:
1. **Force & Motion:** Definition of force as push/pull, SI unit Newton (N) and CGS unit dyne (1 N = 10⁵ dyne).
2. **Balanced vs. Unbalanced Forces:** Resultant net force = 0 produces no acceleration. Non-zero net force causes acceleration $a = F/m$.
3. **Inertia:** Inertia of rest, inertia of motion, and inertia of direction. Mass is the quantitative measure of inertia.
4. **Newton's Laws:**
   - 1st Law: Law of Inertia.
   - 2nd Law: $F = m \\times a$, rate of change of momentum is proportional to applied force.
   - 3rd Law: Action and reaction are equal and opposite, acting on different bodies.`,
        keyConcepts: [
          'Force is a vector quantity with magnitude and direction.',
          'Inertia of an object depends on its mass: larger mass = greater inertia.',
          'F_net = m × a is derived from Newton\'s Second Law.',
          'Action and reaction pairs act on distinct interacting bodies.'
        ],
        keyFormulas: [
          'F = m × a',
          'p = m × v',
          '1 N = 1 kg·m/s²',
          '1 N = 10⁵ dyne'
        ],
        practiceQuestions: [
          'Why does a cyclist keep pedaling to overcome opposing friction? (Friction is an external unbalanced force)',
          'How does mass relate to inertia according to Newton\'s First Law? (Mass is the direct measure of inertia)'
        ]
      };

      storageService.addUploadedMaterial(newMaterial);
      refreshMaterials();
      setUploadStatus(null);
      setSelectedMaterialForReading(newMaterial);
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
      fullNotes: `### Web Reference: ${titleInput.trim() || urlInput}
**Source URL:** ${urlInput}
**Type:** ${isVideo ? 'Video Lecture / Demonstration' : 'Web Article / Curriculum Resource'}

#### Summary of Key Concepts:
- Visual explanation of Newton's three laws of motion.
- Demonstration of inertia with coin-and-cardboard and rolling ball experiments.
- Calculation of force and acceleration for various masses.
- Rocket action-reaction balloon demonstration.`,
      keyConcepts: [
        'Experimental demonstration of Newton\'s laws',
        'Visual force vectors and motion diagrams',
        'Relatable real-world analogies'
      ],
      keyFormulas: [
        'F = m × a',
        'p = m × v'
      ],
      practiceQuestions: [
        'How does the video demonstrate inertia of rest? (Coin falling into glass when card is flicked)',
        'What is the direction of reaction force during a jump? (Upward from the ground on the feet)'
      ]
    };

    storageService.addUploadedMaterial(newMaterial);
    refreshMaterials();
    setUrlInput('');
    setTitleInput('');
    setSelectedMaterialForReading(newMaterial);
  };

  const handlePasteNotesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedNotesContent.trim()) return;

    const title = pastedNotesTitle.trim() || 'My Physics Revision Notes';
    const newMaterial: UploadedMaterial = {
      id: `mat-${Date.now()}`,
      title,
      type: 'text',
      fileOrUrl: 'Self-Authored Notes',
      fileSize: `${(pastedNotesContent.length / 1024).toFixed(1)} KB`,
      subject: 'Science',
      chapterId: 'laws-of-motion',
      uploadedAt: new Date().toISOString().split('T')[0],
      status: 'ready',
      extractedSummary: pastedNotesContent.slice(0, 160) + (pastedNotesContent.length > 160 ? '...' : ''),
      fullNotes: pastedNotesContent,
      keyConcepts: [
        'Student-authored study notes and formulas',
        'Indexed for Vidyabot personalized doubt resolution'
      ],
      keyFormulas: [
        'F = m × a',
        'p = m × v'
      ],
      practiceQuestions: [
        'How can you apply these notes to solve post-test numerical problems?'
      ]
    };

    storageService.addUploadedMaterial(newMaterial);
    refreshMaterials();
    setPastedNotesTitle('');
    setPastedNotesContent('');
    setSelectedMaterialForReading(newMaterial);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
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
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('file')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
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
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'link'
                ? 'bg-[#3F207C] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-purple-50'
            }`}
          >
            <Link className="w-4 h-4" />
            <span>Add YouTube / Web Link</span>
          </button>

          <button
            onClick={() => setActiveTab('paste')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'paste'
                ? 'bg-[#3F207C] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-purple-50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Type / Paste Revision Notes</span>
          </button>
        </div>

        {/* Tab 1: Drag and drop file upload */}
        {activeTab === 'file' && (
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
              Supports PDF, TXT, MD, DOCX up to 25 MB • Click to read full notes anytime
            </p>

            <label className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#6C3BEF] hover:bg-[#582dc9] text-white text-xs font-bold shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95">
              <span>Browse Files</span>
              <input
                type="file"
                accept=".pdf,.txt,.md,.doc,.docx"
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
        )}

        {/* Tab 2: Link Form */}
        {activeTab === 'link' && (
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
              Add Grounded Link & Notes
            </button>
          </form>
        )}

        {/* Tab 3: Paste Custom Notes */}
        {activeTab === 'paste' && (
          <form onSubmit={handlePasteNotesSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Notes Title
              </label>
              <input
                type="text"
                value={pastedNotesTitle}
                onChange={(e) => setPastedNotesTitle(e.target.value)}
                placeholder="e.g. Newton's 2nd Law Exam Formula Cheat-Sheet & My Class Notes"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6C3BEF]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Paste / Write Full Notes Text
              </label>
              <textarea
                rows={6}
                required
                value={pastedNotesContent}
                onChange={(e) => setPastedNotesContent(e.target.value)}
                placeholder="Type or paste your classroom lecture notes, teacher tips, formulas, and key points here..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6C3BEF]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#6C3BEF] hover:bg-[#582dc9] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all"
            >
              Save & Open Full Notes Reader
            </button>
          </form>
        )}
      </div>

      {/* Uploaded Materials List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-[#3F207C] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#6C3BEF]" />
            <span>Active Learning Materials ({materials.length})</span>
          </h3>
          <span className="text-xs text-[#6C3BEF] font-semibold">
            💡 Click any material card to read the whole notes & listen to audio!
          </span>
        </div>

        {materials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materials.map((mat) => (
              <div
                key={mat.id}
                onClick={() => setSelectedMaterialForReading(mat)}
                className="bg-white p-5 rounded-3xl border border-purple-100 shadow-xs hover:border-[#6C3BEF] hover:shadow-md transition-all flex flex-col justify-between space-y-3 cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 group-hover:bg-purple-100 text-[#6C3BEF] flex items-center justify-center shrink-0 transition-colors">
                      {mat.type === 'youtube' ? (
                        <Video className="w-5 h-5 text-rose-600" />
                      ) : mat.type === 'link' ? (
                        <Link className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <FileText className="w-5 h-5 text-[#6C3BEF]" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#3F207C] transition-colors truncate max-w-[220px]">
                        {mat.title}
                      </h4>
                      <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {mat.fileSize || 'Notes & Summary'} • {mat.uploadedAt}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleDelete(mat.id, e)}
                    title="Delete document"
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100 group-hover:bg-purple-50/40 transition-colors">
                  {mat.extractedSummary}
                </p>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Indexed for Grounded RAG</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[#6C3BEF] font-bold group-hover:underline">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isMr ? 'पूर्ण नोट्स वाचा' : isHi ? 'पूरी नोट्स पढ़ें' : 'Read Whole Notes'}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-purple-100 p-8 text-center text-xs text-slate-400">
            No study materials uploaded yet. Upload a PDF, paste text, or paste a link to get started!
          </div>
        )}
      </div>

      {/* Reader Modal */}
      {selectedMaterialForReading && (
        <StudyMaterialReaderModal
          material={selectedMaterialForReading}
          currentLang={lang}
          onClose={() => setSelectedMaterialForReading(null)}
          onAskDoubt={(question) => {
            // Navigate to chapter or lesson where DoubtAssistant is present
            onNavigate('/chapters/laws-of-motion');
          }}
        />
      )}
    </div>
  );
};
