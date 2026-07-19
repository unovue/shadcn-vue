# Registry Tailwind Selector Extraction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure every new-york-v4 registry component emits deterministic Tailwind CSS v4 selectors for its declared icon color and size utilities.

**Architecture:** Generalize the existing Command-only regression test to scan every Vue source in the new-york-v4 UI registry with Tailwind's real scanner. Convert only broken single-quoted `cn()` strings to template literals, then rebuild the checked-in registry distribution files and update PR #1885.

**Tech Stack:** Vue SFC, Tailwind CSS 4.2.2, `@tailwindcss/oxide`, Node assertions, TSX, pnpm

## Global Constraints

- Preserve every existing class token and its order; change only the enclosing JavaScript string delimiter and escaped inner quotes.
- Apply the change only to `class*=\'text-\'` and `class*=\'size-\'` arbitrary selectors under `apps/v4/registry/new-york-v4/ui/**/*.vue`.
- Keep registry source formatted with double quotes outside the Vue class binding.
- Do not change the base `reka` registry or unrelated component behavior.
- Exclude `.codex/` and `AGENTS.md` from all commits.
- Keep PR #1885 ready for review rather than draft.

---

### Task 1: Generalize the regression test

**Files:**
- Modify: `apps/v4/scripts/lib/command-item-tailwind.test.ts`

**Interfaces:**
- Consumes: all `.vue` files returned by recursive traversal of `apps/v4/registry/new-york-v4/ui`.
- Produces: a test that rejects any scanner candidate containing `class*=\\'text-\\'` or `class*=\\'size-\\'`, then compiles representative correct candidates.

- [ ] **Step 1: Replace the Command-only scanner with a registry-wide scanner**

Use `readdir(uiRegistryPath, { recursive: true })`, filter `.vue` paths, scan each source separately, and collect entries whose candidates match `/class\*=\\\\'(?:text|size)-\\\\'/`.

```ts
const invalidCandidates: string[] = []

for (const relativePath of vueFiles) {
  const source = await readFile(join(uiRegistryPath, relativePath), 'utf8')
  const candidates: string[] = new Scanner({ sources: [] }).scanFiles([
    { content: source, extension: 'vue' },
  ])

  for (const candidate of candidates) {
    if (/class\*=\\\\'(?:text|size)-\\\\'/.test(candidate))
      invalidCandidates.push(`${relativePath}: ${candidate}`)
  }
}

assert.deepEqual(invalidCandidates, [], `Tailwind extracted escaped selectors:\n${invalidCandidates.join('\n')}`)
```

- [ ] **Step 2: Run the test and verify RED**

Run: `pnpm --filter v4 exec tsx scripts/lib/command-item-tailwind.test.ts`

Expected: FAIL listing the 18 remaining Vue files with escaped candidates.

- [ ] **Step 3: Commit the failing test**

```bash
git add apps/v4/scripts/lib/command-item-tailwind.test.ts docs/superpowers/plans/2026-07-18-command-item-tailwind-selector.md
git commit -m "test(registry): Tailwind セレクタ検証を全体へ拡張"
```

### Task 2: Convert all remaining broken selectors

**Files:**
- Modify: the 18 Vue files enumerated in the design document under `apps/v4/registry/new-york-v4/ui`.
- Test: `apps/v4/scripts/lib/command-item-tailwind.test.ts`

**Interfaces:**
- Consumes: the failing registry-wide scanner from Task 1.
- Produces: source strings whose runtime classes are unchanged but whose static source is extractable by Tailwind.

- [ ] **Step 1: Convert affected `cn()` strings**

For each affected binding, make only this transformation:

```vue
:class="cn('... [&_svg:not([class*=\'text-\'])]:text-muted-foreground ...', props.class)"
```

```vue
:class="cn(`... [&_svg:not([class*='text-'])]:text-muted-foreground ...`, props.class)"
```

