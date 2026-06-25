import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { categories } from '../data/topics';
import TopicCard from './TopicCard';

export default function TopicLibrary({
  topics,
  completedTopics,
  bookmarkedTopics,
  weakTopics,
  onOpenTopic,
  onToggleComplete,
  onToggleBookmark,
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    return topics.filter((topic) => {
      const matchesCategory = category === 'All' || topic.category === category;
      const matchesQuery =
        !text ||
        [topic.title, topic.definition, topic.category, ...topic.keywords].join(' ').toLowerCase().includes(text);
      return matchesCategory && matchesQuery;
    });
  }, [category, query, topics]);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-950 dark:text-white">Topic library</h1>
            <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
              {filtered.length} of {topics.length} topics shown
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-[1fr_220px] lg:w-[620px]">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search topics, keywords, categories"
                className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-3 text-sm font-semibold text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-bold text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option>All</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            completed={completedTopics.includes(topic.id)}
            bookmarked={bookmarkedTopics.includes(topic.id)}
            weak={weakTopics.includes(topic.id)}
            onOpen={() => onOpenTopic(topic.id)}
            onToggleComplete={() => onToggleComplete(topic.id)}
            onToggleBookmark={() => onToggleBookmark(topic.id)}
          />
        ))}
      </div>
    </div>
  );
}
