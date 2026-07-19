# Fix registry Tailwind selector extraction

**Date:** 2026-07-18
**Updated:** 2026-07-19
**Issue:** [#1884](https://github.com/unovue/shadcn-vue/issues/1884)

## Problem

Several `apps/v4/registry/new-york-v4/ui` components store arbitrary Tailwind
selectors in single-quoted JavaScript strings and escape the quotes in
`class*='text-'` and `class*='size-'`. Tailwind CSS v4 includes those escaped
quote characters in the extracted selector. As a result, icon color and size can
depend on whether another installed component contributes a correctly
extractable version of the same utility.

The CommandItem regression was introduced in commit `a4b07d9b`, which replaced
its previous template literal with a single-quoted string.
`DropdownMenuItem.vue` already uses the working template-literal form.

The original PR fixed CommandItem. The updated Issue also confirms the bug in
ComboboxItem, SelectTrigger, and SelectItem, and requires consistent handling of
the same `text-` and `size-` selectors across the registry. A source audit found
the broken form in 18 remaining files across button-group, combobox,
context-menu, dropdown-menu, input-group, kbd, marker, menubar,
navigation-menu, select, and tabs.

## Decision

Convert every remaining `class*=\'text-\'` and `class*=\'size-\'` arbitrary
selector in `apps/v4/registry/new-york-v4/ui/**/*.vue` to the working
template-literal form, so the inner attribute-selector quotes remain unescaped:

```vue
cn(`... [&_svg:not([class*='text-'])]:text-muted-foreground ...`, props.class)
```

Keep every existing class list and ordering unchanged apart from the JavaScript
string delimiter and inner quote escaping. Do not normalize unrelated strings or
change the base `reka` registry. Rebuild the registry so checked-in distribution
JSON matches the source.

## Testing

Generalize the focused regression test to read every Vue file under the
new-york-v4 UI registry and scan each file with Tailwind's real scanner. The test
must first fail while any candidate contains a backslash-escaped quote, reporting
the offending file and candidate, then pass after all source conversions.

The test also compiles representative correct candidates with Tailwind CSS v4
and verifies both required behaviors:

- SVGs without a `text-` class receive `text-muted-foreground`.
- SVGs without a `size-` class receive the default size utility.

Keep this test connected to the root `pnpm test` command used by CI. Run the
focused test, registry build, relevant lint checks, and the existing test suite
before publishing.

## Generated output

Run `pnpm registry:build` after changing the source. Commit only generated
new-york-v4 component JSON files whose embedded source changed because of this
conversion. Expected component groups are button-group, combobox, context-menu,
dropdown-menu, input-group, kbd, marker, menubar, navigation-menu, select, and
tabs. Do not include unrelated formatting or user-owned untracked files.

## Pull request

Continue using branch `fix/#1884-command-icon-color` and PR #1885. Update the PR
title and description from Command-only wording to registry-wide icon selector
handling. Keep the PR ready for review and continue linking Issue #1884.
