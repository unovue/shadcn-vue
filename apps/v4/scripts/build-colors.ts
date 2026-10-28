import { promises as fs } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { baseColors } from '../registry/_legacy-base-colors'
import { BASE_COLORS } from '../registry/base-colors'

export async function buildColors(
  targetPath = path.join(process.cwd(), 'public/r/colors'),
) {
  const legacyBaseColorNames = new Set(baseColors.map(color => color.name))
  // Legacy colors already have v3-compatible artifacts and must not be overwritten.
  const colors = BASE_COLORS.filter(
    color => !legacyBaseColorNames.has(color.name),
  )

  await fs.mkdir(targetPath, { recursive: true })

  await Promise.all(
    colors.map(async (color) => {
      if (!color.cssVars) {
        throw new Error(`Base color "${color.name}" is missing cssVars.`)
      }

      await fs.writeFile(
        path.join(targetPath, `${color.name}.json`),
        `${JSON.stringify(
          {
            cssVarsV4: color.cssVars,
          },
          null,
          2,
        )}\n`,
        'utf8',
      )
    }),
  )
}

if (
  process.argv[1]
  && import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await buildColors()
}
