<script setup lang="ts">
import { computed, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useConfigStore } from '@/stores/config'
import { themes } from '@/lib/registry'
import { Button } from '@/lib/registry/new-york/ui/button'
import CheckIcon from '~icons/radix-icons/check'
import CopyIcon from '~icons/radix-icons/copy'

const { theme, config } = useConfigStore()

const activeTheme = computed(() => themes.find(i => i.name === theme.value))

const { copy, copied } = useClipboard()

const codeRef = ref<HTMLElement>()
async function copyCode() {
  await copy(codeRef.value?.textContent?.replace(/\u00A0/g, ' ') ?? '')
}
</script>

<template>
  <div class="relative">
    <pre class="max-h-[450px] overflow-x-auto rounded-lg border bg-zinc-950 !py-0 dark:bg-zinc-900">
<code ref="codeRef" class="relative block rounded font-mono text-sm">
<span class="line text-white">@layer base &#123;</span>
  <span class="line text-white">:root &#123;</span>
  <span class="line text-white">&nbsp;&nbsp;--background: {{ activeTheme?.cssVars.light.background }};</span>
  <span class="line text-white">&nbsp;&nbsp;--foreground: {{ activeTheme?.cssVars.light.foreground }};</span>
  <template v-for="prefix in (['card', 'popover', 'primary', 'secondary', 'muted', 'accent', 'destructive'] as const)" :key="prefix">
    <span class="line text-white">--{{ prefix }}: {{ activeTheme?.cssVars.light[prefix] }};</span>
    <span class="line text-white">--{{ prefix }}-foreground: {{ activeTheme?.cssVars.light[ `${prefix}-foreground`] }};</span>
  </template>
  <span class="line text-white">&nbsp;&nbsp;--border:{{ activeTheme?.cssVars.light.border }};</span>
  <span class="line text-white">&nbsp;&nbsp;--input:{{ activeTheme?.cssVars.light.input }};</span>
  <span class="line text-white">&nbsp;&nbsp;--ring:{{ activeTheme?.cssVars.light.ring }};</span>
  <span class="line text-white">&nbsp;&nbsp;--radius: {{ config.radius }}rem;</span>
  <span class="line text-white">&#125;</span>
  <span class="line text-white">&nbsp;</span>
  <span class="line text-white">.dark &#123;</span>
  <span class="line text-white">&nbsp;&nbsp;--background:{{ activeTheme?.cssVars.dark.background }};</span>
  <span class="line text-white">&nbsp;&nbsp;--foreground:{{ activeTheme?.cssVars.dark.foreground }};</span>
  <template v-for="prefix in (['card', 'popover', 'primary', 'secondary', 'muted', 'accent', 'destructive'] as const)" :key="prefix">
    <span class="line text-white">--{{ prefix }}:{{ activeTheme?.cssVars.dark[ prefix] }};</span>
    <span class="line text-white">--{{ prefix }}-foreground:{{ activeTheme?.cssVars.dark[ `${prefix}-foreground`] }};</span>
  </template>
  <span class="line text-white">&nbsp;&nbsp;--border:{{ activeTheme?.cssVars.dark.border }};</span>
  <span class="line text-white">&nbsp;&nbsp;--input:{{ activeTheme?.cssVars.dark.input }};</span>
  <span class="line text-white">&nbsp;&nbsp;--ring:{{ activeTheme?.cssVars.dark.ring }};</span>
  <span class="line text-white">&#125;</span>
<span class="line text-white">&#125;</span>
</code>
</pre>
    <Button size="sm" class="absolute right-4 top-4 bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground" @click="copyCode">
      <CheckIcon v-if="copied" class="mr-2 h-4 w-4" />
      <CopyIcon v-else class="mr-2 h-4 w-4" />
      {{ copied ? 'Copied' : 'Copy' }}
    </Button>
  </div>
</template>
