import { motion } from 'framer-motion';
import { CheckCircle2, RefreshCcw, Sparkles, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { categories } from '../data/topics';
import { buildQuizPool } from '../data/quizzes';
import CelebrationBurst from './CelebrationBurst';

export default function QuizMode({ topics, quizHistory, setQuizHistory, onMarkWeak }) {
  const [category, setCategory] = useState('All');
  const [random, setRandom] = useState(true);
  const [questions, setQuestions] = useState(() => buildQuizPool({ random: true }));
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const topicMap = useMemo(() => new Map(topics.map((topic) => [topic.id, topic])), [topics]);
  const correctCount = questions.filter((question) => answers[question.id] === question.answer).length;
  const score = questions.length ? Math.round((correctCount / questions.length) * 100) : 0;

  const startQuiz = () => {
    setQuestions(buildQuizPool({ category, random, limit: 12 }));
    setAnswers({});
    setSubmitted(false);
  };

  const submitQuiz = () => {
    const wrongTopicIds = questions
      .filter((question) => question.type !== 'short' && answers[question.id] !== question.answer)
      .map((question) => question.topicId);
    wrongTopicIds.forEach((id) => onMarkWeak(id, true));
    setQuizHistory([
      ...quizHistory,
      {
        id: crypto.randomUUID(),
        category,
        random,
        score,
        correct: correctCount,
        total: questions.length,
        createdAt: new Date().toISOString(),
      },
    ]);
    setSubmitted(true);
  };

  return (
    <div className="space-y-5">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-950 dark:text-white">Quiz mode</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
              MCQs, true/false, and short-answer reveal questions.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option>All</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <label className="inline-flex h-11 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-black text-slate-700 dark:border-slate-700 dark:text-slate-200">
              <input
                type="checkbox"
                checked={random}
                onChange={(event) => setRandom(event.target.checked)}
                className="h-4 w-4 accent-blue-600"
              />
              Random
            </label>
            <motion.button
              type="button"
              onClick={startQuiz}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-black text-white transition hover:bg-blue-700"
            >
              <RefreshCcw size={17} />
              New quiz
            </motion.button>
          </div>
        </div>
      </motion.section>

      {submitted && (
        <motion.section
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative overflow-hidden rounded-lg border border-emerald-200 bg-emerald-50 p-5 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10"
        >
          <CelebrationBurst active={submitted} />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Score screen</p>
              <motion.h2
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                className="mt-1 text-3xl font-black text-emerald-950 dark:text-emerald-100"
              >
                {score}%
              </motion.h2>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                {correctCount} correct out of {questions.length}. Wrong objective answers were marked weak.
              </p>
            </div>
            <motion.div animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.1, 1] }} transition={{ duration: 1.1, repeat: Infinity, repeatDelay: 1.2 }}>
              <Sparkles className="text-emerald-600" size={34} />
            </motion.div>
          </div>
        </motion.section>
      )}

      <section className="grid gap-4">
        {questions.map((question, index) => {
          const topic = topicMap.get(question.topicId);
          const selected = answers[question.id];
          const isCorrect = selected === question.answer;
          return (
            <motion.article
              key={question.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: Math.min(index * 0.025, 0.2) }}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {index + 1}. {question.type === 'mcq' ? 'MCQ' : question.type === 'truefalse' ? 'True/False' : 'Short answer'}
                </span>
                <span className="text-xs font-black text-slate-400">Topic {question.topicId}: {topic?.title}</span>
              </div>
              <h2 className="mt-4 text-lg font-black leading-7 text-slate-950 dark:text-white">{question.prompt}</h2>

              {question.type === 'short' ? (
                <div className="mt-4">
                  <motion.button
                    type="button"
                    onClick={() => setAnswers({ ...answers, [question.id]: 'Reveal model answer' })}
                    whileTap={{ scale: 0.96 }}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Reveal model answer
                  </motion.button>
                </div>
              ) : (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {question.options.map((option) => (
                    <motion.button
                      key={option}
                      type="button"
                      onClick={() => setAnswers({ ...answers, [question.id]: option })}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      className={`rounded-lg border px-3 py-3 text-left text-sm font-bold transition ${
                        selected === option
                          ? 'border-blue-500 bg-blue-50 text-blue-800 dark:border-blue-400 dark:bg-blue-500/15 dark:text-blue-200'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              )}

              {(submitted || question.type === 'short' && selected) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`mt-4 rounded-lg p-4 ${
                    question.type === 'short'
                      ? 'bg-blue-50 dark:bg-blue-500/10'
                      : isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-500/10'
                        : 'bg-red-50 dark:bg-red-500/10'
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm font-black">
                    {question.type !== 'short' && (isCorrect ? <CheckCircle2 size={17} /> : <XCircle size={17} />)}
                    <span className="text-slate-900 dark:text-white">
                      {question.type === 'short' ? 'Model answer' : `Correct answer: ${question.answer}`}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-200">{question.explanation}</p>
                </motion.div>
              )}
            </motion.article>
          );
        })}
      </section>

      <div className="flex flex-wrap items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h2 className="text-lg font-black text-slate-950 dark:text-white">Score history</h2>
          <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
            {quizHistory.length} saved quiz attempts in localStorage.
          </p>
        </div>
        <motion.button
          type="button"
          onClick={submitQuiz}
          disabled={submitted}
          whileTap={{ scale: submitted ? 1 : 0.96 }}
          className="rounded-lg bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Submit quiz
        </motion.button>
      </div>
    </div>
  );
}
