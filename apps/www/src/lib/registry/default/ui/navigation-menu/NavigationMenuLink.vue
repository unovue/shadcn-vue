<script setup lang="ts">
import {
  NavigationMenuLink,
  type NavigationMenuLinkEmits,
  type NavigationMenuLinkProps,
} from 'radix-vue'

const props = defineProps<NavigationMenuLinkProps>()

const emits = defineEmits<NavigationMenuLinkEmits>()
</script>

<template>
  <NavigationMenuLink v-bind="props" @select="emits('select', $event)">
    <slot />
  </NavigationMenuLink>
</template>
