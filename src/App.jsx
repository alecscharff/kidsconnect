import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import GameBoard from './components/GameBoard'
import GameControls from './components/GameControls'
import MistakesTracker from './components/MistakesTracker'
import Toast from './components/Toast'
import GameOverModal from './components/GameOverModal'
import SolvedCategory from './components/SolvedCategory'
import { useGameState } from './hooks/useGameState'

function App() {
  const {
    tiles,
    selectedTiles,
    solvedCategories,
    mistakes,
    gameStatus,
    toast,
    isLoading,
    error,
    showModal,
    selectTile,
    deselectAll,
    shuffle,
    submitGuess,
    resetGame,
    dismissToast,
    dismissModal,
    openModal,
  } = useGameState()

  const gameOver = gameStatus === 'won' || gameStatus === 'lost'

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-2xl font-display font-bold text-gray-600 animate-pulse">
          Loading puzzles...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="text-center">
          <div className="text-xl font-display font-bold text-red-500 mb-4">
            Oops! Something went wrong
          </div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="py-4 px-4 border-b border-gray-200">
        <h1 className="text-3xl md:text-4xl font-display font-extrabold text-center text-gray-800">
          KidsConnect
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1 font-display">
          Find groups of four!
        </p>
      </header>

      {/* Main Game Area */}
      <main className="flex-1 flex flex-col items-center px-4 py-4 max-w-[600px] mx-auto w-full">
        {/* Mistakes Tracker */}
        <MistakesTracker mistakes={mistakes} maxMistakes={4} />

        {/* Solved Categories */}
        <div className="w-full mb-2">
          <AnimatePresence>
            {solvedCategories.map((category) => (
              <SolvedCategory key={category.name} category={category} />
            ))}
          </AnimatePresence>
        </div>

        {/* Game Board */}
        <GameBoard
          tiles={tiles}
          selectedTiles={selectedTiles}
          onTileClick={selectTile}
          gameStatus={gameStatus}
        />

        {/* Game Controls */}
        {!gameOver ? (
          <GameControls
            onShuffle={shuffle}
            onDeselectAll={deselectAll}
            onSubmit={submitGuess}
            canSubmit={selectedTiles.length === 4}
            canDeselect={selectedTiles.length > 0}
            gameStatus={gameStatus}
          />
        ) : !showModal && (
          <div className="w-full mt-4 flex justify-center gap-3">
            <button
              onClick={openModal}
              className="px-6 py-3 rounded-full bg-gray-800 text-white font-display font-bold hover:bg-gray-700 transition-colors"
            >
              Show Results
            </button>
            <button
              onClick={resetGame}
              className="px-6 py-3 rounded-full bg-white text-gray-800 font-display font-bold border-2 border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </main>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && <Toast message={toast} onDismiss={dismissToast} />}
      </AnimatePresence>

      {/* Game Over Modal */}
      <AnimatePresence>
        {showModal && (
          <GameOverModal
            status={gameStatus}
            onPlayAgain={resetGame}
            onDismiss={dismissModal}
            solvedCategories={solvedCategories}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
