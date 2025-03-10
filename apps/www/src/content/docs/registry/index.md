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

<figure class="flex flex-col gap-4">
  <VPImage
    width="1432"
    height="960"
    alt="Registry"
    :image="{
      dark: '/images/registry-dark.svg',
      light: '/images/registry-light.svg',
    }"
    class="border dark:hidden shadow-sm rounded-lg overflow-hidden mt-6 w-full"
  />
  <figcaption class="text-center text-sm text-gray-500">
    Distribute code to any Vue project.
  </figcaption>
</figure>

Registry items are automatically compatible with the `shadcn-vue` CLI.

## Requirements

You are free to design and host your custom registry as you see fit. The only requirement is that your registry items must be valid JSON files that conform to the [registry-item schema specification](/docs/registry/registry-item-json).

<!-- If you'd like to see an example of a registry, we have a [template project](https://github.com/shadcn-ui/registry-template) for you to use as a starting point. -->
