<script setup lang="ts">
const { config } = useConfig()
const activeTheme = computed(() => config.value.activeTheme)
const isScaled = computed(() => !!activeTheme.value?.endsWith('-scaled'))
</script>

<template>
  <Body
    class="group/body overscroll-none antialiased [--footer-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)] [--header-height:calc(var(--spacing)*14)] lg:[--header-height:calc(var(--spacing)*16)]"
  >
    <slot />
  </Body>
</template>
