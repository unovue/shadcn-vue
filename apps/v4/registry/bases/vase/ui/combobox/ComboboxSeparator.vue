<script setup lang="ts">
import type { ComboboxSeparatorProps } from "@vase-ui/vue/combobox"
import type { HTMLAttributes } from "vue"
import { Combobox } from "@vase-ui/vue/combobox"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ ComboboxSeparatorProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Combobox.Separator
    data-slot="combobox-separator"
    :class="cn('cn-combobox-separator', props.class)"
  />
</template>
