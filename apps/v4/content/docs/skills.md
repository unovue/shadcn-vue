---
title: Skills
description: Give your AI assistant deep knowledge of shadcn-vue components, patterns, and best practices.
---

Skills give AI assistants like Claude Code project-aware context about shadcn-vue. When installed, your AI assistant knows how to find, install, compose, and customize components using the correct APIs and patterns for your project.

For example, you can ask your AI assistant to:

- _"Add a login form with email and password fields."_
- _"Create a settings page with a form for updating profile information."_
- _"Build a dashboard with a sidebar, stats cards, and a data table."_
- _"Switch to --preset [CODE]"_

The skill reads your project's `components.json` and provides the assistant with your framework, aliases, installed components, icon library, and base library so it can generate correct code on the first try.

---

## Install

```bash
npx skills add unovue/shadcn-vue
```

This installs the shadcn-vue skill into your project. Once installed, your AI assistant automatically loads it when working with shadcn-vue components.

Learn more about skills at [skills.sh](https://skills.sh).

---

## What's Included

The skill provides your AI assistant with the following knowledge:

### Project Context

On every interaction, the skill runs `shadcn-vue info --json` to get your project's configuration: framework, Tailwind version, aliases, base library (`reka`), icon library, installed components, and resolved file paths.

### CLI Commands

Full reference for all CLI commands: `init`, `add`, `search`, `view`, `docs`, `diff`, `info`, and `build`. Includes flags, smart merge workflows, presets, and templates.

### Theming and Customization

How CSS variables, OKLCH colors, dark mode, custom colors, border radius, and component variants work. Includes guidance for both Tailwind v3 and v4.

### Registry Authoring

How to build and publish custom component registries: `registry.json` format, item types, file objects, dependencies, CSS variables, building, hosting, and user configuration.

### MCP Server

Setup and tools for the shadcn-vue MCP server, which lets AI assistants search, browse, and install components from registries.

---

## How It Works

1. **Project detection** — The skill activates when it finds a `components.json` file in your project.
2. **Context injection** — It runs `shadcn-vue info --json` to read your project configuration and injects the result into the assistant's context.
3. **Pattern enforcement** — The assistant follows shadcn-vue composition rules: using `FieldGroup` for forms, `ToggleGroup` for option sets, semantic colors, and correct base-specific APIs.
4. **Component discovery** — The assistant uses `shadcn-vue docs`, `shadcn-vue search`, or MCP tools to find components and their documentation before generating code.

## Learn More

- [CLI](/docs/06.cli) — Full CLI command reference
- [MCP Server](/docs/mcp) — Connect the MCP server for registry access
- [Theming](/docs/04.theming) — CSS variables and customization
- [Registry](/docs/registry) — Building and publishing custom registries
- [skills.sh](https://skills.sh) — Learn more about AI skills
