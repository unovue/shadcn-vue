---
title: Nuxt
description: Install and configure Nuxt.
---

<Steps>

### Create project

Start by creating a new Nuxt project using `create-nuxt-app`:

```bash
npx nuxi@latest init my-app
```

### Install TypeScript

If you encounter the error `ERROR: Cannot read properties of undefined (reading 'sys') (x4)`, please proceed to install TypeScript as a dependency, as advised in this [issue](https://github.com/nuxt/nuxt/issues/20936)

```bash
npm install -D typescript
```

### Install TailwindCSS module

```bash
npx nuxi@latest module add @nuxtjs/tailwindcss
```

### Add `Nuxt` module

<br>

<TabsMarkdown>
  <TabMarkdown title="shadcn-nuxt">

  Install the package below.

  ```bash
 npx nuxi@latest module add shadcn-nuxt
  ```

  </TabMarkdown>

  <TabMarkdown title="manual">

  Add the following code to `modules/shadcn.ts`.

```bash
import {
  defineNuxtModule,
  addComponent,
  addComponentsDir,
  tryResolveModule,
} from 'nuxt/kit';

export interface ShadcnVueOptions {
  /**
   * Prefix for all the imported component
   */
  prefix: string;

  /**
   * Directory that the component lives in.
   * @default "~/components/ui"
   */
  componentDir: string;
}

export default defineNuxtModule<ShadcnVueOptions>({
  defaults: {
    prefix: 'Ui',
    componentDir: '~/components/ui',
  },
  meta: {
    name: 'ShadcnVue',
    configKey: 'shadcn',
    version: '0.0.1',
    compatibility: {
      nuxt: '>=3.9.0',
      bridge: false,
    },
  },
  async setup({ componentDir, prefix }) {
    const isVeeValidateExist = await tryResolveModule('vee-validate');

    addComponentsDir(
      {
        path: componentDir,
        extensions: ['.vue'],
        prefix,
        pathPrefix: false,
      },
      {
        prepend: true,
      }
    );

    if (isVeeValidateExist !== undefined) {
      addComponent({
        filePath: 'vee-validate',
        export: 'Form',
        name: `${prefix}Form`,
        priority: 999,
      });

      addComponent({
        filePath: 'vee-validate',
        export: 'Field',
        name: `${prefix}FormField`,
        priority: 999,
      });
    }

    addComponent({
      filePath: 'radix-vue',
      export: 'PaginationRoot',
      name: `${prefix}Pagination`,
      priority: 999,
    });

    addComponent({
      filePath: 'radix-vue',
      export: 'PaginationList',
      name: `${prefix}PaginationList`,
      priority: 999,
    });

    addComponent({
      filePath: 'radix-vue',
      export: 'PaginationListItem',
      name: `${prefix}PaginationListItem`,
      priority: 999,
    });
  },
});

declare module '@nuxt/schema' {
  interface NuxtConfig {
    shadcn?: ShadcnVueOptions;
  }
  interface NuxtOptions {
    shadcn?: ShadcnVueOptions;
  }
}
```

  </TabMarkdown>
</TabsMarkdown>

### Configure `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
})
```

### Run the CLI

Run the `shadcn-vue` init command to setup your project:

```bash
npx shadcn-vue@latest init
```

### Configure components.json

You will be asked a few questions to configure `components.json`:

```txt:line-numbers
Would you like to use TypeScript (recommended)? no / yes
Which framework are you using? Vite / Nuxt / Laravel
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your tsconfig.json or jsconfig.json file? › ./tsconfig.json
Where is your global CSS file? › › src/index.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Write configuration to components.json. Proceed? > Y/n
```

### App structure

Here's the default structure of Nuxt app. You can use this as a reference:

```txt {6-16,20-21}
.
├── pages
│   ├── index.vue
│   └── dashboard.vue
├── components
│   ├── ui
│   │   ├── alert-dialog
│   │   │   ├── AlertDialog.vue
│   │   │   └── ...
│   │   ├── button
│   │   │   ├── Button.vue
│   │   │   └── ...
│   │   ├── dropdown-menu
│   │   │   ├── Dropdown.vue
│   │   │   └── ...
│   │   └── ...
│   ├── MainNav.vue
│   ├── PageHeader.vue
│   └── ...
├── lib
│   └── utils.ts
├── assets
│   ├── css
│   │   └── tailwind.css
├── app.vue
├── nuxt.config.ts
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

- I place the UI components in the `components/ui` folder.
- The rest of the components such as `<PageHeader />` and `<MainNav />` are placed in the `components` folder.
- The `lib` folder contains all the utility functions. I have a `utils.ts` where I define the `cn` helper.
- The `assets/css` folder contains the global CSS.

### That's it

You can now start adding components to your project.

```bash
npx shadcn-vue@latest add button
```

The command above will add the `Button` component to your project. Nuxt autoImport will handle importing the components, you can just use it as such:

```vue {3}
<template>
  <div>
    <Button>Click me</Button>
  </div>
</template>
```

</Steps>
