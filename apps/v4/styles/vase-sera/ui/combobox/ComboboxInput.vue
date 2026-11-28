<script setup lang="ts">
import type { ComboboxInputProps } from '@vase-ui/vue/combobox'

import type { HTMLAttributes } from 'vue'
import { SearchIcon } from '@lucide/vue'
import { Combobox } from '@vase-ui/vue/combobox'
import { cn } from 'cn'
import { InputGroup, InputGroupAddon } from '@/styles/vase-sera/ui/input-group'

interface Props extends /* @vue-ignore */ ComboboxInputProps {
  class?: HTMLAttributes['class']
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
</script>

<template>
  <InputGroup class="w-auto">
    <InputGroupAddon>
      <SearchIcon class="size-3.5 shrink-0 opacity-50" />
    </InputGroupAddon>
    <Combobox.Input
      data-slot="combobox-input"
      :class="cn('flex-1 outline-hidden disabled:cursor-not-allowed disabled:opacity-50', props.class)"
      v-bind="$attrs"
    />
  </InputGroup>
</template>
