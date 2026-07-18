# CommandItem Tailwind Selector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure the standalone Command registry generates correct Tailwind CSS v4 selectors for icon color and size.

**Architecture:** Add a focused source-level regression test that runs the same Tailwind scanner used by `@tailwindcss/vite`, then compiles the discovered candidates with Tailwind CSS v4. Restore the working template-literal syntax in `CommandItem.vue` and regenerate only the affected checked-in registry output.

**Tech Stack:** Vue SFC, Tailwind CSS 4.2.2, `@tailwindcss/oxide`, Node assertions, TSX, pnpm

## Global Constraints

- Limit the source change to `apps/v4/registry/new-york-v4/ui/command/CommandItem.vue`.
- Preserve the existing class list and order; change only the JavaScript string delimiter and inner quote escaping.
- Keep registry files formatted with double quotes.
- Exclude `.codex/` and `AGENTS.md` from all commits.
- Open the pull request as ready for review, not as a draft.

---

### Task 1: Add the Tailwind extraction regression test

**Files:**
- Create: `apps/v4/scripts/lib/command-item-tailwind.test.ts`
- Read: `apps/v4/registry/new-york-v4/ui/command/CommandItem.vue`

**Interfaces:**
- Consumes: Tailwind's `Scanner.scanFiles()` through the copy resolved beside `@tailwindcss/vite`.
- Produces: A standalone TSX test that exits non-zero if CommandItem emits escaped selector candidates.

- [ ] **Step 1: Write the failing test**

```ts
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { compile } from 'tailwindcss'

const require = createRequire(import.meta.url)
const viteRequire = createRequire(require.resolve('@tailwindcss/vite'))
const { Scanner } = viteRequire('@tailwindcss/oxide')

const commandItemPath = fileURLToPath(
  new URL('../../registry/new-york-v4/ui/command/CommandItem.vue', import.meta.url),
)
const source = await readFile(commandItemPath, 'utf8')
const candidates: string[] = new Scanner({ sources: [] }).scanFiles([
  { content: source, extension: 'vue' },
])

const expectedCandidates = [
  "[&_svg:not([class*='text-'])]:text-muted-foreground",
  "[&_svg:not([class*='size-'])]:size-4",
]

for (const candidate of expectedCandidates)
  assert.ok(candidates.includes(candidate), `Tailwind did not extract ${candidate}`)

const compiler = await compile(`
  @theme {
    --color-muted-foreground: #656565;
    --spacing: 0.25rem;
  }
  @tailwind utilities;
`)
const css = compiler.build(expectedCandidates)

assert.match(css, /svg:not\(\[class\*='text-'\]\)/)
assert.match(css, /svg:not\(\[class\*='size-'\]\)/)

console.log('command-item-tailwind: all assertions passed')
```

- [ ] **Step 2: Run the test to verify RED**

Run: `pnpm --filter v4 exec tsx scripts/lib/command-item-tailwind.test.ts`

Expected: FAIL with `Tailwind did not extract [&_svg:not([class*='text-'])]:text-muted-foreground`, because the scanner returns a candidate containing escaped quote characters.

- [ ] **Step 3: Commit the failing test**

```bash
git add apps/v4/scripts/lib/command-item-tailwind.test.ts
git commit -m "test(registry): command の Tailwind セレクタ抽出を検証"
```

### Task 2: Restore extractable CommandItem selectors

**Files:**
- Modify: `apps/v4/registry/new-york-v4/ui/command/CommandItem.vue:69`
- Test: `apps/v4/scripts/lib/command-item-tailwind.test.ts`

**Interfaces:**
- Consumes: The expected candidates defined by Task 1.
- Produces: A CommandItem class binding whose arbitrary selectors contain literal inner quotes.

- [ ] **Step 1: Replace only the class-string delimiters**

Change the `cn()` call from:

```vue
:class="cn('data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg:not([class*=\'text-\'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4', props.class)"
```

