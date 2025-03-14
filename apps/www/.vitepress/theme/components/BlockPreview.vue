<script setup lang="ts">
import { ref } from 'vue'
import Spinner from './Spinner.vue'

const props = defineProps<{
  container?: boolean
  url: string
}>()

const isLoading = ref(true)
</script>

<template>
  <div class="relative overflow-hidden rounded-lg border bg-background" :class="[container ? '' : 'aspect-[4/2.5]']">
    <div v-if="isLoading" class="relative z-10 flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
    <div
      :class="[container ? 'w-full' : 'absolute inset-0 hidden w-[1600px] bg-background md:block']"
    >
      <iframe
        v-show="!isLoading"
        :src="url"
        class="relative z-20 w-full bg-background" :class="[container ? 'h-[--height]' : 'size-full']"
        @load="isLoading = false"
      />
    </div>
  </div>
</template>
