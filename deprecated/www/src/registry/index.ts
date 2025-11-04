import type { Registry } from "shadcn-vue/schema"

import { blocks } from "@/registry/registry-blocks"
// import { charts } from "@/registry/registry-charts"
import { composables } from "@/registry/registry-composables"
import { examples } from "@/registry/registry-examples"
// import { internal } from "@/registry/registry-internal"
import { lib } from "@/registry/registry-lib"
import { themes } from "@/registry/registry-themes"
import { ui } from "@/registry/registry-ui"

export const registry = {
  name: "shadcn-vue",
  homepage: "https://shadcn-vue.com",
  items: [
    {
      name: "index",
      type: "registry:style",
      dependencies: [
        "tailwindcss-animate",
        "class-variance-authority",
        "lucide-vue-next",
      ],
      registryDependencies: ["utils"],
      tailwind: {
        config: {
          plugins: ["require(\"tailwindcss-animate\")"],
        },
      },
      cssVars: {},
      files: [],
    },
    {
      name: "style",
      type: "registry:style",
      dependencies: [
        "tailwindcss-animate",
        "class-variance-authority",
        "lucide-vue-next",
      ],
      registryDependencies: ["utils"],
      tailwind: {
        config: {
          plugins: ["require(\"tailwindcss-animate\")"],
        },
      },
      cssVars: {},
      files: [],
    },
    ...ui,
    ...blocks,
    // ...charts,
    ...lib,
    ...composables,
    ...themes,

    // Internal use only.
    // ...internal,
    ...examples,
  ],
} satisfies Registry
