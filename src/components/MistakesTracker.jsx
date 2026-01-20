import { motion, AnimatePresence } from 'framer-motion'

function MistakesTracker({ mistakes, maxMistakes }) {
  const remaining = maxMistakes - mistakes

  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="font-display text-gray-600 text-sm sm:text-base">
        Mistakes remaining:
      </span>
      <div className="flex gap-1.5">
        <AnimatePresence mode="popLayout">
          {Array.from({ length: remaining }).map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-800"
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MistakesTracker
