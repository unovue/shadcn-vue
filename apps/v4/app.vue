<script setup lang="ts">
import { ConfigProvider } from 'reka-ui'
import { Toaster } from '@/registry/new-york-v4/ui/sonner'

const { config, isLayoutFull } = useConfig()
const activeTheme = computed(() => config.value.activeTheme)
const isScaled = computed(() => !!activeTheme.value?.endsWith('-scaled'))
const colorMode = useColorMode()
</script>

<template>
  <SiteBody>
    <ConfigProvider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ConfigProvider>

    <Toaster class="pointer-events-auto" :theme="colorMode.preference as any || 'system'" position="top-center" />
  </SiteBody>
</template>
