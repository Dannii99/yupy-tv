## PROM PARA CREAR

Task: Create the main admin layout from scratch for Yupi TV Admin.

Goal:
Build the base application shell for the admin portal using the current project standards.

Requirements:

- Create a responsive main layout with:
  - left sidebar navigation
  - top header
  - main content area
- The layout must align with the product identity defined in /.ai/project-context.md and /.ai/ui-visual-guidelines.md
- The visual style should follow the dark-first premium streaming dashboard direction
- Use NG-ZORRO where appropriate
- Use Tailwind for layout, spacing, and visual structure
- Use SCSS only for component-scoped styling when needed
- Keep the layout modular and reusable
- The layout should be suitable for future pages such as Dashboard, Streamers, Favorites, and Settings

Implementation notes:

- Prefer Angular standalone
- Use OnPush
- Keep business logic out of layout
- Sidebar and header should be layout-focused only
- Use clean semantic component structure
- Include sensible placeholder navigation items based on the project context

Deliverable:

- Create the layout files and structure needed
- Keep the implementation production-oriented, not a throwaway mock
- Do not create fake complex business logic
- Use realistic placeholder UI where necessary

Follow these project guides strictly:

- /.ai/rules.md
- /.ai/ownership.md
- /.ai/architecture.md
- /.ai/execution.md
- /.ai/project-context.md
- /.ai/ui-visual-guidelines.md
