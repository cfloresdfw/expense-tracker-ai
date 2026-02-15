# Expense Tracker AI

## Project Overview
A Next.js 14 personal expense tracking app with dashboard analytics, CRUD operations, filtering, and CSV export. Data persists in browser localStorage.

## Tech Stack
- **Framework:** Next.js 14 (App Router, TypeScript, `src/` directory)
- **Styling:** Tailwind CSS
- **Charts:** Recharts (Bar, Pie, Line)
- **Icons:** lucide-react
- **Dates:** date-fns
- **IDs:** uuid

## Commands
- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build (also runs type checking)
- `npm run lint` — ESLint
- `npm start` — Serve production build

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Dashboard (/)
│   ├── add/page.tsx        # Add expense (/add)
│   ├── edit/[id]/page.tsx  # Edit expense (/edit/:id)
│   ├── expenses/page.tsx   # Expense list (/expenses)
│   └── layout.tsx          # Root layout (wraps ExpenseProvider)
├── components/
│   ├── ui/                 # Reusable primitives (Button, Card, Input, Select, Modal, EmptyState, LoadingSpinner)
│   ├── layout/             # Header, MobileNav
│   ├── expenses/           # ExpenseForm, ExpenseList, ExpenseRow, SearchBar, FilterControls, DeleteConfirmModal
│   └── dashboard/          # SummaryCards, SpendingChart, CategoryPieChart, MonthlyTrend, RecentExpenses
├── context/
│   └── ExpenseContext.tsx   # React Context wrapping useExpenses hook
├── hooks/
│   ├── useLocalStorage.ts   # Hydration-safe localStorage hook
│   ├── useDebounce.ts       # Debounced value hook
│   └── useExpenses.ts       # CRUD, filtering, summary logic
└── lib/
    ├── types.ts             # All TypeScript interfaces/types
    ├── constants.ts         # Categories, colors, storage key
    ├── utils.ts             # Currency/date formatting, chart data helpers, CSV export
    └── validators.ts        # Form validation
```

## Key Architecture Decisions
- **All pages are `"use client"`** — they depend on React Context and localStorage
- **Amounts stored in cents** (integers) to avoid floating-point errors; display-only formatting via `formatCurrency()`
- **`dollarsToCents()` / `centsToDollars()`** for conversion at form boundaries
- **localStorage persistence** with hydration-safe pattern: `useLocalStorage` returns `isLoaded` flag, pages show `<LoadingSpinner />` until hydrated
- **Single context provider** (`ExpenseProvider`) in root layout provides all state
- **Path alias:** `@/*` maps to `./src/*`

## Conventions
- Components use PascalCase filenames (e.g., `ExpenseForm.tsx`)
- Hooks use camelCase with `use` prefix (e.g., `useExpenses.ts`)
- Lib modules use camelCase (e.g., `validators.ts`)
- Categories defined in `constants.ts` — add new categories there
- Storage key: `expense-tracker-data` in localStorage

## Common Patterns
- **Adding a new category:** Add entry to `CATEGORIES` array in `src/lib/constants.ts`, add value to `Category` type in `src/lib/types.ts`
- **Form validation:** Rules in `src/lib/validators.ts`, consumed by `ExpenseForm`
- **Recharts tooltips:** Use `(value) => formatCurrency(value as number)` pattern to satisfy TypeScript
