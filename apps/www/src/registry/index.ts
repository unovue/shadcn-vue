import type { Registry } from "./schema"
import { lib } from "./registry-lib"
import { themes } from "./registry-themes"

export const registry: Registry = [
  ...lib,
  ...themes,
]
