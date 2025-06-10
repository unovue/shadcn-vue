<script setup lang="ts">
import { Toaster } from '@/registry/new-york-v4/ui/sonner'

const { isLayoutFull } = useUserConfig()
const { activeTheme } = useThemeConfig()
const isScaled = computed(() => !!activeTheme.value?.endsWith('-scaled'))
const colorMode = useColorMode()
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
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Toaster :theme="colorMode.preference as any || 'system'" position="top-center" />
  </Body>
</template>
