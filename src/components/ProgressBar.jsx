export default function ProgressBar({ value = 0, label, tone = 'bg-blue-600' }) {
  const safeValue = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span>{label}</span>
          <span>{safeValue}%</span>
        </div>
      )}
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
