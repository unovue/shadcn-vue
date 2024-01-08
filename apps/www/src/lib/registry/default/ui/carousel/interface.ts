import type {
  EmblaCarouselType as CarouselApi,
  EmblaOptionsType as CarouselOptions,
  EmblaPluginType as CarouselPlugin,
} from 'embla-carousel'
import type { HTMLAttributes } from 'vue'

export interface CarouselProps {
  opts?: CarouselOptions
  plugins?: CarouselPlugin[]
  orientation?: 'horizontal' | 'vertical'
}

export interface CarouselEmits {
  (e: 'init-api', payload: CarouselApi): void
}

export interface WithClassAsProps {
  class?: HTMLAttributes['class']
}
