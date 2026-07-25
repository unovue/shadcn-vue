# Icon Map Generation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate the CLI icon map (`apps/v4/public/r/icons/index.json`) and the `registry/icons/__*__.ts` files from the `IconPlaceholder` base components, so the map can never drift from what components actually use — closing the #1893 class of bug.

**Architecture:** Port upstream shadcn-ui's `scripts/build-icons.ts` (which shadcn-vue never ported), adapting the scanner from React `.tsx` to Vue `.vue` SFCs. A generator scans `registry/bases/reka/**` for `IconPlaceholder` elements, derives a `canonical -> { library: name }` mapping, merges a hand-maintained `legacy-mapping.json` layer (radix + back-compat, legacy values win), validates every generated name against its installed package, and asserts the raw-lucide `new-york-v4` registry is fully covered. Outputs are committed artifacts regenerated on every registry build.

**Tech Stack:** TypeScript, `tsx` (script runner), **vitest** (tests — the repo lint standard rewrites `node:test` imports to vitest; run `npx vitest run scripts/build-icons.test.ts` from `apps/v4`), `node:fs`, regex-based SFC scanning (mirrors upstream), the five icon packages (`@lucide/vue`, `@tabler/icons-vue`, `@hugeicons/core-free-icons`, `@phosphor-icons/vue`, `@remixicon/vue`).

> **Implementation amendments (applied during execution — these override the task text below where they conflict):**
> 1. **Tests run via vitest**, not `tsx --test` (repo lint auto-converts `node:test` → vitest). Every task's test command is `npx vitest run scripts/build-icons.test.ts` from `apps/v4`.
> 2. **The generator writes ONLY `index.json`.** Task 3's `renderIconFile` and the `__*__.ts` generation in Task 8 were removed: regenerating the loader files dropped 43 lucide icons the showcase renders via dynamic `:lucide` data bindings (loaded by `create-icon-loader.ts`). The `__*__.ts` files stay showcase-maintained. Task 11's staleness gate therefore checks **only** `public/r/icons/index.json`.
> 3. **Integration fixes folded into Task 8:** the scanner skips Vue dynamic bindings (`:lucide=`/`v-bind:lucide=`) via a negative lookbehind, and five pre-existing invalid icon names in base `blocks/`/`examples/` files were corrected to real package exports (surfaced by the validation gate).

## Global Constraints

- All scripts run from the `apps/v4` directory via `tsx` (e.g. `cd apps/v4 && tsx scripts/build-icons.ts`). Package resolution for the five icon packages works only from `apps/v4`.
- The five **generatable** libraries, in canonical order: `lucide`, `radix`, `tabler`, `hugeicons`, `phosphor`, `remixicon`. **`radix` is NOT generatable** — it has no `IconPlaceholder` prop and is not an installed package; it comes only from `legacy-mapping.json` and its names are never validated.
- **Phosphor placeholders carry aliased names** (`phosphor="CheckCircleIcon"`). The raw export needed by the map is `"Ph" + alias.replace(/Icon$/, "")` (e.g. `CheckCircleIcon -> PhCheckCircle`, `WarningIcon -> PhWarning`, `XIcon -> PhX`). Every other library's placeholder value is already the raw export name.
- **Canonical key convention is mixed by design and safe:** legacy keys are unsuffixed (`Check`), scanned keys keep the base's lucide value which is suffixed (`CircleCheckIcon`). The CLI transform resolves both via `registryIcons[name] ?? registryIcons[name.replace(/Icon$/, "")]` — do not "normalize" keys; port upstream's `canonical` / `canonical + "Icon"` bridge instead.
- **Merge rule (verbatim from upstream):** legacy entries come first in file order; for each, the scan only fills a library the legacy entry *lacks* (`if (!entry[library] && scanned[...][library])`). Legacy values always win. Remaining scanned-only canonicals are appended sorted.
- Per-library export source package (for `__*__.ts`): `lucide → @lucide/vue`, `tabler → @tabler/icons-vue`, `hugeicons → @hugeicons/core-free-icons`, `phosphor → @phosphor-icons/vue`, `remixicon → @remixicon/vue`.
- JSON output: `JSON.stringify(obj, null, 2)`. Match the repo's existing formatting; the registry build already runs `eslint --fix public/r/index.json`, so run `eslint --fix` on the generated `index.json` as the final step of a real build.
- Commit message convention: conventional commits; footer `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>` preceded by a blank line.
- Branch: `refactor/icon-placeholder-single-source` (already checked out).

## File Structure

- **Create** `apps/v4/scripts/build-icons.ts` — the generator. Exports `buildIcons(opts?)` and has a direct-run entry (`--verbose`, `--watch` optional). Internally: `scanIconUsage()`, `generateIconMapping()`, `generateIconFiles()`, `validateNames()`, `assertCoverage()`.
- **Create** `apps/v4/scripts/build-icons.helpers.ts` — pure, unit-testable helpers with no filesystem side effects: `deriveRawPhosphor()`, `buildMappingFromRecords()`, `mergeLegacy()`, `renderIconFile()`, `findUncovered()`. Keeps side-effecting orchestration (`build-icons.ts`) separate from pure logic (this file) so tests never touch disk.
- **Create** `apps/v4/scripts/build-icons.test.ts` — `node:test` unit tests for the helpers.
- **Create** `apps/v4/registry/icons/legacy-mapping.json` — seeded from the current committed `index.json` (radix + back-compat; legacy values win).
- **Modify** `apps/v4/scripts/build-registry.ts` — call `buildIcons()` at the start of `main()`.
- **Modify** `apps/v4/package.json` — add `registry:build:icons` script; run it inside `registry:build`.
- **Regenerated artifacts** (outputs, committed): `apps/v4/public/r/icons/index.json`, `apps/v4/registry/icons/__{lucide,tabler,hugeicons,phosphor,remixicon}__.ts`.

