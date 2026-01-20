import { motion } from 'framer-motion'

function GameControls({
  onShuffle,
  onDeselectAll,
  onSubmit,
  canSubmit,
  canDeselect,
  gameStatus,
}) {
  const isDisabled = gameStatus !== 'playing'

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 w-full">
      {/* Shuffle Button */}
      <motion.button
        onClick={onShuffle}
        disabled={isDisabled}
        whileTap={{ scale: 0.95 }}
        className={`
          px-4 sm:px-6 py-2 sm:py-2.5 rounded-full
          font-display font-semibold text-sm sm:text-base
          border-2 border-gray-800
          transition-all duration-150
          ${
            isDisabled
              ? 'opacity-50 cursor-not-allowed bg-white text-gray-800'
              : 'bg-white text-gray-800 hover:bg-gray-100 active:bg-gray-200'
          }
        `}
      >
        Shuffle
      </motion.button>

      {/* Deselect All Button */}
      <motion.button
        onClick={onDeselectAll}
        disabled={isDisabled || !canDeselect}
        whileTap={{ scale: 0.95 }}
        className={`
          px-4 sm:px-6 py-2 sm:py-2.5 rounded-full
          font-display font-semibold text-sm sm:text-base
          border-2 border-gray-800
          transition-all duration-150
          ${
            isDisabled || !canDeselect
              ? 'opacity-50 cursor-not-allowed bg-white text-gray-800'
              : 'bg-white text-gray-800 hover:bg-gray-100 active:bg-gray-200'
          }
        `}
      >
        Deselect All
      </motion.button>

      {/* Submit Button */}
      <motion.button
        onClick={onSubmit}
        disabled={isDisabled || !canSubmit}
        whileTap={{ scale: 0.95 }}
        className={`
          px-6 sm:px-8 py-2 sm:py-2.5 rounded-full
          font-display font-bold text-sm sm:text-base
          transition-all duration-150
          ${
            isDisabled || !canSubmit
              ? 'opacity-50 cursor-not-allowed bg-gray-400 text-white border-2 border-gray-400'
              : 'bg-gray-800 text-white border-2 border-gray-800 hover:bg-gray-700 active:bg-gray-900'
          }
        `}
      >
        Submit
      </motion.button>
    </div>
  )
}

export default GameControls
