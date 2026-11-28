<script setup lang="ts">
import type { MenuTriggerProps } from "@vase-ui/vue/menu"
import { Menu } from "@vase-ui/vue/menu"
import { computed, useTemplateRef } from "vue"

interface Props extends /* @vue-ignore */ MenuTriggerProps {}

defineProps<Props>()

const part = useTemplateRef<{ element: Element | null }>("part")
// An outer trigger that renders this wrapper in its element slot reads the element of the part.
defineExpose({ element: computed(() => part.value?.element ?? null) })
</script>

<template>
  <Menu.Trigger ref="part" data-slot="dropdown-menu-trigger">
    <template v-if="$slots.element" #element="slotProps">
      <slot name="element" v-bind="slotProps" />
    </template>
    <slot />
  </Menu.Trigger>
</template>
