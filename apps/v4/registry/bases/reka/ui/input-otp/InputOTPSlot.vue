<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { useForwardProps } from "reka-ui"
import { computed } from "vue"
import { useVueOTPContext } from "vue-input-otp"
import { cn } from "@/lib/utils"

const props = defineProps<{ index: number, class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardProps(delegatedProps)

const context = useVueOTPContext()

const slot = computed(() => context?.value.slots[props.index])
</script>

<template>
  <div
    v-bind="forwarded"
    data-slot="input-otp-slot"
    :data-active="slot?.isActive"
    :class="cn('cn-input-otp-slot relative flex items-center justify-center data-[active=true]:z-10', props.class)"
  >
    {{ slot?.char }}
    <div v-if="slot?.hasFakeCaret" class="cn-input-otp-caret pointer-events-none absolute inset-0 flex items-center justify-center">
      <div class="cn-input-otp-caret-line" />
    </div>
  </div>
</template>
