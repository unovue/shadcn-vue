<script setup lang="ts">
import type { HTMLAttributes, ToRefs } from "vue"
import type { OTPInputEmits, OTPInputProps, RenderProps, SlotProps } from "vue-input-otp"
import { reactiveOmit } from "@vueuse/core"
import { useForwardPropsEmits } from "reka-ui"
import { provide, ref } from "vue"
import { OTPInput } from "vue-input-otp"
import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<OTPInputProps & { class?: HTMLAttributes["class"] }>(), {
  pattern: ".*",
})

const emits = defineEmits<OTPInputEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const isFocused = ref(false)
const isHovering = ref(false)
const slots = ref<SlotProps[]>([])

provide<ToRefs<RenderProps>>("OTPInputContext", { isFocused, isHovering, slots })

function updateContext(ctx: RenderProps) {
  if (isFocused.value !== ctx.isFocused) {
    isFocused.value = ctx.isFocused
  }
  if (isHovering.value !== ctx.isHovering) {
    isHovering.value = ctx.isHovering
  }
  if (slots.value !== ctx.slots) {
    slots.value = ctx.slots
  }
}
</script>

<template>
  <OTPInput
    v-slot="slotProps"
    v-bind="forwarded"
    :container-class="cn('flex items-center gap-2 has-disabled:opacity-50', props.class)"
    data-slot="input-otp"
    class="disabled:cursor-not-allowed"
  >
    {{ updateContext(slotProps) }}
    <slot v-bind="slotProps" />
  </OTPInput>
</template>
