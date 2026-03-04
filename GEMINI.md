# GEMINI.md - YupiTv Project Context

## Project Overview

**YupiTv** is a modern frontend application built with the latest version of **Angular (v21)**. It follows a clean architecture focused on performance, maintainability, and developer experience (DX).

- **Core Framework:** Angular 21 (Standalone mode)
- **UI Component Library:** [NG-ZORRO](https://ng.ant.design/) (Ant Design for Angular)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first engine) for layout and spacing, and [NG-ZORRO](https://ng.ant.design/) for UI components.
- **State Management:**
  - **Signals:** Primary choice for local UI state, filters, toggles, and view models (`computed`).
  - **RxJS:** Reserved for complex streams (WebSockets, events, polling, switchMap operations) and converted to Signals for UI consumption using `toSignal`.
- **Architecture Patterns:**
  - **Standalone Components & Routes:** No NgModules; features are lazily loaded by route.
  - **OnPush Change Detection:** Enabled by default for all components.
  - **Modern Dependency Injection:** Prefer `inject()` over constructor injection.
  - **Reactive Forms:** Used exclusively for all form implementations.

## Building and Running

### Development Commands

- **Start Development Server:** `npm start` or `ng serve` (Runs at `http://localhost:4200`)
- **Build for Production:** `npm run build` or `ng build` (Output in `dist/`)
- **Watch Mode (Development Build):** `npm run watch`
- **Run Unit Tests:** `npm test` or `ng test` (Uses **Vitest**)
- **Run E2E Tests:** `ng e2e` (Framework choice pending implementation)

### Code Scaffolding

- **Generate Component:** `ng generate component path/to/component`
- **Generate Service:** `ng generate service path/to/service`
- **Note:** Schematics are configured to use SCSS and **skip test file generation** by default (`skipTests: true`).

## Development Conventions

### Coding Style & Standards

- **Strict Typing:** Always define interfaces/types for API responses and component inputs/outputs.
- **Standalone Components:** Every component must have `standalone: true`.
- **Signals for UI:** Use `signal()` for state and `computed()` for derived values. Avoid side effects in `computed`.
- **Cleanup:** Use `takeUntilDestroyed(inject(DestroyRef))` or `toSignal` for automatic subscription management.
- **Templates:** Keep templates lean. Move logic to a `viewModel` in the TypeScript file (ideally using `computed` signals).
- **Performance:** Always use `trackBy` in `*ngFor` (or the new `@for` block with `track`).

### UI & UX Rules

- **NG-ZORRO First:** Always check if a component exists in NG-ZORRO before building a custom one.
- **Consistency:** Maintain consistent loading, empty, and error states across all features.
- **Responsive Design:** Use Tailwind CSS utility classes for responsive layouts.

### Git & Collaboration

- **Formatting:** Prettier is used for code formatting. Do not manually override the formatter.
- **Project Structure:**
  - `.ai/`: Contains detailed architecture, conventions, and snippets.
  - `src/app/`: Application source code organized by feature or core/shared modules.
  - `public/`: Static assets.

## Key Files for Reference

- `package.json`: Dependencies and scripts.
- `angular.json`: Angular CLI configuration and schematics.
- `.ai/architecture.md`: In-depth architectural guidelines.
- `.ai/conventions.md`: Detailed coding conventions.
- `src/app/app.config.ts`: Application providers and configuration.
- `src/app/app.routes.ts`: Main routing configuration.
- `src/styles.scss`: Main stylesheet with Tailwind v4 and NG-ZORRO imports.

## Always read:

- .ai/rules.md
- .ai/architecture.md
- .ai/project-context.md
  before proposing changes.
