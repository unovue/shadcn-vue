import { z } from "zod"

export const blockChunkSchema = z.object({
  name: z.string(),
  description: z.string(),
  component: z.any(),
  file: z.string(),
  code: z.string().optional(),
  container: z
    .object({
      className: z.string().nullish(),
    })
    .optional(),
})

export const registryItemTypeSchema = z.enum([
  "registry:style",
  "registry:lib",
  "registry:example",
  "registry:block",
  "registry:component",
  "registry:ui",
  "registry:hook",
  "registry:theme",
  "registry:page",
])

export const registryItemFileSchema = z.object({
  path: z.string(),
  content: z.string().optional(),
  type: registryItemTypeSchema,
  target: z.string().optional(),
})

export const registryItemTailwindSchema = z.object({
  config: z.object({
    content: z.array(z.string()).optional(),
    theme: z.record(z.string(), z.any()).optional(),
    plugins: z.array(z.string()).optional(),
  }),
})

export const registryItemCssVarsSchema = z.object({
  theme: z.record(z.string(), z.string()).optional(),
  light: z.record(z.string(), z.string()).optional(),
  dark: z.record(z.string(), z.string()).optional(),
})

export const registryItemCssSchema = z.record(
  z.string(),
  z.lazy(() =>
    z.union([
      z.string(),
      z.record(
        z.string(),
        z.union([z.string(), z.record(z.string(), z.string())]),
      ),
    ]),
  ),
)

export const registryItemSchema = z.object({
  name: z.string(),
  type: registryItemTypeSchema,
  description: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryItemFileSchema).optional(),
  tailwind: registryItemTailwindSchema.optional(),
  cssVars: registryItemCssVarsSchema.optional(),
  css: registryItemCssSchema.optional(),
  meta: z.record(z.string(), z.any()).optional(),
  docs: z.string().optional(),
  categories: z.array(z.string()).optional(),
})

export const registryEntrySchema = registryItemSchema.extend({
  category: z.string().optional(),
  subcategory: z.string().optional(),
})

export const registrySchema = z.array(registryEntrySchema)

export type RegistryEntry = z.infer<typeof registryEntrySchema>

export type Registry = z.infer<typeof registrySchema>

export type RegistryFiles = z.infer<typeof registryItemFileSchema>

export const blockSchema = registryEntrySchema.extend({
  type: z.literal("registry:block"),
  style: z.enum(["default", "new-york"]),
  component: z.any(),
  raw: z.any(),
  container: z
    .object({
      height: z.string().nullish(),
      className: z.string().nullish(),
    })
    .optional(),
  files: z.array(registryItemFileSchema.extend({
    raw: z.any(),
  })).optional(),
  code: z.string(),
  highlightedCode: z.string(),
})

export type Block = z.infer<typeof blockSchema>

export type BlockChunk = z.infer<typeof blockChunkSchema>
