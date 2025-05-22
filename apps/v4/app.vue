<script setup lang="ts">
import { Toaster } from '@/registry/new-york-v4/ui/sonner'

const activeTheme = useCookie<string>('active_theme', { readonly: true })
const isScaled = computed(() => !!activeTheme.value?.endsWith('-scaled'))
const colorMode = useColorMode()
</script>

<template>
  <Body
    class="bg-background overscroll-none font-sans antialiased"
    :class="[
      activeTheme ? `theme-${activeTheme}` : '',
      isScaled ? 'theme-scaled' : '',
    ]"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Toaster :theme="colorMode.preference as any || 'system'" />
  </Body>
</template>
