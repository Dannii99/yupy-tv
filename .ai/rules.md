# Project Rules

## Stack

- Angular standalone
- Signals for UI state
- RxJS for streams and async flows
- NG-ZORRO for UI components
- Tailwind CSS for layout and utility styling
- SCSS for component styling

## Core Principles

- Prefer minimal and safe changes over broad rewrites
- Preserve working code unless the task explicitly requires changing it
- Follow existing project patterns before introducing new ones
- Reuse existing components, services, utilities, and styles whenever possible

## Editing Rules

- Modify only the minimum code necessary to satisfy the request
- Do not refactor unrelated code
- Do not rewrite entire files when a small change is enough
- Respect manual fixes already present in the code
- Do not remove comments, TODOs, guards, or fallback logic unless explicitly requested
- Do not rename files, folders, classes, selectors, or public methods unless explicitly requested
- Do not change existing APIs unless explicitly requested

## Angular Rules

- Prefer standalone components, directives, and pipes
- Use ChangeDetectionStrategy.OnPush by default
- Use trackBy in lists
- Avoid heavy logic in templates
- Prefer signals over RxJS for local UI state
- Use RxJS for async flows, external streams, and integration points
- Do not add unused imports
- Do not remove required standalone imports
- Preserve existing component inputs, outputs, and public methods
- Do not change forms architecture (FormGroup, FormArray, signals) unless explicitly requested
- Do not change dependency injection patterns unless necessary

## UI Rules

- Use NG-ZORRO as the default component library
- Do not replace NG-ZORRO components with custom implementations unless explicitly requested
- Use Tailwind for layout, spacing, and utility classes
- Use SCSS for component-scoped styles when utilities are not enough
- Preserve existing Tailwind classes unless the task requires changing them
- Preserve visual consistency with nearby screens and existing patterns
- Reuse existing design patterns before creating new ones

## Architecture Rules

- Respect the current folder structure:
  - src/app/core
  - src/app/shared
  - src/app/features
  - src/app/layout
- Keep feature boundaries intact
- Do not move code across architectural layers unless explicitly requested
- Prefer shared abstractions only when they are actually reused

## Safety Rules

- Inspect surrounding code before editing
- Prefer extending existing code over replacing it
- Avoid speculative refactors
- Avoid breaking public interfaces
- If a change may affect existing behavior, choose the smallest safe implementation

## Icon Usage Rules

- When using an icon, ensure it is registered in the icon provider.
- Prefer importing only the icons that are used rather than entire icon packs.
