import type { Registry } from "shadcn-vue/schema"

export const lib: Registry["items"] = [
  {
    name: "utils",
    type: "registry:lib",
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
      },
    ],
    registryDependencies: [],
    dependencies: [
      "clsx",
      "tailwind-merge",
    ],
  },
]
