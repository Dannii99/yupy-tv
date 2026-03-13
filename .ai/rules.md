# Project Rules

Stack:

- Angular standalone
- Signals for UI state
- RxJS for streams
- NG-ZORRO for UI components
- Tailwind CSS for layout
- SCSS for component styling

Coding Rules:

- Prefer standalone components
- Use OnPush change detection
- Use trackBy in lists
- Avoid heavy logic in templates
- Prefer signals over RxJS for local state

Structure:
src/app
-core/
-shared/
-features/
-layout/

Editing Rules:

- Modify only the minimum code necessary to satisfy the request
- Do not refactor unrelated code
- Do not rewrite entire files when a small change is enough
- Preserve existing working logic unless the task explicitly requires changing it
- Respect manual fixes already present in the code
- Do not remove comments, TODOs, or temporary guards unless explicitly requested
- Do not rename files, folders, classes, selectors, or public methods unless explicitly requested
