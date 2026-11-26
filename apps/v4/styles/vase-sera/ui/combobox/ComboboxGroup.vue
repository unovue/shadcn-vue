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
    <Combobox.GroupLabel v-if="heading" class="px-3 py-2 text-xs uppercase tracking-wider font-semibold text-muted-foreground">
      {{ heading }}
    </Combobox.GroupLabel>
    <slot />
  </Combobox.Group>
</template>
