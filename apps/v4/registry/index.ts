import type { Registry } from "shadcn-vue/schema"
import { registryItemSchema } from "shadcn-vue/schema"
import { z } from "zod"

import { themes } from "~/registry/_legacy-themes"
import { blocks } from "~/registry/new-york-v4/blocks/_registry"
import { charts } from "~/registry/new-york-v4/charts/_registry"
import { examples } from "~/registry/new-york-v4/examples/_registry"
import { lib } from "~/registry/new-york-v4/lib/_registry"
import { ui } from "~/registry/new-york-v4/ui/_registry"

const DEPRECATED_ITEMS = [
  "toast",
  "toast-demo",
  "toast-destructive",
  "toast-simple",
  "toast-with-action",
  "toast-with-title",
]

// Shared between index and style for backward compatibility.
const NEW_YORK_V4_STYLE = {
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
        ...NEW_YORK_V4_STYLE,
      },
      {
        name: "style",
        ...NEW_YORK_V4_STYLE,
      },
      ...ui,
      ...blocks,
      ...charts,
      ...lib,
      // ...composables,
      ...themes,
      ...examples,
      // ...internal,
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
          // we are not deleting tailwind meta
          // delete item.tailwind
        }

        return item
      }),
  ),
} satisfies Registry
