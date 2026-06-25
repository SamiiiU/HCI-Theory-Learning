import { motion } from 'framer-motion';

export default function ProgressRing({ value = 0, label = 'Complete' }) {
  const safeValue = Math.max(0, Math.min(100, Math.round(value)));
  const circumference = 2 * Math.PI * 44;
  const offset = circumference - (safeValue / 100) * circumference;

  return (
    <div className="relative mx-auto h-36 w-36">
      <svg viewBox="0 0 112 112" className="h-full w-full -rotate-90">
        <circle cx="56" cy="56" r="44" fill="none" stroke="currentColor" strokeWidth="12" className="text-slate-200 dark:text-slate-700" />
        <motion.circle
          cx="56"
          cy="56"
          r="44"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="12"
          className="text-emerald-600"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <motion.p
            key={safeValue}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black text-slate-950 dark:text-white"
          >
            {safeValue}%
          </motion.p>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
        </div>
      </div>
    </div>
  );
}
