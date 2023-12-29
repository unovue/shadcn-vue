<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay'
import { ref } from 'vue'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/lib/registry/new-york/ui/carousel'
import { Card, CardContent } from '@/lib/registry/new-york/ui/card'

const plugin = ref(Autoplay({
  delay: 2000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
}))
</script>

<template>
  <div class="flex items-center space-x-2">
    <Carousel
      class="w-full max-w-xs"
      :plugins="[plugin]"
      @mouseenter="plugin.stop"
      @mouseleave="[plugin.reset(), plugin.play(), console.log('Rungin')];"
    >
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
    </Carousel>
  </div>
</template>
