<script setup lang="ts">
import type { ListboxFilterProps } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import { SearchIcon } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { ListboxFilter, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { InputGroup, InputGroupAddon } from '@/styles/reka-lyra/ui/input-group'
import { useCommand } from '.'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ListboxFilterProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)

const { filterState } = useCommand()
</script>

<template>
  <div
    data-slot="command-input-wrapper"
    class="border-b pb-0"
  >
    <InputGroup class="bg-input/30 border-input/30 h-8 border-none shadow-none! *:data-[slot=input-group-addon]:pl-2!">
      <ListboxFilter
        v-bind="{ ...forwardedProps, ...$attrs }"
        v-model="filterState.search"
        data-slot="command-input"
        auto-focus
        :class="cn('w-full text-xs outline-hidden disabled:cursor-not-allowed disabled:opacity-50', props.class)"
      />
      <InputGroupAddon>
        <SearchIcon class="size-4 shrink-0 opacity-50" />
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
