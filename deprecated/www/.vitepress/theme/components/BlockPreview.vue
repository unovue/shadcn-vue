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
  <div class="relative rounded-lg border overflow-hidden bg-background" :class="[container ? '' : 'aspect-[4/2.5]']">
    <div v-if="isLoading" class="flex items-center justify-center h-full w-full z-10 relative">
      <Spinner />
    </div>
    <div
      :class="[container ? 'w-full' : 'absolute inset-0 hidden w-[1600px] bg-background md:block']"
    >
      <ClientOnly>
        <iframe
          v-show="!isLoading"
          :src="url"
          class="relative z-20 w-full bg-background" :class="[container ? 'h-[--height]' : 'size-full']"
          @load="isLoading = false"
        />
      </ClientOnly>
    </div>
  </div>
</template>