Apply the equivalent transformation for `size-` selectors in the same string.

- [ ] **Step 2: Verify no broken source form remains**

Run:

```bash
rg -n -F "class*=\\'text-\\'" apps/v4/registry/new-york-v4/ui --glob '*.vue'
rg -n -F "class*=\\'size-\\'" apps/v4/registry/new-york-v4/ui --glob '*.vue'
```

Expected: both commands produce no matches.

- [ ] **Step 3: Run the test and verify GREEN**

Run: `pnpm --filter v4 exec tsx scripts/lib/command-item-tailwind.test.ts`

Expected: exit code 0 and no assertion failures.

- [ ] **Step 4: Run focused lint**

Run: `pnpm exec eslint apps/v4/scripts/lib/command-item-tailwind.test.ts apps/v4/registry/new-york-v4/ui`

Expected: exit code 0 with no errors.

- [ ] **Step 5: Commit the source conversion**

```bash
git add apps/v4/registry/new-york-v4/ui
git commit -m "fix(registry): icon セレクタを一貫して抽出"
```

### Task 3: Regenerate distribution files

**Files:**
- Modify: generated JSON files reported by `pnpm registry:build` for button-group, combobox, context-menu, dropdown-menu, input-group, kbd, marker, menubar, navigation-menu, select, and tabs.

**Interfaces:**
- Consumes: the corrected Vue registry sources from Task 2.
- Produces: published registry JSON containing the same extractable template literals.

- [ ] **Step 1: Build the registry**

Run: `pnpm registry:build`

Expected: exit code 0; registry generation and its lint phase complete successfully.

- [ ] **Step 2: Audit generated changes**

Run: `git status --short`, `git diff --stat`, and inspect each generated diff.

Expected: newly changed tracked files are only distribution outputs corresponding to the source conversions. `.codex/` and `AGENTS.md` remain untracked.

- [ ] **Step 3: Commit generated output**

```bash
git add apps/v4/public/r/styles/new-york-v4
git commit -m "chore(registry): icon セレクタの生成物を更新"
```

### Task 4: Verify and update PR #1885

**Files:**
- Create temporarily: `/tmp/shadcn-vue-1884-pr.md`
- Read: `.github/PULL_REQUEST_TEMPLATE.md`

**Interfaces:**
- Consumes: all source, test, documentation, and generated-output commits.
- Produces: an updated ready-for-review PR covering the complete Issue #1884 scope.

- [ ] **Step 1: Run final verification**

```bash
pnpm --filter v4 exec tsx scripts/lib/command-item-tailwind.test.ts
pnpm exec eslint apps/v4/scripts/lib/command-item-tailwind.test.ts apps/v4/registry/new-york-v4/ui
pnpm test
git diff dev...HEAD --check
```

Expected: all commands exit 0, with no test failures, lint errors, or whitespace errors.

- [ ] **Step 2: Audit PR scope**

Run: `git status -sb`, `git log --oneline dev..HEAD`, and `git diff --stat dev...HEAD`.

Expected: only Issue #1884 documentation, regression test, affected registry sources, test wiring, and corresponding generated output are included.

- [ ] **Step 3: Push the branch**

Run: `git push fork 'fix/#1884-command-icon-color'`

Expected: the fork branch updates successfully.

- [ ] **Step 4: Update PR metadata**

Populate `/tmp/shadcn-vue-1884-pr.md` from `.github/PULL_REQUEST_TEMPLATE.md`. Describe the registry-wide escaped-selector fix, deterministic `text-muted-foreground` and default sizing, affected component groups, real Tailwind scanner/compiler regression coverage, and validation results.

Run:

```bash
gh pr edit 1885 --repo unovue/shadcn-vue \
  --title "fix(registry): ensure Tailwind extracts icon selectors" \
  --body-file /tmp/shadcn-vue-1884-pr.md
```

Expected: PR #1885 remains open and non-draft with registry-wide wording.
