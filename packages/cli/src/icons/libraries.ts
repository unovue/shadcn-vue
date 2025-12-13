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
    usage: '<HugeiconsIcon icon={ICON} strokeWidth={2} />',
    export: '@hugeicons/core-free-icons',
  },
} as const

export type IconLibraries = typeof iconLibraries

export type IconLibrary = IconLibraries[keyof IconLibraries]

export type IconLibraryName = keyof IconLibraries
