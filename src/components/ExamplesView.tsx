import React, { useState } from 'react';
import { PRESET_CODES } from '../data/presetCodes';
import { PresetCode } from '../types';
import {
  Search,
  Play,
  Copy,
  Check,
  Code2,
  Terminal,
  Layers,
  Sparkles,
  ArrowRight,
  Workflow,
  Cpu,
  Database
} from 'lucide-react';

interface ExamplesViewProps {
  onSelectPreset: (presetId: string) => void;
}

export const ExamplesView: React.FC<ExamplesViewProps> = ({ onSelectPreset }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const languages = [
    { id: 'all', label: 'All Languages' },
    { id: 'c', label: 'C Program' },
    { id: 'python', label: 'Python' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'cpp', label: 'C++' },
    { id: 'java', label: 'Java' },
    { id: 'typescript', label: 'TypeScript' }
  ];

  const filteredPresets = PRESET_CODES.filter((preset) => {
    const matchesLang = selectedLanguage === 'all' || preset.language === selectedLanguage;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      preset.name.toLowerCase().includes(q) ||
      preset.description.toLowerCase().includes(q) ||
      preset.code.toLowerCase().includes(q) ||
      preset.language.toLowerCase().includes(q);

    return matchesLang && matchesSearch;
  });

  const handleCopyCode = (id: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getLanguageBadge = (lang: string) => {
    switch (lang) {
      case 'c':
        return {
          label: 'C Program',
          bg: 'bg-blue-50 dark:bg-blue-950/60',
          text: 'text-blue-700 dark:text-blue-300',
          border: 'border-blue-200 dark:border-blue-800'
        };
      case 'python':
        return {
          label: 'Python',
          bg: 'bg-amber-50 dark:bg-amber-950/60',
          text: 'text-amber-700 dark:text-amber-300',
          border: 'border-amber-200 dark:border-amber-800'
        };
      case 'javascript':
        return {
          label: 'JavaScript',
          bg: 'bg-yellow-50 dark:bg-yellow-950/60',
          text: 'text-yellow-700 dark:text-yellow-300',
          border: 'border-yellow-200 dark:border-yellow-800'
        };
      case 'cpp':
        return {
          label: 'C++',
          bg: 'bg-indigo-50 dark:bg-indigo-950/60',
          text: 'text-indigo-700 dark:text-indigo-300',
          border: 'border-indigo-200 dark:border-indigo-800'
        };
      case 'java':
        return {
          label: 'Java',
          bg: 'bg-red-50 dark:bg-red-950/60',
          text: 'text-red-700 dark:text-red-300',
          border: 'border-red-200 dark:border-red-800'
        };
      case 'typescript':
        return {
          label: 'TypeScript',
          bg: 'bg-cyan-50 dark:bg-cyan-950/60',
          text: 'text-cyan-700 dark:text-cyan-300',
          border: 'border-cyan-200 dark:border-cyan-800'
        };
      default:
        return {
          label: lang,
          bg: 'bg-slate-100 dark:bg-slate-800',
          text: 'text-slate-700 dark:text-slate-300',
          border: 'border-slate-300 dark:border-slate-700'
        };
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Hero Banner */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Execution Examples Library</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              All Code Programs & Visual Examples
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Select any program below to run and step through its execution line-by-line in the interactive playground. Inspect active Call Stack frames, local scope variables, stack memory, and heap allocations.
            </p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by program name, concept, or syntax..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Language Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLanguage(lang.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedLanguage === lang.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Programs */}
        {filteredPresets.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8">
            <Code2 className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No matching programs found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search terms or selecting a different language tab.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredPresets.map((preset: PresetCode) => {
              const badge = getLanguageBadge(preset.language);
              const isCopied = copiedId === preset.id;

              return (
                <div
                  key={preset.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all shadow-sm hover:shadow-md space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Top Row: Title and Language Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider ${badge.bg} ${badge.text} ${badge.border}`}>
                          {badge.label}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {preset.name}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {preset.description}
                    </p>

                    {/* Execution Stats Summary Pill Row */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-md">
                        <Workflow className="w-3 h-3 text-indigo-500" />
                        {preset.steps.length} Steps
                      </span>
                      <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-md">
                        <Cpu className="w-3 h-3 text-emerald-500" />
                        Stack Traced
                      </span>
                      <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-md">
                        <Database className="w-3 h-3 text-amber-500" />
                        Heap Managed
                      </span>
                    </div>

                    {/* Code Block Preview */}
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto max-h-[160px] relative group/code">
                      <pre className="text-[11px] leading-relaxed font-mono text-slate-300">
                        <code>{preset.code}</code>
                      </pre>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleCopyCode(preset.id, preset.code)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
                      title="Copy program source code"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => onSelectPreset(preset.id)}
                      className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Visualize in Playground</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
