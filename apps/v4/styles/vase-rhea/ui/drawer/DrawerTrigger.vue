<script lang="ts" setup>
import type { DrawerTriggerProps } from '@vase-ui/vue/drawer'
import { Drawer } from '@vase-ui/vue/drawer'
import { computed, useTemplateRef } from 'vue'

interface Props extends /* @vue-ignore */ DrawerTriggerProps {}

defineProps<Props>()

const part = useTemplateRef<{ element: Element | null }>('part')
// An outer trigger that renders this wrapper in its element slot reads the element of the part.
defineExpose({ element: computed(() => part.value?.element ?? null) })
</script>

<template>
  <Drawer.Trigger ref="part" data-slot="drawer-trigger">
    <template v-if="$slots.element" #element="slotProps">
      <slot name="element" v-bind="slotProps" />
    </template>
    <slot />
  </Drawer.Trigger>
</template>
