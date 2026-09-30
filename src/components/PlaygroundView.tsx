import React, { useState, useEffect, useRef } from 'react';
import { PRESET_CODES } from '../data/presetCodes';
import { ExecutionStep, PresetCode, CallStackFrame, VariableState } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Sparkles,
  Share2,
  Copy,
  Twitter,
  Terminal,
  Cpu,
  Workflow,
  Layers,
  Database,
  Check,
  AlertCircle,
  HelpCircle,
  Code2
} from 'lucide-react';

interface PlaygroundViewProps {
  initialPresetId?: string;
}

export const PlaygroundView: React.FC<PlaygroundViewProps> = ({ initialPresetId }) => {
  // Preset or custom code selection
  const [selectedPresetId, setSelectedPresetId] = useState<string>(initialPresetId || 'c-for-loop');
  const [language, setLanguage] = useState<'c' | 'python' | 'javascript' | 'cpp' | 'java' | 'typescript'>('c');
  const [code, setCode] = useState<string>(PRESET_CODES[0].code);
  const [steps, setSteps] = useState<ExecutionStep[]>(PRESET_CODES[0].steps);

  // Sync with initialPresetId prop if provided
  useEffect(() => {
    if (initialPresetId) {
      handleSelectPreset(initialPresetId);
    }
  }, [initialPresetId]);

  // Stepping state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(steps.length - 1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 0.5, 1, 2, 4
  const [breakpoints, setBreakpoints] = useState<number[]>([]);

  // Right panel tab & Left editor mode
  const [rightTab, setRightTab] = useState<'debugger' | 'engine' | 'ai-tutor'>('debugger');
  const [editorMode, setEditorMode] = useState<'visualizer' | 'edit'>('visualizer');

  // AI loading and response
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [isParsingCode, setIsParsingCode] = useState<boolean>(false);

  // Auto-play timer ref
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate accumulated console output up to current step
  const accumulatedConsoleOutput = steps
    .slice(0, currentStepIndex + 1)
    .map((s) => s.consoleOutput)
    .filter((out): out is string => typeof out === 'string' && out.trim().length > 0)
    .join('\n');

  // Handle Preset Selection
  const handleSelectPreset = (presetId: string) => {
    const found = PRESET_CODES.find((p) => p.id === presetId);
    if (found) {
      setSelectedPresetId(presetId);
      setLanguage(found.language);
      setCode(found.code);
      setSteps(found.steps);
      setCurrentStepIndex(found.steps.length - 1);
      setIsPlaying(false);
      setAiExplanation(null);
    }
  };

  // Current Step Data safely
  const currentStep: ExecutionStep = steps[currentStepIndex] || steps[0] || {
    stepNumber: 1,
    line: 1,
    codeLine: '',
    callStack: [],
    variables: [],
    stackMemory: [],
    heapMemory: [],
    explanation: 'Ready'
  };

  // Auto-play handler
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 1500 / speed;
      playTimerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          // Check breakpoint
          const nextIndex = prev + 1;
          const nextStep = steps[nextIndex];
          if (nextStep && breakpoints.includes(nextStep.line)) {
            setIsPlaying(false);
          }
          return nextIndex;
        });
      }, intervalMs);
    } else if (playTimerRef.current) {
      clearInterval(playTimerRef.current);
    }

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, speed, steps, breakpoints]);

  // Toggle Breakpoint on line
  const toggleBreakpoint = (lineNum: number) => {
    setBreakpoints((prev) =>
      prev.includes(lineNum) ? prev.filter((l) => l !== lineNum) : [...prev, lineNum]
    );
  };

  // Handle Visualize Execution via AI API or Fallback
  const handleVisualizeExecution = async () => {
    setIsParsingCode(true);
    setAiExplanation(null);
    try {
      const res = await fetch('/api/visualize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json();
      if (data.success && data.data?.steps?.length > 0) {
        setSteps(data.data.steps);
        setCurrentStepIndex(0);
      } else {
        // Fallback generator for edited code
        generateLocalSteps(code);
      }
    } catch (err) {
      console.warn('API error, using client execution trace:', err);
      generateLocalSteps(code);
    } finally {
      setIsParsingCode(false);
    }
  };

  // Simple client-side fallback step generator
  const generateLocalSteps = (codeStr: string) => {
    const lines = codeStr.split('\n');
    const localSteps: ExecutionStep[] = [];
    let stepCount = 1;
    const vars: VariableState[] = [];
    const stack: CallStackFrame[] = [{ id: 'f1', name: '<main>', line: 1 }];

    lines.forEach((lineText, idx) => {
      const lineNum = idx + 1;
      const trimmed = lineText.trim();
      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('//')) return;

      if (trimmed.includes('=')) {
        const parts = trimmed.split('=');
        const varName = parts[0].trim().replace('let ', '').replace('const ', '').replace('var ', '').replace('int ', '');
        const varVal = parts[1]?.trim() || 'undefined';
        vars.push({ name: varName, value: varVal, type: 'variable' });
      }

      let consoleOut: string | undefined = undefined;
      if (
        trimmed.includes('print') ||
        trimmed.includes('console.log') ||
        trimmed.includes('std::cout')
      ) {
        const match = trimmed.match(/(?:print|console\.log|std::cout\s*<<)\s*\((.*?)\)/);
        if (match && match[1]) {
          consoleOut = match[1].replace(/['"]/g, '').trim();
        } else if (trimmed.includes('"') || trimmed.includes("'")) {
          const stringMatch = trimmed.match(/["'](.*?)["']/);
          consoleOut = stringMatch ? stringMatch[1] : trimmed;
        } else {
          consoleOut = `Output: ${trimmed}`;
        }
      }

      localSteps.push({
        stepNumber: stepCount,
        line: lineNum,
        codeLine: trimmed,
        callStack: [...stack],
        variables: [...vars],
        stackMemory: [{ address: `0x7f0${stepCount}`, name: `<main>`, value: 'Stack Frame' }],
        heapMemory: vars.length > 0 ? [{ address: `0x00A${stepCount}`, type: 'Object', value: JSON.stringify(vars) }] : [],
        explanation: `Executed line ${lineNum}: ${trimmed}`,
        consoleOutput: consoleOut
      });
      stepCount++;
    });

    if (localSteps.length === 0) {
      localSteps.push({
        stepNumber: 1,
        line: 1,
        codeLine: codeStr.slice(0, 30),
        callStack: [{ id: 'f1', name: '<main>', line: 1 }],
        variables: [],
        stackMemory: [],
        heapMemory: [],
        explanation: 'Code parsed.'
      });
    }

    setSteps(localSteps);
    setCurrentStepIndex(0);
  };

  // Ask AI to Explain Step
  const handleAskAiExplain = async () => {
    setRightTab('ai-tutor');
    setIsAiLoading(true);
    setAiExplanation(null);
    try {
      const res = await fetch('/api/ai-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language,
          currentStep,
          callStack: currentStep.callStack,
          variables: currentStep.variables,
        }),
      });
      const data = await res.json();
      if (data.success && data.explanation) {
        setAiExplanation(data.explanation);
      } else {
        setAiExplanation('Unable to fetch AI response right now.');
      }
    } catch (err: any) {
      setAiExplanation('Error connecting to Gemini AI tutor: ' + err.message);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Copy share link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const codeLines = code.split('\n');

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Top Controls Toolbar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-3 sm:p-4 space-y-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Left Group: Language & Sample Code */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={language}
              onChange={(e: any) => setLanguage(e.target.value)}
              className="bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-base sm:text-xs font-semibold px-3 py-1.5 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
              id="playground-language-select"
            >
              <option value="c">C C Program</option>
              <option value="javascript">JS JavaScript</option>
              <option value="python">PY Python</option>
              <option value="cpp">C++ C++</option>
              <option value="java">JAVA Java</option>
              <option value="typescript">TS TypeScript</option>
            </select>

            <select
              value={selectedPresetId}
              onChange={(e) => handleSelectPreset(e.target.value)}
              className="bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-base sm:text-xs font-medium px-3 py-1.5 rounded-xl text-indigo-700 dark:text-indigo-300 focus:outline-none focus:border-indigo-500 max-w-[200px] sm:max-w-none truncate"
              id="playground-preset-select"
            >
              <option value="" disabled>
                Select sample code...
              </option>
              {PRESET_CODES.map((p) => (
                <option key={p.id} value={p.id}>
                  Sample code: {p.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleVisualizeExecution}
              disabled={isParsingCode}
              id="visualize-execution-btn"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              {isParsingCode ? (
                <span className="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-white" />
              )}
              <span>{isParsingCode ? 'Parsing...' : 'Visualize Execution'}</span>
            </button>
          </div>

          {/* Middle Group: Step & Playback Controls */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-300 dark:border-slate-800">
            <button
              onClick={() => setCurrentStepIndex(0)}
              title="Reset to Start"
              id="step-reset-btn"
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentStepIndex === 0}
              id="step-back-btn"
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 transition-colors"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              id="step-play-pause-btn"
              className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            </button>
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
              disabled={currentStepIndex === steps.length - 1}
              id="step-forward-btn"
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 transition-colors"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            {/* Speed Buttons */}
            <div className="flex items-center gap-1 border-l border-slate-300 dark:border-slate-800 pl-2">
              <span className="text-[10px] text-slate-500 mr-1 font-mono">Speed:</span>
              {[0.5, 1, 2, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-1.5 py-0.5 text-[10px] rounded font-mono font-medium transition-colors ${
                    speed === s ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                if (!isPlaying) setIsPlaying(true);
              }}
              id="run-step-by-step-btn"
              className="ml-1 px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
            >
              Run Step-by-Step
            </button>

            {/* Step Counter */}
            <div className="border-l border-slate-300 dark:border-slate-800 pl-2 text-xs font-mono font-semibold text-indigo-700 dark:text-indigo-300">
              Step {currentStepIndex + 1}/{steps.length}
            </div>
          </div>

          {/* Right Group: Action Share / Tweet */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleAskAiExplain}
              id="ask-ai-tutor-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-500/20 text-xs font-semibold transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>AI Tutor</span>
            </button>

            <button
              onClick={handleCopyLink}
              id="share-link-btn"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Share Visualization'}</span>
            </button>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Visualizing code execution step-by-step on Code Visualizer!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
            >
              <Twitter className="w-3.5 h-3.5 text-sky-500 fill-sky-500" />
              <span>Tweet</span>
            </a>
          </div>
        </div>

        {/* Timeline Slider Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Timeline Execution Progress</span>
            <span className="text-indigo-400 font-semibold">{currentStep.codeLine || 'Execution Start'}</span>
          </div>
          <input
            type="range"
            min={0}
            max={Math.max(0, steps.length - 1)}
            value={currentStepIndex}
            onChange={(e) => {
              setIsPlaying(false);
              setCurrentStepIndex(Number(e.target.value));
            }}
            id="timeline-slider"
            className="w-full accent-indigo-500 bg-slate-950 h-2 rounded-lg cursor-pointer border border-slate-800"
          />
        </div>
      </div>

      {/* Summary Metric Strip Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-3 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs font-mono">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-2.5 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <Workflow className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-slate-600 dark:text-slate-400">Call Stack</span>
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-500/30">
            {currentStep.callStack.length} frames
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-2.5 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-slate-600 dark:text-slate-400">Variables</span>
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-500/30">
            {currentStep.variables.length} tracked
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-2.5 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-slate-600 dark:text-slate-400">Stack Memory</span>
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/30">
            {currentStep.stackMemory.length} blocks
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-2.5 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-slate-600 dark:text-slate-400">Heap Memory</span>
          </div>
          <span className="font-bold text-slate-900 dark:text-slate-100 bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-500/30">
            {currentStep.heapMemory.length} objects
          </span>
        </div>
      </div>

      {/* Main Split Layout: Left Code Editor | Right Debugger & Inspector */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden min-h-[500px]">
        {/* Left Side: Interactive Code Editor / Visualizer (Col 6) */}
        <div className="lg:col-span-6 bg-slate-100 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col font-mono text-xs">
          <div className="bg-white dark:bg-slate-900/90 px-3 py-2 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-slate-800 dark:text-slate-300 gap-2">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setEditorMode('visualizer')}
                id="editor-mode-visualizer-btn"
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  editorMode === 'visualizer'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Visualizer View</span>
              </button>
              <button
                onClick={() => setEditorMode('edit')}
                id="editor-mode-edit-btn"
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  editorMode === 'edit'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Edit Code Mode</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                {codeLines.length} lines
              </span>
              <button
                onClick={() => {
                  if (editorMode === 'edit') {
                    handleVisualizeExecution();
                    setEditorMode('visualizer');
                  } else {
                    setEditorMode('edit');
                  }
                }}
                className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-500/30 text-[11px] font-semibold transition-colors"
              >
                {editorMode === 'edit' ? 'Run & Visualize' : 'Edit Source'}
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: VISUALIZER VIEW */}
          {editorMode === 'visualizer' ? (
            <div className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="flex-1 overflow-y-auto p-2 space-y-1 relative bg-white dark:bg-slate-950">
                {codeLines.map((lineText, idx) => {
                  const lineNum = idx + 1;
                  const isCurrentLine = currentStep.line === lineNum;
                  const hasBreakpoint = breakpoints.includes(lineNum);

                  return (
                    <div
                      key={lineNum}
                      className={`flex items-center gap-3 px-2 py-1 rounded transition-colors ${
                        isCurrentLine
                          ? 'bg-indigo-100 dark:bg-indigo-500/20 border-l-4 border-indigo-600 dark:border-indigo-400 font-semibold text-slate-900 dark:text-white shadow-sm'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {/* Breakpoint / Line Number Gutter */}
                      <button
                        onClick={() => toggleBreakpoint(lineNum)}
                        className="flex items-center justify-center w-6 text-[11px] text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-mono select-none"
                        title="Toggle Breakpoint"
                      >
                        {hasBreakpoint ? (
                          <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50 inline-block" />
                        ) : (
                          <span>{lineNum}</span>
                        )}
                      </button>

                      {/* Active Executing Arrow */}
                      <div className="w-4 flex items-center justify-center select-none">
                        {isCurrentLine && <Play className="w-3 h-3 fill-indigo-600 text-indigo-600 dark:fill-indigo-400 dark:text-indigo-400 animate-pulse" />}
                      </div>

                      {/* Line Text */}
                      <div className="flex-1 whitespace-pre font-mono text-xs overflow-x-auto">
                        {lineText || ' '}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* VIEW MODE 2: FULL CODE EDITOR MODE */
            <div className="flex-1 flex flex-col p-3 space-y-3 bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-sans">
                <span>Type or paste your {language.toUpperCase()} code below:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCode('')}
                    className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-[11px]"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => {
                      const found = PRESET_CODES.find((p) => p.id === selectedPresetId);
                      if (found) setCode(found.code);
                    }}
                    className="px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 hover:underline text-[11px]"
                  >
                    Reset Code
                  </button>
                </div>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed min-h-[300px]"
                placeholder="Type your code here..."
                id="code-editor-textarea-full"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500 font-sans">
                  Press Visualize Execution to run AI memory tracing
                </span>
                <button
                  onClick={() => {
                    handleVisualizeExecution();
                    setEditorMode('visualizer');
                  }}
                  disabled={isParsingCode}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{isParsingCode ? 'Parsing...' : 'Visualize Execution'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Debugger / Engine Internals / AI Tutor (Col 6) */}
        <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950 flex flex-col border-t lg:border-t-0">
          {/* Tabs */}
          <div className="flex items-center bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-2 pt-2 gap-1">
            <button
              onClick={() => setRightTab('debugger')}
              id="tab-debugger"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl text-xs font-semibold border-t border-x transition-colors ${
                rightTab === 'debugger'
                  ? 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Debugger</span>
            </button>

            <button
              onClick={() => setRightTab('engine')}
              id="tab-engine"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl text-xs font-semibold border-t border-x transition-colors ${
                rightTab === 'engine'
                  ? 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Engine Internals</span>
            </button>

            <button
              onClick={() => setRightTab('ai-tutor')}
              id="tab-ai-tutor"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl text-xs font-semibold border-t border-x transition-colors ${
                rightTab === 'ai-tutor'
                  ? 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>AI Explanation</span>
            </button>
          </div>

          {/* Right Panel Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* TAB 1: DEBUGGER */}
            {rightTab === 'debugger' && (
              <div className="space-y-4">
                {/* Current Step Explanation Box */}
                <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 p-3 rounded-xl flex items-center gap-2.5 shadow-sm">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <div className="text-xs text-slate-800 dark:text-slate-200 font-sans font-medium leading-tight">
                    <span className="font-bold text-indigo-700 dark:text-indigo-300 mr-1.5 uppercase tracking-wide text-[11px]">Step {currentStepIndex + 1}:</span>
                    {currentStep.explanation}
                  </div>
                </div>

                {/* 2x2 Debugger Grid Layout Matching Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                  {/* 1. CALL STACK */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex flex-col min-h-[160px] shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-2">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                        <Workflow className="w-3.5 h-3.5 text-indigo-500" /> CALL STACK
                      </span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {currentStep.callStack.length}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      {currentStep.callStack.length === 0 ? (
                        <p className="text-center text-slate-400 dark:text-slate-500 text-xs my-auto italic">No frames on stack</p>
                      ) : (
                        <div className="space-y-1.5">
                          {currentStep.callStack.map((frame, idx) => (
                            <div key={frame.id || idx} className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px]">
                              <span className="font-semibold text-slate-800 dark:text-slate-200">{frame.name}</span>
                              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/80 px-1.5 py-0.5 rounded">Line {frame.line}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. VARIABLES */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex flex-col min-h-[160px] shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-2">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                        <Terminal className="w-3.5 h-3.5 text-blue-500" /> VARIABLES
                      </span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {currentStep.variables.length}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      {currentStep.variables.length === 0 ? (
                        <p className="text-center text-slate-400 dark:text-slate-500 text-xs my-auto italic">No variables in scope</p>
                      ) : (
                        <div className="space-y-1 max-h-[120px] overflow-y-auto">
                          {currentStep.variables.map((v, idx) => (
                            <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px]">
                              <span className="text-indigo-600 dark:text-indigo-400 font-bold">{v.name}</span>
                              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{v.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 3. BREAKPOINTS */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex flex-col min-h-[160px] shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-2">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                        <AlertCircle className="w-3.5 h-3.5 text-rose-500" /> BREAKPOINTS
                      </span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {breakpoints.length}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      {breakpoints.length === 0 ? (
                        <p className="text-center text-slate-400 dark:text-slate-500 text-xs my-auto italic">Click line numbers to add breakpoints</p>
                      ) : (
                        <div className="space-y-1 max-h-[120px] overflow-y-auto">
                          {breakpoints.map((lineNum) => (
                            <div key={lineNum} className="flex items-center justify-between p-1.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px]">
                              <span className="flex items-center gap-1.5 text-rose-500 font-bold">
                                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Line {lineNum}
                              </span>
                              <button
                                onClick={() => toggleBreakpoint(lineNum)}
                                className="text-slate-400 hover:text-rose-500 text-[10px]"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 4. CONSOLE */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex flex-col min-h-[160px] shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 mb-2">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                        <Terminal className="w-3.5 h-3.5 text-emerald-500" /> &gt; CONSOLE
                      </span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {accumulatedConsoleOutput ? accumulatedConsoleOutput.split('\n').filter(Boolean).length : 0}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 overflow-y-auto max-h-[110px]">
                      {accumulatedConsoleOutput ? (
                        <p className="text-emerald-400 text-xs font-mono whitespace-pre-wrap">{accumulatedConsoleOutput}</p>
                      ) : (
                        <p className="text-center text-slate-500 text-xs my-auto italic">No output yet - run your code</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stack & Heap Memory Allocation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs pt-1">
                  {/* Stack Memory */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2 shadow-sm">
                    <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-emerald-500" /> Stack Memory
                      </span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{currentStep.stackMemory.length} blocks</span>
                    </div>
                    {currentStep.stackMemory.length === 0 ? (
                      <p className="text-slate-400 dark:text-slate-500 text-[11px] italic">No stack frames allocated</p>
                    ) : (
                      <div className="space-y-1 max-h-[120px] overflow-y-auto">
                        {currentStep.stackMemory.map((block, idx) => (
                          <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px]">
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{block.address}</span>
                            <span className="text-slate-700 dark:text-slate-300">{block.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Heap Memory */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2 shadow-sm">
                    <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-amber-500" /> Heap Memory
                      </span>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">{currentStep.heapMemory.length} objects</span>
                    </div>
                    {currentStep.heapMemory.length === 0 ? (
                      <p className="text-slate-400 dark:text-slate-500 text-[11px] italic">No heap objects allocated</p>
                    ) : (
                      <div className="space-y-1 max-h-[120px] overflow-y-auto">
                        {currentStep.heapMemory.map((obj, idx) => (
                          <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px]">
                            <span className="text-amber-600 dark:text-amber-400 font-bold">{obj.address}</span>
                            <span className="text-slate-700 dark:text-slate-300 truncate max-w-[120px]">{obj.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ENGINE INTERNALS */}
            {rightTab === 'engine' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5 shadow-sm">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Runtime Engine Internals
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    How the {language.toUpperCase()} engine processes code, memory frames, and task queues.
                  </p>
                </div>

                {/* Event Loop Visual Diagram */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="font-bold text-indigo-700 dark:text-indigo-300">1. Call Stack</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      LIFO execution frame container. Currently evaluating line {currentStep.line}.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="font-bold text-purple-700 dark:text-purple-300">2. Heap Memory</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      Stores dynamically allocated objects, dictionaries, arrays, and closures.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="font-bold text-emerald-700 dark:text-emerald-300">3. Microtask Queue</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      Promise callbacks and process.nextTick callbacks executed before event loop ticks.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="font-bold text-amber-700 dark:text-amber-300">4. Garbage Collector</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">
                      Generational GC tracking unreferenced heap objects for reclamation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: AI TUTOR */}
            {rightTab === 'ai-tutor' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Gemini AI Code Tutor</h3>
                  </div>
                  <button
                    onClick={handleAskAiExplain}
                    disabled={isAiLoading}
                    className="px-3 py-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all disabled:opacity-50"
                  >
                    {isAiLoading ? 'Analyzing...' : 'Ask AI to Explain Step'}
                  </button>
                </div>

                {isAiLoading ? (
                  <div className="p-8 text-center space-y-3">
                    <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-xs text-purple-700 dark:text-purple-300 font-mono">
                      Gemini is inspecting Call Stack, Heap allocations, and active variables...
                    </p>
                  </div>
                ) : aiExplanation ? (
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line font-sans space-y-2">
                    {aiExplanation}
                  </div>
                ) : (
                  <div className="text-center p-6 text-slate-500 dark:text-slate-400 space-y-2">
                    <p className="text-xs">
                      Click <strong className="text-purple-700 dark:text-purple-300">"Ask AI to Explain Step"</strong> to receive an in-depth plain English explanation of memory and execution for Step {currentStepIndex + 1}.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
