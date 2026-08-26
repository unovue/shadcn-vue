import { mkdtemp, readdir, readFile, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { baseColors } from '../registry/_legacy-base-colors'
import { BASE_COLORS } from '../registry/base-colors'
import { buildColors } from './build-colors'

const legacyBaseColorNames = new Set(baseColors.map(color => color.name))
const v4OnlyBaseColors = BASE_COLORS.filter(
  color => !legacyBaseColorNames.has(color.name),
)

describe('base color registry artifacts', () => {
  it('has a committed artifact for every supported base color', async () => {
    const files = await readdir(path.join(process.cwd(), 'public/r/colors'))

    expect(files).toEqual(
      expect.arrayContaining(
        BASE_COLORS.map(color => `${color.name}.json`),
      ),
    )
  })

  it('generates committed v4-only artifacts', async () => {
    const targetPath = await mkdtemp(path.join(os.tmpdir(), 'shadcn-vue-colors-'))

    try {
      await buildColors(targetPath)

      expect((await readdir(targetPath)).sort()).toEqual(
        v4OnlyBaseColors.map(color => `${color.name}.json`).sort(),
      )

      for (const color of v4OnlyBaseColors) {
        const fileName = `${color.name}.json`
        const [generated, committed] = await Promise.all([
          readFile(path.join(targetPath, fileName), 'utf8'),
          readFile(path.join(process.cwd(), 'public/r/colors', fileName), 'utf8'),
        ])

        expect(generated).toBe(committed)
        expect(JSON.parse(generated)).toEqual({ cssVarsV4: color.cssVars })
      }
    }
    finally {
      await rm(targetPath, { recursive: true, force: true })
    }
  })
})
