# Ownership Rules

## Folder Responsibilities

### src/app/core

Owns application-wide singletons and cross-cutting concerns.

Includes:

- services used globally
- interceptors
- guards
- app-wide configuration
- domain-wide models that are not feature-specific

Rules:

- Do not place feature-specific UI here
- Do not put reusable visual components here
- Avoid editing core services unless the task explicitly requires it
- Changes in core must be minimal and safe because they may impact the entire app

### src/app/shared

Owns reusable building blocks shared across multiple features.

Includes:

- shared UI components
- directives
- pipes
- utility functions
- reusable models/interfaces used in multiple features

Rules:

- Only add code here if it is truly reusable across features
- Do not move feature-specific code into shared prematurely
- Reuse existing shared assets before creating new ones

### src/app/features

Owns business functionality and feature-specific flows.

Includes:

- pages
- feature components
- feature services
- feature models
- feature state
- feature routes

Rules:

- New business requirements should usually be implemented here
- Keep logic inside its corresponding feature boundary
- Do not leak feature-specific logic into core or shared
- Prefer local feature organization before promoting code to shared

### src/app/layout

Owns shell and structural UI.

Includes:

- app layout containers
- headers
- sidebars
- navigation wrappers
- page shells

Rules:

- Do not place business logic here unless it is layout-related
- Keep layout components focused on composition and structure
- Avoid feature-specific logic in layout files

## Editing Boundaries

- Prefer editing the closest feature-local file first
- Do not modify core when the change can be implemented in features or shared
- Do not promote code to shared unless it is used or clearly reusable in at least two places
- Do not modify layout files for feature logic unless strictly necessary

## High-Risk Files

Treat these as sensitive:

- routing configuration
- auth/session logic
- interceptors
- guards
- global styles
- app bootstrap/config files

Rules:

- Do not refactor high-risk files unless explicitly requested
- When editing a high-risk file, make the smallest possible change
- Preserve backward compatibility
