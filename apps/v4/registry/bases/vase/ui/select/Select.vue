<script setup lang="ts" generic="Value, Multiple extends boolean | undefined = false">
import type { SelectRootEmits, SelectRootProps } from "@vase-ui/vue/select"
import { Select } from "@vase-ui/vue/select"

interface Props extends /* @vue-ignore */ SelectRootProps<Value, Multiple> {}
interface Emits extends /* @vue-ignore */ SelectRootEmits<Value, Multiple> {}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Select.Root data-slot="select" class="contents">
    <slot />
  </Select.Root>
</template>
