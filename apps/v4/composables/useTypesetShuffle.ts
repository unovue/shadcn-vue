import type { TypesetSearchParams } from '@/lib/typeset/params'
import { TYPESET_FONTS } from '@/lib/typeset/fonts'
import {
  TYPESET_FLOWS,
  TYPESET_LEADINGS,
  TYPESET_MEASURES,
  TYPESET_SIZES,
} from '@/lib/typeset/params'

function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!
}

export function useTypesetShuffle() {
  const { locks } = useTypesetLocks()
  const { setParams, resetParams } = useTypesetSearchParams()

  /**
   * Randomize the type design (fonts + size/measure/rhythm). Leaves `item` (the
   * specimen) alone; locked params keep their current value.
   */
  function shuffle() {
    const bodyFonts = TYPESET_FONTS
      .filter(font => font.type !== 'mono')
      .map(font => font.id)
    const monoFonts = TYPESET_FONTS
      .filter(font => font.type === 'mono')
      .map(font => font.id)

    const next: Partial<TypesetSearchParams> = {
      body: randomItem(bodyFonts),
      heading: randomItem(['inherit', ...bodyFonts]),
      mono: randomItem(monoFonts),
      scale: randomItem(TYPESET_SIZES).value,
      measure: randomItem(TYPESET_MEASURES).value,
      leading: randomItem(TYPESET_LEADINGS).value,
      flow: randomItem(TYPESET_FLOWS).value,
    }

    for (const param of locks.value) {
      delete next[param]
    }

    setParams(next)
  }

  return { shuffle, reset: resetParams }
}
