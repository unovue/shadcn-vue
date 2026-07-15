// Standalone runner for buildStylesRegistry — publishes per-style registry
// JSON to public/r/styles/reka-*. Safe to delete at any time.
import { buildStylesRegistry } from './lib/build-styles-registry'

buildStylesRegistry().catch((err) => {
  console.error('❌ buildStylesRegistry failed:', err)
  process.exit(1)
})
