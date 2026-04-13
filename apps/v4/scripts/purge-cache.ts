/**
 * Purge Cloudflare edge cache after deployment.
 *
 * Run after `wrangler deploy` so fresh API/raw responses are served
 * instead of stale edge-cached versions from the previous build.
 *
 * Required env vars:
 *   CLOUDFLARE_API_TOKEN - token with "Zone:Cache Purge" permission
 *   CLOUDFLARE_ZONE_ID   - zone id for the site's domain
 */

import process from 'node:process'

const CLOUDFLARE_PURGE_TOKEN = process.env.CLOUDFLARE_PURGE_TOKEN
const CLOUDFLARE_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID

if (!CLOUDFLARE_PURGE_TOKEN || !CLOUDFLARE_ZONE_ID) {
  console.error('Missing CLOUDFLARE_PURGE_TOKEN or CLOUDFLARE_ZONE_ID — skipping cache purge.')
  process.exit(0)
}

console.log('Purging Cloudflare edge cache...')

const res = await fetch(
  `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/purge_cache`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CLOUDFLARE_PURGE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ purge_everything: true }),
  },
)

const body = await res.json() as { success: boolean, errors?: Array<{ message: string }> }

if (!res.ok || !body.success) {
  console.error('Cache purge failed:', body.errors ?? res.statusText)
  process.exit(1)
}

console.log('Cache purged successfully.')
