import { afterEach, describe, expect, it, vi } from 'vitest'
import { compileScript, parse } from 'vue/compiler-sfc'
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

/** The transformed file as written, unflattened, for compiling. */
async function written(raw: string, iconLibrary: string) {
  return transform({ filename: 'components/thing/Thing.vue', raw, config: { iconLibrary, typescript: true, aliases: { components: '@/components', utils: '@/lib/utils', ui: '@/components/ui' } } as never })
}

/**
 * Compile with Vue itself, the template inlined into setup, as an app's
 * build does: the render code shows which binding each tag and prop
 * really uses. `resolveComponent` would mean the tag found no binding.
 */
function render(code: string) {
  const { descriptor } = parse(code)
  return compileScript(descriptor, { id: 'test', inlineTemplate: true }).content
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
  it('joins an existing import from the same package (cosmetic): one declaration, the fresh names beside the old', async () => {
    const result = await run(
      SFC('<IconPlaceholder lucide="CheckIcon" /><IconPlaceholder lucide="XIcon" /><CheckIcon />', `import { CheckIcon } from '@lucide/vue'\n`),
      'lucide',
    )
    expect(result).toContain(flat(`import { CheckIcon, CheckIcon as CheckIcon_, XIcon } from '@lucide/vue'`))
    expect(result.match(/from "@lucide\/vue"/g)).toHaveLength(1)
    expect(result).toContain(flat('<CheckIcon_ /><XIcon /><CheckIcon />'))
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

describe('transformIconPlaceholder: a name the file already mentions gets a fresh alias (review)', () => {
  // The icon is imported under its own name when the file mentions that
  // name nowhere else (the placeholders' library attributes aside), and
  // otherwise under the first of `CheckIcon_`, `CheckIcon_2`, … the file
  // never mentions. Existing imports are never reused. Any binding that
  // could capture the tag or the :icon value has to be written in the
  // file, so each of these cases takes the alias path. Each is compiled
  // with Vue to check the render really uses the new import.

  it('a plain file: every icon under its own name, nothing aliased', async () => {
    const code = await written(SFC('<IconPlaceholder lucide="CheckIcon" hugeicons="Tick02Icon" /><IconPlaceholder lucide="XIcon" hugeicons="Cancel01Icon" />'), 'hugeicons')
    expect(flat(code)).toContain(flat(`import { HugeiconsIcon } from '@hugeicons/vue'`))
    expect(flat(code)).toContain(flat(`import { Tick02Icon, Cancel01Icon } from '@hugeicons/core-free-icons'`))
    expect(code).not.toMatch(/ as |_\b/)
    expect(render(code)).toMatch(/icon: _unref\(Tick02Icon\)/)
  })

  it('a name only in ANOTHER placeholder\'s library attribute does not count as taken', async () => {
    const code = await written(SFC('<IconPlaceholder lucide="CheckIcon" tabler="IconCheck" /><IconPlaceholder lucide="IconCheck" tabler="IconCheckbox" />'), 'tabler')
    expect(flat(code)).toContain(flat(`import { IconCheck, IconCheckbox } from '@tabler/icons-vue'`))
  })

  it('a name the map-based transform has just imported counts as taken', async () => {
    // Check (lucide) becomes IconCheck (tabler) in transformIcons, which
    // runs first; the placeholder's IconCheck must not collide with it.
    const code = await written(SFC('<IconPlaceholder lucide="CheckIcon" tabler="IconCheck" /><Check />', `import { Check } from '@lucide/vue'\n`), 'tabler')
    expect(flat(code)).toContain('<IconCheck_ /><IconCheck />')
  })

  it('several declarations from the same package: no name is declared twice', async () => {
    const code = await written(SFC('<IconPlaceholder lucide="CheckIcon" /><XIcon /><CheckIcon />', `import { XIcon } from '@lucide/vue'\nimport { CheckIcon } from '@lucide/vue'\n`), 'lucide')
    expect(render(code)).toMatch(/_create(?:VNode|Block)\(_unref\(CheckIcon_\)/)
  })

  it('a type-only import, an alias holding the name, and an existing alias of the icon: none is used', async () => {
    for (const script of [`import { type CheckIcon, XIcon } from '@lucide/vue'\n`, `import { XIcon as CheckIcon } from '@lucide/vue'\n`, `import { CheckIcon as Tick } from '@lucide/vue'\n`]) {
      const code = await written(SFC('<IconPlaceholder lucide="CheckIcon" />', script), 'lucide')
      expect(flat(code), script).toContain('<CheckIcon_ />')
      expect(render(code), script).toMatch(/_create(?:VNode|Block)\(_unref\(CheckIcon_\)/)
    }
  })

  it('destructured variables of that name (object, array, default, rest) do not capture it', async () => {
    for (const script of [
      `const { CheckIcon } = { CheckIcon: 'local' }\n`,
      `const [CheckIcon] = ['local']\n`,
      `const { a: CheckIcon = 'local' } = {} as Record<string, string>\n`,
      `const [, ...CheckIcon] = ['a', 'local']\n`,
    ]) {
      const code = await written(SFC('<IconPlaceholder lucide="CheckIcon" />', script), 'lucide')
      expect(render(code), script).toMatch(/_create(?:VNode|Block)\(_unref\(CheckIcon_\)/)
    }
  })

  it('a binding of that name in <script setup> does not shadow it, wherever the icon import goes', async () => {
    const raw = `<script lang="ts">
import { CheckIcon } from '@lucide/vue'
</script>

<script setup lang="ts">
import { IconPlaceholder } from '@/components/icon-placeholder'
const CheckIcon = 'local'
</script>

<template>
  <IconPlaceholder lucide="CheckIcon" />
</template>
`
    const code = await written(raw, 'lucide')
    expect(flat(code)).toContain('<CheckIcon_ />')
    expect(render(code)).toMatch(/_create(?:VNode|Block)\(_unref\(CheckIcon_\)/)
  })

  it('a v-for variable named like the drawing\'s import does not become the :icon value', async () => {
    const code = await written(SFC('<IconPlaceholder v-for="icon in items" :key="icon" hugeicons="Tick02Icon" />', `import { Tick02Icon as icon } from '@hugeicons/core-free-icons'\nconst items = ['a']\n`), 'hugeicons')
    expect(flat(code)).toContain('<HugeiconsIcon v-for="icon in items" :icon="Tick02Icon_" :stroke-width="2" :key="icon" />')
    expect(render(code)).toMatch(/icon: _unref\(Tick02Icon_\)/)
  })

  it('a slot variable named like the icon does not capture the tag', async () => {
    const code = await written(SFC('<Comp v-slot="{ CheckIcon }"><IconPlaceholder lucide="CheckIcon" /><span>{{ CheckIcon }}</span></Comp>', `import Comp from './Comp.vue'\n`), 'lucide')
    expect(flat(code)).toContain('<CheckIcon_ />')
    expect(render(code)).toMatch(/_create(?:VNode|Block)\(_unref\(CheckIcon_\)/)
  })

  it('a fallback name already in the file is skipped: the next free one is used', async () => {
    const code = await written(SFC('<IconPlaceholder lucide="CheckIcon" />', `const CheckIcon = 'mine'\nconst CheckIcon_ = 'taken'\n`), 'lucide')
    expect(flat(code)).toContain(flat(`import { CheckIcon as CheckIcon_2 } from '@lucide/vue'`))
    expect(flat(code)).toContain('<CheckIcon_2 />')
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
