<script lang="ts">
import type { HTMLAttributes, InjectionKey } from 'vue'

export const selectGroupKey: InjectionKey<boolean> = Symbol('selectGroup')
</script>

<script setup lang="ts">
import type { SelectGroupProps } from '@vase-ui/vue/select'
import { Select } from '@vase-ui/vue/select'
import { cn } from 'cn'
import { provide } from 'vue'

interface Props extends /* @vue-ignore */ SelectGroupProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

provide(selectGroupKey, true)
</script>

<template>
  <Select.Group
    data-slot="select-group"
    :class="cn('scroll-my-1', props.class)"
  >
    <slot />
  </Select.Group>
</template>
