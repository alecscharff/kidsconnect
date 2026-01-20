# KidsConnect - Game Development Instructions

A mobile-first, responsive web-based game that functions exactly like the New York Times "Connections" game.

---

## 1. Data Source

The game must load puzzle data from a local file named `puzzle_data.csv`.

### CSV Format
The app should parse a CSV with the following headers:

```csv
category,difficulty,word_1,word_2,word_3,word_4
```

### Difficulty Levels
| Level | Color  | Description      |
|-------|--------|------------------|
| 1     | Yellow | Easiest          |
| 2     | Green  | Medium           |
| 3     | Blue   | Hard             |
| 4     | Purple | Tricky/Wordplay  |

### Behavior
- The app should randomly select 4 rows (one of each difficulty level) from the CSV to generate a new game board of 16 words.

---

## 2. Visual Design & Branding

### App Title
- Display "KidsConnect" at the top
- Use a friendly, sans-serif font (e.g., 'Fredoka One' or 'Nunito' from Google Fonts)

### Grid Layout
- A 4x4 grid of square tiles
- **Mobile:** Tiles should span the width of the screen with small margins
- **Desktop:** Center the grid with a max-width of 600px

### Color Palette (NYT Replicas)

| Element          | Color Code | Description              |
|------------------|------------|--------------------------|
| Unselected Tile  | `#EFEFE6`  | Light Gray/Beige         |
| Selected Tile    | `#5A594E`  | Dark Gray (white text)   |
| Solved Yellow    | `#F9DF6D`  | Easiest category         |
| Solved Green     | `#A0C35A`  | Medium category          |
| Solved Blue      | `#B0C4EF`  | Hard category            |
| Solved Purple    | `#BA81C5`  | Tricky/Wordplay category |

### Buttons
- Pill-shaped buttons for:
  - "Shuffle"
  - "Deselect All"
  - "Submit"

---

## 3. Game Logic & State

### Selection
- Users can tap tiles to select them
- Maximum of 4 tiles selected at a time

### Submission

#### When Submit is Clicked:
- If 4 tiles are selected, the "Submit" button becomes active

#### Correct Guess:
- The 4 tiles animate (fade/morph) into a single colored bar
- Display the category name with the appropriate difficulty color
- Move solved categories to the top of the board

#### Incorrect Guess:
- **3 of 4 correct:** Show a toast notification: "One away..."
- **Fewer than 3 correct:** Shake the tiles horizontally to indicate an error
- Clear the selection after an incorrect guess

### Mistakes Tracking
- Track mistakes with visual indicators
- Display 4 circles (representing "lives") at the top
- Remove one circle for every incorrect guess

### Game Over States

#### Win Condition:
- All 4 categories are found
- Show a "Great Job!" modal with a "Play Again" button

#### Loss Condition:
- If 4 mistakes are made, the game ends
- Reveal the correct answers immediately by grouping the remaining words into their colored rows

---

## 4. Technical Stack

| Technology      | Purpose                                    |
|-----------------|--------------------------------------------|
| **React**       | State management (create-react-app or Vite)|
| **Tailwind CSS**| Styling & mobile responsiveness            |
| **Framer Motion**| Tile merging and shaking animations       |
| **PapaParse**   | Robust CSV parsing                         |

---

## 5. Project Structure

```
kidsconnect/
├── public/
│   └── puzzle_data.csv
├── src/
│   ├── components/
│   │   ├── GameBoard.jsx
│   │   ├── Tile.jsx
│   │   ├── SolvedCategory.jsx
│   │   ├── GameControls.jsx
│   │   ├── MistakesTracker.jsx
│   │   ├── Toast.jsx
│   │   └── GameOverModal.jsx
│   ├── hooks/
│   │   └── useGameState.js
│   ├── utils/
│   │   └── csvParser.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 6. Sample CSV Data

```csv
category,difficulty,word_1,word_2,word_3,word_4
Fruits,1,Apple,Banana,Orange,Grape
Ocean Animals,2,Whale,Dolphin,Shark,Octopus
Space Objects,3,Planet,Asteroid,Comet,Star
Words That Sound Like Letters,4,Queue,Sea,Why,Are
Colors,1,Red,Blue,Green,Yellow
Farm Animals,2,Cow,Pig,Chicken,Horse
Musical Instruments,3,Piano,Guitar,Drums,Violin
Double Letters,4,Balloon,Coffee,Mississippi,Bookkeeper
```

---

## 7. Key Implementation Notes

### Responsive Design
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`)
- Ensure touch targets are at least 44x44px for mobile accessibility

### Animations (Framer Motion)
- **Selection:** Subtle scale animation on tap
- **Incorrect guess:** Horizontal shake animation
- **Correct guess:** Tiles merge/collapse into category bar
- **Reveal:** Smooth transition when showing remaining categories on loss

### State Management
- Track: selected tiles, solved categories, remaining tiles, mistakes count, game status
- Shuffle should only affect unsolved tiles

### Accessibility
- Ensure proper contrast ratios
- Add appropriate ARIA labels
- Support keyboard navigation
