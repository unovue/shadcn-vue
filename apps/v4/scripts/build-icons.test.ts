import assert from 'node:assert/strict'
import { it } from 'vitest'
import { buildMappingFromRecords, deriveRawPhosphor, findDuplicateCanonicals, findUncovered, mergeLegacy, parseLucideImports } from './build-icons.helpers'

it('deriveRawPhosphor strips Icon suffix and prefixes Ph', () => {
  assert.equal(deriveRawPhosphor('CheckCircleIcon'), 'PhCheckCircle')
  assert.equal(deriveRawPhosphor('WarningIcon'), 'PhWarning')
  assert.equal(deriveRawPhosphor('XIcon'), 'PhX')
  assert.equal(deriveRawPhosphor('CaretDoubleLeftIcon'), 'PhCaretDoubleLeft')
})

it('buildMappingFromRecords keys on lucide value and derives raw phosphor', () => {
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

it('buildMappingFromRecords warns and skips a record without lucide', () => {
  const { mapping, warnings } = buildMappingFromRecords([{ tabler: 'IconX' }])
  assert.equal(Object.keys(mapping).length, 0)
  assert.equal(warnings.length, 1)
})

it('buildMappingFromRecords keeps first on conflict and warns', () => {
  const { mapping, warnings } = buildMappingFromRecords([
    { lucide: 'XIcon', tabler: 'IconX' },
    { lucide: 'XIcon', tabler: 'IconXbox' },
  ])
  assert.equal(mapping.XIcon.tabler, 'IconX')
  assert.ok(warnings.some(w => w.includes('XIcon')))
})

it('mergeLegacy: legacy values win, scan fills only missing libraries', () => {
  const legacy = { Loader2: { lucide: 'Loader2', radix: 'ReloadIcon', tabler: 'IconLoader2', phosphor: 'PhCircleNotch', remixicon: 'RiLoader4Line' } }
  const scanned = { Loader2Icon: { lucide: 'Loader2Icon', tabler: 'IconLoader2', hugeicons: 'Loading03Icon', phosphor: 'PhSpinnerGap', remixicon: 'RiLoader4Line' } }
  const out = mergeLegacy(legacy, scanned)
  assert.equal(out.Loader2.phosphor, 'PhCircleNotch') // legacy wins, NOT PhSpinnerGap
  assert.equal(out.Loader2.hugeicons, 'Loading03Icon') // gap filled from scan
  assert.equal(out.Loader2.radix, 'ReloadIcon') // radix preserved
  assert.ok(!('Loader2Icon' in out)) // scanned key consumed via +Icon bridge
})

it('mergeLegacy: scanned-only canonicals are appended', () => {
  const out = mergeLegacy({}, { CircleCheckIcon: { lucide: 'CircleCheckIcon', phosphor: 'PhCheckCircle' } })
  assert.deepEqual(out.CircleCheckIcon, { lucide: 'CircleCheckIcon', phosphor: 'PhCheckCircle' })
})

it('findUncovered: bridges suffix in both directions', () => {
  const mapping = { ChevronsLeft: {}, CircleCheckIcon: {} }
  assert.deepEqual(findUncovered(mapping, ['ChevronsLeftIcon']), []) // key unsuffixed, use suffixed
  assert.deepEqual(findUncovered(mapping, ['CircleCheckIcon']), []) // exact
  assert.deepEqual(findUncovered(mapping, ['GripVertical']), ['GripVertical'])
  assert.deepEqual(findUncovered({ CircleCheckIcon: {} }, ['CircleCheck']), []) // use unsuffixed, key suffixed
  assert.deepEqual(findUncovered({}, ['Zeta', 'Alpha', 'Alpha']), ['Alpha', 'Zeta']) // dedup and sort
})

import { scanPlaceholders, validateNames } from './build-icons'

it('scanPlaceholders: extracts multi-line placeholder attributes', () => {
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

it('scanPlaceholders: ignores non-IconPlaceholder elements', () => {
  assert.deepEqual(scanPlaceholders('<template><ChevronLeftIcon /></template>'), [])
})

it('scanPlaceholders: skips Vue dynamic bindings (v-bind shorthand and data- attrs)', () => {
  assert.deepEqual(
    scanPlaceholders('<IconPlaceholder :lucide="x.lucide" :tabler="x.tabler" />'),
    [],
  )
  assert.deepEqual(
    scanPlaceholders('<IconPlaceholder lucide="XIcon" :tabler="x.t" />'),
    [{ lucide: 'XIcon' }],
  )
})

it('validateNames: real names pass, bogus name fails', async () => {
  const ok = await validateNames({ X: { phosphor: 'PhX', tabler: 'IconX', radix: 'Cross2Icon' } })
  assert.deepEqual(ok, []) // radix skipped; PhX and IconX are real
  const bad = await validateNames({ Nope: { phosphor: 'PhTotallyNotAnIcon' } })
  assert.equal(bad.length, 1)
  assert.ok(bad[0].includes('PhTotallyNotAnIcon'))
})

it('parseLucideImports: resolves aliases and type modifiers to the exported name', () => {
  assert.deepEqual(parseLucideImports(`import { CheckIcon } from '@lucide/vue'`), ['CheckIcon'])
  assert.deepEqual(parseLucideImports(`import { ChevronDown as DownIcon } from '@lucide/vue'`), ['ChevronDown'])
  assert.deepEqual(
    parseLucideImports(`import { CheckIcon, type XIcon, Loader2Icon as Spinner } from "@lucide/vue"`),
    ['CheckIcon', 'XIcon', 'Loader2Icon'],
  )
  assert.deepEqual(parseLucideImports(`import { Primitive } from 'reka-ui'`), [])
})

it('findDuplicateCanonicals: flags X/XIcon key pairs', () => {
  assert.deepEqual(findDuplicateCanonicals({ Search: {}, SearchIcon: {} }), ['Search'])
  assert.deepEqual(findDuplicateCanonicals({ Search: {}, CircleCheckIcon: {} }), [])
})
