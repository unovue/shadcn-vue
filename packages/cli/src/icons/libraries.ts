export const iconLibraries = {
  lucide: {
    name: 'lucide',
    title: 'Lucide',
    packages: ['lucide-vue-next'],
    import: 'import { ICON } from \'lucide-vue-next\'',
    usage: '<ICON />',
    export: 'lucide-vue-next',
  },
  tabler: {
    name: 'tabler',
    title: 'Tabler Icons',
    packages: ['@tabler/icons-vue'],
    import: 'import { ICON } from \'@tabler/icons-vue\'',
    usage: '<ICON />',
    export: '@tabler/icons-vue',
  },
  hugeicons: {
    name: 'hugeicons',
    title: 'HugeIcons',
    packages: ['@hugeicons/vue', '@hugeicons/core-free-icons'],
    import:
      'import { HugeiconsIcon } from \'@hugeicons/vue\'\nimport { ICON } from \'@hugeicons/core-free-icons\';',
    usage: '<HugeiconsIcon :icon="ICON" :strokeWidth="2" />',
    export: '@hugeicons/core-free-icons',
  },
  phosphor: {
    name: 'phosphor',
    title: 'Phosphor Icons',
    packages: ['@phosphor-icons/vue'],
    import: 'import { ICON } from \'@phosphor-icons/vue\'',
    usage: '<ICON :strokeWidth="2" />',
    export: '@phosphor-icons/vue',
  },
  remixicon: {
    name: 'remixicon',
    title: 'Remix Icon',
    packages: ['@remixicon/vue'],
    import: 'import { ICON } from \'@remixicon/vue\'',
    usage: '<ICON />',
    export: '@remixicon/vue',
  },
} as const

export type IconLibraries = typeof iconLibraries

export type IconLibrary = IconLibraries[keyof IconLibraries]

export type IconLibraryName = keyof IconLibraries
