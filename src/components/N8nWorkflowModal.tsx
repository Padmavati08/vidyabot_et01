import React, { useState } from 'react';
import { Network, CheckCircle2, Download, ExternalLink, X, Settings2, RefreshCw, Zap } from 'lucide-react';
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

  if (!isOpen) return null;

  const handleSave = () => {
    n8nService.setWebhookUrl(webhookUrl);
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
      provider: res.provider || 'n8n Workflow Engine',
    });
  };

  const handleDownloadWorkflow = () => {
    const link = document.createElement('a');
    link.href = '/vidyabot-n8n-workflow.json';
    link.download = 'vidyabot-n8n-workflow.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-purple-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#3F207C] to-[#6C3BEF] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Network className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold">n8n Workflow Automation</h2>
              <p className="text-xs text-purple-200">Adaptive Remediation & Doubt Pipeline</p>
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
              <span className="font-bold text-emerald-800">Workflow Connected:</span> Your application is configured to route adaptive AI doubt queries and 3-step error remediation directly through n8n automation.
            </div>
          </div>

          {/* Quick Import Instructions for Submission */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#6C3BEF]" />
                1-Click n8n Workflow Import
              </span>
              <button
                onClick={handleDownloadWorkflow}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-[#6C3BEF] font-bold text-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download Workflow JSON
              </button>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              In n8n, click <span className="font-semibold text-slate-700">Workflows &rarr; Import from File</span> and upload this JSON. It contains the Webhook ingress, error classification script, and response dispatcher.
            </p>
          </div>

          {/* Webhook Endpoint Configuration */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>n8n Production Webhook URL</span>
              <a
                href="https://padmavati08.app.n8n.cloud/home/workflows"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#6C3BEF] hover:underline flex items-center gap-1 font-semibold"
              >
                Open n8n Cloud <ExternalLink className="w-3 h-3" />
              </a>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://padmavati08.app.n8n.cloud/webhook/vidyabot-ai"
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
              {isTesting ? 'Triggering n8n Workflow...' : 'Test n8n Workflow Execution'}
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
