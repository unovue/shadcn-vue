<script setup lang="ts">
import { Card, CardContent } from '@/registry/new-york-v4/ui/card'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/registry/new-york-v4/ui/carousel'
</script>

<template>
  <div class="hidden w-full flex-col items-center gap-4 @4xl:flex">
    <Carousel class="max-w-sm *:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex">
      <CarouselContent>
        <CarouselItem v-for="index in 5" :key="index">
          <div class="p-1">
            <Card>
              <CardContent class="flex aspect-square items-center justify-center p-6">
                <span class="text-4xl font-semibold">{{ index }}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    <Carousel
      class="max-w-sm *:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex"
      :opts="{
        align: 'start',
      }"
    >
      <CarouselContent>
        <CarouselItem v-for="index in 5" :key="index" class="md:basis-1/2 lg:basis-1/3">
          <div class="p-1">
            <Card>
              <CardContent class="flex aspect-square items-center justify-center p-6">
                <span class="text-3xl font-semibold">{{ index }}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    <Carousel class="max-w-sm *:data-[slot=carousel-next]:hidden *:data-[slot=carousel-previous]:hidden *:data-[slot=carousel-next]:md:inline-flex *:data-[slot=carousel-previous]:md:inline-flex">
      <CarouselContent class="-ml-1">
        <CarouselItem v-for="index in 5" :key="index" class="pl-1 md:basis-1/2">
          <div class="p-1">
            <Card>
              <CardContent class="flex aspect-square items-center justify-center p-6">
                <span class="text-2xl font-semibold">{{ index }}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
</template>
