# Angular Architecture

## Project Structure

src/app

- core
  - interceptors
  - guards
  - services
  - models
  - utils

- shared
  - ui/components
  - directives
  - pipes
  - validators

- features
  - feature-name
    - components
    - pages
    - services
    - routes.ts

- layout
  - main-layout
  - auth-layout

## Architectural Principles

- Keep business logic inside its owning feature whenever possible
- Prefer local feature organization before promoting code to shared or core
- Reuse existing abstractions before creating new ones
- Avoid premature abstraction
- Prefer clear boundaries over clever architecture
- Favor minimal structural changes

## Dependency Rules

- features may depend on shared and core
- layout may depend on shared and core
- shared must not depend on features
- core must not depend on features
- core must not contain feature-specific UI or business logic
- shared must remain generic and reusable
- features should not directly depend on other features unless explicitly designed for it

## Core Layer

Purpose:

- application-wide concerns
- cross-cutting services
- interceptors
- guards
- global models and utilities

Rules:

- do not place feature-specific business logic here
- do not place reusable UI components here
- only add code to core if it is truly app-wide or cross-cutting
- edits in core must be minimal because they may affect the whole application

## Shared Layer

Purpose:

- reusable UI building blocks
- directives
- pipes
- validators
- generic utilities used by multiple features

Rules:

- move code to shared only when it is reused or clearly intended for reuse
- do not place feature-specific components or services in shared
- avoid creating shared abstractions too early
- prefer keeping code inside a feature until reuse is proven

## Features Layer

Purpose:

- business flows
- pages
- feature components
- feature services
- feature state
- feature routing

Rules:

- each feature owns its UI, services, state, and routes
- new business requirements should usually be implemented inside the corresponding feature
- keep feature-specific models and services inside the feature unless they are reused broadly
- do not leak feature logic into layout, shared, or core
- prefer local components/services before promoting them upward

## Layout Layer

Purpose:

- structural shells
- navigation
- page composition
- authenticated and unauthenticated layouts

Rules:

- layout is for structure and composition, not feature business logic
- do not move feature-specific logic into layout
- keep layout components thin and focused on rendering structure

## Routing Guidelines

- each feature owns its routes
- prefer lazy loading for features and large sections
- do not centralize feature routes outside the feature unless explicitly required
- preserve existing route organization and guards unless explicitly requested

## Component Placement Rules

- page-level components belong inside the owning feature
- feature-specific presentational components belong inside that feature
- reusable presentational components may go to shared/ui/components only if reused across features
- layout-only components belong in layout
- app-wide infrastructure components should be carefully evaluated before placing in core

## Service Placement Rules

- feature-specific services belong inside the feature
- global cross-cutting services belong in core
- do not move services to core only for convenience
- keep state close to where it is used

## State Placement Rules

- local UI state should stay close to the component or feature
- shared global state should only be introduced when truly needed
- do not centralize feature-local state without explicit reason

## Change Management Rules

- preserve the current folder boundaries
- do not move files across layers unless explicitly requested
- do not restructure the architecture as part of a small feature/task
- prefer the smallest safe architectural change possible

## Priority Rules

When there is a conflict:

1. Existing working code patterns win over generic suggestions
2. Project rules win over skill defaults
3. Architectural boundaries win over convenience
4. Small safe changes win over broad refactors
