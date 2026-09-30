import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Shuffle, Cpu, Search, Sparkles } from 'lucide-react';

export const AlgorithmsView: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<'bubble' | 'quick' | 'merge' | 'binary-search'>('bubble');
  const [array, setArray] = useState<number[]>([40, 15, 80, 25, 60, 10, 95, 30, 50, 70]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [metrics, setMetrics] = useState({ comparisons: 0, swaps: 0 });

  // Generate new random array
  const handleRandomize = () => {
    setIsRunning(false);
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 85) + 10);
    setArray(newArr);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setMetrics({ comparisons: 0, swaps: 0 });
  };

  // Run Bubble Sort Animation
  const runBubbleSort = async () => {
    setIsRunning(true);
    let arr = [...array];
    let comps = 0;
    let swps = 0;
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1]);
        comps++;
        setMetrics({ comparisons: comps, swaps: swps });
        await new Promise((r) => setTimeout(r, 600 / speed));

        if (arr[j] > arr[j + 1]) {
          setSwapping([j, j + 1]);
          swps++;
          setMetrics({ comparisons: comps, swaps: swps });
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await new Promise((r) => setTimeout(r, 600 / speed));
        }
        setSwapping([]);
      }
      setSorted((prev) => [...prev, n - i - 1]);
    }
    setComparing([]);
    setIsRunning(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Cpu className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Algorithm Visualizer</h1>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Watch comparison and swap operations step by step in real time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRandomize}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Randomize Array</span>
            </button>

            <button
              onClick={runBubbleSort}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isRunning ? 'Sorting...' : 'Start Sort'}</span>
            </button>
          </div>
        </div>

        {/* Algorithm Selector Bar */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 bg-slate-200/60 dark:bg-slate-900/60 p-2 rounded-2xl border border-slate-300 dark:border-slate-800">
          {[
            { id: 'bubble', label: 'Bubble Sort (O(n²))' },
            { id: 'quick', label: 'Quick Sort (O(n log n))' },
            { id: 'merge', label: 'Merge Sort (O(n log n))' },
            { id: 'binary-search', label: 'Binary Search (O(log n))' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setAlgorithm(item.id as any)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                algorithm === item.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Metrics Bar */}
        <div className="flex items-center gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl text-xs font-mono shadow-sm">
          <div>
            Comparisons: <span className="text-amber-600 dark:text-amber-400 font-bold">{metrics.comparisons}</span>
          </div>
          <div>
            Swaps: <span className="text-pink-600 dark:text-pink-400 font-bold">{metrics.swaps}</span>
          </div>
        </div>

        {/* Animated Array Bars Canvas */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-8 min-h-[260px] sm:min-h-[300px] flex items-end justify-center gap-1.5 sm:gap-3 overflow-x-auto shadow-sm">
          {array.map((val, idx) => {
            const isComp = comparing.includes(idx);
            const isSwap = swapping.includes(idx);
            const isSort = sorted.includes(idx);

            let barBg = 'bg-indigo-600/80 border-indigo-400';
            if (isComp) barBg = 'bg-amber-400 border-amber-300 animate-pulse';
            if (isSwap) barBg = 'bg-pink-500 border-pink-400 scale-105';
            if (isSort) barBg = 'bg-emerald-500 border-emerald-400';

            return (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[60px]">
                <span className="text-[11px] font-mono text-slate-700 dark:text-slate-300 font-bold">{val}</span>
                <div
                  style={{ height: `${val * 2.5}px` }}
                  className={`w-full rounded-t-xl border-t-2 transition-all duration-200 ${barBg}`}
                />
                <span className="text-[10px] font-mono text-slate-500">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
