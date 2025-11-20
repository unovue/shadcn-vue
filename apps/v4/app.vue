<script setup lang="ts">
import { ConfigProvider, TooltipProvider } from 'reka-ui'
import { Toaster } from '@/registry/new-york-v4/ui/sonner'

const { config, isLayoutFull } = useConfig()
const activeTheme = computed(() => config.value.activeTheme)
const isScaled = computed(() => !!activeTheme.value?.endsWith('-scaled'))
const colorMode = useColorMode()
</script>

<template>
  <SiteBody>
    <ConfigProvider>
      <TooltipProvider>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </TooltipProvider>
    </ConfigProvider>

    <ClientOnly>
      <Toaster class="pointer-events-auto" :theme="colorMode.preference as any || 'system'" position="top-center" />
    </ClientOnly>
  </SiteBody>
</template>
