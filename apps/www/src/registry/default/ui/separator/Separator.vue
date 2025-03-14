<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Separator, type SeparatorProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  SeparatorProps & { class?: HTMLAttributes['class'], label?: string }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Separator
    v-bind="delegatedProps"
    :class="
      cn(
        'relative shrink-0 bg-border',
        props.orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full',
        props.class,
      )
    "
  >
    <span
      v-if="props.label"
      :class="cn('absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-background text-xs text-muted-foreground',
                 props.orientation === 'vertical' ? 'w-px px-1 py-2' : 'h-px px-2 py-1',
      )"
    >{{ props.label }}</span>
  </Separator>
</template>
