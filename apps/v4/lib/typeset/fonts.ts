import { FONTS as SITE_FONTS } from '@/lib/fonts'

// Display-only faces that read poorly as body text stay out of typeset.
const EXCLUDED_FONTS: string[] = ['playfair-display']

// The pickers/preview want a small {id,label,type} plus a render value (the
// CSS font stack). `family` is the canonical Google/Bunny name that
// useFontLoader resolves @font-face rules for.
export const TYPESET_FONTS = SITE_FONTS
  .filter(font => !EXCLUDED_FONTS.includes(font.value))
  .map(font => ({
    id: font.value,
    label: font.name,
    type: font.type,
    family: font.name,
    value: font.fontFamily,
    cssVar: font.cssVar,
  }))

export type TypesetFont = (typeof TYPESET_FONTS)[number]

export function findTypesetFont(id: string | null | undefined) {
  return TYPESET_FONTS.find(font => font.id === id)
}
