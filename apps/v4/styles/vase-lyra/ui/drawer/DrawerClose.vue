<script lang="ts" setup>
import type { DrawerCloseProps } from '@vase-ui/vue/drawer'
import { Drawer } from '@vase-ui/vue/drawer'
import { computed, useTemplateRef } from 'vue'

interface Props extends /* @vue-ignore */ DrawerCloseProps {}

defineProps<Props>()

const part = useTemplateRef<{ element: Element | null }>('part')
// An outer trigger that renders this wrapper in its element slot reads the element of the part.
defineExpose({ element: computed(() => part.value?.element ?? null) })
</script>

<template>
  <Drawer.Close ref="part" data-slot="drawer-close">
    <template v-if="$slots.element" #element="slotProps">
      <slot name="element" v-bind="slotProps" />
    </template>
    <slot />
  </Drawer.Close>
</template>
