<script setup lang="ts">
import type { ComboboxEmptyProps } from '@vase-ui/vue/combobox'
import type { HTMLAttributes } from 'vue'
import { Combobox } from '@vase-ui/vue/combobox'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ ComboboxEmptyProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Combobox.Empty
    data-slot="combobox-empty"
    :class="cn('text-muted-foreground hidden w-full justify-center py-2 text-center text-xs group-data-empty/combobox-content:flex', props.class)"
  >
    <slot />
  </Combobox.Empty>
</template>
