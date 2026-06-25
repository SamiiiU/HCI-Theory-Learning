import { motion } from 'framer-motion';
import { ArrowLeft, Bookmark, CheckCircle2, Link2, TriangleAlert } from 'lucide-react';

export default function TopicDetail({
  topic,
  relatedTopics,
  completed,
  bookmarked,
  weak,
  onBack,
  onOpenTopic,
  onToggleComplete,
  onToggleBookmark,
  onToggleWeak,
}) {
  if (!topic) return null;

  const sections = [
    ['Simple definition', topic.definition],
    ['Exam-style answer', topic.examAnswer],
    ['Real-world example', topic.example],
    ['Common mistake', topic.commonMistake],
    ['Practice question', topic.practiceQuestion],
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={17} />
          Library
        </button>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onToggleBookmark}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Bookmark size={17} fill={bookmarked ? 'currentColor' : 'none'} />
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          <button
            type="button"
            onClick={onToggleWeak}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-black shadow-sm transition ${
              weak
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <TriangleAlert size={17} />
            {weak ? 'Weak' : 'Mark weak'}
          </button>
        </div>
      </div>

      <motion.article
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-slate-200 bg-white p-6 shadow-panel dark:border-slate-800 dark:bg-slate-900 md:p-8"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Topic {topic.id}
          </span>
          <span className="rounded-md bg-blue-100 px-2.5 py-1 text-xs font-black text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
            {topic.category}
          </span>
          <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
            {topic.difficulty}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{topic.title}</h1>
        <div className="mt-6 grid gap-4">
          {sections.map(([label, content], index) => (
            <motion.section
              key={label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ x: 4 }}
              className="rounded-lg bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <h2 className="text-sm font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">{content}</p>
            </motion.section>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {topic.keywords.map((keyword, index) => (
            <motion.span
              key={keyword}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.03 * index }}
              className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {keyword}
            </motion.span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <motion.button
            type="button"
            onClick={onToggleComplete}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-emerald-700"
          >
            <CheckCircle2 size={18} />
            {completed ? 'Completed' : 'Mark as completed'}
          </motion.button>
        </div>
      </motion.article>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center gap-2">
          <Link2 size={18} className="text-blue-600" />
          <h2 className="text-lg font-black text-slate-950 dark:text-white">Related topics</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {relatedTopics.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => onOpenTopic(item.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-lg bg-slate-50 p-4 text-left transition hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <span className="text-xs font-black text-slate-400">Topic {item.id}</span>
              <p className="mt-1 text-sm font-black text-slate-950 dark:text-white">{item.title}</p>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}
