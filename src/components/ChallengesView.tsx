import React, { useState } from 'react';
import { CHALLENGES } from '../data/presetCodes';
import { Trophy, CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react';

export const ChallengesView: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  const handleSelectOption = (challengeId: string, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [challengeId]: optionIdx }));
  };

  const handleSubmitChallenge = (challengeId: string) => {
    setSubmitted((prev) => ({ ...prev, [challengeId]: true }));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl font-extrabold text-slate-100">Code Tracing Challenges</h1>
          </div>
          <p className="text-xs text-slate-400">
            Test your understanding of call stacks, recursion, pointer dereferencing, and event loop priority.
          </p>
        </div>

        <div className="space-y-6">
          {CHALLENGES.map((ch, idx) => {
            const userChoice = selectedAnswers[ch.id];
            const isDone = submitted[ch.id];
            const isCorrect = userChoice === ch.correctAnswerIndex;

            return (
              <div key={ch.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h3 className="font-bold text-slate-100 text-base">{ch.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {ch.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {ch.difficulty}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 font-medium">{ch.question}</p>

                {/* Code Snippet Box */}
                <pre className="bg-slate-950 border border-slate-800 p-3 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto">
                  {ch.codeSnippet}
                </pre>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ch.options.map((opt, oIdx) => {
                    const isSelected = userChoice === oIdx;
                    let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800';

                    if (isSelected) btnStyle = 'bg-indigo-950 border-indigo-500 text-indigo-200 font-bold';
                    if (isDone) {
                      if (oIdx === ch.correctAnswerIndex) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                      else if (isSelected && !isCorrect) btnStyle = 'bg-red-950 border-red-500 text-red-200';
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => !isDone && handleSelectOption(ch.id, oIdx)}
                        className={`p-3 rounded-xl border text-left text-xs transition-colors flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {isDone && oIdx === ch.correctAnswerIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                        {isDone && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Submit Action */}
                {!isDone ? (
                  <button
                    onClick={() => handleSubmitChallenge(ch.id)}
                    disabled={userChoice === undefined}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold disabled:opacity-40 transition-colors"
                  >
                    Check Answer
                  </button>
                ) : (
                  <div className={`p-4 rounded-xl border text-xs space-y-1 ${isCorrect ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' : 'bg-red-950/40 border-red-500/30 text-red-200'}`}>
                    <div className="font-bold">{isCorrect ? 'Correct!' : 'Incorrect'}</div>
                    <p className="text-slate-300">{ch.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
