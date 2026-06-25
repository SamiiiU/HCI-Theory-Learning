import {
  BookOpen,
  Brain,
  ClipboardPenLine,
  FlaskConical,
  Gauge,
  Layers3,
  Library,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const nav = [
  { id: 'dashboard', label: 'Dashboard', icon: Gauge },
  { id: 'library', label: 'Library', icon: Library },
  { id: 'flashcards', label: 'Flashcards', icon: Layers3 },
  { id: 'quiz', label: 'Quiz', icon: Brain },
  { id: 'practice', label: 'Practice', icon: ClipboardPenLine },
  { id: 'demos', label: 'Demos', icon: FlaskConical },
];

export default function Sidebar({ activeView, onNavigate, theme, onToggleTheme }) {
  return (
    <aside className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between px-4 py-4 lg:block lg:px-5">
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 text-left"
        >
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-blue-600 text-white">
            <BookOpen size={22} />
          </span>
          <span>
            <span className="block text-base font-black text-slate-950 dark:text-white">HCI Theory</span>
            <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400">Exam practice studio</span>
          </span>
        </button>
        <div className="lg:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:space-y-2 lg:px-5 lg:pb-0">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`inline-flex min-w-fit items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold transition lg:w-full ${
                active
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto hidden px-5 py-6 lg:block">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </aside>
  );
}