to:

```vue
:class="cn(`data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`, props.class)"
```

- [ ] **Step 2: Run the focused test to verify GREEN**

Run: `pnpm --filter v4 exec tsx scripts/lib/command-item-tailwind.test.ts`

Expected: PASS with `command-item-tailwind: all assertions passed`.

- [ ] **Step 3: Run focused lint**

Run: `pnpm exec eslint apps/v4/scripts/lib/command-item-tailwind.test.ts apps/v4/registry/new-york-v4/ui/command/CommandItem.vue`

Expected: exit code 0 with no errors.

- [ ] **Step 4: Commit the source fix**

```bash
git add apps/v4/registry/new-york-v4/ui/command/CommandItem.vue
git commit -m "fix(command): icon セレクタを Tailwind で正しく抽出"
```

### Task 3: Regenerate registry distribution files

**Files:**
- Modify: generated files reported by `pnpm registry:build` whose diff contains the CommandItem delimiter change.

**Interfaces:**
- Consumes: The fixed `CommandItem.vue` source.
- Produces: Published registry JSON containing the same template-literal syntax.

- [ ] **Step 1: Build the registry**

Run: `pnpm registry:build`

Expected: exit code 0; registry generation and lint complete successfully.

- [ ] **Step 2: Audit generated changes**

Run: `git status --short` and `git diff --stat`.

Expected: Every newly modified tracked file is generated registry output containing the CommandItem syntax change. Revert no user files; exclude unrelated generated churn from staging.

- [ ] **Step 3: Commit affected generated output**

```bash
git add apps/v4/public/r/styles/new-york-v4/command.json
git commit -m "chore(registry): command の生成物を更新"
```

### Task 4: Verify and publish the pull request

**Files:**
- Create temporarily: `/tmp/shadcn-vue-1884-pr.md`
- Read: `.github/PULL_REQUEST_TEMPLATE.md`

**Interfaces:**
- Consumes: All commits from Tasks 1-3 and the committed design/plan documents.
- Produces: A pushed branch and ready-for-review pull request targeting `unovue/shadcn-vue:dev`.

- [ ] **Step 1: Run final verification**

```bash
pnpm --filter v4 exec tsx scripts/lib/command-item-tailwind.test.ts
pnpm exec eslint apps/v4/scripts/lib/command-item-tailwind.test.ts apps/v4/registry/new-york-v4/ui/command/CommandItem.vue
pnpm test
git diff dev...HEAD --check
```

Expected: All commands exit 0, with no test failures, lint errors, or whitespace errors.

- [ ] **Step 2: Review exact PR scope**

Run: `git status -sb`, `git log --oneline dev..HEAD`, and `git diff --stat dev...HEAD`.

Expected: only Issue #1884 design, plan, regression test, CommandItem source, and directly affected registry output are present; `.codex/` and `AGENTS.md` remain untracked.

- [ ] **Step 3: Push the branch to the fork**

Run: `git push -u fork 'fix/#1884-command-icon-color'`

Expected: the remote branch is created successfully on `galoi/shadcn-vue`.

- [ ] **Step 4: Create a ready pull request**

Create `/tmp/shadcn-vue-1884-pr.md` from `.github/PULL_REQUEST_TEMPLATE.md`, with:

- Linked issue: `Resolves #1884`
- Type: Bug fix checked
- Description: escaped quotes caused Tailwind v4 to extract invalid selectors; template literals restore deterministic Command icon color/size
- Validation: focused Tailwind extraction test, registry build, lint, and test suite
- Documentation checklist: explain that no user-facing documentation update is required

Run:

```bash
gh pr create --repo unovue/shadcn-vue --base dev --head 'galoi:fix/#1884-command-icon-color' --title 'fix(command): ensure Tailwind extracts icon selectors' --body-file /tmp/shadcn-vue-1884-pr.md
```

Expected: a non-draft pull request URL for Issue #1884.
