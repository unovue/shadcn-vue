import {
  type EmblaOptionsType as CarouselOptions,
  type EmblaPluginType as CarouselPlugin,
} from 'embla-carousel-vue'

export interface CarouselProps {
  opts?: CarouselOptions
  plugins?: CarouselPlugin[]
  orientation?: 'horizontal' | 'vertical'
}
