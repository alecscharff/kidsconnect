import { motion } from 'framer-motion'

function Toast({ message, onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        onClick={onDismiss}
        className="
          bg-gray-900 text-white
          px-6 py-3 rounded-full
          font-display font-semibold text-sm sm:text-base
          shadow-lg cursor-pointer
          hover:bg-gray-800 transition-colors
        "
      >
        {message}
      </div>
    </motion.div>
  )
}

export default Toast
