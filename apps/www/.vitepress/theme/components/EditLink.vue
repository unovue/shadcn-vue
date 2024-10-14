<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
import Pencil2Icon from '~icons/radix-icons/pencil-2'
import { useData } from 'vitepress'
import { computed } from 'vue'

const { theme, page } = useData()

const link = computed(() => {
  const { text = 'Edit this page', pattern = '' } = theme.value.editLink || {}
  let url: string
  if (typeof pattern === 'function')
    url = pattern(page.value)

  else
    url = pattern.replace(/:path/g, page.value.filePath)

  return { url, text }
})
</script>

<template>
  <Button as="a" :href="link.url" target="_blank" :variant="'ghost'" class="underline mt-8">
    <Pencil2Icon class="mr-2" />
    {{ link.text }}
  </Button>
</template>
