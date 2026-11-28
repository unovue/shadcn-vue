<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { reactiveOmit, useVModel } from "@vueuse/core"
import { cn } from "cn"
import { ref } from "vue"
import { IconPlaceholder } from "@/registry/bases/vase/components/icon-placeholder"

type AcceptableValue = string | number | bigint | Record<string, any> | null

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  modelValue?: AcceptableValue | AcceptableValue[]
  class?: HTMLAttributes["class"]
  size?: "sm" | "default"
}>()

const emit = defineEmits<{
  "update:modelValue": [value: AcceptableValue]
}>()

const modelValue = useVModel(props, "modelValue", emit, {
  passive: true,
  defaultValue: "",
})

const delegatedProps = reactiveOmit(props, "class", "size")

const element = ref<HTMLSelectElement | null>(null)
defineExpose({ element })
</script>

<template>
  <div
    :class="cn('cn-native-select-wrapper group/native-select relative w-fit has-[select:disabled]:opacity-50', props.class)"
    data-slot="native-select-wrapper"
    :data-size="props.size ?? 'default'"
  >
    <select
      ref="element"
      v-bind="{ ...$attrs, ...delegatedProps }"
      v-model="modelValue"
      data-slot="native-select"
      class="cn-native-select outline-none disabled:pointer-events-none disabled:cursor-not-allowed"
      :data-size="props.size ?? 'default'"
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
