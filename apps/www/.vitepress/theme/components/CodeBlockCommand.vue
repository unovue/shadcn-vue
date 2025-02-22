<script setup lang="ts">
import type { Config } from '@/stores/config'
import { Button } from '@/registry/new-york/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/new-york/ui/tabs'
import { useConfigStore } from '@/stores/config'
import { useClipboard } from '@vueuse/core'
import { CheckIcon, ClipboardIcon } from 'lucide-vue-next'

const props = defineProps<{
  tabs: Record<Config['packageManager'], string>
}>()

const { config } = useConfigStore()
const { copied, copy } = useClipboard()

function handleCopy() {
  copy(props.tabs[config.value.packageManager])
}
</script>

<template>
  <div class="language-bash relative mt-6 max-h-[650px] overflow-x-auto rounded-xl bg-zinc-950 dark:bg-zinc-900">
    <Tabs v-model="config.packageManager">
      <div class="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3 pt-2.5">
        <TabsList class="h-7 translate-y-[2px] gap-3 bg-transparent p-0 pl-1">
          <TabsTrigger
            v-for="key in Object.keys(tabs)" :key="key" :value="key"
            class="rounded-none border-b border-transparent bg-transparent p-0 pb-1.5 font-mono text-zinc-400 data-[state=active]:border-b-zinc-50 data-[state=active]:bg-transparent data-[state=active]:text-zinc-50"
          >
            {{ key }}
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent v-for="([key, value]) in Object.entries(tabs)" :key="key" :value="key" class="mt-0">
        <pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>{{ value }}</span></span></code></pre>
      </TabsContent>
    </Tabs>
    <Button
      size="icon" variant="ghost"
      class="absolute right-2.5 top-2 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3"
      @click="handleCopy"
    >
      <span class="sr-only">Copy</span>
      <CheckIcon v-if="copied" /><ClipboardIcon v-else />
    </Button>
  </div>
</template>
