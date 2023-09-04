---
title: CLI
description: Use the CLI to add components to your project.
---

## init

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `cn` util, configures `tailwind.config.cjs`, and creates CSS variables for the project.

```bash
npx shadcn-vue@latest init
```

You will be asked a few questions to configure `components.json`:

```txt showLineNumbers
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › src/app.postcss
Where is your tailwind.config.[cjs|js|ts] located? › tailwind.config.js
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
```

### Options

```txt
Usage: shadcn-vue init [options]

initialize your project and install dependencies

Options:
  -y, --yes        skip confirmation prompt. (default: false)
  -c, --cwd <cwd>  the working directory. (default: the current directory)
  -h, --help       display help for command
```

## add

Use the `add` command to add components and dependencies to your project.

```bash
npx shadcn-vue@latest add [component]
```

You will be presented with a list of components to choose from:

```txt
Which components would you like to add? › Space to select. Return to submit.

◯  accordion
◯  alert
◯  alert-dialog
◯  aspect-ratio
◯  avatar
◯  badge
◯  button
◯  card
◯  checkbox
◯  collapsible
```

### Options

```txt
Usage: shadcn-vue add [options] [components...]

add components to your project

Arguments:
  components         name of components

Options:
  --nodep            disable adding & installing dependencies (advanced) (default: false)
  -y, --yes          Skip confirmation prompt. (default: false)
  -o, --overwrite    overwrite existing files. (default: false)
  -c, --cwd <cwd>    the working directory. (default: the current directory)
  -p, --path <path>  the path to add the component to.
  -h, --help         display help for command
```

## update

Use the `update` command to update components in your project. This will overwrite any modifications you've made to the components, so be sure to commit your changes before running this command.

We plan on improving this command in the future to improve the update experience.

```txt
Usage: shadcn-vue update [options] [components...]

update components in your project

Arguments:
  components       name of components

Options:
  -c, --cwd <cwd>  the working directory. (default: the current directory)
  -h, --help       display help for command
```