<script setup lang="ts">
const { config, isLayoutFull } = useConfig()
const activeTheme = computed(() => config.value.activeTheme)
const isScaled = computed(() => !!activeTheme.value?.endsWith('-scaled'))
</script>

<template>
  <Body
    class="text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]"
    :class="[
      activeTheme ? `theme-${activeTheme}` : '',
      isScaled ? 'theme-scaled' : '',
      isLayoutFull ? 'layout-full' : 'layout-fixed',
    ]"
  >
    <slot />
  </Body>
</template>
