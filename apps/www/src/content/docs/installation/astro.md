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
- Where should we create your new project? ./your-app-name
- How would you like to start your new project? Choose a template
- Do you plan to write TypeScript? Yes
- How strict should TypeScript be? Strict
- Install dependencies? Yes
- Initialize a new git repository? (optional) Yes/No
```

### Add Vue to your project

Install Vue using the Astro CLI:

```bash
npx astro add vue
```

<Callout class="mt-4">

Answer `Yes` to all the question prompted by the CLI when installing Vue.

</Callout>

### Add Tailwind CSS to your project

```bash
npx astro add tailwind
```

### Create a `styles/globals.css` file in the `src` folder.

```css:line-numbers title="styles/globals.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Import the `globals.css` file

Import the `styles/globals.css` file in the `src/pages/index.astro` file:

```ts:line-numbers title="src/pages/index.astro"
---
import '@/styles/globals.css'
---
```

### Update `astro.config.mjs` and set `applyBaseStyles` to `false`

To prevent serving the Tailwind base styles twice, we need to tell Astro not to apply the base styles, since we already include them in our own `globals.css` file. To do this, set the `applyBaseStyles` config option for the tailwind plugin in `astro.config.mjs` to `false`.

```js:line-numbers title="astro.config.mjs" {3-5}
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
```

### Edit tsconfig.json file

Add the following code to the `tsconfig.json` file to resolve paths:

```ts:line-numbers title="tsconfig.json" {4-9}
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

### Run the CLI

Run the `shadcn` init command to setup your project:

```bash
npx shadcn-vue@latest init
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
