/**
 * Structural match for @hugeicons' `IconSvgObject`, which the package declares
 * but does not export.
 */
export type TypesetIcon
  = | [string, Record<string, string | number>][]
    | readonly (readonly [string, { readonly [key: string]: string | number }])[]

// Hugeicons has no leading/line-height glyph, so this one is hand-drawn in the
// same 24x24 grid and stroke weight as the rest of the customizer's icons.
export const LineHeightIcon: TypesetIcon = [
  ['path', { 'd': 'M4.5 3.5H19.5', 'stroke': 'currentColor', 'stroke-linecap': 'round', 'stroke-width': '1.5' }],
  ['path', { 'd': 'M4.5 20.5H19.5', 'stroke': 'currentColor', 'stroke-linecap': 'round', 'stroke-width': '1.5' }],
  [
    'path',
    {
      'd': 'M17 17L14.8905 11.4741C13.9109 8.90801 13.4211 7.625 12.625 7.625C11.8289 7.625 11.3391 8.90801 10.3595 11.4741L8.25 17',
      'stroke': 'currentColor',
      'stroke-linecap': 'round',
      'stroke-width': '1.5',
    },
  ],
  ['path', { 'd': 'M9.5 13H15.75', 'stroke': 'currentColor', 'stroke-linecap': 'round', 'stroke-width': '1.5' }],
]