---

### Task 1: Pure helpers — phosphor derivation & record→mapping

**Files:**
- Create: `apps/v4/scripts/build-icons.helpers.ts`
- Test: `apps/v4/scripts/build-icons.test.ts`

**Interfaces:**
- Produces:
  - `type Library = 'lucide' | 'tabler' | 'hugeicons' | 'phosphor' | 'remixicon'`
  - `type PlaceholderRecord = Partial<Record<Library, string>>` — raw attribute values as written in the SFC (phosphor is the alias).
  - `type IconMapping = Record<string, Record<string, string>>` — canonical → `{ library: name }`.
  - `deriveRawPhosphor(alias: string): string`
  - `buildMappingFromRecords(records: PlaceholderRecord[]): { mapping: IconMapping; usage: Record<Library, Set<string>>; warnings: string[] }` — canonical key = the record's `lucide` value verbatim; phosphor value = `deriveRawPhosphor(record.phosphor)`; `usage.phosphor` collects the **alias**, all other `usage.<lib>` collect the raw value; conflicts (same canonical+library, different value) keep first and push a warning; a record without `lucide` is skipped with a warning.

- [ ] **Step 1: Write the failing test**

```ts
// apps/v4/scripts/build-icons.test.ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { deriveRawPhosphor, buildMappingFromRecords } from './build-icons.helpers'

test('deriveRawPhosphor strips Icon suffix and prefixes Ph', () => {
  assert.equal(deriveRawPhosphor('CheckCircleIcon'), 'PhCheckCircle')
  assert.equal(deriveRawPhosphor('WarningIcon'), 'PhWarning')
  assert.equal(deriveRawPhosphor('XIcon'), 'PhX')
  assert.equal(deriveRawPhosphor('CaretDoubleLeftIcon'), 'PhCaretDoubleLeft')
})

test('buildMappingFromRecords keys on lucide value and derives raw phosphor', () => {
  const { mapping, usage } = buildMappingFromRecords([
    { lucide: 'CircleCheckIcon', tabler: 'IconCircleCheck', hugeicons: 'CheckmarkCircle01Icon', phosphor: 'CheckCircleIcon', remixicon: 'RiCheckboxCircleLine' },
  ])
  assert.deepEqual(mapping.CircleCheckIcon, {
    lucide: 'CircleCheckIcon',
    tabler: 'IconCircleCheck',
    hugeicons: 'CheckmarkCircle01Icon',
    phosphor: 'PhCheckCircle',
    remixicon: 'RiCheckboxCircleLine',
  })
  assert.ok(usage.phosphor.has('CheckCircleIcon')) // usage keeps the alias for __phosphor__.ts
  assert.ok(usage.tabler.has('IconCircleCheck'))
})

test('buildMappingFromRecords warns and skips a record without lucide', () => {
  const { mapping, warnings } = buildMappingFromRecords([{ tabler: 'IconX' }])
  assert.equal(Object.keys(mapping).length, 0)
  assert.equal(warnings.length, 1)
})

test('buildMappingFromRecords keeps first on conflict and warns', () => {
  const { mapping, warnings } = buildMappingFromRecords([
    { lucide: 'XIcon', tabler: 'IconX' },
    { lucide: 'XIcon', tabler: 'IconXbox' },
  ])
  assert.equal(mapping.XIcon.tabler, 'IconX')
  assert.ok(warnings.some(w => w.includes('XIcon')))
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/v4 && tsx build-icons.test.ts` — wait, run from repo root: `cd apps/v4 && tsx --test scripts/build-icons.test.ts`
Expected: FAIL — `Cannot find module './build-icons.helpers'`.

- [ ] **Step 3: Write minimal implementation**

```ts
// apps/v4/scripts/build-icons.helpers.ts
export type Library = 'lucide' | 'tabler' | 'hugeicons' | 'phosphor' | 'remixicon'
export const GENERATABLE_LIBRARIES: Library[] = ['lucide', 'tabler', 'hugeicons', 'phosphor', 'remixicon']
export type PlaceholderRecord = Partial<Record<Library, string>>
export type IconMapping = Record<string, Record<string, string>>

export function deriveRawPhosphor(alias: string): string {
  return `Ph${alias.replace(/Icon$/, '')}`
}

export function buildMappingFromRecords(records: PlaceholderRecord[]): {
  mapping: IconMapping
  usage: Record<Library, Set<string>>
  warnings: string[]
} {
  const mapping: IconMapping = {}
  const usage = Object.fromEntries(GENERATABLE_LIBRARIES.map(l => [l, new Set<string>()])) as Record<Library, Set<string>>
  const warnings: string[] = []

  for (const record of records) {
    const canonical = record.lucide
    if (!canonical) {
      warnings.push('IconPlaceholder without a lucide prop')
      continue
    }
    const entry = (mapping[canonical] ??= {})
    for (const library of GENERATABLE_LIBRARIES) {
      const raw = record[library]
      if (!raw) continue
      usage[library].add(raw)
      const value = library === 'phosphor' ? deriveRawPhosphor(raw) : raw
      if (entry[library] && entry[library] !== value) {
        warnings.push(`Conflicting ${library} mapping for ${canonical}: keeping ${entry[library]}, ignoring ${value}`)
        continue
      }
      entry[library] = value
    }
  }

  return { mapping, usage, warnings }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/v4 && tsx --test scripts/build-icons.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add apps/v4/scripts/build-icons.helpers.ts apps/v4/scripts/build-icons.test.ts
git commit -m "feat(scripts): icon-map pure helpers — phosphor derivation and record mapping"
```

