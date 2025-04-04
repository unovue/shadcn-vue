---
title: Registry
description: Run your own component registry.
---

<Callout class="mt-0" >

  **Note:** This feature is currently experimental. Help us improve it by
  testing it out and sending feedback. If you have any questions, please [reach
  out to us](https://github.com/unovue/shadcn-vue/discussions).

</Callout>

You can use the `shadcn-vue` CLI to run your own component registry. Running your own registry allows you to distribute your custom components, hooks, pages, and other files to any Vue project.

Registry items are automatically compatible with the `shadcn-vue` CLI.

## Requirements

You are free to design and host your custom registry as you see fit. The only requirement is that your registry items must be valid JSON files that conform to the [registry-item schema specification](/docs/registry/registry-item-json).

<!-- If you'd like to see an example of a registry, we have a [template project](https://github.com/shadcn-ui/registry-template) for you to use as a starting point. -->
