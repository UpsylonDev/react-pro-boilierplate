# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production 
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Project Architecture

This is a minimal React + Vite setup with the following key characteristics:

- **Build Tool**: Vite with React plugin using Babel for Fast Refresh
- **React Version**: 19.1.1 with React DOM
- **Module System**: ES modules (`"type": "module"`)
- **Entry Point**: `src/main.jsx` renders `App.jsx` into `#root` element
- **Styling**: CSS files imported directly into components
- **Assets**: SVG logos in `src/assets/` and `public/`

## Code Style & Linting

ESLint configuration includes:
- React Hooks plugin with recommended rules
- React Refresh plugin for Vite integration
- Custom rule: unused variables starting with uppercase or underscore are ignored
- Targets ES2020 with browser globals
- Ignores `dist/` directory

## File Structure

- `src/App.jsx` - Main application component
- `src/main.jsx` - React application entry point
- `src/index.css` - Global styles
- `src/App.css` - Component-specific styles
- `public/` - Static assets served directly
- `index.html` - HTML template with `#root` element