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
npm create nuxt@latest
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

  or install `@nuxtjs/tailwindcss@7.0.0-beta.1` or newer

  ```bash
  npm install tailwindcss @nuxtjs/tailwindcss@7.0.0-beta.1
  ```

  For Nuxt v4: `app/assets/css/tailwind.css`<br>
  For Nuxt v3: `assets/css/tailwind.css`<br><br>
  Replace everything in `tailwind.css` with the following:

  ```css
  @import "tailwindcss";
  ```

  Update `nuxt.config.ts` with the following:

  <TabsMarkdown>

  <TabMarkdown title="@tailwindcss/vite">

  ```ts
  import tailwindcss from '@tailwindcss/vite'

  export default defineNuxtConfig({
    // ...
    css: ['~/assets/css/tailwind.css'],
    vite: {
      plugins: [
        tailwindcss(),
      ],
    },
  })
  ```

  </TabMarkdown>

  <TabMarkdown title="@nuxtjs/tailwindcss">

  ```ts
  export default defineNuxtConfig({
    // ...
    modules: ['@nuxtjs/tailwindcss'],
  })
  ```

  </TabMarkdown>

  </TabsMarkdown>

### Add `Nuxt` module

Skipping this step triggers numerous console warnings due to Nuxt's auto-import feature.

<TabsMarkdown>
  <TabMarkdown title="shadcn-nuxt">

  Install the package below.

  ```bash
 npx nuxi@latest module add shadcn-nuxt
  ```

  </TabMarkdown>

  <TabMarkdown title="manual">

Install the `@types/node`

```bash
npm install -D @types/node
```

Add the following code to `modules/shadcn.ts`.

```ts
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import {
  addComponentExports,
  addComponentsDir,
  createResolver,
  defineNuxtModule,
} from 'nuxt/kit'

export interface ShadcnVueOptions {
  /**
   * Prefix for all the imported component
   * @default "Ui"
   */
  prefix: string

  /**
   * Directory that the component lives in.
   * @default "@/components/ui"
   */
  componentDir: string
}

export default defineNuxtModule<ShadcnVueOptions>({
  defaults: {
    prefix: 'Ui',
    componentDir: '@/components/ui',
  },
  meta: {
    name: 'ShadcnVue',
    configKey: 'shadcn',
    version: '0.0.1',
    compatibility: {
      nuxt: '>=3.17.0',
    },
  },
  async setup({ componentDir, prefix }, nuxt) {
    const COMPONENT_DIR_PATH = componentDir!
    const ROOT_DIR_PATH = nuxt.options.rootDir
    const { resolve, resolvePath } = createResolver(ROOT_DIR_PATH)

    const componentsPath = await resolvePath(COMPONENT_DIR_PATH)

    addComponentsDir({
      path: componentsPath,
      extensions: [],
      ignore: ['**/*'],
    }, {
      prepend: true,
    })

    try {
      await Promise.all(readdirSync(componentsPath).map(async (dir) => {
        try {
          const filePath = await resolvePath(join(COMPONENT_DIR_PATH, dir, 'index'), { extensions: ['.ts', '.js'] })

          addComponentExports({
            prefix,
            filePath: resolve(filePath),
            priority: 1,
          })
        }
        catch (err) {
          if (err instanceof Error)
            console.warn('Module error: ', err.message)
        }
      }))
    }
    catch (err) {
      if (err instanceof Error)
        console.warn(err.message)
    }
  },
})
```

  </TabMarkdown>
</TabsMarkdown>

### Add a Nuxt Plugin for providing ssrWidth

Some components require a ssrWidth to be set through VueUse to avoid Hydration errors on mobile.

Add the following plugin to your Nuxt application:<br>
For Nuxt v4: `app/plugins/ssr-width.ts`<br>
For Nuxt v3: `plugins/ssr-width.ts`

Read more about [`useSSRWidth`](https://vueuse.org/core/useSSRWidth/)

```ts
import { provideSSRWidth } from '@vueuse/core'

export default defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(1024, nuxtApp.vueApp)
})
```

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
  },
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
