<script setup lang="ts">
import type { MenuTriggerProps } from '@vase-ui/vue/menu'
import type { HTMLAttributes } from 'vue'
import { Menu } from '@vase-ui/vue/menu'
import { cn } from 'cn'
import { computed, useTemplateRef } from 'vue'

interface Props extends /* @vue-ignore */ MenuTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const part = useTemplateRef<{ element: Element | null }>('part')
// An outer trigger that renders this wrapper in its element slot reads the element of the part.
defineExpose({ element: computed(() => part.value?.element ?? null) })
</script>

<template>
  <Menu.Trigger
    ref="part"
    data-slot="menubar-trigger"
    :class="cn('hover:bg-muted aria-expanded:bg-muted rounded-2xl px-2 py-0.75 text-sm font-medium flex items-center outline-hidden select-none', props.class)"
  >
    <template v-if="$slots.element" #element="slotProps">
      <slot name="element" v-bind="slotProps" />
    </template>
    <slot />
  </Menu.Trigger>
</template>
