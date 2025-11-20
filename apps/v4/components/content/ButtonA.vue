<script setup lang="ts">
import type { NuxtLinkProps } from '#app'
import Button from '~/registry/new-york-v4/ui/button/Button.vue'

const props = defineProps<NuxtLinkProps>()
</script>

<template>
  <Button size="sm" as-child class="mt-6 no-underline">
    <NuxtLink v-bind="props">
      <slot />
    </NuxtLink>
  </Button>
</template>
