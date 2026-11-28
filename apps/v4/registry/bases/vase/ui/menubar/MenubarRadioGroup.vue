<script setup lang="ts">
import type { MenuRadioGroupEmits, MenuRadioGroupProps } from "@vase-ui/vue/menu"
import { Menu } from "@vase-ui/vue/menu"

interface Props extends /* @vue-ignore */ MenuRadioGroupProps {}
interface Emits extends /* @vue-ignore */ MenuRadioGroupEmits {}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Menu.RadioGroup data-slot="menubar-radio-group">
    <slot />
  </Menu.RadioGroup>
</template>
