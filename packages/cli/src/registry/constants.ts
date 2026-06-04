import type { z } from "zod"
import type { registryConfigSchema } from "@/src/schema"

export const SHADCN_VUE_URL
  = process.env.SHADCN_VUE_URL ?? "https://shadcn-vue.com"

export const REGISTRY_URL
  = process.env.REGISTRY_URL ?? `${SHADCN_VUE_URL}/r`

export const FALLBACK_STYLE = "new-york-v4"

// Available component library bases
export const BASES = [
  {
    name: "reka",
    label: "Reka UI",
    description: "Optimized for fast development, easy maintenance, and accessibility.",
    dependencies: ["reka-ui"],
  },
] as const

// Available visual styles
export const STYLES = [
  {
    name: "vega",
    label: "Vega",
    description: "The classic shadcn/ui look. Clean, neutral, and familiar.",
  },
  {
    name: "nova",
    label: "Nova",
    description: "Reduced padding and margins for compact layouts.",
  },
  {
    name: "maia",
    label: "Maia",
    description: "Soft and rounded, with generous spacing.",
  },
  {
    name: "lyra",
    label: "Lyra",
    description: "Boxy and sharp. Pairs well with mono fonts.",
  },
  {
    name: "mira",
    label: "Mira",
    description: "Compact. Made for dense interfaces.",
  },
  {
    name: "luma",
    label: "Luma",
    description: "Fluid, luminous, and glassy.",
  },
  {
    name: "sera",
    label: "Sera",
    description: "Editorial and typographic.",
  },
] as const

// Available fonts with Google Fonts configuration.
// Names match the shadcn-vue web registry font items
// (apps/v4/registry/fonts.ts, stripped of the "font-" prefix).
export const FONTS = [
  {
    name: "inter",
    label: "Inter",
    family: "Inter",
    provider: "google" as const,
    import: "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');",
    variable: "--font-sans",
    weight: ["400", "500", "600", "700"],
  },
  {
    name: "geist-sans",
    label: "Geist",
    family: "Geist",
    provider: "google" as const,
    import: "@import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap');",
    variable: "--font-sans",
    weight: ["400", "500", "600", "700"],
  },
  {
    name: "noto-sans",
    label: "Noto Sans",
    family: "Noto Sans",
    provider: "google" as const,
    import: "@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap');",
    variable: "--font-sans",
    weight: ["400", "500", "600", "700"],
  },
  {
    name: "nunito-sans",
    label: "Nunito Sans",
    family: "Nunito Sans",
    provider: "google" as const,
    import: "@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700&display=swap');",
    variable: "--font-sans",
    weight: ["400", "500", "600", "700"],
  },
  {
    name: "figtree",
    label: "Figtree",
    family: "Figtree",
    provider: "google" as const,
    import: "@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap');",
    variable: "--font-sans",
    weight: ["400", "500", "600", "700"],
  },
  {
    name: "roboto",
    label: "Roboto",
    family: "Roboto",
    provider: "google" as const,
    import: "@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap');",
    variable: "--font-sans",
    weight: ["400", "500", "600", "700"],
  },
  {
    name: "raleway",
    label: "Raleway",
    family: "Raleway",
    provider: "google" as const,
    import: "@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap');",
    variable: "--font-sans",
    weight: ["400", "500", "600", "700"],
  },
  {
    name: "dm-sans",
    label: "DM Sans",
    family: "DM Sans",
    provider: "google" as const,
    import: "@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');",
    variable: "--font-sans",
    weight: ["400", "500", "600", "700"],
  },
  {
    name: "public-sans",
    label: "Public Sans",
    family: "Public Sans",
    provider: "google" as const,
    import: "@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap');",
    variable: "--font-sans",
    weight: ["400", "500", "600", "700"],
  },
  {
    name: "outfit",
    label: "Outfit",
    family: "Outfit",
    provider: "google" as const,
    import: "@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');",
    variable: "--font-sans",
    weight: ["400", "500", "600", "700"],
  },
  {
    name: "jetbrains-mono",
    label: "JetBrains Mono",
    family: "JetBrains Mono",
    provider: "google" as const,
    import: "@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');",
    variable: "--font-mono",
    weight: ["400", "500", "600", "700"],
  },
  {
    name: "playfair-display",
    label: "Playfair Display",
    family: "Playfair Display",
    provider: "google" as const,
    import: "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');",
    variable: "--font-serif",
    weight: ["400", "500", "600", "700", "800", "900"],
  },
] as const

