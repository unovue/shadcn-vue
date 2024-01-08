<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/lib/registry/default/ui/carousel'
import { Card, CardContent } from '@/lib/registry/default/ui/card'
</script>

<template>
  <div class="flex items-center space-x-2">
    <Carousel
      class="w-full max-w-sm"
      :opts="{
        align: 'start',
      }"
    >
      <CarouselContent class="-ml-1">
        <CarouselItem v-for="(_, index) in 5" :key="index" class="pl-1 md:basis-1/2 lg:basis-1/3">
          <div class="p-1">
            <Card>
              <CardContent class="flex aspect-square items-center justify-center p-6">
                <span class="text-2xl font-semibold">{{ index + 1 }}</span>
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
