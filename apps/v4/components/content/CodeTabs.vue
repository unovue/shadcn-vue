<script setup lang="ts">
import { Tabs } from '@/registry/new-york-v4/ui/tabs'

const { config } = useConfig()
</script>

<template>
  <Tabs
    v-model="config.installationType"
    class="relative mt-6 w-full"
  >
    <slot />
  </Tabs>
</template>
