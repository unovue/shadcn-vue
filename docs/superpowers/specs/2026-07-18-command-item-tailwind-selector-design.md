# Fix CommandItem Tailwind selector extraction

**Date:** 2026-07-18
**Issue:** [#1884](https://github.com/unovue/shadcn-vue/issues/1884)

## Problem

`apps/v4/registry/new-york-v4/ui/command/CommandItem.vue` stores arbitrary
Tailwind selectors in a single-quoted JavaScript string and escapes the quotes in
`class*='text-'` and `class*='size-'`. Tailwind CSS v4 includes those escaped
quote characters in the extracted selector. As a result, Command icons do not
receive the intended muted color or default size unless another installed
component contributes a correctly extractable version of the same utility.

The regression was introduced in commit `a4b07d9b`, which replaced the previous
template literal with a single-quoted string. `DropdownMenuItem.vue` already uses
the working template-literal form.

## Decision

Limit the change to `CommandItem.vue`, because Issue #1884 concerns Command and a
repository-wide conversion would add unrelated scope. Restore a template literal
so the inner attribute-selector quotes remain unescaped:

```vue
cn(`... [&_svg:not([class*='text-'])]:text-muted-foreground ...`, props.class)
```

Keep the existing class list and ordering unchanged apart from the string
delimiter. Rebuild the registry so checked-in distribution JSON matches the
source.

## Testing

Add a focused regression test that reads the CommandItem registry source and
uses Tailwind CSS v4 to compile the extracted arbitrary utilities in isolation.
The test must first fail against the current escaped form, then pass after the
delimiter change. It verifies both behaviors required by the component:

- SVGs without a `text-` class receive `text-muted-foreground`.
- SVGs without a `size-` class receive the default size utility.

Run the focused test, registry build, relevant lint checks, and the existing test
suite before publishing.

## Generated output

Run `pnpm registry:build` after changing the source. Commit only generated files
whose contents changed because of `CommandItem.vue`; do not include unrelated
formatting or user-owned untracked files.

## Pull request

Use branch `fix/#1884-command-icon-color`, a Conventional Commit message, and the
repository PR template. Link and resolve Issue #1884. Open the PR as ready for
review, not as a draft.
