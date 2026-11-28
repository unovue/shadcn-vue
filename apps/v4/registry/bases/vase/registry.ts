import type { Registry } from "shadcn-vue/schema"
import { registryItemSchema } from "shadcn-vue/schema"
import { z } from "zod"
import { blocks } from "@/registry/bases/vase/blocks/_registry"

import { examples } from "@/registry/bases/vase/examples/_registry"
import { lib } from "@/registry/bases/vase/lib/_registry"
import { ui } from "@/registry/bases/vase/ui/_registry"
import { fonts } from "@/registry/fonts"

export const registry = {
  name: "vase",
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
