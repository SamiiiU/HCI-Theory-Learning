import { motion } from 'framer-motion';
import { Bookmark, CheckCircle2, Circle, Star } from 'lucide-react';

const difficultyStyle = {
  Easy: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  Hard: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
};

export default function TopicCard({
  topic,
  completed,
  bookmarked,
  weak,
  onOpen,
  onToggleComplete,
  onToggleBookmark,
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.18 }}
      className={`group relative overflow-hidden rounded-lg border bg-white p-4 shadow-sm transition-colors hover:shadow-panel dark:bg-slate-900 ${
        completed
          ? 'border-emerald-200 dark:border-emerald-500/30'
          : 'border-slate-200 hover:border-blue-200 dark:border-slate-800 dark:hover:border-blue-400/30'
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-slate-100 dark:bg-slate-800">
        <motion.div
          className={completed ? 'h-full bg-emerald-600' : weak ? 'h-full bg-red-500' : 'h-full bg-blue-600'}
          initial={false}
          animate={{ width: completed ? '100%' : weak ? '55%' : '22%' }}
          transition={{ duration: 0.35 }}
        />
      </div>
      <div className="flex items-start justify-between gap-3">
        <button type="button" onClick={onOpen} className="text-left">
          <span className="text-xs font-black uppercase tracking-wide text-slate-400">Topic {topic.id}</span>
          <h3 className="mt-1 text-base font-black leading-snug text-slate-950 dark:text-white">{topic.title}</h3>
        </button>
        <button
          type="button"
          onClick={onToggleBookmark}
          className={`grid h-9 w-9 place-items-center rounded-lg border transition ${
            bookmarked
              ? 'border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/15 dark:text-amber-300'
              : 'border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark topic'}
          title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
        >
          <motion.span animate={bookmarked ? { scale: [1, 1.22, 1], rotate: [0, -8, 0] } : { scale: 1 }}>
            <Bookmark size={17} fill={bookmarked ? 'currentColor' : 'none'} />
          </motion.span>
        </button>
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{topic.definition}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {topic.category}
        </span>
        <span className={`rounded-md px-2 py-1 text-xs font-bold ${difficultyStyle[topic.difficulty]}`}>
          {topic.difficulty}
        </span>
        {weak && (
          <span className="inline-flex items-center gap-1 rounded-md bg-red-100 px-2 py-1 text-xs font-bold text-red-700 dark:bg-red-500/15 dark:text-red-300">
            <Star size={12} fill="currentColor" />
            Weak
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onToggleComplete}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <motion.span animate={completed ? { scale: [1, 1.18, 1] } : { scale: 1 }}>
            {completed ? <CheckCircle2 size={17} className="text-emerald-600" /> : <Circle size={17} />}
          </motion.span>
          {completed ? 'Completed' : 'Mark done'}
        </button>
        <button type="button" onClick={onOpen} className="text-sm font-black text-blue-700 transition-transform group-hover:translate-x-0.5 dark:text-blue-300">
          Open
        </button>
      </div>
    </motion.article>
  );
}
