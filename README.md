# Vite + React + TypeScript + Supabase

A modern React application built with Vite, TypeScript, and Supabase.

## Project info

- **Framework**: Vite
- **Language**: TypeScript
- **UI Library**: React 18
- **Component Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Database**: Supabase

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Setup

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Copy environment variables
cp .env.example .env.local

# Step 5: Update .env.local with your Supabase credentials:
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key

# Step 6: Start the development server
npm run dev
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
├── src/
│   ├── components/    # React components
│   ├── lib/          # Utility functions and configs
│   └── main.tsx      # Application entry point
├── supabase/         # Database migrations
└── public/           # Static assets
```

## Database

Database migrations are managed with Supabase CLI:

```sh
# Link to your Supabase project
npx supabase link --project-ref YOUR_PROJECT_REF

# Apply migrations
npx supabase db push

# Pull remote migrations
npx supabase db pull
```
