import { useState, useEffect, useCallback } from 'react'
import {
  loadPuzzleData,
  selectRandomPuzzle,
  createTilesFromCategories,
  shuffleArray,
} from '../utils/csvParser'

const MAX_MISTAKES = 4

export function useGameState() {
  const [allCategories, setAllCategories] = useState([])
  const [gameCategories, setGameCategories] = useState([])
  const [tiles, setTiles] = useState([])
  const [selectedTiles, setSelectedTiles] = useState([])
  const [solvedCategories, setSolvedCategories] = useState([])
  const [mistakes, setMistakes] = useState(0)
  const [gameStatus, setGameStatus] = useState('loading') // 'loading', 'playing', 'won', 'lost'
  const [toast, setToast] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [previousGuesses, setPreviousGuesses] = useState([])
  const [showModal, setShowModal] = useState(false)

  // Load puzzle data on mount
  useEffect(() => {
    loadPuzzleData()
      .then((categories) => {
        setAllCategories(categories)
        initializeGame(categories)
      })
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [])

  // Initialize a new game with random categories
  const initializeGame = useCallback((categories) => {
    try {
      const selected = selectRandomPuzzle(categories)
      setGameCategories(selected)

      const newTiles = createTilesFromCategories(selected)
      setTiles(shuffleArray(newTiles))

      setSelectedTiles([])
      setSolvedCategories([])
      setMistakes(0)
      setPreviousGuesses([])
      setShowModal(false)
      setGameStatus('playing')
      setIsLoading(false)
      setError(null)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }, [])

  // Reset the game
  const resetGame = useCallback(() => {
    if (allCategories.length > 0) {
      setIsLoading(true)
      setTimeout(() => {
        initializeGame(allCategories)
      }, 300)
    }
  }, [allCategories, initializeGame])

  // Select/deselect a tile
  const selectTile = useCallback((tileId) => {
    if (gameStatus !== 'playing') return

    setSelectedTiles((prev) => {
      const isSelected = prev.includes(tileId)

      if (isSelected) {
        return prev.filter((id) => id !== tileId)
      } else {
        if (prev.length >= 4) return prev
        return [...prev, tileId]
      }
    })
  }, [gameStatus])

  // Deselect all tiles
  const deselectAll = useCallback(() => {
    setSelectedTiles([])
  }, [])

  // Shuffle remaining tiles
  const shuffle = useCallback(() => {
    setTiles((prev) => shuffleArray([...prev]))
  }, [])

  // Submit a guess
  const submitGuess = useCallback(() => {
    if (selectedTiles.length !== 4 || gameStatus !== 'playing') return

    // Get the selected tile objects
    const selectedTileObjects = tiles.filter((t) => selectedTiles.includes(t.id))

    // Check if this guess was already made
    const guessKey = [...selectedTiles].sort().join(',')
    if (previousGuesses.includes(guessKey)) {
      setToast('Already guessed!')
      return
    }
    setPreviousGuesses((prev) => [...prev, guessKey])

    // Count how many tiles belong to each category
    const categoryCount = {}
    selectedTileObjects.forEach((tile) => {
      categoryCount[tile.categoryName] = (categoryCount[tile.categoryName] || 0) + 1
    })

    // Check if all 4 tiles are from the same category
    const categories = Object.keys(categoryCount)
    const maxCount = Math.max(...Object.values(categoryCount))

    if (categories.length === 1 && maxCount === 4) {
      // Correct guess!
      const solvedCategory = gameCategories.find(
        (c) => c.name === categories[0]
      )

      // Remove solved tiles from the board
      setTiles((prev) => prev.filter((t) => !selectedTiles.includes(t.id)))

      // Add to solved categories (in order of completion)
      setSolvedCategories((prev) => {
        const newSolved = [...prev, solvedCategory]

        // Check for win
        if (newSolved.length === 4) {
          setTimeout(() => {
            setGameStatus('won')
            setShowModal(true)
          }, 500)
        }

        return newSolved
      })

      // Clear selection
      setSelectedTiles([])
    } else {
      // Incorrect guess
      const newMistakes = mistakes + 1
      setMistakes(newMistakes)

      // Check if "one away"
      if (maxCount === 3) {
        setToast('One away...')
      }

      // Clear selection
      setSelectedTiles([])

      // Check for loss
      if (newMistakes >= MAX_MISTAKES) {
        // Reveal all remaining categories (append in difficulty order for reveal)
        const remainingCategories = gameCategories
          .filter((c) => !solvedCategories.find((s) => s.name === c.name))
          .sort((a, b) => a.difficulty - b.difficulty)
        setSolvedCategories((prev) => [...prev, ...remainingCategories])
        setTiles([])
        setTimeout(() => {
          setGameStatus('lost')
          setShowModal(true)
        }, 500)
      }
    }
  }, [selectedTiles, tiles, gameCategories, solvedCategories, mistakes, gameStatus, previousGuesses])

  // Dismiss toast
  const dismissToast = useCallback(() => {
    setToast(null)
  }, [])

  // Dismiss modal (to view completed board)
  const dismissModal = useCallback(() => {
    setShowModal(false)
  }, [])

  // Show modal again
  const openModal = useCallback(() => {
    setShowModal(true)
  }, [])

  // Auto-dismiss toast after 2 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  return {
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
  }
}
