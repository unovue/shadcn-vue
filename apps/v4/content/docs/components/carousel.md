---
title: Carousel
description: A carousel with motion and swipe built using Embla.
component: true
---

::component-preview
---
name: CarouselDemo
title: Carousel
description: A carousel component.
---
::

## Installation

::code-tabs

::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add carousel
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install embla-carousel-vue
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/carousel) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

::

## Usage

```vue showLineNumbers
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

::component-preview
---
name: CarouselSize
title: Carousel
description: A carousel with 3 active items of equal size.
---
::

```vue showLineNumbers {5-7}
// 33% of the carousel width.
<template>
  <Carousel>
    <CarouselContent>
      <CarouselItem class="basis-1/3">
        ...
      </CarouselItem>
      <CarouselItem class="basis-1/3">
        ...
      </CarouselItem>
      <CarouselItem class="basis-1/3">
        ...
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

```vue showLineNumbers {5-7}
// 50% on small screens and 33% on larger screens.
<template>
  <Carousel>
    <CarouselContent>
      <CarouselItem class="md:basis-1/2 lg:basis-1/3">
        ...
      </CarouselItem>
      <CarouselItem class="md:basis-1/2 lg:basis-1/3">
        ...
      </CarouselItem>
      <CarouselItem class="md:basis-1/2 lg:basis-1/3">
        ...
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

### Spacing

To set the spacing between the items, we use a `pl-[VALUE]` utility on the `<CarouselItem />` and a negative `-ml-[VALUE]` on the `<CarouselContent />`.

::callout{class="mt-6"}
  **Why:** I tried to use the `gap` property or a `grid` layout on the `
  <CarouselContent />` but it required a lot of math and mental effort to get the
  spacing right. I found `pl-[VALUE]` and `-ml-[VALUE]` utilities much easier to
  use.

You can always adjust this in your own project if you need to.

::

::component-preview
---
name: CarouselSpacing
title: Carousel
description: A carousel with 3 items with a spacing of 1rem.
---
::

```vue showLineNumbers /-ml-4/ /pl-4/
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

```vue showLineNumbers /-ml-2/ /pl-2/ /md:-ml-4/ /md:pl-4/
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

::component-preview
---
name: CarouselOrientation
title: Carousel
description: A vertical carousel.
---
::

```vue
<Carousel orientation="vertical | horizontal">
  ...
</Carousel>
```

## Options

You can pass options to the carousel using the `opts` prop. See the [Embla Carousel docs](https://www.embla-carousel.com/api/options/) for more information.

```vue showLineNumbers {3-6}
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

::component-preview
---
name: CarouselApi
title: Carousel
description: A carousel with a slide counter.
---
::

### Method 2

You can access it through setting a template ref on the `<Carousel />` component.

```vue showLineNumbers {2,5,10}
<script setup lang="ts">
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

```vue showLineNumbers {5,7-9,25}
<script setup lang="ts">
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

```vue showLineNumbers {2}
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
npm install embla-carousel-autoplay
```

```vue showLineNumbers {2,8-10}
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

::component-preview
---
name: CarouselPlugin
title: Carousel
description: A carousel with the autoplay plugin.
---
::

See the [Embla Carousel docs](https://www.embla-carousel.com/api/plugins/) for more information on using plugins.
