# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs at http://localhost:3000)
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run eval:dev` - Watch mode for running evaluations with Evalite

## Testing and Evaluation

This project uses Evalite for AI model evaluation. Evaluation files are located in `app/evals/` with the `.eval.ts` extension. The evaluation system uses OpenAI's GPT-4o-mini model and includes scoring with Factuality and Levenshtein metrics.

## Code Architecture

### Next.js App Router Structure
- Uses Next.js 15 with App Router architecture
- Main application code in `app/` directory
- Root layout in `app/layout.tsx` with theme provider integration
- Main page in `app/page.tsx` featuring the Quiz Garden interface

### Theme System
- Custom theme provider (`app/ThemeProvider.tsx`) with network-aware theme switching
- Supports light/dark themes with localStorage persistence
- Network detection via `useNetworkStatus` hook optimizes performance on slow connections
- Theme toggle component (`app/ThemeToggle.tsx`) for user interaction

### CSS Architecture (CUBE Methodology)
The project follows CUBE CSS architecture with organized layers:

- **Base Layer**: `styles/base/` - CSS tokens and reset styles
- **Composition Layer**: `styles/composition/` - Layout and structural styles  
- **Utilities Layer**: `styles/utilities/` - Spacing and color utilities
- **Blocks Layer**: `styles/blocks/` - Component-specific styles (buttons, etc.)
- **Main Import**: `styles/main.css` orchestrates all imports in CUBE order

### AI Integration
- Uses AI SDK with OpenAI integration (`@ai-sdk/openai`, `@ai-sdk/react`)
- Stream text functionality for AI responses
- Zod for type-safe data validation

### Key Dependencies
- Next.js 15 with React 19
- Tailwind CSS 4 for styling
- Lucide React for icons
- TypeScript for type safety
- Vitest for testing
- Evalite for AI model evaluation

### Network Optimization
The `useNetworkStatus` hook detects slow network conditions and adapts theme behavior accordingly:
- On slow networks: defaults to light theme to reduce visual complexity
- On fast networks: respects user preferences and system theme
- Uses connection API when available, falls back to fetch timing tests