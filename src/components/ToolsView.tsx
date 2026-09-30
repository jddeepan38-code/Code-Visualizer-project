import React, { useState } from 'react';
import { Wrench, Cpu, Database, Activity, Calculator } from 'lucide-react';

export const ToolsView: React.FC = () => {
  const [arraySize, setArraySize] = useState<number>(1000);

  // Calculate operations for Big O
  const o1 = 1;
  const oLogn = Math.round(Math.log2(arraySize));
  const on = arraySize;
  const onLogn = Math.round(arraySize * Math.log2(arraySize));
  const on2 = arraySize * arraySize;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Big-O & Memory Calculator Tools</h1>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Estimate asymptotic operation counts and stack/heap memory allocation bounds.
          </p>
        </div>

        {/* Big-O Operation Calculator */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Big-O Complexity Calculator
            </h2>
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">N = {arraySize.toLocaleString()} elements</span>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-600 dark:text-slate-400">Adjust Input Size (N):</label>
            <input
              type="range"
              min={10}
              max={10000}
              step={10}
              value={arraySize}
              onChange={(e) => setArraySize(Number(e.target.value))}
              className="w-full accent-indigo-600 bg-slate-200 dark:bg-slate-950 h-2 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 font-mono text-xs">
            <div className="bg-slate-50 dark:bg-slate-950 border border-emerald-500/40 p-4 rounded-xl space-y-1 shadow-sm">
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">O(1) - Constant</div>
              <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{o1} op</div>
              <p className="text-[10px] text-slate-500">Array index lookup, Stack Push/Pop</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 border border-indigo-500/40 p-4 rounded-xl space-y-1 shadow-sm">
              <div className="text-indigo-600 dark:text-indigo-400 font-bold">O(log N) - Logarithmic</div>
              <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{oLogn} ops</div>
              <p className="text-[10px] text-slate-500">Binary Search, BST Lookup</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 border border-blue-500/40 p-4 rounded-xl space-y-1 shadow-sm">
              <div className="text-blue-600 dark:text-blue-400 font-bold">O(N) - Linear</div>
              <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{on.toLocaleString()} ops</div>
              <p className="text-[10px] text-slate-500">Linear Search, Array Traversal</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 border border-purple-500/40 p-4 rounded-xl space-y-1 shadow-sm">
              <div className="text-purple-600 dark:text-purple-400 font-bold">O(N log N) - Log-Linear</div>
              <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{onLogn.toLocaleString()} ops</div>
              <p className="text-[10px] text-slate-500">Merge Sort, Quick Sort</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 border border-red-500/40 p-4 rounded-xl space-y-1 shadow-sm">
              <div className="text-red-600 dark:text-red-400 font-bold">O(N²) - Quadratic</div>
              <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{on2.toLocaleString()} ops</div>
              <p className="text-[10px] text-slate-500">Bubble Sort, Nested Loops</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
