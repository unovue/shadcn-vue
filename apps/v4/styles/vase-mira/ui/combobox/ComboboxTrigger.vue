<script setup lang="ts">
import type { ComboboxTriggerProps } from '@vase-ui/vue/combobox'
import type { HTMLAttributes } from 'vue'
import { Combobox } from '@vase-ui/vue/combobox'
import { cn } from 'cn'
import { computed, useTemplateRef } from 'vue'

interface Props extends /* @vue-ignore */ ComboboxTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const part = useTemplateRef<{ element: Element | null }>('part')
// An outer trigger that renders this wrapper in its element slot reads the element of the part.
defineExpose({ element: computed(() => part.value?.element ?? null) })
</script>

<template>
  <Combobox.Trigger
    ref="part"
    data-slot="combobox-trigger"
    :class="cn('[&_svg:not([class*=size-])]:size-3.5', props.class)"
  >
    <template v-if="$slots.element" #element="slotProps">
      <slot name="element" v-bind="slotProps" />
    </template>
    <slot />
  </Combobox.Trigger>
</template>
