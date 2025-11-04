import type { RegistryItem } from "shadcn-vue/schema"

export const lib: RegistryItem[] = [
  {
    "name": "utils",
    "type": "registry:lib",
    "dependencies": [
      "clsx",
      "tailwind-merge"
    ],
    "files": [
      {
        "path": "lib/utils.ts",
        "type": "registry:lib"
      }
    ]
  }
]

