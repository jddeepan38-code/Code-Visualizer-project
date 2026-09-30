import React from 'react';
import { BookOpen, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { NavigationTab } from '../types';

interface BlogViewProps {
  setCurrentTab: (tab: NavigationTab) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ setCurrentTab }) => {
  const articles = [
    {
      id: 'event-loop',
      title: 'Demystifying the JavaScript Event Loop & Microtask Queue',
      summary: 'Learn why Promise.then() always executes before setTimeout(fn, 0) and how the V8 engine manages asynchronous callbacks.',
      readTime: '5 min read',
      tag: 'JavaScript Architecture'
    },
    {
      id: 'memory-leaks',
      title: 'How C++ Pointers and Heap Allocations Work Under the Hood',
      summary: 'A step-by-step memory diagram guide to dynamic allocations, delete operators, and dangling pointers.',
      readTime: '7 min read',
      tag: 'Memory Management'
    },
    {
      id: 'recursion-stacks',
      title: 'Visualizing Recursion and Call Stack Frames in Python',
      summary: 'Understand base cases, stack overflow exceptions, and memoization dictionary caches visually.',
      readTime: '4 min read',
      tag: 'Data Structures & Algorithms'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl font-extrabold text-slate-100">Interactive Code Visualizer Blog & Articles</h1>
          </div>
          <p className="text-xs text-slate-400">
            In-depth visual articles and interactive tutorials on runtime engines, memory allocation, and algorithm complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              onClick={() => setCurrentTab('playground')}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-2xl space-y-4 cursor-pointer group transition-all"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {art.tag}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" /> {art.readTime}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                {art.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">{art.summary}</p>

              <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-indigo-400">
                <span>Explore in Playground</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
