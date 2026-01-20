import Papa from 'papaparse'

/**
 * Difficulty level to color mapping
 */
export const DIFFICULTY_COLORS = {
  1: 'yellow',
  2: 'green',
  3: 'blue',
  4: 'purple',
}

export const COLOR_CLASSES = {
  yellow: 'bg-solved-yellow',
  green: 'bg-solved-green',
  blue: 'bg-solved-blue',
  purple: 'bg-solved-purple',
}

/**
 * Parse the CSV file and return structured puzzle data
 */
export async function loadPuzzleData(csvPath = `${import.meta.env.BASE_URL}puzzle_data.csv`) {
  return new Promise((resolve, reject) => {
    Papa.parse(csvPath, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV parsing error: ${results.errors[0].message}`))
          return
        }

        const categories = results.data.map((row) => ({
          name: row.category,
          difficulty: parseInt(row.difficulty, 10),
          color: DIFFICULTY_COLORS[parseInt(row.difficulty, 10)],
          words: [row.word_1, row.word_2, row.word_3, row.word_4],
        }))

        resolve(categories)
      },
      error: (error) => {
        reject(new Error(`Failed to load CSV: ${error.message}`))
      },
    })
  })
}

/**
 * Select one random category for each difficulty level (1-4)
 * Returns 4 categories, one of each difficulty
 */
export function selectRandomPuzzle(allCategories) {
  const categoriesByDifficulty = {
    1: [],
    2: [],
    3: [],
    4: [],
  }

  // Group categories by difficulty
  allCategories.forEach((category) => {
    if (categoriesByDifficulty[category.difficulty]) {
      categoriesByDifficulty[category.difficulty].push(category)
    }
  })

  // Select one random category from each difficulty level
  const selectedCategories = []
  for (let difficulty = 1; difficulty <= 4; difficulty++) {
    const pool = categoriesByDifficulty[difficulty]
    if (pool.length === 0) {
      throw new Error(`No categories found for difficulty level ${difficulty}`)
    }
    const randomIndex = Math.floor(Math.random() * pool.length)
    selectedCategories.push(pool[randomIndex])
  }

  return selectedCategories
}

/**
 * Create tiles from selected categories
 * Each tile has an id, word, and categoryName
 */
export function createTilesFromCategories(categories) {
  const tiles = []

  categories.forEach((category) => {
    category.words.forEach((word) => {
      tiles.push({
        id: `${category.name}-${word}`,
        word: word,
        categoryName: category.name,
        difficulty: category.difficulty,
        color: category.color,
      })
    })
  })

  return tiles
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