// Available icon libraries
export const ICON_LIBRARIES = [
  {
    name: "lucide",
    label: "Lucide",
    packages: ["@lucide/vue"],
  },
  {
    name: "tabler",
    label: "Tabler Icons",
    packages: ["@tabler/icons-vue"],
  },
  {
    name: "hugeicons",
    label: "HugeIcons",
    packages: ["@hugeicons/vue", "@hugeicons/core-free-icons"],
  },
  {
    name: "phosphor",
    label: "Phosphor Icons",
    packages: ["@phosphor-icons/vue"],
  },
  {
    name: "remixicon",
    label: "Remix Icon",
    packages: ["@remixicon/vue"],
  },
] as const

export const BASE_COLORS = [
  { name: "neutral", label: "Neutral" },
  { name: "stone", label: "Stone" },
  { name: "zinc", label: "Zinc" },
  { name: "mauve", label: "Mauve" },
  { name: "olive", label: "Olive" },
  { name: "mist", label: "Mist" },
  { name: "taupe", label: "Taupe" },
] as const

// Built-in registries that are always available and cannot be overridden
export const BUILTIN_REGISTRIES: z.infer<typeof registryConfigSchema> = {
  "@shadcn": `${REGISTRY_URL}/styles/{style}/{name}.json`,
}

export const BUILTIN_MODULES = new Set([
  [
    // Node.js built-in modules
    // From https://github.com/sindresorhus/builtin-modules.
    "node:assert",
    "assert",
    "node:assert/strict",
    "assert/strict",
    "node:async_hooks",
    "async_hooks",
    "node:buffer",
    "buffer",
    "node:child_process",
    "child_process",
    "node:cluster",
    "cluster",
    "node:console",
    "console",
    "node:constants",
    "constants",
    "node:crypto",
    "crypto",
    "node:dgram",
    "dgram",
    "node:diagnostics_channel",
    "diagnostics_channel",
    "node:dns",
    "dns",
    "node:dns/promises",
    "dns/promises",
    "node:domain",
    "domain",
    "node:events",
    "events",
    "node:fs",
    "fs",
    "node:fs/promises",
    "fs/promises",
    "node:http",
    "http",
    "node:http2",
    "http2",
    "node:https",
    "https",
    "node:inspector",
    "inspector",
    "node:inspector/promises",
    "inspector/promises",
    "node:module",
    "module",
    "node:net",
    "net",
    "node:os",
    "os",
    "node:path",
    "path",
    "node:path/posix",
    "path/posix",
    "node:path/win32",
    "path/win32",
    "node:perf_hooks",
    "perf_hooks",
    "node:process",
    "process",
    "node:querystring",
    "querystring",
    "node:quic",
    "node:readline",
    "readline",
    "node:readline/promises",
    "readline/promises",
    "node:repl",
    "repl",
    "node:sea",
    "node:sqlite",
    "node:stream",
    "stream",
    "node:stream/consumers",
    "stream/consumers",
    "node:stream/promises",
    "stream/promises",
    "node:stream/web",
    "stream/web",
    "node:string_decoder",
    "string_decoder",
    "node:test",
    "node:test/reporters",
    "node:timers",
    "timers",
    "node:timers/promises",
    "timers/promises",
    "node:tls",
    "tls",
    "node:trace_events",
    "trace_events",
    "node:tty",
    "tty",
    "node:url",
    "url",
    "node:util",
    "util",
    "node:util/types",
    "util/types",
    "node:v8",
    "v8",
    "node:vm",
    "vm",
    "node:wasi",
    "wasi",
    "node:worker_threads",
    "worker_threads",
    "node:zlib",
    "zlib",

    // Bun built-in modules.
    "bun",
    "bun:test",
    "bun:sqlite",
    "bun:ffi",
    "bun:jsc",
    "bun:internal",
  ],
])

export const DEPRECATED_COMPONENTS = [
  {
    name: "toast",
    deprecatedBy: "sonner",
    message:
      "The toast component is deprecated. Use the sonner component instead.",
  },
  {
    name: "toaster",
    deprecatedBy: "sonner",
    message:
      "The toaster component is deprecated. Use the sonner component instead.",
  },
]
