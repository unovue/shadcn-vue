import type { Registry } from "shadcn-vue/schema"
import { registryItemSchema } from "shadcn-vue/schema"
import { z } from "zod"
import { blocks } from "@/registry/bases/reka/blocks/_registry"

import { examples } from "@/registry/bases/reka/examples/_registry"
import { lib } from "@/registry/bases/reka/lib/_registry"
import { ui } from "@/registry/bases/reka/ui/_registry"
import { fonts } from "@/registry/fonts"

export const registry = {
  name: "reka",
  homepage: "https://shadcn-vue.com",
  items: z
    .array(registryItemSchema)
    .parse([
      ...ui,
      ...blocks,
      ...examples,
      ...lib,
      ...fonts,
    ]),
} satisfies Registry