---

### Task 2: Pure helper — legacy merge

**Files:**
- Modify: `apps/v4/scripts/build-icons.helpers.ts`
- Test: `apps/v4/scripts/build-icons.test.ts`

**Interfaces:**
- Consumes: `IconMapping` (Task 1).
- Produces: `mergeLegacy(legacy: IconMapping, scanned: IconMapping): IconMapping` — ports upstream exactly: iterate `legacy` in insertion order, seed each output entry from the legacy entry (values win), find the scanned counterpart by exact key or `key + "Icon"`, fill only libraries the legacy entry lacks, then delete that scanned key; finally append remaining scanned canonicals sorted. Library fill order = `['lucide','radix','tabler','hugeicons','phosphor','remixicon']`.

- [ ] **Step 1: Write the failing test**

```ts
// append to apps/v4/scripts/build-icons.test.ts
import { mergeLegacy } from './build-icons.helpers'

test('mergeLegacy: legacy values win, scan fills only missing libraries', () => {
  const legacy = { Loader2: { lucide: 'Loader2', radix: 'ReloadIcon', tabler: 'IconLoader2', phosphor: 'PhCircleNotch', remixicon: 'RiLoader4Line' } }
  const scanned = { Loader2Icon: { lucide: 'Loader2Icon', tabler: 'IconLoader2', hugeicons: 'Loading03Icon', phosphor: 'PhSpinnerGap', remixicon: 'RiLoader4Line' } }
  const out = mergeLegacy(legacy, scanned)
  assert.equal(out.Loader2.phosphor, 'PhCircleNotch')   // legacy wins, NOT PhSpinnerGap
  assert.equal(out.Loader2.hugeicons, 'Loading03Icon')  // gap filled from scan
  assert.equal(out.Loader2.radix, 'ReloadIcon')         // radix preserved
  assert.ok(!('Loader2Icon' in out))                    // scanned key consumed via +Icon bridge
})

test('mergeLegacy: scanned-only canonicals are appended', () => {
  const out = mergeLegacy({}, { CircleCheckIcon: { lucide: 'CircleCheckIcon', phosphor: 'PhCheckCircle' } })
  assert.deepEqual(out.CircleCheckIcon, { lucide: 'CircleCheckIcon', phosphor: 'PhCheckCircle' })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/v4 && tsx --test scripts/build-icons.test.ts`
Expected: FAIL — `mergeLegacy is not a function`.

- [ ] **Step 3: Write minimal implementation**

```ts
// append to apps/v4/scripts/build-icons.helpers.ts
const LIBRARY_ORDER = ['lucide', 'radix', 'tabler', 'hugeicons', 'phosphor', 'remixicon'] as const

export function mergeLegacy(legacy: IconMapping, scanned: IconMapping): IconMapping {
  const output: IconMapping = {}
  const remaining: IconMapping = { ...scanned }

  for (const [canonical, legacyEntry] of Object.entries(legacy)) {
    const entry: Record<string, string> = { ...legacyEntry }
    const scannedKey =
      canonical in remaining ? canonical : `${canonical}Icon` in remaining ? `${canonical}Icon` : undefined
    if (scannedKey) {
      for (const library of LIBRARY_ORDER) {
        if (!entry[library] && remaining[scannedKey][library]) {
          entry[library] = remaining[scannedKey][library]
        }
      }
      delete remaining[scannedKey]
    }
    output[canonical] = entry
  }

  for (const canonical of Object.keys(remaining).sort()) {
    const entry: Record<string, string> = {}
    for (const library of LIBRARY_ORDER) {
      if (remaining[canonical][library]) entry[library] = remaining[canonical][library]
    }
    output[canonical] = entry
  }

  return output
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/v4 && tsx --test scripts/build-icons.test.ts`
Expected: PASS (all tests).

- [ ] **Step 5: Commit**

```bash
git add apps/v4/scripts/build-icons.helpers.ts apps/v4/scripts/build-icons.test.ts
git commit -m "feat(scripts): icon-map legacy merge (legacy values win, scan fills gaps)"
```

---

### Task 3: Pure helper — render `__*__.ts` file content

**Files:**
- Modify: `apps/v4/scripts/build-icons.helpers.ts`
- Test: `apps/v4/scripts/build-icons.test.ts`

**Interfaces:**
- Consumes: `Library`, `usage` sets (Task 1).
- Produces: `renderIconFile(library: Library, names: string[]): string` — returns the full file content (with the `// Auto-generated by scripts/build-icons.ts` header, sorted exports, trailing newline). For `phosphor`, each `name` is the alias and the line is `export { <deriveRawPhosphor(alias)> as <alias> } from "@phosphor-icons/vue"`. For every other library the line is `export { <name> } from "<LIBRARY_EXPORT[library]>"`.
  - `LIBRARY_EXPORT: Record<Library, string>` = `{ lucide: '@lucide/vue', tabler: '@tabler/icons-vue', hugeicons: '@hugeicons/core-free-icons', phosphor: '@phosphor-icons/vue', remixicon: '@remixicon/vue' }`.

