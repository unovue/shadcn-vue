<script setup lang="ts">
import { computed, ref } from 'vue'
import Spinner from './Spinner.vue'

const props = defineProps<{
  name: string
  styles?: string
  containerClass?: string
  container?: boolean
}>()

const isLoading = ref(true)

const iframeURL = computed(() => {
  const url = new URL(`${window.location.origin}/blocks/renderer`)
  Object.entries(props).forEach(([key, value]) => {
    if (value)
      url.searchParams.append(key, value as string)
  })
  return url.href
})
</script>

<template>
  <div class="relative rounded-lg border overflow-hidden bg-background" :class="[container ? '' : 'aspect-[4/2.5]']">
    <div v-if="isLoading" class="flex items-center justify-center h-full">
      <Spinner />
    </div>
    <div
      :class="[container ? 'w-full' : 'absolute inset-0 hidden w-[1600px] bg-background md:block']"
    >
      <iframe
        v-show="!isLoading"
        :src="iframeURL"
        class="relative z-20 w-full bg-background" :class="[container ? 'h-[--container-height]' : 'size-full']"
        @load="isLoading = false"
      />
    </div>
  </div>
</template>
