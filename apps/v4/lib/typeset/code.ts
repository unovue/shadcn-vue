import type { TemplateValue } from '@/lib/templates'
import type { TypesetFont } from '@/lib/typeset/fonts'

/**
 * Fontsource ships one package per family, named after the family in kebab
 * case — "IBM Plex Sans" -> @fontsource/ibm-plex-sans.
 */
export function getFontsourcePackage(font: TypesetFont) {
  return `@fontsource/${font.family.toLowerCase().replace(/\s+/g, '-')}`
}

/**
 * Nuxt loads fonts through @nuxt/fonts. Families are declared explicitly rather
 * than left to the module's CSS scan, because typeset only ever names them
 * through custom properties.
 */
export function getNuxtFontCode(fonts: TypesetFont[]) {
  return [
    '// nuxt.config.ts',
    'export default defineNuxtConfig({',
    '  modules: [\'@nuxt/fonts\'],',
    '  fonts: {',
    '    families: [',
    ...fonts.map(font => `      { name: '${font.family}', provider: 'google' },`),
    '    ],',
    '  },',
    '})',
  ].join('\n')
}

export function getFontsourceCommand(fonts: TypesetFont[]) {
  return `npm install ${fonts.map(getFontsourcePackage).join(' ')}`
}

export function getFontsourceCss(fonts: TypesetFont[]) {
  return [
    '/* main.css */',
    ...fonts.map(font => `@import "${getFontsourcePackage(font)}";`),
    '',
    ':root {',
    ...fonts.map(font => `  ${font.cssVar}: ${font.value};`),
    '}',
  ].join('\n')
}

/** The CSS vars every framework needs, whatever loaded the font files. */
export function getFontVariablesCss(fonts: TypesetFont[]) {
  return [
    '/* main.css */',
    ':root {',
    ...fonts.map(font => `  ${font.cssVar}: ${font.value};`),
    '}',
  ].join('\n')
}

export function getCommandForPackageManager(
  packageManager: 'pnpm' | 'npm' | 'yarn' | 'bun',
  command: string,
) {
  if (packageManager === 'pnpm') {
    return command.replace('npm install', 'pnpm add').replace('npx', 'pnpm dlx')
  }
  if (packageManager === 'yarn') {
    return command.replace('npm install', 'yarn add').replace('npx', 'yarn dlx')
  }
  if (packageManager === 'bun') {
    return command.replace('npm install', 'bun add').replace('npx', 'bunx --bun')
  }
  return command
}

export function isNuxt(framework: TemplateValue) {
  return framework === 'nuxt'
}
