<script setup lang="ts">
import type { NuxtError } from '#app'
import { ConfigProvider } from 'reka-ui'
import Button from './registry/new-york-v4/ui/button/Button.vue'

defineProps<{
  error: NuxtError
}>()

const useIdFunction = () => useId()
</script>

<template>
  <SiteBody>
    <ConfigProvider>
      <NuxtLayout name="default" :use-id="useIdFunction">
        <div class="flex flex-col items-center justify-center gap-6 text-center min-h-[80vh]">
          <PageHeader>
            <PageHeaderHeading>{{ error.statusCode }}</PageHeaderHeading>
            <PageHeaderDescription>{{ error.message }}</PageHeaderDescription>
            <Button as-child class="w-fit mt-6">
              <NuxtLink to="/">
                Go back home
              </NuxtLink>
            </Button>
          </PageHeader>
        </div>
      </NuxtLayout>
    </ConfigProvider>
  </SiteBody>
</template>
