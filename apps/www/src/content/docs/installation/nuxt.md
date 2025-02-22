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

<Callout>

If you encounter the error `ERROR: Cannot read properties of undefined (reading 'sys') (x4)`, please proceed to install TypeScript as a dependency, as advised in this [issue](https://github.com/nuxt/nuxt/issues/20936)

```bash
npm install -D typescript
```

</Callout>

### Add Tailwind and its configuration

Install `@nuxtjs/tailwindcss` module:

```bash
npm install --save-dev @nuxtjs/tailwindcss
```

Add the module to the `modules` section of `nuxt.config.{ts,js}`:

```ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})
```

Create `tailwind.config.js` with the template below:

```bash
/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add this import header in your main css file, `assets/css/tailwind.css` in our case:

```css:line-numbers {1-3}
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ... */
```

### Add `Nuxt` module

Due to Nuxt auto-import feature, if you skip this step you will observe many warning in console.

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
    const veeValidate = await tryResolveModule('vee-validate');
    const vaulVue = await tryResolveModule('vaul-vue');

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

    if (veeValidate !== undefined) {
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

    if(vaulVue !== undefined) {
      ['DrawerPortal', 'DrawerTrigger', 'DrawerClose'].forEach((item) => {
        addComponent({
          filePath: 'vaul-vue',
          export: item,
          name: prefix + item,
          priority: 999,
        });
      })
    }

    addComponent({
      filePath: 'reka-ui',
      export: 'PaginationRoot',
      name: `${prefix}Pagination`,
      priority: 999,
    });

    addComponent({
      filePath: 'reka-ui',
      export: 'PaginationList',
      name: `${prefix}PaginationList`,
      priority: 999,
    });

    addComponent({
      filePath: 'reka-ui',
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
Which style would you like to use? › New York
Which color would you like to use as base color? › Zinc
Do you want to use CSS variables for colors? › no / yes
```

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
