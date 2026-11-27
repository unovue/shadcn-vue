import type { Registry } from "shadcn-vue/schema"

export const lib: Registry["items"] = [
  {
    name: "temporal",
    type: "registry:lib",
    files: [
      {
        path: "lib/temporal.ts",
        type: "registry:lib",
      },
    ],
    registryDependencies: [],
    dependencies: [
      "temporal-polyfill",
    ],
  },
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
      "cn",
    ],
  },
]
