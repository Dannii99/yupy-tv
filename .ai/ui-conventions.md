# UI Conventions

These are small but important UI consistency rules.
They must be followed when creating or editing components.
They are not optional design suggestions.

## Input Icons

When placing a leading icon inside an input using `lucide-icon`:

- use `left-2`
- do not use `left-4`
- vertically center the icon with `top-1/2 -translate-y-1/2`
- use matching input left padding such as `pl-8`

Reason:
`left-4` creates excessive horizontal spacing and breaks the visual balance of the input.

Preferred pattern:

```html
<div class="relative">
  <lucide-icon class="absolute left-2 top-1/2 -translate-y-1/2"></lucide-icon>

  <input class="pl-8" />
</div>
```
