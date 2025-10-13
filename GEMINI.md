# GEMINI.md

## Project Overview

This project is a personal portfolio website for a developer named Dongik Min. It is built with React, TypeScript, and Tailwind CSS, using Vite as the build tool. The website showcases the developer's skills, experience, awards, education, and projects. It features a modern, single-page design with smooth scrolling navigation, a theme toggler (light/dark mode), and a language switcher.

The main technologies used are:
- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion, Lucide React, React Icons
- **Build Tool:** Vite
- **Linting:** ESLint

The project is structured with a clear separation of concerns, with components, pages, contexts, and styles organized into their respective directories.

## Building and Running

To get the project up and running, follow these steps:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the development server, and you can view the website at `http://localhost:5173`.

3.  **Build for production:**
    ```bash
    npm run build
    ```
    This will create a `dist` directory with the production-ready files.

4.  **Lint the code:**
    ```bash
    npm run lint
    ```
    This will check the code for any linting errors.

## Development Conventions

- **Styling:** The project uses a combination of Tailwind CSS for utility-first styling and SCSS for more complex styles.
- **Components:** The UI is built with a component-based architecture, with reusable components located in the `src/components` directory.
- **State Management:** The project uses React's Context API for managing global state, such as the current theme and language.
- **Linting:** The project uses ESLint to enforce a consistent coding style.
- **Type Checking:** TypeScript is used for static type checking, which helps to catch errors early in the development process.
