import { motion } from 'framer-motion'

const colorClasses = {
  yellow: 'bg-solved-yellow',
  green: 'bg-solved-green',
  blue: 'bg-solved-blue',
  purple: 'bg-solved-purple',
}

function SolvedCategory({ category }) {
  const bgColor = colorClasses[category.color] || 'bg-gray-400'

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scaleY: 0 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      exit={{ opacity: 0, y: -20, scaleY: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`
        ${bgColor}
        rounded-lg p-3 sm:p-4 mb-2
        text-center
      `}
    >
      <div className="font-display font-bold text-gray-900 text-sm sm:text-base uppercase tracking-wide">
        {category.name}
      </div>
      <div className="font-display text-gray-800 text-xs sm:text-sm mt-1">
        {category.words.join(', ')}
      </div>
    </motion.div>
  )
}

export default SolvedCategory
