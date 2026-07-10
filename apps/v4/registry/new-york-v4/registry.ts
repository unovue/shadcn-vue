import type { Registry } from "shadcn-vue/schema"
import { registryItemSchema } from "shadcn-vue/schema"
import { z } from "zod"
import { fonts } from "@/registry/fonts"

import { blocks } from "@/registry/new-york-v4/blocks/_registry"
import { charts } from "@/registry/new-york-v4/charts/_registry"
import { ui } from "@/registry/new-york-v4/ui/_registry"

export const registry = {
  name: "new-york-v4",
  homepage: "https://shadcn-vue.com",
  items: z
    .array(registryItemSchema)
    .parse([
      ...ui,
      ...blocks,
      ...charts,
      ...fonts,
    ]),
} satisfies Registry
