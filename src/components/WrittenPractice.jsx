import { Eye, Save } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function WrittenPractice({ topics, writtenAttempts, setWrittenAttempts }) {
  const [topicId, setTopicId] = useState(topics[0].id);
  const [answer, setAnswer] = useState('');
  const [rating, setRating] = useState('Okay');
  const [revealed, setRevealed] = useState(false);
  const topic = useMemo(() => topics.find((item) => item.id === Number(topicId)), [topicId, topics]);
  const attempts = writtenAttempts.filter((attempt) => attempt.topicId === topic.id).slice(-3).reverse();

  const saveAttempt = () => {
    if (!answer.trim()) return;
    setWrittenAttempts([
      ...writtenAttempts,
      {
        id: crypto.randomUUID(),
        topicId: topic.id,
        answer: answer.trim(),
        rating,
        createdAt: new Date().toISOString(),
      },
    ]);
    setAnswer('');
    setRevealed(false);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-950 dark:text-white">Written practice</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">Write first, reveal later, then self-rate honestly.</p>
          </div>
          <select
            value={topicId}
            onChange={(event) => {
              setTopicId(event.target.value);
              setRevealed(false);
              setAnswer('');
            }}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            {topics.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id}. {item.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
          <h2 className="text-sm font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">Exam question</h2>
          <p className="mt-2 text-lg font-black leading-7 text-slate-950 dark:text-white">{topic.practiceQuestion}</p>
        </div>

        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          rows={10}
          placeholder="Write your exam-style answer here..."
          className="mt-4 w-full resize-y rounded-lg border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-950">
            {['Poor', 'Okay', 'Good'].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRating(item)}
                className={`rounded-md px-3 py-2 text-sm font-black transition ${
                  rating === item ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-black text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Eye size={17} />
              Reveal
            </button>
            <button
              type="button"
              onClick={saveAttempt}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-black text-white transition hover:bg-blue-700"
            >
              <Save size={17} />
              Save attempt
            </button>
          </div>
        </div>

        {revealed && (
          <div className="mt-5 rounded-lg bg-emerald-50 p-4 dark:bg-emerald-500/10">
            <h2 className="text-sm font-black uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Model answer</h2>
            <p className="mt-2 text-sm leading-7 text-emerald-900 dark:text-emerald-100">{topic.examAnswer}</p>
          </div>
        )}
      </section>

      <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-black text-slate-950 dark:text-white">Recent attempts</h2>
        <div className="mt-4 space-y-3">
          {attempts.length === 0 ? (
            <p className="rounded-lg bg-slate-50 p-4 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              No saved answers for this topic yet.
            </p>
          ) : (
            attempts.map((attempt) => (
              <div key={attempt.id} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black text-slate-500 dark:text-slate-400">
                    {new Date(attempt.createdAt).toLocaleString()}
                  </span>
                  <span className="rounded-md bg-blue-100 px-2 py-1 text-xs font-black text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                    {attempt.rating}
                  </span>
                </div>
                <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-700 dark:text-slate-200">{attempt.answer}</p>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
