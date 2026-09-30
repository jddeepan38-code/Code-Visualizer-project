import React from 'react';
import { Code2, Github, Twitter, Heart, Sparkles, Terminal } from 'lucide-react';
import { NavigationTab } from '../types';

interface FooterProps {
  setCurrentTab: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">Code Visualizer</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Real-time interactive code execution engine, memory allocation tracer, call stack debugger, and animated data structures.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Gemini AI Engine Active
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-3">Core Modules</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setCurrentTab('playground')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Execution Playground
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('data-structures')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Data Structures Visualizer
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('algorithms')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Algorithms & Sorting
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('tools')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Big-O & Memory Analyzer
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-3">Supported Languages</h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-1.5"><Terminal className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Python (CPython Memory Trace)</li>
            <li className="flex items-center gap-1.5"><Terminal className="w-3 h-3 text-yellow-600 dark:text-yellow-400" /> JavaScript (V8 Event Loop)</li>
            <li className="flex items-center gap-1.5"><Terminal className="w-3 h-3 text-blue-600 dark:text-blue-400" /> C++ (Pointers & Dynamic Allocation)</li>
            <li className="flex items-center gap-1.5"><Terminal className="w-3 h-3 text-red-600 dark:text-red-400" /> Java (JVM Stack & Heap)</li>
            <li className="flex items-center gap-1.5"><Terminal className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> TypeScript (Type Inspection)</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider mb-3">Learning Resources</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setCurrentTab('examples')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                All Code Examples & Programs
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('playground')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Interactive Execution Playground
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentTab('data-structures')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Data Structures & Animations
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 Code Visualizer. Built for developers, students, and educators worldwide.</p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            Built by <Heart className="w-3.5 h-3.5 text-black fill-white inline" />
          </span>
        </div>
      </div>
    </footer>
  );
};
