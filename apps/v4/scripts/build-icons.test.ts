import assert from 'node:assert/strict'
import { it } from 'vitest'
import { buildMappingFromRecords, deriveRawPhosphor } from './build-icons.helpers'

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
