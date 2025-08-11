<script setup lang="ts">
import type { PinInputRootEmits, PinInputRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { PinInputRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<PinInputRootProps & { class?: HTMLAttributes["class"] }>(), {
  modelValue: () => [],
})
const emits = defineEmits<PinInputRootEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <PinInputRoot v-bind="forwarded" :class="cn('flex gap-2 items-center', props.class)">
    <slot />
  </PinInputRoot>
</template>
