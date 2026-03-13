# Execution Rules

Before coding:

- Read the target file and its closest related files
- Identify the smallest safe edit
- Prefer patching existing code instead of rewriting

While coding:

- Keep imports minimal
- Preserve existing APIs and behaviors
- Avoid unrelated cleanup/refactors

Before finishing:

- Check for broken imports
- Check for removed manual fixes
- Check for accidental UI regressions
- Ensure the solution matches existing project patterns
