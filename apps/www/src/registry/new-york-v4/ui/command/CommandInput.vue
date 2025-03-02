<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Search } from 'lucide-vue-next'
import { ListboxFilter, type ListboxFilterProps, useForwardProps } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { useCommand } from '.'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ListboxFilterProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

const { filterState } = useCommand()
</script>

<template>
  <div class="flex items-center border-b px-3" cmdk-input-wrapper>
    <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <ListboxFilter
      v-bind="{ ...forwardedProps, ...$attrs }"
      v-model="filterState.search"
      auto-focus
      :class="cn('flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50', props.class)"
    />
  </div>
</template>
