<script setup lang="ts">
const props = withDefaults(defineProps<{
  href?: string
  target?: '_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined
}>(), {
  href: '',
})
</script>

<template>
  <NuxtLink
    :href="props.href"
    :target="props.target"
    class="font-medium underline underline-offset-4"
  >
    <slot />
  </NuxtLink>
</template>
