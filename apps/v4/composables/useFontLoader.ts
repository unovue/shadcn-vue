import type { FontFaceData, LocalFontSource, RemoteFontSource, Unifont } from 'unifont'

// Families already emitted globally by @nuxt/fonts (see `fonts.families` in nuxt.config.ts).
// Loading them again through unifont would be wasteful and could duplicate faces.
const EAGER_FAMILIES = new Set(['Geist', 'Geist Mono'])

// Weight set requested per font. Bunny only returns the weights it actually has.
const DEFAULT_WEIGHTS = ['400', '500', '600', '700']

// Module-level singletons so every caller shares one unifont instance, one
// "already loaded" set, and one in-flight map (dedupe across the whole app).
let unifontPromise: Promise<Unifont> | null = null
const loaded = new Set<string>()
const inFlight = new Map<string, Promise<void>>()

// unifont (and its css-tree dependency) is only pulled into the bundle for pages
// that actually resolve a non-default font — hence the dynamic import.
async function getUnifont(): Promise<Unifont> {
  if (!unifontPromise) {
    unifontPromise = (async () => {
      const { createUnifont, providers } = await import('unifont')
      return createUnifont([providers.bunny()])
    })()
  }
  return unifontPromise
}

function isLocalSource(source: RemoteFontSource | LocalFontSource): source is LocalFontSource {
  return 'name' in source
}

function buildFontFaceRule(family: string, face: FontFaceData): string {
  const src = face.src
    .map((source) => {
      if (isLocalSource(source)) {
        return `local('${source.name}')`
      }
      return `url(${source.url})${source.format ? ` format('${source.format}')` : ''}`
    })
    .join(', ')

  // Keep the family name verbatim so it matches the string useDesignSystemProvider
  // writes into --font-sans / --font-heading (e.g. 'Inter', sans-serif).
  const declarations = [
    `font-family: '${family}';`,
    `src: ${src};`,
    `font-display: ${face.display ?? 'swap'};`,
  ]

  if (face.weight != null) {
    const weight = Array.isArray(face.weight) ? face.weight.join(' ') : face.weight
    declarations.push(`font-weight: ${weight};`)
  }
  if (face.style) {
    declarations.push(`font-style: ${face.style};`)
  }
  if (face.stretch) {
    declarations.push(`font-stretch: ${face.stretch};`)
  }
  if (face.unicodeRange?.length) {
    declarations.push(`unicode-range: ${face.unicodeRange.join(', ')};`)
  }

  return `@font-face {\n  ${declarations.join('\n  ')}\n}`
}

async function resolveAndInject(family: string): Promise<void> {
  const unifont = await getUnifont()
  const result = await unifont.resolveFont(family, {
    weights: DEFAULT_WEIGHTS,
    styles: ['normal'],
    subsets: ['latin'],
  })

  if (!result?.fonts?.length) {
    console.warn(`[useFontLoader] No font faces resolved for "${family}"`)
    return
  }

  const css = result.fonts.map(face => buildFontFaceRule(family, face)).join('\n')
  const style = document.createElement('style')
  style.dataset.font = family
  style.textContent = css
  document.head.appendChild(style)
}

/**
 * Loads a font's @font-face declarations on demand via unifont (Bunny provider)
 * and injects them into the document head. Deduped, non-blocking, client-only.
 * Family names must match the Bunny/Google canonical names in lib/fonts.ts.
 */
export function useFontLoader() {
  async function loadFont(family?: string | null): Promise<void> {
    if (!import.meta.client || !family || family === 'inherit') {
      return
    }
    if (EAGER_FAMILIES.has(family) || loaded.has(family)) {
      return
    }
    // Guard against a previously injected <style> surviving (e.g. HMR / re-entry).
    if (document.head.querySelector(`style[data-font="${CSS.escape(family)}"]`)) {
      loaded.add(family)
      return
    }

    let promise = inFlight.get(family)
    if (!promise) {
      promise = resolveAndInject(family)
        .then(() => {
          loaded.add(family)
        })
        .catch((error) => {
          // Non-blocking: the CSS var is still set and the family falls back
          // through the existing font stack.
          console.warn(`[useFontLoader] Failed to load font "${family}":`, error)
        })
        .finally(() => {
          inFlight.delete(family)
        })
      inFlight.set(family, promise)
    }
    return promise
  }

  return { loadFont }
}
