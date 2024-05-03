---

## title: Carousel description: A carousel with motion and swipe built using Embla. source: apps/www/src/lib/registry/default/ui/carousel primitive: <https://www.embla-carousel.com/api>

&lt;ComponentPreview name="CarouselDemo" /&gt;

## About

The carousel component is built using the [Embla Carousel](https://www.embla-carousel.com/) library.

## Installation

```bash
npx shadcn-vue@latest add carousel
```

## Usage

```vue
<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
</script>

<template>
  <Carousel>
    <CarouselDotButtons />
    <CarouselContent>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
```

## Examples

### Sizes

To set the size of the items, you can use the `basis` utility class on the `<CarouselItem />`.

&lt;ComponentPreview name="CarouselSize" /&gt;

Example

```vue:line-numbers
// 33% of the carousel width.
<Carousel>
  <CarouselContent>
    <CarouselItem class="basis-1/3">...</CarouselItem>
    <CarouselItem class="basis-1/3">...</CarouselItem>
    <CarouselItem class="basis-1/3">...</CarouselItem>
  </CarouselContent>
</Carousel>
```

Responsive

```vue:line-numbers
// 50% on small screens and 33% on larger screens.
<Carousel>
  <CarouselContent>
    <CarouselItem class="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
    <CarouselItem class="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
    <CarouselItem class="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
  </CarouselContent>
</Carousel>
```

### Spacing

To set the spacing between the items, we use a `pl-[VALUE]` utility on the `<CarouselItem />` and a negative `-ml-[VALUE]` on the `<CarouselContent />`.

&lt;Callout class="mt-6"&gt;

**Why:** I tried to use the `gap` property or a `grid` layout on the `CarouselContent` but it required a lot of math and mental effort to get the spacing right. I found `pl-[VALUE]` and `-ml-[VALUE]` utilities much easier to use. &lt;br/&gt;&lt;br/&gt; You can always adjust this in your own project if you need to.

&lt;/Callout&gt;

&lt;ComponentPreview name="CarouselSpacing" /&gt;

Example

```vue:line-numbers
<template>
  <Carousel>
    <CarouselContent class="-ml-4">
      <CarouselItem class="pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-4">
        ...
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

Responsive

```vue:line-numbers
<template>
  <Carousel>
    <CarouselContent class="-ml-2 md:-ml-4">
      <CarouselItem class="pl-2 md:pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-2 md:pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-2 md:pl-4">
        ...
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

### Orientation

Use the `orientation` prop to set the orientation of the carousel.

&lt;ComponentPreview name="CarouselOrientation" /&gt;

```vue
<Carousel orientation="vertical | horizontal">
  ...
</Carousel>
```

### Thumbnails

&lt;ComponentPreview name="CarouselThumbnails" /&gt;

###

## Options

You can pass options to the carousel using the `opts` prop. See the [Embla Carousel docs](https://www.embla-carousel.com/api/options/) for more information.

```vue:line-numbers
<template>
  <Carousel
    :opts="{
      align: 'start',
      loop: true,
    }"
  >
    <CarouselContent>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

## API

### Method 1

Use the `@init-api` emit method on `<Carousel />` component to set the instance of the API.

&lt;ComponentPreview name="CarouselApi" /&gt;

### Method 2

You can access it through setting a template ref on the `<Carousel />` component.

```vue:line-numbers
<script setup>
const carouselContainerRef = ref<InstanceType<typeof Carousel> | null>(null)

function accessApi() {
  carouselContainerRef.value?.carouselApi.on('select', () => {})
}
</script>

<template>
  <Carousel ref="carouselContainerRef">
    ...
  </Carousel>
</template>
```

## Events

You can listen to events using the API. To get the API instance use the `@init-api` emit method on the `<Carousel />` component

```vue:line-numbers
<script setup>
import { nextTick, ref, watch } from 'vue'
import { useCarousel } from '@/components/ui/carousel'

const api = ref<CarouselApi>()

function setApi(val: CarouselApi) {
  api.value = val
}

const stop = watch(api, (api) => {
  if (!api)
    return

  // Watch only once or use watchOnce() in @vueuse/core
  nextTick(() => stop())

  api.on('select', () => {
    // Do something on select.
  })
})
</script>

<template>
  <Carousel @init-api="setApi">
    ...
  </Carousel>
</template>
```

See the [Embla Carousel docs](https://www.embla-carousel.com/api/events/) for more information on using events.

## Slot Props

You can get the reactive slot props like `carouselRef, canScrollNext..Prev, scrollNext..Prev` using the `v-slot` directive in the `<Carousel v-slot="slotProps" />` component to extend the functionality.

```vue:line-numbers
<template>
  <Carousel v-slot="{ canScrollNext, canScrollPrev }">
    ...
    <CarouselPrevious v-if="canScrollPrev" />
    <CarouselNext v-if="canScrollNext" />
  </Carousel>
</template>
```

## Plugins

You can use the `plugins` prop to add plugins to the carousel.

```bash
npm i embla-carousel-autoplay
```

```vue:line-numbers
<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay'
</script>

<template>
  <Carousel
    class="w-full max-w-xs"
    :plugins="[Autoplay({
      delay: 2000,
    })]"
  >
    ...
  </Carousel>
</template>
```

&lt;ComponentPreview name="CarouselPlugin" /&gt;

See the [Embla Carousel docs](https://www.embla-carousel.com/api/plugins/) for more information on using plugins.
