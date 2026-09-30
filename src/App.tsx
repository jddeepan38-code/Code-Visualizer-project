/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavigationTab } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { PlaygroundView } from './components/PlaygroundView';
import { DataStructuresView } from './components/DataStructuresView';
import { AlgorithmsView } from './components/AlgorithmsView';
import { ToolsView } from './components/ToolsView';
import { ExamplesView } from './components/ExamplesView';
import { FeedbackModal } from './components/FeedbackModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [activePresetId, setActivePresetId] = useState<string>('c-for-loop');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme_preference');
    return saved !== null ? saved === 'dark' : true;
  });
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_preference', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_preference', 'light');
    }
  }, [isDarkMode]);

  const handleSelectPresetAndNavigate = (presetId: string) => {
    setActivePresetId(presetId);
    setCurrentTab('playground');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans antialiased flex flex-col`}>
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
      />

      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.995 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full h-full"
          >
            {currentTab === 'home' && <HomeView setCurrentTab={setCurrentTab} />}
            {currentTab === 'playground' && <PlaygroundView initialPresetId={activePresetId} />}
            {currentTab === 'data-structures' && <DataStructuresView setCurrentTab={setCurrentTab} isDarkMode={isDarkMode} />}
            {currentTab === 'algorithms' && <AlgorithmsView />}
            {currentTab === 'tools' && <ToolsView />}
            {currentTab === 'examples' && <ExamplesView onSelectPreset={handleSelectPresetAndNavigate} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setCurrentTab={setCurrentTab} />

      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </div>
  );
}
