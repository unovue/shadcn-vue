<script setup lang="ts">
import type { SelectSeparatorProps } from "@vase-ui/vue/select"
import type { HTMLAttributes } from "vue"
import { Select } from "@vase-ui/vue/select"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ SelectSeparatorProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Select.Separator
    data-slot="select-separator"
    :class="cn('cn-select-separator pointer-events-none', props.class)"
  />
</template>
