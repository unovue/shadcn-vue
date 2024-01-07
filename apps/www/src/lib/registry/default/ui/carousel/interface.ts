import type {
  EmblaCarouselType as CarouselApi,
  EmblaOptionsType as CarouselOptions,
  EmblaPluginType as CarouselPlugin,
} from 'embla-carousel'

export interface CarouselProps {
  opts?: CarouselOptions
  plugins?: CarouselPlugin[]
  orientation?: 'horizontal' | 'vertical'
}

export interface CarouselEmits {
  (e: 'init-api', payload: CarouselApi): void
}
