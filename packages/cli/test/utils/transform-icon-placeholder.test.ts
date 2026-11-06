import { afterEach, describe, expect, it, vi } from 'vitest'
import { logger } from '../../src/utils/logger'
import { transform } from '../../src/utils/transformers'

// A registry file names its icon once per library on an <IconPlaceholder>,
// and the CLI writes the app's library's own icon into the copied file.
// Ported from shadcn's React transform (packages/registry/src/transformers/
// transform-icons.ts), which does the same for JSX.

function SFC(template: string, script = '', lang = ' lang="ts"') {
  return `<script setup${lang}>
import { IconPlaceholder } from '@/components/icon-placeholder'
${script}</script>

<template>
  ${template}
</template>
`
}

const PLACEHOLDER = '<IconPlaceholder lucide="CheckIcon" radix="CheckIcon" tabler="IconCheck" hugeicons="Tick02Icon" phosphor="PhCheck" remixicon="RiCheckLine" class="size-4" />'

/**
 * The pipeline reformats what it writes (quotes, semicolons, one attribute
 * per line for a long tag), so comparisons flatten both sides: runs of
 * whitespace become one space, quotes become double, semicolons go.
 */
function flat(code: string) {
  return code.replace(/\s+/g, ' ').replace(/'/g, '"').replace(/;/g, '').replace(/> </g, '><')
}

async function run(raw: string, iconLibrary: string | undefined, filename = 'components/thing/Thing.vue', typescript = true) {
  // Aliases as a fresh app has them: the import transform that runs in the
  // same pipeline reads them.
  const result = await transform({ filename, raw, config: { iconLibrary, typescript, aliases: { components: '@/components', utils: '@/lib/utils', ui: '@/components/ui' } } as never })
  return flat(result)
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('transformIconPlaceholder: one component per icon', () => {
  const cases: [string, string, string][] = [
    ['lucide', '<CheckIcon class="size-4" />', `import { CheckIcon } from '@lucide/vue'`],
    ['radix', '<CheckIcon class="size-4" />', `import { CheckIcon } from '@radix-icons/vue'`],
    ['tabler', '<IconCheck class="size-4" />', `import { IconCheck } from '@tabler/icons-vue'`],
    ['phosphor', '<PhCheck class="size-4" />', `import { PhCheck } from '@phosphor-icons/vue'`],
    ['remixicon', '<RiCheckLine class="size-4" />', `import { RiCheckLine } from '@remixicon/vue'`],
  ]
  it.each(cases)('%s: the placeholder becomes that library\'s component, imported from its package', async (library, element, importLine) => {
    const result = await run(SFC(PLACEHOLDER), library)
    expect(result).toContain(flat(element))
    expect(result).toContain(flat(importLine))
    expect(result).not.toContain(flat('IconPlaceholder'))
    expect(result).not.toContain(flat('icon-placeholder'))
  })
})

describe('transformIconPlaceholder: hugeicons', () => {
  it('becomes <HugeiconsIcon :icon> with the drawing imported from core-free-icons', async () => {
    const result = await run(SFC(PLACEHOLDER), 'hugeicons')
    expect(result).toContain(flat('<HugeiconsIcon :icon="Tick02Icon" :stroke-width="2" class="size-4" />'))
    expect(result).toContain(flat(`import { HugeiconsIcon } from '@hugeicons/vue'`))
    expect(result).toContain(flat(`import { Tick02Icon } from '@hugeicons/core-free-icons'`))
    expect(result).not.toContain(flat('IconPlaceholder'))
  })

  it('keeps a stroke width the placeholder sets itself', async () => {
    const result = await run(SFC('<IconPlaceholder lucide="CheckIcon" hugeicons="Tick02Icon" :stroke-width="1.5" />'), 'hugeicons')
    expect(result).toContain(flat('<HugeiconsIcon :icon="Tick02Icon" :stroke-width="1.5" />'))
  })

  it('one HugeiconsIcon import for several icons; each drawing imported once', async () => {
    const result = await run(
      SFC(`<IconPlaceholder hugeicons="Tick02Icon" /><IconPlaceholder hugeicons="Cancel01Icon" /><IconPlaceholder hugeicons="Tick02Icon" />`),
      'hugeicons',
    )
    expect(result.match(/import \{ HugeiconsIcon \}/g)).toHaveLength(1)
    expect(result).toContain(flat(`import { Tick02Icon, Cancel01Icon } from '@hugeicons/core-free-icons'`))
  })
})

describe('transformIconPlaceholder: attributes', () => {
  it('keeps every other attribute, binding, directive and event as written; drops every library attribute', async () => {
    const result = await run(
      SFC('<IconPlaceholder v-if="open" lucide="XIcon" tabler="IconX" class="size-4 shrink-0" :class="extra" data-slot="icon" aria-hidden="true" @click="close" />', 'const open = true\nconst extra = \'\'\nfunction close() {}\n'),
      'tabler',
    )
    expect(result).toContain(flat('<IconX v-if="open" class="size-4 shrink-0" :class="extra" data-slot="icon" aria-hidden="true" @click="close" />'))
    expect(result).not.toMatch(/lucide="/)
  })

  it('hugeicons: v-if stays first, then the library props, then the placeholder\'s own attributes', async () => {
    const result = await run(SFC('<IconPlaceholder v-if="open" hugeicons="Undo02Icon" class="size-4" />', 'const open = true\n'), 'hugeicons')
    expect(result).toContain(flat('<HugeiconsIcon v-if="open" :icon="Undo02Icon" :stroke-width="2" class="size-4" />'))
  })

  it('a placeholder with no other attributes', async () => {
    const result = await run(SFC('<IconPlaceholder lucide="PlusIcon" remixicon="RiAddLine" />'), 'remixicon')
    expect(result).toContain(flat('<RiAddLine />'))
  })

  it('the kebab-case tag works too', async () => {
    const result = await run(SFC('<icon-placeholder lucide="PlusIcon" class="size-4" />'), 'lucide')
    expect(result).toContain(flat('<PlusIcon class="size-4" />'))
  })
})

describe('transformIconPlaceholder: imports', () => {
  it('merges into an existing import from the same package, without repeating a name', async () => {
    const result = await run(
      SFC('<IconPlaceholder lucide="CheckIcon" /><IconPlaceholder lucide="XIcon" /><CheckIcon />', `import { CheckIcon } from '@lucide/vue'\n`),
      'lucide',
    )
    expect(result).toContain(flat(`import { CheckIcon, XIcon } from '@lucide/vue'`))
    expect(result.match(/from "@lucide\/vue"/g)).toHaveLength(1)
  })

  it('removes only the placeholder name when its import holds other names', async () => {
    const raw = `<script setup lang="ts">
import { IconPlaceholder, Other } from '@/components/icon-placeholder'
</script>

<template>
  <IconPlaceholder lucide="CheckIcon" /><Other />
</template>
`
    const result = await run(raw, 'lucide')
    expect(result).toContain(flat(`import { Other } from '@/components/icon-placeholder'`))
    expect(result).toContain(flat(`import { CheckIcon } from '@lucide/vue'`))
  })

  it('works in <script setup> without TypeScript', async () => {
    const result = await run(SFC(PLACEHOLDER, '', ''), 'tabler', 'components/thing/Thing.vue', false)
    expect(result).toContain(flat('<IconCheck class="size-4" />'))
    expect(result).toContain(flat(`import { IconCheck } from '@tabler/icons-vue'`))
    expect(result).not.toContain(flat('IconPlaceholder'))
  })

  it('a file from ANY registry: nothing is keyed to shadcn-vue\'s own icon map', async () => {
    const result = await run(SFC('<IconPlaceholder lucide="PencilRulerIcon" hugeicons="PenTool03Icon" />'), 'hugeicons')
    expect(result).toContain(flat('<HugeiconsIcon :icon="PenTool03Icon" :stroke-width="2" />'))
  })
})

describe('transformIconPlaceholder: the bindings already in the script (review)', () => {
  it('several declarations from the same package: the icon is imported once, never declared twice', async () => {
    const raw = SFC('<IconPlaceholder lucide="CheckIcon" /><XIcon />', `import { XIcon } from '@lucide/vue'\nimport { CheckIcon } from '@lucide/vue'\n`)
    const result = await run(raw, 'lucide')
    expect(result.match(/\bCheckIcon\b/g)).toHaveLength(2) // the one import, the one element
    expect(result).toContain(flat('<CheckIcon />'))
  })

  it('a TYPE-only import of the name does not count as the component: a value import is added, under a free name', async () => {
    const raw = SFC('<IconPlaceholder lucide="CheckIcon" />', `import { type CheckIcon, XIcon } from '@lucide/vue'\n`)
    const result = await run(raw, 'lucide')
    // CheckIcon is taken by the type import, so the component gets its own local name.
    expect(result).toContain(flat(`import { type CheckIcon, XIcon, CheckIcon as CheckIcon1 } from '@lucide/vue'`))
    expect(result).toContain(flat('<CheckIcon1 />'))
  })

  it('a whole type-only declaration from the package is left alone; the value import goes beside it', async () => {
    const raw = SFC('<IconPlaceholder lucide="CheckIcon" />', `import type { XIcon } from '@lucide/vue'\n`)
    const result = await run(raw, 'lucide')
    expect(result).toContain(flat(`import type { XIcon } from '@lucide/vue'`))
    expect(result).toContain(flat(`import { CheckIcon } from '@lucide/vue'`))
  })

  it('an alias holding the local name (XIcon as CheckIcon) is not reused: the real CheckIcon gets a free name', async () => {
    const raw = SFC('<IconPlaceholder lucide="CheckIcon" /><CheckIcon />', `import { XIcon as CheckIcon } from '@lucide/vue'\n`)
    const result = await run(raw, 'lucide')
    expect(result).toContain(flat(`import { XIcon as CheckIcon, CheckIcon as CheckIcon1 } from '@lucide/vue'`))
    expect(result).toContain(flat('<CheckIcon1 /><CheckIcon />'))
  })

  it('the real export already imported under an alias is reused, under that alias', async () => {
    const raw = SFC('<IconPlaceholder lucide="CheckIcon" class="a" /><Tick />', `import { CheckIcon as Tick } from '@lucide/vue'\n`)
    const result = await run(raw, 'lucide')
    expect(result).toContain(flat('<Tick class="a" /><Tick />'))
    expect(result.match(/from "@lucide\/vue"/g)).toHaveLength(1)
    // The only CheckIcon left is the exported name inside the existing import.
    expect(result.match(/\bCheckIcon\b/g)).toHaveLength(1)
  })

  it('a local variable of the same name is not shadowed either', async () => {
    const raw = SFC('<IconPlaceholder hugeicons="Tick02Icon" />', `const HugeiconsIcon = 'mine'\n`)
    const result = await run(raw, 'hugeicons')
    expect(result).toContain(flat(`import { HugeiconsIcon as HugeiconsIcon1 } from '@hugeicons/vue'`))
    expect(result).toContain(flat('<HugeiconsIcon1 :icon="Tick02Icon" :stroke-width="2" />'))
  })

  it('camelCase :strokeWidth counts as the stroke width: no second one is added', async () => {
    const result = await run(SFC('<IconPlaceholder hugeicons="Tick02Icon" :strokeWidth="1.5" />'), 'hugeicons')
    expect(result).toContain(flat('<HugeiconsIcon :icon="Tick02Icon" :strokeWidth="1.5" />'))
    expect(result).not.toContain('stroke-width')
  })
})

describe('transformIconPlaceholder: the app\'s library is not named on a placeholder', () => {
  // A deliberate difference from React, which leaves such an element as it
  // is but still removes the placeholder import, so the file no longer
  // compiles. Here the element AND its import stay, and the CLI says which
  // file and which library, so the file still builds (with the registry's
  // own IconPlaceholder component) and the gap is visible.
  it('leaves that placeholder and the placeholder import, and warns with the file and the library', async () => {
    const warn = vi.spyOn(logger, 'warn').mockImplementation(() => {})
    const result = await run(SFC('<IconPlaceholder lucide="CheckIcon" class="size-4" /><IconPlaceholder lucide="XIcon" tabler="IconX" />'), 'tabler', 'components/thing/Thing.vue')
    expect(result).toContain(flat('<IconPlaceholder lucide="CheckIcon" class="size-4" />'))
    expect(result).toContain(flat('<IconX />'))
    expect(result).toContain(flat(`import { IconPlaceholder } from '@/components/icon-placeholder'`))
    expect(result).toContain(flat(`import { IconX } from '@tabler/icons-vue'`))
    expect(warn).toHaveBeenCalledTimes(1)
    expect(String(warn.mock.calls[0]![0])).toContain(flat('components/thing/Thing.vue'))
    expect(String(warn.mock.calls[0]![0])).toContain(flat('tabler'))
  })

  it('no configured or unknown library: the file is left as it is', async () => {
    const raw = SFC(PLACEHOLDER)
    expect(await run(raw, undefined)).toContain(flat(PLACEHOLDER))
    expect(await run(raw, 'nonsense')).toContain(flat(PLACEHOLDER))
  })
})

describe('transformIconPlaceholder: alongside the existing transforms', () => {
  it('a file without placeholders is not touched by it', async () => {
    const raw = `<script setup lang="ts">
import { Primitive } from 'reka-ui'
</script>

<template>
  <Primitive />
</template>
`
    expect(await run(raw, 'tabler')).not.toMatch(/tabler|IconPlaceholder/)
  })

  it('an icon this transform adds is never renamed by the map-based transform (it runs after it)', async () => {
    // The map is keyed by lucide names and rewrites imports from every icon
    // library: a phosphor icon named like a lucide one would be renamed.
    const result = await run(SFC('<IconPlaceholder lucide="CheckIcon" phosphor="CheckIcon" />'), 'phosphor')
    expect(result).toContain(flat('<CheckIcon />'))
    expect(result).toContain(flat(`import { CheckIcon } from '@phosphor-icons/vue'`))
  })

  it('the map-based icon transform still rewrites a plain lucide import in the same file', async () => {
    const result = await run(SFC('<IconPlaceholder lucide="XIcon" tabler="IconX" /><Check />', `import { Check } from '@lucide/vue'\n`), 'tabler')
    expect(result).toContain(flat('<IconX />'))
    expect(result).toContain(flat('<IconCheck />'))
    expect(result).not.toContain(flat('@lucide/vue'))
  })
})
