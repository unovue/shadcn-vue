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
