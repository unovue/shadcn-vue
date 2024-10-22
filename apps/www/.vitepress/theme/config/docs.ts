export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: string
  label?: string
}

export type SidebarNavItem = NavItem & {
  items?: SidebarNavItem[]
}

export type NavItemWithChildren = NavItem & {
  items?: NavItemWithChildren[]
}

interface DocsConfig {
  mainNav: NavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Docs',
      href: '/docs/introduction',
    },
    {
      title: 'Components',
      href: '/docs/components/accordion',
    },
    {
      title: 'Blocks',
      href: '/blocks',
    },
    {
      title: 'Charts',
      href: '/charts',
    },
    {
      title: 'Themes',
      href: '/themes',
    },
    {
      title: 'Examples',
      href: '/examples/mail',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs/introduction',
        },
        {
          title: 'Installation',
          href: '/docs/installation',
        },
        {
          title: 'components.json',
          href: '/docs/components-json',
        },
        {
          title: 'Theming',
          href: '/docs/theming',
        },
        {
          title: 'Dark Mode',
          href: '/docs/dark-mode',
          items: [],
        },
        {
          title: 'CLI',
          href: '/docs/cli',
        },
        {
          title: 'Typography',
          href: '/docs/typography',
        },
        {
          title: 'Figma',
          href: '/docs/figma',
        },
        {
          title: 'Changelog',
          href: '/docs/changelog',
        },
        {
          title: 'About',
          href: '/docs/about',
        },
        {
          title: 'Contribution',
          href: '/docs/contribution',
          items: [],
        },
      ],
    },
    {
      title: 'Installation',
      items: [
        {
          title: 'Vite',
          href: '/docs/installation/vite',
        },
        {
          title: 'Nuxt',
          href: '/docs/installation/nuxt',
        },
        {
          title: 'Astro',
          href: '/docs/installation/astro',
        },
        {
          title: 'Laravel',
          href: '/docs/installation/laravel',
        },
      ],
    },
    {
      title: 'Extended',
      items: [
        {
          title: 'Auto Form',
          href: '/docs/components/auto-form',
          items: [],
          label: 'New',
        },
        {
          title: 'Charts',
          href: '/docs/charts',
          label: 'New Alpha',
          items: [],
        },
      ],
    },
    {
      title: 'Components',
      items: [
        {
          title: 'Accordion',
          href: '/docs/components/accordion',
        },
        {
          title: 'Alert',
          href: '/docs/components/alert',
        },
        {
          title: 'Alert Dialog',
          href: '/docs/components/alert-dialog',
        },
        {
          title: 'Aspect Ratio',
          href: '/docs/components/aspect-ratio',
        },
        {
          title: 'Avatar',
          href: '/docs/components/avatar',
        },
        {
          title: 'Badge',
          href: '/docs/components/badge',
        },
        {
          title: 'Breadcrumb',
          href: '/docs/components/breadcrumb',
          items: [],
        },
        {
          title: 'Button',
          href: '/docs/components/button',
        },
        {
          title: 'Calendar',
          href: '/docs/components/calendar',
          items: [],
          label: 'Updated',
        },
        {
          title: 'Card',
          href: '/docs/components/card',
        },
        {
          title: 'Carousel',
          href: '/docs/components/carousel',
          items: [],
        },
        {
          title: 'Checkbox',
          href: '/docs/components/checkbox',
        },
        {
          title: 'Collapsible',
          href: '/docs/components/collapsible',
        },
        {
          title: 'Combobox',
          href: '/docs/components/combobox',
        },
        {
          title: 'Command',
          href: '/docs/components/command',
        },
        {
          title: 'Context Menu',
          href: '/docs/components/context-menu',
        },
        {
          title: 'Data Table',
          href: '/docs/components/data-table',
        },
        {
          title: 'Date Picker',
          href: '/docs/components/date-picker',
          items: [],
          label: 'Updated',
        },
        {
          title: 'Dialog',
          href: '/docs/components/dialog',
        },
        {
          title: 'Drawer',
          href: '/docs/components/drawer',
          items: [],
        },
        {
          title: 'Dropdown Menu',
          href: '/docs/components/dropdown-menu',
        },
        {
          title: 'Form',
          href: '/docs/components/form',
        },
        {
          title: 'Hover Card',
          href: '/docs/components/hover-card',
        },
        {
          title: 'Input',
          href: '/docs/components/input',
        },
        {
          title: 'Label',
          href: '/docs/components/label',
        },
        {
          title: 'Menubar',
          href: '/docs/components/menubar',
        },
        {
          title: 'Navigation Menu',
          href: '/docs/components/navigation-menu',
        },
        {
          title: 'Number Field',
          href: '/docs/components/number-field',
          label: 'New Alpha',
        },
        {
          title: 'Pagination',
          href: '/docs/components/pagination',
        },
        {
          title: 'PIN Input',
          href: '/docs/components/pin-input',
          items: [],
        },
        {
          title: 'Popover',
          href: '/docs/components/popover',
        },
        {
          title: 'Progress',
          href: '/docs/components/progress',
        },
        {
          title: 'Radio Group',
          href: '/docs/components/radio-group',
        },
        {
          title: 'Range Calendar',
          href: '/docs/components/range-calendar',
          items: [],
        },
        {
          title: 'Resizable',
          href: '/docs/components/resizable',
          items: [],
        },
        {
          title: 'Scroll Area',
          href: '/docs/components/scroll-area',
        },
        {
          title: 'Select',
          href: '/docs/components/select',
        },
        {
          title: 'Separator',
          href: '/docs/components/separator',
        },
        {
          title: 'Sheet',
          href: '/docs/components/sheet',
        },
        {
          title: 'Skeleton',
          href: '/docs/components/skeleton',
        },
        {
          title: 'Slider',
          href: '/docs/components/slider',
        },
        {
          title: 'Sonner',
          href: '/docs/components/sonner',
          items: [],
        },
        {
          title: 'Stepper',
          href: '/docs/components/stepper',
          label: 'New',
        },
        {
          title: 'Switch',
          href: '/docs/components/switch',
        },
        {
          title: 'Table',
          href: '/docs/components/table',
        },
        {
          title: 'Tabs',
          href: '/docs/components/tabs',
        },
        {
          title: 'Tags Input',
          href: '/docs/components/tags-input',
          items: [],
        },
        {
          title: 'Textarea',
          href: '/docs/components/textarea',
        },
        {
          title: 'Toast',
          href: '/docs/components/toast',
        },
        {
          title: 'Toggle',
          href: '/docs/components/toggle',
        },
        {
          title: 'Toggle Group',
          href: '/docs/components/toggle-group',
        },
        {
          title: 'Tooltip',
          href: '/docs/components/tooltip',
        },
      ],
    },
  ],
}

interface Example {
  name: string
  href: string
  label?: string
  code: string
}
export const examples: Example[] = [
  {
    name: 'Mail',
    href: '/examples/mail',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/mail',
  },
  {
    name: 'Dashboard',
    href: '/examples/dashboard',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/dashboard',
  },
  {
    name: 'Cards',
    href: '/examples/cards',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/cards',
  },
  // {
  // name: "Tasks",
  // href: "/examples/tasks",
  // label: "New",
  // code: "https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/tasks"
  // },
  {
    name: 'Playground',
    href: '/examples/playground',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/playground',
  },
  {
    name: 'Music',
    href: '/examples/music',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/music',
  },
  {
    name: 'Authentication',
    href: '/examples/authentication',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/examples/authentication',
  },
  {
    name: 'Forms',
    href: '/examples/forms',
    code: 'https://github.com/radix-vue/shadcn-vue/tree/dev/apps/www/src/routes/examples/forms',
  },
]
