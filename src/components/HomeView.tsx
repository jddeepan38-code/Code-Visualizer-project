import React from 'react';
import { NavigationTab } from '../types';
import {
  Play,
  ArrowRight,
  Cpu,
  Layers,
  Database,
  Terminal,
  Zap,
  Sparkles,
  GitCommit,
  Workflow,
  CheckCircle2,
  Boxes,
  Activity,
  Code
} from 'lucide-react';

interface HomeViewProps {
  setCurrentTab: (tab: NavigationTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setCurrentTab }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-between selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-40 right-10 w-[400px] h-[300px] bg-purple-500/10 dark:bg-purple-600/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Hero Section */}
      <section className="relative w-full max-w-5xl mx-auto px-4 pt-16 pb-20 text-center flex flex-col items-center">
        {/* Badge */}
        <button
          onClick={() => setCurrentTab('playground')}
          id="hero-badge-btn"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-medium mb-8 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all cursor-pointer shadow-lg shadow-indigo-500/10 group"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-ping" />
          <Play className="w-3.5 h-3.5 fill-indigo-600 dark:fill-indigo-400 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
          <span>Interactive Code Execution Visualizer</span>
        </button>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] mb-6 max-w-4xl">
          Interactive Code Visualizer:{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">
            See How Your Code Really Works
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-10 font-normal">
          Visualize code execution in real-time. Watch the event loop spin, memory allocate, pointers resolve, and the JVM garbage collect — all step by step.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <button
            onClick={() => setCurrentTab('playground')}
            id="hero-open-playground-btn"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm sm:text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Open Playground</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentTab('data-structures')}
            id="hero-learn-more-btn"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium text-sm sm:text-base transition-all shadow-sm"
          >
            <span>Learn More</span>
          </button>
        </div>

        {/* Hero Interactive Preview Showcase Box */}
        <div className="w-full rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 text-left relative overflow-hidden backdrop-blur-xl group">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800/80 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 ml-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> fibonacci_memo.py — Live Execution Trace
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-500/20 font-semibold">
                Step 12/12 Completed
              </span>
            </div>
          </div>

          {/* Quick Preview Code & Memory Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Code Snippet */}
            <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 font-mono text-xs text-slate-800 dark:text-slate-300 space-y-1 overflow-x-auto">
              <div className="text-slate-500"># Recursive Fibonacci with Memoization</div>
              <div className="text-purple-600 dark:text-purple-400">def <span className="text-blue-600 dark:text-blue-400">fibonacci</span>(n, memo=&#123;&#125;):</div>
              <div className="pl-4 text-slate-700 dark:text-slate-300">if n in memo: <span className="text-purple-600 dark:text-purple-400">return</span> memo[n]</div>
              <div className="pl-4 text-slate-700 dark:text-slate-300">if n &lt;= 1: <span className="text-purple-600 dark:text-purple-400">return</span> n</div>
              <div className="pl-4 bg-indigo-100 dark:bg-indigo-500/20 border-l-2 border-indigo-500 dark:border-indigo-400 pl-3 py-0.5 rounded-r text-indigo-900 dark:text-indigo-200 font-semibold">
                result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
              </div>
              <div className="pl-4 text-slate-700 dark:text-slate-300">memo[n] = result</div>
              <div className="pl-4 text-slate-700 dark:text-slate-300"><span className="text-purple-600 dark:text-purple-400">return</span> result</div>
            </div>

            {/* Right: Live Call Stack & Heap Snapshot */}
            <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 text-xs space-y-3">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/60 pb-2">
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Workflow className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Active Call Stack Frames
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">3 Frames Allocated</span>
              </div>

              <div className="space-y-1.5 font-mono">
                <div className="bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/40 p-2 rounded-lg flex items-center justify-between text-indigo-900 dark:text-indigo-200 font-medium">
                  <span>fibonacci(n=2)</span>
                  <span className="text-[10px] bg-indigo-200 dark:bg-indigo-500/20 px-1.5 py-0.5 rounded">Line 8</span>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-lg flex items-center justify-between text-slate-700 dark:text-slate-400">
                  <span>fibonacci(n=3)</span>
                  <span className="text-[10px] text-slate-500">Line 8</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/60 p-2 rounded-lg flex items-center justify-between text-slate-500">
                  <span>&lt;module&gt;</span>
                  <span className="text-[10px] text-slate-500">Line 14</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-600 dark:text-slate-400">Heap Memo Dict:</span>
                <span className="font-mono text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                  &#123; 2: 1, 3: 2, 4: 3 &#125;
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> Try custom Python, JavaScript, C++, or Java code in our full debugger!
            </p>
            <button
              onClick={() => setCurrentTab('playground')}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              Test in Playground <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="w-full bg-slate-100/80 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800/80 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              Everything You Need to Master Code Execution
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Designed for visual learners, algorithm developers, and educators. Inspect memory step-by-step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div
              onClick={() => setCurrentTab('playground')}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer group shadow-sm"
            >
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 w-fit mb-4 group-hover:scale-110 transition-transform">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                Real-Time Call Stack & Debugger
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Step through recursion frames, function calls, local scope variable bindings, and return values with precise line highlights.
              </p>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => setCurrentTab('data-structures')}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer group shadow-sm"
            >
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 w-fit mb-4 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                Data Structures Visualizer
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Interactive push, pop, insert, and delete animations for Arrays, Linked Lists, Stacks, Queues, Binary Search Trees, and Heaps.
              </p>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => setCurrentTab('algorithms')}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer group shadow-sm"
            >
              <div className="p-3 rounded-xl bg-pink-50 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/20 text-pink-600 dark:text-pink-400 w-fit mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-300 transition-colors">
                Algorithms & Sorting
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Watch Quick Sort, Merge Sort, and Binary Search swap elements and narrow down targets with adjustable step speeds.
              </p>
            </div>

            {/* Card 4 */}
            <div
              onClick={() => setCurrentTab('tools')}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer group shadow-sm"
            >
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 w-fit mb-4 group-hover:scale-110 transition-transform">
                <Boxes className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                Stack & Heap Memory Map
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Inspect pointer references, memory block addresses (0x7ff...), and heap object allocations directly during execution.
              </p>
            </div>

            {/* Card 5 */}
            <div
              onClick={() => setCurrentTab('playground')}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer group shadow-sm"
            >
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 w-fit mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                Gemini AI Code Tutor
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Need an explanation for a tricky pointer or recursive base case? Ask Gemini to explain any step in plain English.
              </p>
            </div>

            {/* Card 6 */}
            <div
              onClick={() => setCurrentTab('examples')}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all cursor-pointer group shadow-sm"
            >
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 w-fit mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                Code Examples Library
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Explore standard program examples in C, Python, JavaScript, C++, Java, and TypeScript ready to run and visualize step-by-step.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
