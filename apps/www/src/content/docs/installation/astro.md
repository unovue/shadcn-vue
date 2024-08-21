---
title: Astro
description: Install and configure Astro.
---

<Steps>

### Create project

Start by creating a new Astro project:

```bash
npm create astro@latest
```

### Configure your Astro project

You will be asked a few questions to configure your project:

```txt:line-numbers
- Where should we create your new project?
./your-app-name
- How would you like to start your new project?
Choose a starter template (or Empty)
- Install dependencies?
Yes
- Do you plan to write TypeScript?
Yes
- How strict should TypeScript be?
Strict
- Initialize a new git repository? (optional)
Yes/No
```

### Add Vue to your project

Install Vue using the Astro CLI:

```bash
npx astro add vue
```

<Callout class="mt-4">

Answer `Yes` to all the question prompted by the CLI when installing Vue.

</Callout>

This will install `vue` and `@astrojs/vue` as dependencies and automatically set them up in the `astro.config.mjs` file.

### Install TypeScript

If you encounter the error `Cannot find module 'typescript'`, please proceed to install TypeScript as a dev dependency, as discussed [here](https://github.com/radix-vue/shadcn-vue/pull/118)

```bash
npm install -D typescript
```

### Add Tailwind CSS to your project

Install Tailwind CSS using the Astro CLI:

```bash
npx astro add tailwind
```

<Callout class="mt-4">

Answer `Yes` to all the question prompted by the CLI when installing Tailwind CSS.

</Callout>

This will install `tailwindcss` and `@astrojs/tailwind` as dependencies and set them up in your `astro.config.mjs` file. It will also create a `tailwind.config.mjs` file with the needed configurations.

### Edit tsconfig.json file

Add the code below to the tsconfig.json file to resolve paths:

```json:line-numbers {2-7}
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
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
Which framework are you using? Astro
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your tsconfig.json or jsconfig.json file? › ./tsconfig.json
Where is your global CSS file? › src/styles/globals.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config located? › tailwind.config.mjs
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Write configuration to components.json. Proceed? > Y/n
```

### Import the globals.css file

Import the `globals.css` file in the `src/pages/index.astro` file:

```ts:line-numbers {2}
---
import '@/styles/globals.css'
---
```

### Update astro tailwind config

To prevent serving the Tailwind base styles twice, we need to tell Astro not to apply the base styles, since we already include them in our own `globals.css` file. To do this, set the `applyBaseStyles` config option for the tailwind plugin in `astro.config.mjs` to `false`.

```ts:line-numbers {3-5}
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
```

### That's it

You can now start adding components to your project.

```bash
npx shadcn-vue@latest add button
```

The command above will add the `Button` component to your project. You can then import it like this:

```astro:line-numbers {2,10}
---
import { Button } from "@/components/ui/button"
---

<html lang="en">
 <head>
  <title>Astro</title>
 </head>
 <body>
  <Button>Hello World</Button>
 </body>
</html>
```

</Steps>
