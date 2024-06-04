<script setup lang="ts">
import { Carousel, CarouselContent, CarouselDotButtons, CarouselItem, CarouselNext, CarouselPrevious } from '@/lib/registry/default/ui/carousel'
import { Card, CardContent } from '@/lib/registry/default/ui/card'
</script>

<template>
  <Carousel
    orientation="vertical"
    class="relative w-full max-w-xsw-full max-w-xs h-[90px] mb-20"
    :opts="{
      align: 'start',
    }"
  >
    <CarouselContent class="-mt-1 h-[100px]">
      <CarouselItem v-for="(_, index) in 5" :key="index" class="p-1">
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
    <CarouselDotButtons class="mt-4" />
  </Carousel>
</template>
