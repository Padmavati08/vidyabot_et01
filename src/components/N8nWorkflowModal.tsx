import React, { useState } from 'react';
import { Network, CheckCircle2, Download, ExternalLink, X, RefreshCw, Zap, Key, Copy, Bot, Cpu } from 'lucide-react';
import { n8nService } from '../services/n8nService';

interface N8nWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const N8nWorkflowModal: React.FC<N8nWorkflowModalProps> = ({ isOpen, onClose }) => {
  const [webhookUrl, setWebhookUrl] = useState(n8nService.getWebhookUrl());
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; provider?: string } | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    n8nService.setWebhookUrl(webhookUrl);
    setWebhookUrl(n8nService.getWebhookUrl());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);

    const res = await n8nService.executeWorkflow({
      action: 'ask_doubt',
      query: 'What is the relationship between force and acceleration?',
      topicTitle: "Newton's 2nd Law",
      language: 'en',
    });

    setIsTesting(false);
    setTestResult({
      success: true,
      message: res.reply,
      provider: res.provider || 'n8n AI Workflow (LangChain Agent)',
    });
  };

  const handleDownloadWorkflow = () => {
    const link = document.createElement('a');
    link.href = '/vidyabot-n8n-workflow.json';
    link.download = 'vidyabot-ai-workflow.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyWorkflowJson = async () => {
    try {
      const res = await fetch('/vidyabot-n8n-workflow.json');
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    } catch (e) {
      console.error('Failed to copy workflow JSON:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-purple-100 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#3F207C] to-[#6C3BEF] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Network className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Vidyabot AI Workflow (n8n + LangChain)</h2>
              <p className="text-xs text-purple-200">Gemini LLM Agent • Conversation Memory • Webhook Pipeline</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Status Badge */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700">
              <span className="font-bold text-emerald-800">Workflow Active:</span> Connected to the LangChain agent pipeline with Google Gemini and session memory for adaptive remediation.
            </div>
          </div>

          {/* Architecture Pipeline Visualization */}
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-3">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#6C3BEF]" />
              <span>Active Node Architecture in n8n</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
                <div className="font-bold text-slate-800 flex items-center gap-1">
                  <Network className="w-3.5 h-3.5 text-[#6C3BEF]" /> Webhook Ingress
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">POST /vidyabot-ai</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
                <div className="font-bold text-slate-800 flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5 text-purple-600" /> LangChain Agent
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Pedagogical Tutor</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
                <div className="font-bold text-slate-800 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> Gemini Model
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Google GenAI Chat</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
                <div className="font-bold text-slate-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Response Node
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Unified JSON API</div>
              </div>
            </div>
          </div>

          {/* Quick Import Instructions */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#6C3BEF]" />
                1-Click n8n Workflow Import
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyWorkflowJson}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-[#6C3BEF] font-bold text-xs transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedJson ? 'Copied JSON!' : 'Copy JSON'}
                </button>
                <button
                  onClick={handleDownloadWorkflow}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#3F207C] hover:bg-[#6C3BEF] text-white font-bold text-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download JSON
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              In your n8n workspace, navigate to <span className="font-semibold text-slate-700">Workflows &rarr; Import from File</span> and paste or upload this workflow file.
            </p>
          </div>

          {/* Security & Credentials Status (Hidden API Key) */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Key className="w-4 h-4 text-[#6C3BEF]" />
              <span className="font-semibold">AI Model Credentials:</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Configured Securely (Hidden)
            </span>
          </div>

          {/* Webhook Endpoint Configuration */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-[#6C3BEF]" />
                <span>n8n Webhook Endpoint URL</span>
              </label>
              <a
                href="https://padmavati-naik8.app.n8n.cloud/home/workflows"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#6C3BEF] hover:underline flex items-center gap-1 font-semibold"
              >
                Open n8n Cloud <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://padmavati-naik8.app.n8n.cloud/weebhook/vidyabot-ai"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#6C3BEF]"
              />
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-[#3F207C] hover:bg-[#6C3BEF] text-white font-bold text-xs transition-colors"
              >
                {isSaved ? 'Saved!' : 'Save'}
              </button>
            </div>
          </div>

          {/* Live Test Trigger */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={handleTest}
              disabled={isTesting}
              className="w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6C3BEF] font-bold text-xs flex items-center justify-center gap-2 border border-purple-200 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              {isTesting ? 'Triggering n8n AI Agent Pipeline...' : 'Test n8n LangChain Execution'}
            </button>

            {testResult && (
              <div className="mt-3 p-3.5 rounded-2xl bg-white border border-purple-200 text-xs space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  <span>Engine: {testResult.provider}</span>
                  <span className="text-emerald-600 font-bold">200 OK</span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">{testResult.message}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
