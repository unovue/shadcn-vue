<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/lib/registry/default/ui/carousel'
import { Card, CardContent } from '@/lib/registry/default/ui/card'
</script>

<template>
  <div class="w-1/2">
    <Carousel
      orientation="vertical"
      class="w-full max-w-xs"
      :opts="{
        align: 'start',
      }"
    >
      <CarouselContent class="-mt-1 h-[200px]">
        <CarouselItem v-for="(_, index) in 5" :key="index" class="p-1 md:basis-1/2">
          <div class="p-1">
            <Card>
              <CardContent class="flex items-center justify-center p-6">
                <span class="text-3xl font-semibold">{{ index + 1 }}</span>
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
