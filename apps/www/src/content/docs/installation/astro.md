---
title: Astro
description: Install and configure Astro.
---

<Callout class="bg-blue-50 border-blue-600 dark:border-blue-900 dark:bg-blue-950 mt-0 mb-6 [&_code]:bg-blue-100 dark:[&_code]:bg-blue-900">

  **Note:** The following guide is for Tailwind v4. If you are using Tailwind
  v3, use `shadcn-vue@1.0.3`.

</Callout>

<Steps>

### Create project

Start by creating a new Astro project:

```bash
npx create-astro@latest astro-app  --template with-tailwindcss --install --add vue --git
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

### Add Components

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
