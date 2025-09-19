import type { Registry } from "shadcn-vue/schema"

export const ui: Registry["items"] = [
  {
    name: "accordion",
    type: "registry:ui",
    dependencies: ["reka-ui"],
    files: [
      {
        path: "ui/accordion/Accordion.vue",
        type: "registry:ui",
      },
      {
        path: "ui/accordion/AccordionContent.vue",
        type: "registry:ui",
      },
      {
        path: "ui/accordion/AccordionItem.vue",
        type: "registry:ui",
      },
      {
        path: "ui/accordion/AccordionTrigger.vue",
        type: "registry:ui",
      },
      {
        path: "ui/accordion/index.ts",
        type: "registry:ui",
      },
    ],
  },
]
