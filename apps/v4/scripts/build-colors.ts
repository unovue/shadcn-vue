import { promises as fs } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { baseColors } from '@/registry/_legacy-base-colors'
import { BASE_COLORS } from '@/registry/base-colors'

export async function buildColors() {
  const legacyBaseColorNames = new Set(baseColors.map(color => color.name))
  const colors = BASE_COLORS.filter(
    color => !legacyBaseColorNames.has(color.name),
  )
  const targetPath = path.join(process.cwd(), 'public/r/colors')

  await fs.mkdir(targetPath, { recursive: true })

  await Promise.all(
    colors.map(async (color) => {
      const light = color.cssVars?.light ?? {}
      const dark = color.cssVars?.dark ?? {}
      const cssVarKeys = Object.keys(light).filter(
        key => !key.startsWith('sidebar'),
      )
      const rootVars = cssVarKeys
        .map(key => `    --${key}: ${light[key]};`)
        .join('\n')
      const darkVars = cssVarKeys
        .filter(key => dark[key])
        .map(key => `    --${key}: ${dark[key]};`)
        .join('\n')

      await fs.writeFile(
        path.join(targetPath, `${color.name}.json`),
        `${JSON.stringify(
          {
            inlineColors: { light, dark },
            cssVars: { light, dark },
            cssVarsV4: color.cssVars,
            inlineColorsTemplate:
              '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n  ',
            cssVarsTemplate: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  :root {\n${rootVars}\n  }\n\n  .dark {\n${darkVars}\n  }\n}\n\n@layer base {\n  * {\n    @apply border-border;\n  }\n  body {\n    @apply bg-background text-foreground;\n  }\n}`,
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
