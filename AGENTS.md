# AGENTS.md

This file contains essential information for AI coding agents working on this project.

## Project Overview

This is a **React + TypeScript + Vite** web application for `ubterzioglu.de` - a personal portfolio website with a dark, cinematic design aesthetic. The application features a content card system that serves different content based on visitor personas (recruiter, colleague, QA, curious visitor, etc.) and includes an admin interface for content management.

### Technology Stack

| Category | Technology |
|----------|------------|
| Framework | Vite 5.x |
| Language | TypeScript 5.x |
| UI Library | React 18.3 |
| Component Library | shadcn/ui |
| Styling | Tailwind CSS 3.4 |
| Database/Backend | Supabase |
| State Management | TanStack Query (React Query) |
| Routing | React Router DOM 6.x |
| Forms | React Hook Form + Zod |
| Animation | Framer Motion |
| Testing | Vitest + React Testing Library |
| Icons | Lucide React |
| Font | League Spartan (Google Fonts) |

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components (RequireAdmin)
│   │   ├── sections/       # Page sections (hero, recruiter cards)
│   │   ├── ui/             # shadcn/ui components (40+ components)
│   │   └── visual/         # Visual effects (snowfall, code rain, interference)
│   ├── hooks/              # Custom React hooks (useSession, use-mobile, use-toast)
│   ├── integrations/
│   │   └── supabase/       # Supabase client and generated types
│   ├── lib/                # Utility functions and API modules
│   │   ├── utils.ts        # cn() helper for Tailwind classes
│   │   ├── auth-api.ts     # Authentication API functions
│   │   ├── cards-api.ts    # Content cards CRUD API
│   │   ├── cards-schema.ts # Card type definitions and validation
│   │   ├── system-cards.ts # System/default card definitions
│   │   └── supabase.ts     # Supabase client export
│   ├── pages/              # Route-level page components
│   │   ├── Index.tsx       # Landing page (hero section)
│   │   ├── Cards.tsx       # Cards display page
│   │   ├── Login.tsx       # Admin login page
│   │   ├── AdminCards.tsx  # Admin content management
│   │   └── NotFound.tsx    # 404 page
│   ├── styles/
│   │   └── palette.css     # Design system color palette
│   ├── test/               # Test setup and example tests
│   ├── assets/             # Image assets (hero images, thumbnails)
│   ├── App.tsx             # Main app component with routes
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles and CSS variables
├── supabase/
│   ├── migrations/         # Database migration SQL files
│   └── config.toml         # Supabase CLI configuration
├── public/                 # Static assets
└── [config files]
```

## Design System

The project uses a **dark-first cinematic design system** with the following key characteristics:

### Color Palette (HSL only)

| Token | HSL Value | Hex | Usage |
|-------|-----------|-----|-------|
| `--background` | 0 0% 0% | #000000 | Page background |
| `--foreground` | 240 100% 99% | #FAFAFF | Primary text |
| `--primary` | 200 99% 47% | #01A1F1 | Links, buttons, accents |
| `--glow` | 289 96% 37% | #8F03B7 | Purple glow effects |
| `--cta` | 44 100% 50% | #FFBB00 | Call-to-action buttons |
| `--success` | 81 100% 37% | #7CBB00 | Success states |
| `--energy` | 16 92% 52% | #F65314 | Energy/accent color |
| `--destructive` | 16 92% 52% | #F65314 | Error states |

### Typography

- **Primary Font**: League Spartan (300-800 weight)
- **Hero Title**: text-4xl to text-6xl, font-semibold, tracking-tight
- **Kicker**: text-sm, tracking-[0.22em], uppercase

### Visual Effects

- Glassmorphism cards with `backdrop-blur-xl`
- Custom gradients (hero, aurora, bottom-fade)
- Glow shadows with CSS custom properties
- Animated snowfall overlay
- Matrix-style code rain overlay
- City light flicker animation

## Build and Development Commands

```bash
# Development server (runs on port 5050)
npm run dev

# Production build
npm run build

