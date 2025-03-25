<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'
import { MoonIcon, SunIcon } from 'lucide-vue-next'

const colorMode = useColorMode()
</script>

<template>
  <Button
    variant="outline"
    size="icon"
    class="group/toggle size-8"
    @click="colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light' "
  >
    <SunIcon class="hidden [html.dark_&]:block" />
    <MoonIcon class="hidden [html.light_&]:block" />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
