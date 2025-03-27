---
title: Nuxt
description: Install and configure Nuxt.
---

<Callout class="bg-blue-50 border-blue-600 dark:border-blue-900 dark:bg-blue-950 mt-0 mb-6 [&_code]:bg-blue-100 dark:[&_code]:bg-blue-900">

  **Note:** The following guide is for Tailwind v4. If you are using Tailwind
  v3, use `shadcn-vue@1.0.3`.

</Callout>

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

### Add Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

Replace everything in `assets/css/tailwind.css` with the following:

```css title="assets/css/tailwind.css"
@import "tailwindcss";
```

Update `nuxt.config.ts` with the following:

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  // ...
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
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
  // ...
  modules: ['shadcn-nuxt'],
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

### Run Nuxt Prepare

If you are initiating a new project, you need to run the command so that Nuxt generates the necessary `.nuxt` folder:

```bash
npx nuxi prepare
```

### Run the CLI

Run the `shadcn-vue` init command to setup your project:

```bash
npx shadcn-vue@latest init
```

You will be asked a few questions to configure `components.json`.

```txt
Which color would you like to use as base color? › Neutral
```

### Add Components

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