- [ ] **Step 1: Write the failing test**

```ts
// append to apps/v4/scripts/build-icons.test.ts
import { renderIconFile } from './build-icons.helpers'

test('renderIconFile: plain libraries export the raw name', () => {
  const out = renderIconFile('tabler', ['IconB', 'IconA'])
  assert.equal(out, `// Auto-generated by scripts/build-icons.ts
export { IconA } from "@tabler/icons-vue"
export { IconB } from "@tabler/icons-vue"
`)
})

test('renderIconFile: phosphor aliases raw export to the placeholder alias', () => {
  const out = renderIconFile('phosphor', ['CheckCircleIcon'])
  assert.equal(out, `// Auto-generated by scripts/build-icons.ts
export { PhCheckCircle as CheckCircleIcon } from "@phosphor-icons/vue"
`)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/v4 && tsx --test scripts/build-icons.test.ts`
Expected: FAIL — `renderIconFile is not a function`.

- [ ] **Step 3: Write minimal implementation**

```ts
// append to apps/v4/scripts/build-icons.helpers.ts
export const LIBRARY_EXPORT: Record<Library, string> = {
  lucide: '@lucide/vue',
  tabler: '@tabler/icons-vue',
  hugeicons: '@hugeicons/core-free-icons',
  phosphor: '@phosphor-icons/vue',
  remixicon: '@remixicon/vue',
}

export function renderIconFile(library: Library, names: string[]): string {
  const source = LIBRARY_EXPORT[library]
  const lines = [...names].sort().map((name) => {
    if (library === 'phosphor') return `export { ${deriveRawPhosphor(name)} as ${name} } from "${source}"`
    return `export { ${name} } from "${source}"`
  })
  return `// Auto-generated by scripts/build-icons.ts\n${lines.join('\n')}\n`
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/v4 && tsx --test scripts/build-icons.test.ts`
Expected: PASS.

> **Note:** Before Task 9's real run, open the existing `apps/v4/registry/icons/__lucide__.ts` and `__remixicon__.ts` and confirm the exact header text and quoting match `renderIconFile`'s output. If they differ (e.g. no header, single quotes), adjust `renderIconFile` so regeneration produces a minimal diff.

- [ ] **Step 5: Commit**

```bash
git add apps/v4/scripts/build-icons.helpers.ts apps/v4/scripts/build-icons.test.ts
git commit -m "feat(scripts): render __*__.ts icon re-export files (phosphor aliased)"
```

---

### Task 4: Pure helper — coverage check

**Files:**
- Modify: `apps/v4/scripts/build-icons.helpers.ts`
- Test: `apps/v4/scripts/build-icons.test.ts`

**Interfaces:**
- Consumes: `IconMapping` (merged map).
- Produces: `findUncovered(mapping: IconMapping, usedLucide: string[]): string[]` — returns the used lucide identifiers not present in the map, applying the CLI's suffix bridge: a name is covered if `name in mapping` OR `name.replace(/Icon$/, '') in mapping` OR `name + 'Icon' in mapping`.

- [ ] **Step 1: Write the failing test**

```ts
// append to apps/v4/scripts/build-icons.test.ts
import { findUncovered } from './build-icons.helpers'

