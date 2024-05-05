<script setup lang="ts">
import { Carousel, CarouselContent, CarouselDotButtons, CarouselItem, CarouselNext, CarouselPrevious } from '@/lib/registry/new-york/ui/carousel'
import { Card, CardContent } from '@/lib/registry/new-york/ui/card'
</script>

<template>
  <Carousel class="relative w-full max-w-xs">
    <CarouselContent>
      <CarouselItem v-for="(_, index) in 5" :key="index">
        <div class="p-1">
          <Card>
            <CardContent class="flex aspect-square items-center justify-center p-6">
              <span class="text-4xl font-semibold">{{ index + 1 }}</span>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />

    <CarouselDotButtons class="mt-4" />
  </Carousel>
</template>
