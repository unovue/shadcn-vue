<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { useVueOTPContext } from 'vue-input-otp'
import { cn } from '@/lib/utils'

const props = defineProps<{ index: number, class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardProps(delegatedProps)

const context = useVueOTPContext()

const slot = computed(() => context?.value.slots[props.index])
</script>

<template>
  <div
    v-bind="forwarded"
    data-slot="input-otp-slot"
    :data-active="slot?.isActive"
    :class="cn('border-transparent border-b-input bg-transparent data-[active=true]:border-b-ring aria-invalid:border-b-destructive dark:aria-invalid:border-b-destructive/50 size-10 border text-sm transition-[color,border-color] outline-none first:rounded-none last:rounded-none relative flex items-center justify-center data-[active=true]:z-10', props.class)"
  >
    {{ slot?.char }}
    <div v-if="slot?.hasFakeCaret" class="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div class="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
    </div>
  </div>
</template>
