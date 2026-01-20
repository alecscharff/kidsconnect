import { motion } from 'framer-motion'

function GameOverModal({ status, onPlayAgain, onDismiss, solvedCategories }) {
  const isWin = status === 'won'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onDismiss}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Emoji */}
        <div className="text-5xl sm:text-6xl mb-4">
          {isWin ? '🎉' : '😢'}
        </div>

        {/* Title */}
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-800 mb-2">
          {isWin ? 'Great Job!' : 'Game Over'}
        </h2>

        {/* Subtitle */}
        <p className="font-display text-gray-600 mb-6">
          {isWin
            ? 'You found all the connections!'
            : "Better luck next time!"}
        </p>

        {/* Categories Summary */}
        <div className="mb-6 space-y-2">
          {solvedCategories.map((cat) => (
            <div
              key={cat.name}
              className={`
                rounded-lg py-2 px-3 text-sm font-display font-semibold text-gray-900
                ${cat.color === 'yellow' ? 'bg-solved-yellow' : ''}
                ${cat.color === 'green' ? 'bg-solved-green' : ''}
                ${cat.color === 'blue' ? 'bg-solved-blue' : ''}
                ${cat.color === 'purple' ? 'bg-solved-purple' : ''}
              `}
            >
              {cat.name}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <motion.button
            onClick={onPlayAgain}
            whileTap={{ scale: 0.95 }}
            className="
              w-full py-3 rounded-full
              bg-gray-800 text-white
              font-display font-bold text-base sm:text-lg
              hover:bg-gray-700 active:bg-gray-900
              transition-colors
            "
          >
            Play Again
          </motion.button>
          <motion.button
            onClick={onDismiss}
            whileTap={{ scale: 0.95 }}
            className="
              w-full py-3 rounded-full
              bg-white text-gray-800
              font-display font-bold text-base sm:text-lg
              border-2 border-gray-300
              hover:bg-gray-50 active:bg-gray-100
              transition-colors
            "
          >
            View Board
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default GameOverModal
