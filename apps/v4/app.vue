<script setup lang="ts">
import { ConfigProvider, TooltipProvider } from 'reka-ui'
import { Toaster } from '@/registry/new-york-v4/ui/sonner'

const colorMode = useColorMode()

useSeoMeta({
  creator: 'unovue',
  ogLocale: 'en_US',
  ogType: 'website',
  ogSiteName: 'shadcn/vue',
  ogUrl: 'https://shadcn-vue.com',
  themeColor: '#41b883',
})
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
