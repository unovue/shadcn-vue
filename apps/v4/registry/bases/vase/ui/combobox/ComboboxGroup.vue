<script setup lang="ts">
import type { ComboboxGroupProps } from "@vase-ui/vue/combobox"
import type { HTMLAttributes } from "vue"
import { Combobox } from "@vase-ui/vue/combobox"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ ComboboxGroupProps {
  class?: HTMLAttributes["class"]
  heading?: string
}

const props = defineProps<Props>()
</script>

<template>
  <Combobox.Group
    data-slot="combobox-group"
    :class="cn('cn-combobox-group overflow-hidden text-foreground', props.class)"
  >
    <Combobox.GroupLabel v-if="heading" class="cn-combobox-label">
      {{ heading }}
    </Combobox.GroupLabel>
    <slot />
  </Combobox.Group>
</template>
