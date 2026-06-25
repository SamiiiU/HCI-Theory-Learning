import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import Dashboard from './components/Dashboard';
import FlashcardMode from './components/FlashcardMode';
import InteractiveDemo from './components/InteractiveDemo';
import QuizMode from './components/QuizMode';
import Sidebar from './components/Sidebar';
import TopicDetail from './components/TopicDetail';
import TopicLibrary from './components/TopicLibrary';
import WrittenPractice from './components/WrittenPractice';
import { topics, getTopicById } from './data/topics';
import { useLocalStorage } from './hooks/useLocalStorage';

function toggleId(list, id) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [completedTopics, setCompletedTopics] = useLocalStorage('completedTopics', []);
  const [bookmarkedTopics, setBookmarkedTopics] = useLocalStorage('bookmarkedTopics', []);
  const [weakTopics, setWeakTopics] = useLocalStorage('weakTopics', []);
  const [quizHistory, setQuizHistory] = useLocalStorage('quizHistory', []);
  const [writtenAttempts, setWrittenAttempts] = useLocalStorage('writtenAttempts', []);
  const [lastOpenedTopic, setLastOpenedTopic] = useLocalStorage('lastOpenedTopic', 1);
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [flashcardProgress, setFlashcardProgress] = useLocalStorage('flashcardProgress', {
    index: 0,
    known: [],
    weak: [],
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const selectedTopic = selectedTopicId ? getTopicById(selectedTopicId) : null;
  const relatedTopics = useMemo(
    () => (selectedTopic ? selectedTopic.relatedTopics.map(getTopicById).filter(Boolean) : []),
    [selectedTopic],
  );

  const openTopic = (id) => {
    setSelectedTopicId(id);
    setLastOpenedTopic(id);
    setActiveView('detail');
  };

  const navigate = (view) => {
    setSelectedTopicId(null);
    setActiveView(view);
  };

  const markWeak = (id, forceValue) => {
    setWeakTopics((prev) => {
      if (forceValue === true) return prev.includes(id) ? prev : [...prev, id];
      if (forceValue === false) return prev.filter((item) => item !== id);
      return toggleId(prev, id);
    });
  };

  const continueLearning = () => {
    const last = getTopicById(lastOpenedTopic);
    if (last && !completedTopics.includes(last.id)) {
      openTopic(last.id);
      return;
    }
    const next = topics.find((topic) => !completedTopics.includes(topic.id)) || topics[0];
    openTopic(next.id);
  };

  const viewProps = {
    topics,
    completedTopics,
    bookmarkedTopics,
    weakTopics,
    quizHistory,
  };

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-slate-900 dark:bg-[#101114] dark:text-slate-100 lg:flex">
      <Sidebar
        activeView={activeView}
        onNavigate={navigate}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <main className="min-w-0 flex-1 p-4 md:p-6 xl:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeView}-${selectedTopicId || 'root'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {activeView === 'dashboard' && (
              <Dashboard
                {...viewProps}
                onContinue={continueLearning}
                onOpenLibrary={() => navigate('library')}
              />
            )}

            {activeView === 'library' && (
              <TopicLibrary
                {...viewProps}
                onOpenTopic={openTopic}
                onToggleComplete={(id) => setCompletedTopics((prev) => toggleId(prev, id))}
                onToggleBookmark={(id) => setBookmarkedTopics((prev) => toggleId(prev, id))}
              />
            )}

            {activeView === 'detail' && selectedTopic && (
              <TopicDetail
                topic={selectedTopic}
                relatedTopics={relatedTopics}
                completed={completedTopics.includes(selectedTopic.id)}
                bookmarked={bookmarkedTopics.includes(selectedTopic.id)}
                weak={weakTopics.includes(selectedTopic.id)}
                onBack={() => navigate('library')}
                onOpenTopic={openTopic}
                onToggleComplete={() => setCompletedTopics((prev) => toggleId(prev, selectedTopic.id))}
                onToggleBookmark={() => setBookmarkedTopics((prev) => toggleId(prev, selectedTopic.id))}
                onToggleWeak={() => markWeak(selectedTopic.id)}
              />
            )}

            {activeView === 'flashcards' && (
              <FlashcardMode
                topics={topics}
                flashcardProgress={flashcardProgress}
                setFlashcardProgress={setFlashcardProgress}
                onMarkWeak={markWeak}
              />
            )}

            {activeView === 'quiz' && (
              <QuizMode
                topics={topics}
                quizHistory={quizHistory}
                setQuizHistory={setQuizHistory}
                onMarkWeak={markWeak}
              />
            )}

            {activeView === 'practice' && (
              <WrittenPractice
                topics={topics}
                writtenAttempts={writtenAttempts}
                setWrittenAttempts={setWrittenAttempts}
              />
            )}

            {activeView === 'demos' && <InteractiveDemo />}
          </motion.div>
        </AnimatePresence>
      </main>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2, scale: 1.02 }}
        className="fixed bottom-3 left-3 z-50 rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-xs font-black uppercase tracking-wide text-slate-700 shadow-panel backdrop-blur dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-200"
      >
        SAMI KA CODEX :)
      </motion.div>
    </div>
  );
}
