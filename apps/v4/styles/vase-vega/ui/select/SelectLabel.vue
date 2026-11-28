<script setup lang="ts">
import type { SelectGroupLabelProps } from '@vase-ui/vue/select'
import type { HTMLAttributes } from 'vue'
import { Select } from '@vase-ui/vue/select'
import { cn } from 'cn'
import { inject } from 'vue'
import { selectGroupKey } from './SelectGroup.vue'

interface Props extends /* @vue-ignore */ SelectGroupLabelProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const inGroup = inject(selectGroupKey, false)
</script>

<template>
  <Select.GroupLabel
    v-if="inGroup"
    data-slot="select-label"
    :class="cn('text-muted-foreground px-2 py-1.5 text-xs', props.class)"
  >
    <slot />
  </Select.GroupLabel>
  <div
    v-else
    data-slot="select-label"
    :class="cn('text-muted-foreground px-2 py-1.5 text-xs', props.class)"
  >
    <slot />
  </div>
</template>
