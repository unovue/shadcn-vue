<script setup lang="ts">
import { ConfigProvider } from 'reka-ui'
import { Toaster } from '@/registry/new-york-v4/ui/sonner'

const { config, isLayoutFull } = useConfig()
const activeTheme = computed(() => config.value.activeTheme)
const isScaled = computed(() => !!activeTheme.value?.endsWith('-scaled'))
const colorMode = useColorMode()
const useIdFunction = () => useId()
</script>

<template>
  <SiteBody>
    <ConfigProvider>
      <NuxtLayout :use-id="useIdFunction">
        <NuxtPage />
      </NuxtLayout>
    </ConfigProvider>

    <Toaster :theme="colorMode.preference as any || 'system'" position="top-center" />
  </SiteBody>
</template>
