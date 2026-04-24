<script setup lang="ts">
import type { AcceptableValue } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit, useVModel } from "@vueuse/core"
import { cn } from "@/lib/utils"
import { IconPlaceholder } from "@/registry/bases/reka/components/icon-placeholder"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue?: AcceptableValue | AcceptableValue[]
  class?: HTMLAttributes["class"]
  size?: "sm" | "default"
}>()

const emit = defineEmits<{
  "update:modelValue": AcceptableValue
}>()

const modelValue = useVModel(props, "modelValue", emit, {
  passive: true,
  defaultValue: "",
})

const delegatedProps = reactiveOmit(props, "class", "size")
</script>

<template>
  <div
    class="cn-native-select-wrapper group/native-select relative w-fit has-[select:disabled]:opacity-50"
    data-slot="native-select-wrapper"
    :data-size="props.size ?? 'default'"
  >
    <select
      v-bind="{ ...$attrs, ...delegatedProps }"
      v-model="modelValue"
      data-slot="native-select"
      :data-size="props.size ?? 'default'"
      :class="cn(
        'cn-native-select outline-none disabled:pointer-events-none disabled:cursor-not-allowed',
        props.class,
      )"
    >
      <slot />
    </select>
    <IconPlaceholder
      lucide="ChevronDownIcon"
      tabler="IconSelector"
      hugeicons="UnfoldMoreIcon"
      phosphor="CaretDownIcon"
      remixicon="RiArrowDownSLine"
      class="cn-native-select-icon pointer-events-none absolute select-none"
      aria-hidden="true"
      data-slot="native-select-icon"
    />
  </div>
</template>
