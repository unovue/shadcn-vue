/**
 * Seed D1 database with content from the compressed SQL dump.
 *
 * Run after `nuxt build` and before `wrangler deploy`:
 *   pnpm tsx ./scripts/seed-d1.ts
 *
 * This bypasses the unreliable HTTP-triggered lazy D1 initialization
 * that can leave the database partially populated after deployments.
 */

import { execSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { gunzipSync } from 'node:zlib'

const OUTPUT_DIR = resolve(import.meta.dirname, '../.output')
const DUMP_FILE = resolve(OUTPUT_DIR, 'public/dump.content.sql')
const SEED_SQL_FILE = resolve(OUTPUT_DIR, 'seed.sql')
// Use --cwd to point wrangler at the directory containing wrangler.json
// The database argument 'DB' is the binding name defined in wrangler.json
const WRANGLER_SERVER_DIR = resolve(OUTPUT_DIR, 'server')

if (!existsSync(DUMP_FILE)) {
  console.error(`Dump file not found: ${DUMP_FILE}`)
  console.error('Run `nuxt build` first.')
  process.exit(1)
}

console.log('Decoding SQL dump...')

const compressed = readFileSync(DUMP_FILE, 'utf-8').trim()
// eslint-disable-next-line node/prefer-global/buffer
const binary = Buffer.from(compressed, 'base64')
const text = gunzipSync(binary).toString('utf-8')
const statements: string[] = JSON.parse(text)

// D1 has a 100KB per-statement limit. Strip rawbody (raw markdown, not needed for rendering)
// from oversized INSERT statements. Schema column order:
//   id, title, body, description, extension, links, meta, navigation, new, path, rawbody(10), seo, stem, __hash__
function stripRawbody(stmt: string): string {
  // Schema column order: id, title, body, description, extension, links, meta, navigation, new, path, rawbody(10), seo, stem, __hash__
  const valuesKeyword = 'VALUES ('
  const valuesIdx = stmt.indexOf(valuesKeyword)
  const pos = valuesIdx + valuesKeyword.length
  let depth = 0
  let valueCount = 0
  let rawbodyStart = -1
  let rawbodyEnd = -1
  let inString = false
  let i = pos
  while (i < stmt.length) {
    const ch = stmt[i]
    if (!inString) {
      if (ch === '\'') {
        inString = true
        i++
        continue
      }
      if (ch === '(')
        depth++
      if (ch === ')') {
        if (depth === 0)
          break
        depth--
      }
      if (ch === ',' && depth === 0) {
        valueCount++
        if (valueCount === 10)
          rawbodyStart = i + 1
        if (valueCount === 11)
          rawbodyEnd = i
      }
    }
    else {
      if (ch === '\'' && stmt[i + 1] === '\'') {
        i += 2
        continue
      }
      if (ch === '\'')
        inString = false
    }
    i++
  }
  if (rawbodyStart < 0 || rawbodyEnd < 0)
    return stmt
  return `${stmt.slice(0, rawbodyStart)}''${stmt.slice(rawbodyEnd)}`
}

const D1_STMT_LIMIT = 95_000 // bytes, conservative below D1's 100KB limit

// Strip the trailing " -- <hash>" comment from each statement
// Use INSERT OR REPLACE to safely re-run if rows already exist
const cleanStatements = statements.map((s) => {
  const parts = s.split(' -- ')
  const stmt = (parts.length > 1 ? parts.slice(0, -1).join(' -- ') : s).trim()
  let clean = stmt.startsWith('INSERT INTO ')
    ? `INSERT OR REPLACE INTO ${stmt.slice('INSERT INTO '.length)}`
    : stmt
  if (clean.length > D1_STMT_LIMIT && clean.startsWith('INSERT OR REPLACE INTO _content_content'))
    clean = stripRawbody(clean)
  return clean
})

writeFileSync(SEED_SQL_FILE, cleanStatements.join('\n'), 'utf-8')
console.log(`Written ${cleanStatements.length} SQL statements to ${SEED_SQL_FILE}`)

console.log('Seeding D1 database...')
try {
  execSync(
    `npx wrangler d1 execute DB --file "${SEED_SQL_FILE}" --remote --cwd "${WRANGLER_SERVER_DIR}" -y`,
    { stdio: 'inherit' },
  )
  console.log('D1 database seeded successfully.')
}
catch (e) {
  console.error('Failed to seed D1 database:', e)
  process.exit(1)
}
