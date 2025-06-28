# Quiz Garden

Transform your Notion notes into interactive quizzes.

This is a [Next.js](https://nextjs.org) project that uses modern CSS architecture and responsive design principles.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## User Flow

Click the **Get Started** button on the homepage to begin the process of importing your Notion notes and generating interactive quizzes. (Further integration steps may be required in future versions.)

## Theme System

This app supports both light and dark themes. You can toggle between them using the button in the top right corner. The initial theme adapts to your system preference and network speed:
- On slow networks, the app defaults to the light theme for faster loading.
- On fast networks, your saved or system theme preference is used.

## CSS Architecture

This project uses two key methodologies for scalable, maintainable CSS:

### CUBE CSS

CUBE CSS is a methodology for writing scalable, maintainable CSS by organizing styles into four main layers:

- **Composition:** Layout patterns and structural rules (e.g., `styles/composition/layout.css`).
- **Utilities:** Single-purpose classes for spacing, colors, etc. (e.g., `styles/utilities/spacing.css`, `styles/utilities/colors.css`).
- **Blocks:** Reusable, self-contained components (e.g., `styles/blocks/button.css`).
- **Exceptions:** One-off overrides (not shown here, but would be used for special cases).

Your main stylesheet (`styles/main.css`) imports these layers in the recommended CUBE order, ensuring a clear separation of concerns and predictable overrides. This structure makes it easy to scale and maintain your styles as the project grows.

### Utopia Fluid Design

[Utopia](https://utopia.fyi/) provides fluid typography and spacing that scales smoothly between breakpoints without media queries.

**Typography Scale**: Uses `clamp()` functions to fluidly scale from 18px-20px base size
- `--step--2` to `--step-5` for different text sizes
- Example: `--step-0: clamp(1.13rem, calc(1.08rem + 0.22vw), 1.25rem)`

**Space Scale**: Fluid spacing tokens for consistent layouts
- `--space-3xs` to `--space-3xl` for margins, padding, and gaps
- Example: `--space-m: clamp(1.69rem, calc(1.62rem + 0.33vw), 1.88rem)`

These tokens are defined in `styles/base/tokens.css` and used throughout the component styles via CSS custom properties.

## Evals

The `app/evals/` directory contains automated evaluation scripts for the app's AI features. Each eval defines a set of test cases, runs them through the AI model, and scores the results using metrics like factual accuracy and string similarity (e.g., Levenshtein distance). This helps ensure the quality and reliability of quiz generation and other AI-driven features.

**Note:** For the evals/ai-sdk integration to work, you need to create a `.env` file in the project root with your `OPENAI_API_KEY`:

```bash
OPENAI_API_KEY=your-openai-api-key-here
```

### Running Evals

To run the evals locally and watch for changes, use:

```bash
npm run eval:dev
```

This will use `evalite` to automatically run and re-run your evaluation scripts in `app/evals/` as you edit them.
