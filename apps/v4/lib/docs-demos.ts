import type { Component } from 'vue'

// A demo is shared by every base and lives in components/demo.
// A base replaces a demo with the file of the same name in components/demo/<base>.
const demos = import.meta.glob<{ default: Component }>('@/components/demo/**/*.vue')
const sources = import.meta.glob<string>('@/components/demo/**/*.vue', { query: '?raw', import: 'default' })

function findDemo<T>(files: Record<string, T>, name: string, base?: string) {
  const file = (base && files[`/components/demo/${base}/${name}.vue`]) || files[`/components/demo/${name}.vue`]
  if (!file) {
    throw new Error(`Demo ${name} not found`)
  }
  return file
}

export function loadDemo(name: string, base?: string) {
  return findDemo(demos, name, base)()
}

export function loadDemoSource(name: string, base?: string) {
  return findDemo(sources, name, base)()
}
