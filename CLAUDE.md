# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint linting
- `npm run preview` - Preview production build

## Project Architecture

This is a **React TypeScript portfolio website** built with modern web technologies:

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + SCSS
- **Icons**: Lucide React + React Icons
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Linting**: ESLint with TypeScript support

### Key Architecture Patterns

**Context-Based State Management**: Two main contexts provide global state:
- `ThemeContext` (src/contexts/ThemeContext.tsx): Manages light/dark theme with localStorage persistence
- `LanguageContext` (src/contexts/LanguageContext.tsx): Handles Korean/English i18n with typed translation keys

**Internationalization System**:
- All text uses typed translation keys via `useLanguage().t('key')`
- Translation keys are strictly typed (e.g., `nav.home`, `hero.greeting`)
- Supports Korean ('ko') and English ('en') languages

**Component Structure**:
- Main layout in `App.tsx` with fixed navigation progress indicator
- Single-page application with section-based navigation using intersection observers
- Reusable components in `src/components/`
- Page components in `src/pages/`

**Data Management**:
- Project data centralized in `src/data/projects.ts`
- Type definitions in `src/types/` directory
- API services in `src/services/api/`

**Styling Approach**:
- Tailwind CSS for utility-first styling
- SCSS for custom styles and animations (src/styles/main.scss)
- CSS custom properties for theming
- Gradient and animation effects throughout

### Important File Locations

- **Main entry**: `src/main.tsx`
- **App root**: `src/App.tsx`
- **Home page**: `src/pages/Home.tsx` (contains all main sections)
- **Project data**: `src/data/projects.ts`
- **Types**: `src/types/project.ts`, `src/types/course.ts`
- **Contexts**: `src/contexts/ThemeContext.tsx`, `src/contexts/LanguageContext.tsx`

### Development Notes

- Resume file should be placed in `public/resume.pdf`
- Profile image located at `public/01.jpg`
- All external links use proper `target="_blank"` and `rel="noopener noreferrer"`
- Components use `ScrollReveal` wrapper for entrance animations
- Navigation uses smooth scrolling between sections with intersection observer for active states

### Code Conventions

- Functional components with TypeScript
- Custom hooks pattern for context consumption
- Strict typing for translation keys and props
- Utility-first CSS with Tailwind
- Component-level imports organized by external libraries first, then internal modules