// Standalone runner for buildStyles — used during verification without running
// the full registry build pipeline. Safe to delete at any time.
import { buildStyles } from './lib/build-styles'

buildStyles().catch((err) => {
  console.error('❌ buildStyles failed:', err)
  process.exit(1)
})
