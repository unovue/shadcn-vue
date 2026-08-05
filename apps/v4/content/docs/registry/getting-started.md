---
title: Getting Started
description: Learn how to get setup and run your own component registry.
---

This guide will walk you through the process of setting up your own component registry.

It assumes you already have a project with components and would like to turn it into a registry.

<!-- If you're starting a new registry project, you can use the [registry template](https://github.com/shadcn-ui/registry-template) as a starting point. We have already configured it for you. -->

## registry.json

The `registry.json` file is only required if you're using the `shadcn-vue` CLI to build your registry.

If you're using a different build system, you can skip this step as long as your build system produces valid JSON files that conform to the [registry-item schema specification](/docs/registry/registry-item-json).

<Steps>

### Add a registry.json file

Create a `registry.json` file in the root of your project. Your project can be a Nuxt, Vite, or any other project that supports Vue.

```json showLineNumbers title="registry.json"
{
  "$schema": "https://shadcn-vue.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    // ...
  ]
}
```

This `registry.json` file must conform to the [registry schema specification](/docs/registry/registry-json).

</Steps>

## Add a registry item

<Steps>

### Create your component

Add your first component. Here's an example of a simple `<HelloWorld />` component:

```vue showLineNumbers title="registry/new-york/HelloWorld/HelloWorld.vue"
<script setup lang="ts">
import { Button } from "@/components/ui/button"
</script>

<template>
  <Button>Hello World</Button>
</template>
```

<Callout class="mt-6">

  **Note:** This example places the component in the `registry/new-york`
  directory. You can place it anywhere in your project as long as you set the
  correct path in the `registry.json` file and you follow the `registry/[NAME]`
  directory structure.

</Callout>

```txt
registry
└── new-york
    └── HelloWorld
        └── HelloWorld.vue
```

<Callout class="mt-6 [&_pre]:mb-0">

  **Important:** If you're placing your component in a custom directory, make
  sure it is configured in your `tailwind.config.ts` file.

```ts showLineNumbers
// tailwind.config.ts
export default {
  content: ["./registry/**/*.{js,ts,jsx,tsx,vue}"],
}
```

</Callout>

### Add your component to the registry

To add your component to the registry, you need to add your component definition to `registry.json`.

```json showLineNumbers title="registry.json"  {6-17}
{
  "$schema": "https://shadcn-vue.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "registry/new-york/HelloWorld/HelloWorld.vue",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

You define your registry item by adding a `name`, `type`, `title`, `description` and `files`.

For every file you add, you must specify the `path` and `type` of the file. The `path` is the relative path to the file from the root of your project. The `type` is the type of the file.

You can read more about the registry item schema and file types in the [registry item schema docs](/docs/registry/registry-item-json).

</Steps>

## Build your registry

<Steps>

### Install the shadcn-vue CLI

Note: the `build` command is currently only available in the `shadcn-vue@canary` version of the CLI.

```bash
npm install shadcn-vue@latest
```

### Add a build script

Add a `registry:build` script to your `package.json` file.

```json showLineNumbers title="package.json"
{
  "scripts": {
    "registry:build": "shadcn-vue build"
  }
}
```

### Run the build script

Run the build script to generate the registry JSON files.

```bash
npm run registry:build
```

<Callout class="mt-6">

**Note:** By default, the build script will generate the registry JSON files in `public/r` e.g `public/r/hello-world.json`.

You can change the output directory by passing the `--output` option. See the [shadcn-vue build command](/docs/cli#build) for more information.

</Callout>

</Steps>

## Serve your registry

If you're running your registry on Nuxt, you can now serve your registry by running the `nuxt` server. The command might differ for other frameworks.

```bash
npm run dev
```

Your files will now be served at `http://localhost:3000/r/[NAME].json` eg. `http://localhost:3000/r/hello-world.json`.

## Publish your registry

To make your registry available to other developers, you can publish it by deploying your project to a public URL.

## Adding Auth

The `shadcn-vue` CLI does not offer a built-in way to add auth to your registry. We recommend handling authorization on your registry server.

A common simple approach is to use a `token` query parameter to authenticate requests to your registry. e.g. `http://localhost:3000/r/hello-world.json?token=[SECURE_TOKEN_HERE]`.

