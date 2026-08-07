import { ARTICLE_HTML } from './article'
import { CHANGELOG_HTML } from './changelog'
import { CHAT_HTML } from './chat'
import { DOCS_HTML } from './docs'
import { KITCHEN_SINK_HTML } from './elements'
import { NOTES_HTML } from './notes'
import { RECIPE_HTML } from './recipe'
import { TAILWIND_HTML } from './tailwind'

export const FIXTURES = {
  docs: DOCS_HTML,
  chat: CHAT_HTML,
  article: ARTICLE_HTML,
  changelog: CHANGELOG_HTML,
  notes: NOTES_HTML,
  recipe: RECIPE_HTML,
  elements: KITCHEN_SINK_HTML,
  tailwind: TAILWIND_HTML,
} as const

export type FixtureName = keyof typeof FIXTURES

export const CONTENT_OPTIONS = [
  { value: 'docs', label: 'Docs' },
  { value: 'chat', label: 'Chat' },
  { value: 'article', label: 'Article' },
  { value: 'changelog', label: 'Changelog' },
  { value: 'notes', label: 'Notes' },
  // { value: 'recipe', label: 'Recipe' },
  // { value: 'elements', label: 'Elements' },
] as const satisfies readonly { value: FixtureName, label: string }[]

// Testing baselines, dev-only: never built or offered in production.
export const DEV_CONTENT_OPTIONS: readonly { value: FixtureName, label: string }[] = [
  // { value: 'tailwind', label: 'Tailwind' },
]

export const AVAILABLE_CONTENT_OPTIONS: readonly { value: FixtureName, label: string }[]
  = import.meta.dev ? [...CONTENT_OPTIONS, ...DEV_CONTENT_OPTIONS] : CONTENT_OPTIONS
