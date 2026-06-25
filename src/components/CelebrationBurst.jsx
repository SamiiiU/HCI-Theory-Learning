import { AnimatePresence, motion } from 'framer-motion';

const pieces = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  x: Math.cos((index / 18) * Math.PI * 2) * (56 + (index % 4) * 13),
  y: Math.sin((index / 18) * Math.PI * 2) * (42 + (index % 5) * 10),
  rotate: index % 2 === 0 ? 150 : -140,
  color: ['bg-blue-500', 'bg-emerald-500', 'bg-amber-400', 'bg-rose-500'][index % 4],
}));

export default function CelebrationBurst({ active, className = '' }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className={`pointer-events-none absolute inset-0 z-20 grid place-items-center overflow-hidden ${className}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {pieces.map((piece) => (
            <motion.span
              key={piece.id}
              className={`absolute h-2.5 w-2.5 rounded-sm ${piece.color}`}
              initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 0 }}
              animate={{ x: piece.x, y: piece.y, scale: [0, 1, 0.8], rotate: piece.rotate, opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