Use the secure token to authenticate requests and return a 401 Unauthorized response if the token is invalid. Both the `shadcn` CLI and `Open in v0` will handle the 401 response and display a message to the user.

<Callout class="mt-6">
  **Note:** Make sure to encrypt and expire tokens.
</Callout>

## Guidelines

Here are some guidelines to follow when building components for a registry.

- Place your registry item in the `registry/[STYLE]/[NAME]` directory. I'm using `new-york` as an example. It can be anything you want as long as it's nested under the `registry` directory.
- The following properties are required for the block definition: `name`, `description`, `type` and `files`.
- Make sure to list all registry dependencies in `registryDependencies`. A registry dependency is the name of the component in the registry eg. `input`, `button`, `card`, etc or a URL to a registry item eg. `http://localhost:3000/r/editor.json`.
- Make sure to list all dependencies in `dependencies`. A dependency is the name of the package in the registry eg. `zod`, `sonner`, etc. To set a version, you can use the `name@version` format eg. `zod@^3.20.0`.
- **Imports should always use the `@/registry` path.** eg. `import { HelloWorld } from "@/registry/new-york/hello-world/hello-world"`
- Ideally, place your files within a registry item in `components`, `hooks`, `lib` directories.

## Install using the CLI

To install a registry item using the `shadcn-vue` CLI, use the `add` command followed by the URL of the registry item.

```bash
npx shadcn-vue@latest add http://localhost:3000/r/hello-world.json
```

## Install from GitHub

If your registry lives in a **public** GitHub repository with a `registry.json`
at its root, you do not have to build, host or configure anything. The CLI can
read it directly:

```bash
npx shadcn-vue@latest add owner/repo/hello-world
```

The CLI resolves the repository's default branch, reads `registry.json` from the
root, finds the item by name, and fetches each of its `files[].path` from the
same commit. Every file of an item comes from one commit, so a branch that moves
mid-install cannot give you a half-updated component.

### Pinning a branch, tag or commit

Append `#ref` to install from somewhere other than the default branch:

```bash
npx shadcn-vue@latest add owner/repo/hello-world#main
npx shadcn-vue@latest add owner/repo/hello-world#v1.2.0
npx shadcn-vue@latest add owner/repo/hello-world#1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b
```

Branches win over tags when a name is ambiguous, and an annotated tag resolves to
the commit it points at.

### Listing what a repository publishes

```bash
npx shadcn-vue@latest search owner/repo
```

### Only install from repositories you trust

Adding a registry item runs third-party code on your machine. This is true of
every registry — hosted, local or GitHub — but the GitHub form is worth calling
out because it needs no configuration, so a single command from a README is
enough to install from a repository you have never looked at.

A registry item can list npm `dependencies`, which the CLI installs with your
package manager, which in turn runs that package's install scripts. It can also
write files into your project. Treat `npx shadcn-vue@latest add owner/repo/item`
with the same care as `npm install owner-repo` — read the registry first if you
do not know who owns it.

The CLI does reject `path` and `target` values that are absolute or use `..` to
escape the project, both for the item you asked for and at the point files are
written. That is a guard against mistakes and a hostile item's easiest trick; it
is not a sandbox.

### Notes

- **Item names may contain slashes.** `owner/repo/forms/login` installs the item
  *named* `forms/login` from the root `registry.json`. It is not a path to a
  nested `registry.json`.
- **The repository must be public.** `raw.githubusercontent.com` does not serve
  private repositories. Use a hosted registry with [auth](#adding-auth) instead.
- **Git is required.** The CLI shells out to `git ls-remote` to resolve the ref,
  which is what lets it find the default branch instead of guessing `main`.
- **`registryDependencies` are resolved the usual way.** A full URL is fetched
  as-is; a bare name such as `button` resolves against the default `shadcn-vue`
  registry, exactly as it does for any other registry item. Note that a
  dependency can point anywhere, so trusting a repository means trusting what it
  depends on too.

If you would rather not type the repository on every command, register a
namespace in `components.json` and install by that instead. A namespace maps to
a hosted registry URL template — not to a GitHub repository — so this is an
alternative to the GitHub form above rather than a shorthand for it:

```json title="components.json"
{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json"
  }
}
```

```bash
npx shadcn-vue@latest add @acme/hello-world
```
