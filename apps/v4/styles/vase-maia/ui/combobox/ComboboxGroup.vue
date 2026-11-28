<script setup lang="ts">
import type { ComboboxGroupProps } from '@vase-ui/vue/combobox'
import type { HTMLAttributes } from 'vue'
import { Combobox } from '@vase-ui/vue/combobox'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ ComboboxGroupProps {
  class?: HTMLAttributes['class']
  heading?: string
}

const props = defineProps<Props>()
</script>

<template>
  <Combobox.Group
    data-slot="combobox-group"
    :class="cn('overflow-hidden text-foreground', props.class)"
  >
    <Combobox.GroupLabel v-if="heading" class="text-muted-foreground px-3.5 py-2.5 text-xs">
      {{ heading }}
    </Combobox.GroupLabel>
    <slot />
  </Combobox.Group>
</template>