test('findUncovered: bridges suffix in both directions', () => {
  const mapping = { ChevronsLeft: {}, CircleCheckIcon: {} }
  assert.deepEqual(findUncovered(mapping, ['ChevronsLeftIcon']), [])   // key unsuffixed, use suffixed
  assert.deepEqual(findUncovered(mapping, ['CircleCheckIcon']), [])    // exact
  assert.deepEqual(findUncovered(mapping, ['GripVertical']), ['GripVertical'])
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/v4 && tsx --test scripts/build-icons.test.ts`
Expected: FAIL — `findUncovered is not a function`.

- [ ] **Step 3: Write minimal implementation**

```ts
// append to apps/v4/scripts/build-icons.helpers.ts
export function findUncovered(mapping: IconMapping, usedLucide: string[]): string[] {
  const has = (n: string) => n in mapping || n.replace(/Icon$/, '') in mapping || `${n}Icon` in mapping
  return [...new Set(usedLucide)].filter((n) => !has(n)).sort()
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/v4 && tsx --test scripts/build-icons.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/v4/scripts/build-icons.helpers.ts apps/v4/scripts/build-icons.test.ts
git commit -m "feat(scripts): coverage check helper with suffix bridge"
```

---

### Task 5: Seed `legacy-mapping.json` from the current map

**Files:**
- Create: `apps/v4/registry/icons/legacy-mapping.json`

**Interfaces:**
- Produces: `apps/v4/registry/icons/legacy-mapping.json` — a byte-for-byte copy of the current committed `public/r/icons/index.json` (all 37 entries), preserving order and all values. This is the compatibility layer; because legacy values win, seeding from the current map guarantees zero behavior change for existing icons.

- [ ] **Step 1: Copy the current map verbatim**

Run:
```bash
cd apps/v4 && cp public/r/icons/index.json registry/icons/legacy-mapping.json
```

- [ ] **Step 2: Verify it is valid JSON and matches the source**

Run:
```bash
cd apps/v4 && node -e "const a=require('./public/r/icons/index.json'),b=require('./registry/icons/legacy-mapping.json');const assert=require('node:assert');assert.deepEqual(a,b);console.log('legacy seed OK:',Object.keys(b).length,'entries')"
```
Expected: `legacy seed OK: 37 entries`.

- [ ] **Step 3: Commit**

```bash
git add apps/v4/registry/icons/legacy-mapping.json
git commit -m "chore(icons): seed legacy-mapping.json from current icon map"
```

---

### Task 6: SFC scanner — read IconPlaceholders from base `.vue` files

**Files:**
- Modify: `apps/v4/scripts/build-icons.ts` (create in this task)
- Test: `apps/v4/scripts/build-icons.test.ts`

**Interfaces:**
- Consumes: `PlaceholderRecord`, `Library`, `GENERATABLE_LIBRARIES` (Task 1).
- Produces: `scanPlaceholders(source: string): PlaceholderRecord[]` — extract every `<IconPlaceholder ... />` (attributes may span multiple lines) from one SFC's raw text and return one record per element with whichever of the five static `lib="value"` attributes are present. Mirrors upstream's regex approach.

- [ ] **Step 1: Write the failing test**

```ts
// append to apps/v4/scripts/build-icons.test.ts
import { scanPlaceholders } from './build-icons'

test('scanPlaceholders: extracts multi-line placeholder attributes', () => {
  const sfc = `<template>
  <IconPlaceholder
    lucide="ChevronsLeftIcon"
    tabler="IconChevronsLeft"
    hugeicons="ArrowLeftDoubleIcon"
    phosphor="CaretDoubleLeftIcon"
    remixicon="RiArrowLeftDoubleLine"
    data-icon="inline-start"
  />
</template>`
  const records = scanPlaceholders(sfc)
  assert.equal(records.length, 1)
  assert.deepEqual(records[0], {
    lucide: 'ChevronsLeftIcon',
    tabler: 'IconChevronsLeft',
    hugeicons: 'ArrowLeftDoubleIcon',
    phosphor: 'CaretDoubleLeftIcon',
    remixicon: 'RiArrowLeftDoubleLine',
  })
})

test('scanPlaceholders: ignores non-IconPlaceholder elements', () => {
  assert.deepEqual(scanPlaceholders('<template><ChevronLeftIcon /></template>'), [])
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/v4 && tsx --test scripts/build-icons.test.ts`
Expected: FAIL — `Cannot find module './build-icons'`.

- [ ] **Step 3: Write minimal implementation**

```ts
// apps/v4/scripts/build-icons.ts
import { GENERATABLE_LIBRARIES, type Library, type PlaceholderRecord } from './build-icons.helpers'

const PLACEHOLDER_RE = /<IconPlaceholder\b([^>]*?)\/?>/gs

export function scanPlaceholders(source: string): PlaceholderRecord[] {
  const records: PlaceholderRecord[] = []
  for (const match of source.matchAll(PLACEHOLDER_RE)) {
    const attrs = match[1]
    const record: PlaceholderRecord = {}
    for (const library of GENERATABLE_LIBRARIES) {
      const attr = attrs.match(new RegExp(`\\b${library}=["']([^"']+)["']`))
      if (attr) record[library] = attr[1]
    }
    if (Object.keys(record).length > 0) records.push(record)
  }
  return records
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/v4 && tsx --test scripts/build-icons.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/v4/scripts/build-icons.ts apps/v4/scripts/build-icons.test.ts
git commit -m "feat(scripts): scan IconPlaceholder attributes from base SFCs"
```

---

### Task 7: Name validation against installed packages

**Files:**
- Modify: `apps/v4/scripts/build-icons.ts`
- Test: `apps/v4/scripts/build-icons.test.ts`

**Interfaces:**
- Consumes: `IconMapping`, `LIBRARY_EXPORT`, `deriveRawPhosphor` (helpers).
- Produces: `validateNames(mapping: IconMapping): Promise<string[]>` — for each generatable library, dynamically `import()` its export package once, and check every mapped value is an exported member. **Skip `radix`** entirely (not installed). Phosphor values in the map are already raw (`PhX`), validate them directly against `@phosphor-icons/vue`. Returns an array of human-readable error strings (empty = all valid).

- [ ] **Step 1: Write the failing test**

```ts
// append to apps/v4/scripts/build-icons.test.ts
import { validateNames } from './build-icons'

test('validateNames: real names pass, bogus name fails', async () => {
  const ok = await validateNames({ X: { phosphor: 'PhX', tabler: 'IconX', radix: 'Cross2Icon' } })
  assert.deepEqual(ok, [])  // radix skipped; PhX and IconX are real
  const bad = await validateNames({ Nope: { phosphor: 'PhTotallyNotAnIcon' } })
  assert.equal(bad.length, 1)
  assert.ok(bad[0].includes('PhTotallyNotAnIcon'))
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd apps/v4 && tsx --test scripts/build-icons.test.ts`
Expected: FAIL — `validateNames is not a function`.

- [ ] **Step 3: Write minimal implementation**

```ts
// append to apps/v4/scripts/build-icons.ts
import { LIBRARY_EXPORT } from './build-icons.helpers'

export async function validateNames(mapping: import('./build-icons.helpers').IconMapping): Promise<string[]> {
  const errors: string[] = []
  const exportsByLib = new Map<string, Set<string>>()

  for (const [library, pkg] of Object.entries(LIBRARY_EXPORT)) {
    const mod = await import(pkg)
    exportsByLib.set(library, new Set(Object.keys(mod)))
  }

  for (const [canonical, entry] of Object.entries(mapping)) {
    for (const [library, name] of Object.entries(entry)) {
      if (library === 'radix') continue // not installed; legacy-only
      const members = exportsByLib.get(library)
      if (members && !members.has(name)) {
        errors.push(`${canonical}: ${library} export "${name}" not found in ${LIBRARY_EXPORT[library as Library]}`)
      }
    }
  }
  return errors
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd apps/v4 && tsx --test scripts/build-icons.test.ts`
Expected: PASS.

> **Note:** hugeicons exports are validated against `@hugeicons/core-free-icons` (where the icon symbols live). If the dynamic import of a package returns members under a nested key rather than top-level named exports, adjust the membership set accordingly and re-run.

- [ ] **Step 5: Commit**

```bash
git add apps/v4/scripts/build-icons.ts apps/v4/scripts/build-icons.test.ts
git commit -m "feat(scripts): validate generated icon names against installed packages"
```

---

### Task 8: Orchestrator `buildIcons()` + direct-run entry

**Files:**
- Modify: `apps/v4/scripts/build-icons.ts`

**Interfaces:**
- Consumes: everything above.
- Produces: `buildIcons(opts?: { verbose?: boolean }): Promise<void>` — the full pipeline. Reads all `.vue` files under `registry/bases/reka`, scans placeholders, builds the scanned mapping + usage, reads `registry/icons/legacy-mapping.json`, merges, validates (throws on errors), reads `@lucide/vue` imports across `registry/new-york-v4/ui`, asserts coverage (throws on uncovered), writes `public/r/icons/index.json` and the five `__*__.ts` files (skip-write-if-unchanged), and prints warnings. Direct-run guard executes `buildIcons({ verbose: process.argv.includes('--verbose') })`.

- [ ] **Step 1: Implement the orchestrator**

```ts
// append to apps/v4/scripts/build-icons.ts
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import {
  GENERATABLE_LIBRARIES, buildMappingFromRecords, mergeLegacy, renderIconFile, findUncovered,
  type IconMapping, type Library,
} from './build-icons.helpers'

const BASES_DIR = join(process.cwd(), 'registry/bases/reka')
const NY_UI_DIR = join(process.cwd(), 'registry/new-york-v4/ui')
const ICONS_OUT_DIR = join(process.cwd(), 'registry/icons')
const MAP_OUT = join(process.cwd(), 'public/r/icons/index.json')
const LEGACY_PATH = join(ICONS_OUT_DIR, 'legacy-mapping.json')

async function listVue(dir: string): Promise<string[]> {
  const entries = (await readdir(dir, { recursive: true })).filter(p => p.endsWith('.vue')).sort()
  return entries.map(p => join(dir, p))
}

async function collectLucideImports(dir: string): Promise<string[]> {
  const names: string[] = []
  for (const file of await listVue(dir)) {
    const src = await readFile(file, 'utf8')
    for (const m of src.matchAll(/import\s*\{([^}]*)\}\s*from\s*['"]@lucide\/vue['"]/g)) {
      for (const raw of m[1].split(',')) {
        const name = raw.trim()
        if (name) names.push(name)
      }
    }
  }
  return names
}

async function writeIfChanged(path: string, content: string): Promise<void> {
  if (existsSync(path) && (await readFile(path, 'utf8')) === content) return
  await writeFile(path, content)
}

export async function buildIcons(opts: { verbose?: boolean } = {}): Promise<void> {
  // 1. scan bases
  const records = []
  for (const file of await listVue(BASES_DIR)) {
    records.push(...scanPlaceholders(await readFile(file, 'utf8')))
  }
  const { mapping: scanned, usage, warnings } = buildMappingFromRecords(records)

  // 2. merge legacy (legacy wins, scan fills gaps)
  const legacy: IconMapping = JSON.parse(await readFile(LEGACY_PATH, 'utf8'))
  const merged = mergeLegacy(legacy, scanned)

  // 3. validate names
  const validationErrors = await validateNames(merged)
  if (validationErrors.length) {
    throw new Error(`Icon name validation failed:\n${validationErrors.join('\n')}`)
  }

  // 4. coverage assertion for the raw-lucide new-york-v4 registry
  const uncovered = findUncovered(merged, await collectLucideImports(NY_UI_DIR))
  if (uncovered.length) {
    throw new Error(
      `The following @lucide/vue icons used in registry/new-york-v4/ui have no mapping:\n`
      + uncovered.map(n => `  - ${n}`).join('\n')
      + `\nAdd each to a base IconPlaceholder (registry/bases/reka/**) or pin it in registry/icons/legacy-mapping.json.`,
    )
  }

  // 5. write outputs
  await writeIfChanged(MAP_OUT, `${JSON.stringify(merged, null, 2)}\n`)
  for (const library of GENERATABLE_LIBRARIES) {
    const names = [...usage[library]]
    if (names.length === 0) continue
    await writeIfChanged(join(ICONS_OUT_DIR, `__${library}__.ts`), renderIconFile(library as Library, names))
  }

  console.log(`✓ Icon map: ${Object.keys(merged).length} icons (${Object.keys(legacy).length} legacy)`)
  if (warnings.length) {
    if (opts.verbose) warnings.forEach(w => console.warn(`⚠ ${w}`))
    else console.warn(`⚠ ${warnings.length} icon mapping conflicts (run with --verbose for details)`)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildIcons({ verbose: process.argv.includes('--verbose') }).catch((err) => {
    console.error(err.message)
    process.exit(1)
  })
}
```

- [ ] **Step 2: Run the generator for real (first real execution)**

Run: `cd apps/v4 && tsx scripts/build-icons.ts --verbose`
Expected: prints `✓ Icon map: <N> icons (37 legacy)` and exits 0. If it throws on coverage, that is a real gap — resolve per Task 9 before continuing.

- [ ] **Step 3: Confirm unit tests still pass**

Run: `cd apps/v4 && tsx --test scripts/build-icons.test.ts`
Expected: PASS.

- [ ] **Step 4: Commit the generator (outputs reviewed in Task 9)**

```bash
git add apps/v4/scripts/build-icons.ts
git commit -m "feat(scripts): build-icons orchestrator, validation and coverage assertion"
```

---

### Task 9: Review generated outputs & lock in the diff

**Files:**
- Modify (generated): `apps/v4/public/r/icons/index.json`, `apps/v4/registry/icons/__{lucide,tabler,hugeicons,phosphor,remixicon}__.ts`

**Interfaces:**
- Consumes: `buildIcons()` (Task 8). No new code.

- [ ] **Step 1: Regenerate and diff the map against the committed version**

Run:
```bash
cd apps/v4 && git stash -- public/r/icons/index.json 2>/dev/null; git show HEAD:apps/v4/public/r/icons/index.json > /tmp/icons-before.json 2>/dev/null || git show dev:apps/v4/public/r/icons/index.json > /tmp/icons-before.json
tsx scripts/build-icons.ts
node -e "
const before=require('/tmp/icons-before.json'), after=require('./public/r/icons/index.json');
for (const k of Object.keys(before)) {
  for (const [lib,v] of Object.entries(before[k])) {
    if (after[k]?.[lib] !== v) console.log('CHANGED', k, lib, v, '->', after[k]?.[lib]);
  }
  if (!(k in after)) console.log('REMOVED', k);
}
console.log('added keys:', Object.keys(after).filter(k=>!(k in before)).length);
"
```
Expected: **no `CHANGED` and no `REMOVED` lines** (legacy preserves every existing value), and a positive count of added keys including the six #1893 icons.

- [ ] **Step 2: Verify the #1893 icons resolved for phosphor**

Run:
```bash
cd apps/v4 && node -e "
const m=require('./public/r/icons/index.json');
for (const k of ['CircleCheckIcon','InfoIcon','OctagonXIcon','TriangleAlertIcon','ChevronsLeftIcon','ChevronsRightIcon']) {
  const e=m[k]||m[k.replace(/Icon$/,'')]; console.log(k, e&&e.phosphor);
}
"
```
Expected: each prints a `Ph...` value (`PhCheckCircle`, `PhInfo`, `PhXCircle`, `PhWarning`, `PhCaretDoubleLeft`, `PhCaretDoubleRight`).

- [ ] **Step 3: Run the CLI's existing icon transform tests against the new map**

Run: `cd packages/cli && npx vitest run test/utils/transform-icons.test.ts`
Expected: PASS (7 tests) — including PR #1894's `transforms pagination and sonner icons to phosphor`, which now passes off the generated map.

- [ ] **Step 4: Lint the generated JSON to match repo formatting**

Run: `cd apps/v4 && npx eslint --fix public/r/icons/index.json && npx eslint --fix registry/icons/__lucide__.ts registry/icons/__tabler__.ts registry/icons/__hugeicons__.ts registry/icons/__phosphor__.ts registry/icons/__remixicon__.ts`
Expected: no errors; re-run `tsx scripts/build-icons.ts` and confirm it reports "unchanged" (generator output already lint-clean) — if the generator's output differs from eslint's, align `renderIconFile`/JSON formatting so the generator is idempotent with lint.

- [ ] **Step 5: Commit the generated outputs**

```bash
git add apps/v4/public/r/icons/index.json apps/v4/registry/icons/__lucide__.ts apps/v4/registry/icons/__tabler__.ts apps/v4/registry/icons/__hugeicons__.ts apps/v4/registry/icons/__phosphor__.ts apps/v4/registry/icons/__remixicon__.ts
git commit -m "chore(icons): regenerate icon map and re-export files from bases"
```

---

### Task 10: Wire into the registry build & package scripts

**Files:**
- Modify: `apps/v4/scripts/build-registry.ts` (`main()`, near line 406-458)
- Modify: `apps/v4/package.json` (`scripts`)

**Interfaces:**
- Consumes: `buildIcons()` (Task 8).

- [ ] **Step 1: Call `buildIcons()` at the start of `main()`**

In `apps/v4/scripts/build-registry.ts`, add the import near the other `./lib` imports:

```ts
import { buildIcons } from './build-icons'
```

Then as the first awaited step inside `main()` (before `buildRegistryIndex()` / `buildStyles()`):

```ts
    console.log('🎨 Generating icon map from IconPlaceholder bases...')
    await buildIcons()
```

- [ ] **Step 2: Add package scripts**

In `apps/v4/package.json`, add a standalone script and chain it into the registry build:

```jsonc
"registry:build:icons": "tsx --tsconfig ./tsconfig.json ./scripts/build-icons.ts",
"registry:build": "pnpm registry:build:icons && NODE_OPTIONS=--max-old-space-size=16384 tsx --tsconfig ./tsconfig.json ./scripts/build-registry.ts && pnpm registry:build:index",
```

(Keep the existing `registry:build` flags/steps; only prepend `pnpm registry:build:icons &&`. The `build-registry.ts` call in Step 1 makes generation also run inside the full build; the standalone prepend gives a fast local path. If duplicate execution is undesirable, keep only the `main()` call and drop the prepend — pick one and note it.)

- [ ] **Step 3: Verify the full registry build runs the generator without regressions**

Run: `cd apps/v4 && pnpm registry:build:icons`
Expected: `✓ Icon map: <N> icons (37 legacy)`, exit 0, and `git status` shows the icon outputs unchanged (already regenerated in Task 9).

- [ ] **Step 4: Commit**

```bash
git add apps/v4/scripts/build-registry.ts apps/v4/package.json
git commit -m "build(icons): generate the icon map as part of the registry build"
```

---

### Task 11: CI staleness gate & wire tests into `apps/v4` test script

**Files:**
- Modify: `apps/v4/package.json` (`scripts.test`)
- Modify: CI workflow (locate under `.github/workflows/`)

**Interfaces:**
- Consumes: `build-icons.test.ts`, `buildIcons()`.

- [ ] **Step 1: Include icon tests in the `apps/v4` test script**

In `apps/v4/package.json`, extend `test` to run the icon unit tests too:

```jsonc
"test": "tsx scripts/lib/command-item-tailwind.test.ts && tsx --test scripts/build-icons.test.ts",
```

- [ ] **Step 2: Add a staleness check script**

Add to `apps/v4/package.json` scripts:

```jsonc
"registry:check:icons": "tsx scripts/build-icons.ts && git diff --exit-code public/r/icons/index.json registry/icons/__lucide__.ts registry/icons/__tabler__.ts registry/icons/__hugeicons__.ts registry/icons/__phosphor__.ts registry/icons/__remixicon__.ts",
```

- [ ] **Step 3: Verify the staleness check passes on a clean tree**

Run: `cd apps/v4 && pnpm registry:check:icons`
Expected: exit 0 (generator output matches committed files). Then temporarily add a stray `<IconPlaceholder lucide="ZzTestIcon" />` to a base file, re-run, and confirm it exits non-zero (proves the gate works); revert the edit.

- [ ] **Step 4: Add the gate to CI**

Locate the workflow that runs registry/lint checks under `.github/workflows/` (grep for `registry:build` or `pnpm test`). Add a step in the `apps/v4` job:

```yaml
      - name: Check icon map is up to date
        working-directory: apps/v4
        run: pnpm registry:check:icons
```

If no suitable workflow job exists, add `pnpm --filter <apps/v4-package-name> registry:check:icons` to the existing lint/test job. Confirm the exact package name via `apps/v4/package.json` `name` field.

- [ ] **Step 5: Commit**

```bash
git add apps/v4/package.json .github/workflows/
git commit -m "ci(icons): gate on icon-map staleness and run icon unit tests"
```

---

## Self-Review

**Spec coverage:**
- Generator (`build-icons.ts`) scanning bases → Tasks 6, 8. ✅
- Phosphor alias→raw derivation → Task 1 (`deriveRawPhosphor`), applied in Tasks 1/3/8. ✅
- Radix legacy layer / `legacy-mapping.json` merge (legacy wins) → Tasks 2, 5. ✅
- Coverage assertion for new-york-v4 → Tasks 4, 8. ✅
- Package-name validation (incl. skipping radix) → Task 7. ✅
- Regenerate `__*__.ts` (remove stale header lie by owning it) → Tasks 3, 8, 9. ✅
- Outputs `index.json` + `__*__.ts` → Task 8/9. ✅
- Build wiring + standalone script → Task 10. ✅
- CI staleness gate + tests → Task 11. ✅
- Migration diff/superset review (drift preserved, not changed) → Task 9. ✅
- #1894 deferred → not in scope; no task, by design. ✅

**Placeholder scan:** No "TBD"/"handle edge cases"/"similar to Task N" — every code step contains real code. Two `> Note:` blocks (Task 3, Task 7) flag verify-and-adjust points with concrete criteria, not deferred work.

**Type consistency:** `IconMapping`, `PlaceholderRecord`, `Library`, `GENERATABLE_LIBRARIES`, `LIBRARY_EXPORT` defined in Task 1/3 and used consistently in Tasks 2/4/6/7/8. `buildMappingFromRecords` returns `{ mapping, usage, warnings }` (Task 1) and is destructured exactly that way in Task 8. `usage.phosphor` holds aliases; `renderIconFile('phosphor', …)` (Task 3) expects aliases — consistent. `mergeLegacy(legacy, scanned)` order matches Task 8's call. `validateNames`/`findUncovered`/`scanPlaceholders` signatures match their call sites.

**Known runtime-verify points (intentionally left to execution, with criteria):**
- Exact existing header/quote style of `__lucide__.ts`/`__remixicon__.ts` (Task 3 note) — align `renderIconFile` to minimize diff.
- Shape of each icon package's dynamic-import members for `validateNames` (Task 7 note).
- Exact CI workflow file/job name (Task 11 Step 4) — grep-located at execution.
