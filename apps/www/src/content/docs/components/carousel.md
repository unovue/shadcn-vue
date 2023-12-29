---
title: Carousel
description: A carousel with motion and swipe built using Embla.
source: apps/www/src/lib/registry/default/ui/carousel 
primitive: https://www.embla-carousel.com/api
---


<ComponentPreview name="CarouselDemo"  /> 


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

### Orientation

Use the `orientation` prop to set the orientation of the carousel.

<ComponentPreview name="CarouselOrientation" />

```vue
<Carousel orientation="vertical | horizontal">
  ...
</Carousel>
```

### Sizes

To set the size of the items, you can use the `basis` utility class on the `<CarouselItem />`.

<ComponentPreview name="CarouselSize" />


Example

```vue title="Example" showLineNumbers {4-6}
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

```vue title="Responsive" showLineNumbers {4-6}
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

<Callout class="mt-6">

**Why:** I tried to use the `gap` property or a `grid` layout on the `
CarouselContent` but it required a lot of math and mental effort to get the
spacing right. I found `pl-[VALUE]` and `-ml-[VALUE]` utilities much easier to
use.
<br/><br/>
You can always adjust this in your own project if you need to.

</Callout>

<ComponentPreview name="CarouselSpacing" />

Example

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

Responsive

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