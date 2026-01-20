import { motion } from 'framer-motion'

function Tile({ tile, isSelected, onClick, disabled }) {
  return (
    <motion.button
      onClick={() => !disabled && onClick(tile.id)}
      disabled={disabled}
      className={`
        aspect-square w-full rounded-lg font-display font-bold
        text-sm sm:text-base md:text-lg
        flex items-center justify-center text-center
        p-1 sm:p-2
        transition-colors duration-150
        select-none cursor-pointer
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        ${
          isSelected
            ? 'bg-tile-selected text-white'
            : 'bg-tile-unselected text-gray-800 hover:bg-gray-300'
        }
      `}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      <span className="break-words leading-tight px-1">
        {tile.word}
      </span>
    </motion.button>
  )
}

export default Tile
