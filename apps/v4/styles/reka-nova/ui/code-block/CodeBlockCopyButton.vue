<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/styles/reka-nova/ui/button'
import { CheckIcon, CopyIcon } from '@lucide/vue'
import { onBeforeUnmount, ref } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/styles/reka-nova/ui/button'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PrimitiveProps & {
  value: string
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}>(), {
  as: 'button',
  variant: 'ghost',
  size: 'icon-xs',
})

const copied = ref(false)
let timeout: ReturnType<typeof setTimeout> | undefined

function copy() {
  navigator.clipboard
    .writeText(props.value)
    .then(() => {
      copied.value = true
      clearTimeout(timeout)
      timeout = setTimeout(() => (copied.value = false), 2000)
    })
    .catch(() => {})
}

onBeforeUnmount(() => clearTimeout(timeout))
</script>

<template>
  <Button
    v-bind="$attrs"
    data-slot="code-block-copy-button"
    :data-copied="copied || undefined"
    :as="as"
    :as-child="asChild"
    :variant="variant"
    :size="size"
    :aria-label="copied ? 'Copied' : 'Copy'"
    :class="cn('', props.class)"
    @click="copy"
  >
    <CheckIcon v-if="copied" />
    <CopyIcon v-else />
  </Button>
  <span aria-live="polite" class="sr-only">{{ copied ? "Copied" : "" }}</span>
</template>
