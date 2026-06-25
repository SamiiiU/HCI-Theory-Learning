import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import CelebrationBurst from './CelebrationBurst';

export default function FlashcardMode({ topics, flashcardProgress, setFlashcardProgress, onMarkWeak }) {
  const [index, setIndex] = useState(flashcardProgress.index || 0);
  const [flipped, setFlipped] = useState(false);
  const [burst, setBurst] = useState(false);
  const topic = topics[index % topics.length];
  const known = useMemo(() => new Set(flashcardProgress.known || []), [flashcardProgress.known]);
  const weak = useMemo(() => new Set(flashcardProgress.weak || []), [flashcardProgress.weak]);

  const saveIndex = (nextIndex) => {
    const normalized = (nextIndex + topics.length) % topics.length;
    setIndex(normalized);
    setFlipped(false);
    setFlashcardProgress((prev) => ({ ...prev, index: normalized }));
  };

  const mark = (type) => {
    const nextKnown = new Set(known);
    const nextWeak = new Set(weak);
    if (type === 'known') {
      nextKnown.add(topic.id);
      nextWeak.delete(topic.id);
    } else {
      nextWeak.add(topic.id);
      nextKnown.delete(topic.id);
      onMarkWeak(topic.id, true);
    }
    setFlashcardProgress({ ...flashcardProgress, index, known: [...nextKnown], weak: [...nextWeak] });
    setBurst(true);
    window.setTimeout(() => setBurst(false), 850);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-950 dark:text-white">Flashcards</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
              Card {index + 1} of {topics.length} - Known {known.size} - Weak {weak.size}
            </p>
          </div>
          <motion.button
            type="button"
            onClick={() => setFlashcardProgress({ index: 0, known: [], weak: [] })}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <RotateCcw size={17} />
            Reset
          </motion.button>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <motion.div
            className="h-full rounded-full bg-blue-600"
            initial={false}
            animate={{ width: `${((index + 1) / topics.length) * 100}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>
      </motion.div>

      <div className="relative" style={{ perspective: '1200px' }}>
        <CelebrationBurst active={burst} />
        <motion.button
          type="button"
          onClick={() => setFlipped((value) => !value)}
          className="min-h-[360px] w-full rounded-lg border border-slate-200 bg-white p-8 text-left shadow-panel dark:border-slate-800 dark:bg-slate-900"
          animate={{ rotateY: flipped ? 180 : 0 }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.36, ease: 'easeOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={flipped ? 'back' : 'front'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16 }}
              style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              <span className="rounded-md bg-blue-100 px-2.5 py-1 text-xs font-black uppercase tracking-wide text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                {flipped ? 'Back' : 'Front'}
              </span>
              <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                {flipped ? topic.title : topic.practiceQuestion}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                {flipped ? topic.examAnswer : 'Tap the card to reveal the model answer.'}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <motion.button
            type="button"
            onClick={() => saveIndex(index - 1)}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={17} />
            Previous
          </motion.button>
          <motion.button
            type="button"
            onClick={() => saveIndex(index + 1)}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Next
            <ArrowRight size={17} />
          </motion.button>
        </div>
        <div className="flex gap-2">
          <motion.button
            type="button"
            onClick={() => mark('weak')}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-black text-white transition hover:bg-red-700"
          >
            <ThumbsDown size={17} />
            Weak
          </motion.button>
          <motion.button
            type="button"
            onClick={() => mark('known')}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-black text-white transition hover:bg-emerald-700"
          >
            <ThumbsUp size={17} />
            Known
          </motion.button>
        </div>
      </div>
    </div>
  );
}
