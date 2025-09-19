import type { Registry } from "shadcn-vue/schema"
import { registryItemSchema } from "shadcn-vue/schema"
import { z } from "zod"

import { blocks } from "./registry-blocks"
import { charts } from "./registry-charts"
import { composables } from "./registry-composables"
import { examples } from "./registry-examples"
import { internal } from "./registry-internal"
import { lib } from "./registry-lib"
import { themes } from "./registry-themes"
import { ui } from "./registry-ui"

const DEPRECATED_ITEMS = [
  "toast",
  "toast-demo",
  "toast-destructive",
  "toast-simple",
  "toast-with-action",
  "toast-with-title",
]

// Shared style configuration similar to shadcn-ui's NEW_YORK_V4_STYLE
const DEFAULT_V4_STYLE = {
  type: "registry:style",
  dependencies: ["class-variance-authority", "lucide-vue-next"],
  devDependencies: ["tw-animate-css"],
  registryDependencies: ["utils"],
  cssVars: {},
  files: [],
}

export const registry = {
  name: "shadcn-vue",
  homepage: "https://shadcn-vue.com",
  items: z.array(registryItemSchema).parse(
    [
      {
        name: "index",
        ...DEFAULT_V4_STYLE,
      },
      {
        name: "style",
        ...DEFAULT_V4_STYLE,
      },
      ...ui,
      ...blocks,
      ...charts,
      ...lib,
      ...composables,
      ...themes,
      ...examples,
      ...internal,
    ]
      .filter((item) => {
        return !DEPRECATED_ITEMS.includes(item.name)
      })
      .map((item) => {
        // Temporary fix for dashboard-01.
        if (item.name === "dashboard-01") {
          item.dependencies?.push("@tabler/icons-vue")
        }

        if (item.name === "accordion" && "tailwind" in item) {
          delete item.tailwind
        }

        return item
      }),
  ),
} satisfies Registry
