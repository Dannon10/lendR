# Lendsqr Frontend Engineering Test

A small Next.js + TypeScript frontend used for a frontend engineering assessment. It demonstrates responsive layouts, SCSS-based styling, data fetching, caching, accessibility improvements, and unit testing with Jest and React Testing Library.

## Key Features

- Responsive layout with a Dashboard, Users list and User Details pages.
- User details page with tabbed sections and an overflow `More` menu for smaller viewports.
- Clickable and keyboard-accessible user table rows that navigate to user details.
- SCSS-based design system with variables and mixins.
- `userService` with in-memory + localStorage caching for user details retrieval.
- Unit tests covering navigation, components, and services.

## Tech Stack

- Next.js (App Router) with TypeScript
- React
- SCSS for styling
- Axios for HTTP requests
- Jest + React Testing Library for unit tests

## Repo Structure (selected)

- `src/app/` — Next.js pages and layouts
  - `dashboard/` — Dashboard page
  - `users/` — Users listing and `[id]` user details
- `src/components/` — Reusable components (tables, dropdowns, sidebar)
- `src/services/` — `axios` instance and `userService` logic
- `src/styles/` — SCSS variables, mixins, and base styles
- `src/hooks/` — custom hooks (e.g., `useUsers.ts`)

## Getting Started

Prerequisites

- Node >= 16
- npm

Install

```bash
npm install
```

Run development server

```bash
npm run dev
```

Build

```bash
npm run build
```

Run tests

```bash
npm test
```

Run tests in watch mode

```bash
npm run test:watch
```

## Styling / SCSS notes

- The project uses SCSS with shared `variables` and `mixins` under `src/styles/`.

## Data & API

- `src/services/axios.ts` configures the base API endpoint (currently points to a mock endpoint used during development).
- `src/services/userService.ts` provides `getAllUsers` and related helpers with an in-memory + `localStorage` cache for performance. Tests mock network responses to ensure determinism.

## Tests

- Unit tests are located under `src/**/__tests__/` and use Jest + React Testing Library.
- Tests mock Next.js navigation where needed to avoid runtime invariants in the test environment.

## License

This repository contains assessment code.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000
 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font
 to automatically optimize and load Geist
, a new font family for Vercel.

Learn More

To learn more about Next.js, take a look at the following resources:

Next.js Documentation
 - learn about Next.js features and API.

Learn Next.js
 - an interactive Next.js tutorial.

You can check out the Next.js GitHub repository
 - your feedback and contributions are welcome!

Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform
 from the creators of Next.js.

Check out our Next.js deployment documentation
 for more details.