# Development build (unminified)
npm run build:dev

# Preview production build locally
npm run preview

# Run ESLint
npm run lint

# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch
```

## Testing Strategy

- **Framework**: Vitest with jsdom environment
- **Testing Library**: React Testing Library + jest-dom matchers
- **Test Location**: `src/**/*.{test,spec}.{ts,tsx}`
- **Setup File**: `src/test/setup.ts`
- **Current Coverage**: Minimal (only example test exists)

### Writing Tests

```typescript
import { describe, it, expect } from "vitest";

describe("feature", () => {
  it("should behave correctly", () => {
    expect(result).toBe(expected);
  });
});
```

## Database Schema

The application uses Supabase with the following main tables:

### `content_cards`
- `id`: uuid (primary key)
- `persona`: text (e.g., 'recruiter', 'colleague', 'qa', 'curious')
- `title`: text
- `description`: text
- `sort_order`: integer
- `image_path`: text (storage path or URL)
- `created_at`, `updated_at`: timestamps

### `content_card_actions`
- `id`: uuid (primary key)
- `card_id`: uuid (foreign key to content_cards)
- `label`: text (button text)
- `href`: text (link URL)
- `sort_order`: integer

### `user_roles`
- `id`: uuid (primary key)
- `user_id`: uuid (references auth.users)
- `role`: enum ('admin', 'user')

### Storage
- Bucket: `card-images` (public)
- Admin-only upload/update/delete
- Public read access

## Authentication & Authorization

- **Provider**: Supabase Auth
- **Session Storage**: localStorage
- **Auto-refresh**: Enabled
- **Roles**: Admin gate is currently disabled (see `RequireAdmin.tsx`)

### Admin Check Function

```typescript
import { isAdmin } from "@/lib/auth-api";
const hasAdminRole = await isAdmin();
```

## Environment Variables

Create a `.env.local` file with:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

**Note**: Never commit `.env.local` to version control.

## Code Style Guidelines

### TypeScript Configuration

- Strict mode is **disabled** (`strict: false`)
- `noImplicitAny: false` - explicit any types allowed
- `noUnusedLocals: false` - unused variables allowed
- Path alias `@/` maps to `./src/`

### Import Patterns

```typescript
// Use path aliases
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
```

### Component Patterns

```typescript
// shadcn/ui components use class-variance-authority
import { cva, type VariantProps } from "class-variance-authority";

// Standard functional component
const MyComponent = () => {
  return <div>...</div>;
};
```

### CSS Conventions

- Use Tailwind utility classes primarily
- Custom CSS in `src/index.css` using `@layer` directives
- CSS variables for theme values (all HSL format)
- Component classes use BEM-like naming in `@layer components`

## Database Migrations

```bash
# Link to Supabase project
npx supabase link --project-ref YOUR_PROJECT_REF

# Apply migrations
npx supabase db push

# Pull remote migrations
npx supabase db pull
```

Migrations are stored in `supabase/migrations/` as SQL files.

## Security Considerations

1. **Row Level Security (RLS)**: All tables have RLS policies
   - Public can read cards and actions
   - Only admins can modify content
   - Storage policies restrict uploads to admins

2. **Environment Variables**: Supabase keys are exposed to client (anon key only)

3. **Admin Gate**: Currently disabled in `RequireAdmin.tsx` - re-enable before production if needed

## Known Issues / Notes

1. **Admin Protection**: The `RequireAdmin` component is temporarily disabled (returns children without checks)
2. **TypeScript Strictness**: Strict mode is disabled for faster development
3. **Test Coverage**: Minimal - only example tests exist
4. **Lovable Tagger**: Development-only plugin for component editing (enabled in dev mode)

## Adding New shadcn/ui Components

```bash
npx shadcn add component-name
```

Components are installed to `src/components/ui/` and follow the shadcn/ui patterns.

## Deployment

The application is built as a static site using Vite. The build output goes to `dist/`.

```bash
npm run build
# Deploy dist/ to your hosting provider
```
