<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/lib/registry/new-york/ui/carousel'
import { Card, CardContent } from '@/lib/registry/new-york/ui/card'
</script>

<template>
  <div class="flex items-center space-x-2">
    <Carousel class="w-full max-w-xs">
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
