import { motion } from 'framer-motion';
import { ArrowRight, Bookmark, Brain, CheckCircle2, Target, TrendingUp } from 'lucide-react';
import ProgressBar from './ProgressBar';
import ProgressRing from './ProgressRing';
import { categories } from '../data/topics';

const cardMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  whileHover: { y: -4, scale: 1.01 },
  transition: { duration: 0.2 },
};

function StatCard({ icon: Icon, label, value, hint, delay = 0 }) {
  return (
    <motion.div
      {...cardMotion}
      transition={{ duration: 0.24, delay }}
      className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50/40 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-400/30 dark:hover:bg-blue-500/10"
    >
      <div className="flex items-center justify-between gap-3">
        <motion.span
          whileHover={{ rotate: -5, scale: 1.08 }}
          className="grid h-11 w-11 place-items-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
        >
          <Icon size={20} />
        </motion.span>
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-black text-slate-950 dark:text-white"
        >
          {value}
        </motion.span>
      </div>
      <p className="mt-4 text-sm font-black text-slate-950 dark:text-white">{label}</p>
      <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{hint}</p>
    </motion.div>
  );
}

export default function Dashboard({
  topics,
  completedTopics,
  bookmarkedTopics,
  weakTopics,
  quizHistory,
  onContinue,
  onOpenLibrary,
}) {
  const completed = completedTopics.length;
  const average =
    quizHistory.length === 0
      ? 0
      : Math.round(quizHistory.reduce((sum, item) => sum + item.score, 0) / quizHistory.length);
  const weakList = topics.filter((topic) => weakTopics.includes(topic.id)).slice(0, 5);
  const completionPercent = (completed / topics.length) * 100;

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-panel dark:border-slate-800 dark:bg-slate-900"
      >
        <motion.div
          className="absolute right-0 top-0 h-32 w-32 bg-blue-500/10"
          animate={{ x: [0, 8, 0], y: [0, -6, 0], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-28 w-40 bg-emerald-500/10"
          animate={{ x: [0, -6, 0], opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ clipPath: 'polygon(0 100%, 0 0, 100% 100%)' }}
        />
        <div className="grid gap-6 p-6 md:grid-cols-[1.5fr_1fr] md:p-8">
          <div className="relative z-10">
            <span className="rounded-md bg-blue-100 px-2.5 py-1 text-xs font-black uppercase tracking-wide text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
              Local progress saved
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl">
              HCI theory practice that actually behaves like a study desk.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Review topics, test recall, write exam answers, and use visual demos for the graphics and interaction concepts.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onContinue}
                className="group inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-blue-700"
              >
                Continue learning
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={onOpenLibrary}
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Browse all topics
              </button>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12 }}
            className="relative z-10 rounded-lg bg-slate-100 p-5 dark:bg-slate-800"
          >
            <ProgressRing value={completionPercent} label="Studied" />
            <div className="mt-5">
              <ProgressBar value={completionPercent} label="Overall completion" tone="bg-emerald-600" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-center">
              <motion.div whileHover={{ y: -3 }} className="rounded-lg bg-white p-4 dark:bg-slate-900">
                <p className="text-2xl font-black text-slate-950 dark:text-white">{completed}</p>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Done</p>
              </motion.div>
              <motion.div whileHover={{ y: -3 }} className="rounded-lg bg-white p-4 dark:bg-slate-900">
                <p className="text-2xl font-black text-slate-950 dark:text-white">{topics.length - completed}</p>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Left</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Target} label="Total topics" value={topics.length} hint="Complete syllabus coverage" delay={0.02} />
        <StatCard icon={CheckCircle2} label="Completed topics" value={completed} hint="Marked by you" delay={0.06} />
        <StatCard icon={Brain} label="Quiz average" value={`${average}%`} hint={`${quizHistory.length} saved attempts`} delay={0.1} />
        <StatCard icon={Bookmark} label="Bookmarks" value={bookmarkedTopics.length} hint="Fast review list" delay={0.14} />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp size={19} className="text-blue-600" />
            <h2 className="text-lg font-black text-slate-950 dark:text-white">Category progress</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {categories.map((category) => {
              const categoryTopics = topics.filter((topic) => topic.category === category);
              const done = categoryTopics.filter((topic) => completedTopics.includes(topic.id)).length;
              return (
                <motion.div
                  key={category}
                  whileHover={{ x: 3 }}
                  className="rounded-lg bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  <ProgressBar
                    value={(done / Math.max(1, categoryTopics.length)) * 100}
                    label={`${category} (${done}/${categoryTopics.length})`}
                    tone="bg-blue-600"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-black text-slate-950 dark:text-white">Weak topics</h2>
          <div className="mt-4 space-y-3">
            {weakList.length === 0 ? (
              <p className="rounded-lg bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                No weak topics yet. Missed quiz answers and flashcard marks will appear here.
              </p>
            ) : (
              weakList.map((topic) => (
                <div key={topic.id} className="rounded-lg bg-red-50 p-3 dark:bg-red-500/10">
                  <p className="text-sm font-black text-red-800 dark:text-red-200">{topic.title}</p>
                  <p className="text-xs font-semibold text-red-600 dark:text-red-300">{topic.category}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
