# DSA Visualizer

DSA Visualizer is a web application that lets you visualize data structures and algorithms through interactive animations and step-by-step walkthroughs.

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8)
![Vitest](https://img.shields.io/badge/Vitest-3.2.4-green)

## Features

### Data Structures

- **Array**: Dynamic insertion, deletion, and visualization with index tracking
- **Stack**: LIFO operations with animated push/pop and visual element stacking
- **Queue**: FIFO operations with enqueue/dequeue animations and direction indicators
- **Linked List**: Node-based structure with pointer visualization and insertion/deletion at any position

### Algorithms

- **Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort with color-coded element states
- **Search Algorithms**: Linear Search, Binary Search, Jump Search with step-by-step comparisons

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/marwaneahansal/dsa-visualizer.git
   cd dsa-visualizer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with Turbopack
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Interactions**: [React Zoom Pan Pinch](https://github.com/BetterTyped/react-zoom-pan-pinch)
- **Testing**: [Vitest](https://vitest.dev/) with [Testing Library](https://testing-library.com/)

## Project Structure

```text
src/
├── app/                    # Next.js App Router pages
│   ├── algorithms/         # Algorithm pages
│   │   ├── search/
│   │   └── sorting/
│   └── data-structures/    # Data structure pages
│       ├── array/
│       ├── linked-list/
│       ├── queue/
│       └── stack/
├── components/             # React components
│   ├── algorithms/         # Algorithm visualizations
│   ├── data-structures/    # Data structure visualizations
│   ├── features/           # Feature components
│   ├── navbar/             # Navigation components
│   └── ui/                 # UI components (shadcn/ui)
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and configurations
│   ├── types/              # TypeScript type definitions
│   ├── config/             # Configuration files
│   └── constants/          # Constants and enums
└── test/                   # Test files and setup
```

## Testing

This project uses **Vitest** for fast, modern testing with great TypeScript support.

### Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests with UI (interactive)
npm run test:ui
