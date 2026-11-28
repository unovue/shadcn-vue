<script setup lang="ts">
import type { ProgressRootProps } from '@vase-ui/vue/progress'
import type { HTMLAttributes } from 'vue'
import { Progress } from '@vase-ui/vue/progress'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ ProgressRootProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Progress.Root
    data-slot="progress"
    :class="
      cn(
        'bg-muted h-3 rounded-full relative flex w-full items-center overflow-x-hidden',
        props.class,
      )
    "
  >
    <Progress.Indicator
      data-slot="progress-indicator"
      class="bg-primary h-full transition-all"
    />
  </Progress.Root>
</template>
