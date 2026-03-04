# Angular Architecture

Project structure:

src/app
-core
--interceptors
--guards
--services
--models
--utils

-shared
--ui/components
--directives
--pipes
--validators

-features
--feature-name
---components
---pages
---services
---routes.ts

-layout
--main-layout
--auth-layout

Guidelines:

- Each feature owns its routes
- Prefer lazy loading
- UI components go to shared only if reused
