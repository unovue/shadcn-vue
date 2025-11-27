<script setup lang="ts">
import { TerminalIcon } from 'lucide-vue-next'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/registry/new-york-v4/ui/tabs'

const props = defineProps<{
  code: string
}>()

const tabs = computed(() => {
  const data = { pnpm: '', npm: '', yarn: '', bun: '' }

  if (props.code.includes('npm install')) {
    data.npm = props.code
    data.yarn = props.code.replaceAll('npm install', 'yarn add')
    data.pnpm = props.code.replaceAll('npm install', 'pnpm add')
    data.bun = props.code.replaceAll('npm install', 'bun add')
  }
  else if (props.code.includes('npx create-')) {
    data.npm = props.code
    data.yarn = props.code.replaceAll('npx create-', 'yarn create')
    data.pnpm = props.code.replaceAll('npx create-', 'pnpm create')
    data.bun = props.code.replaceAll('npx', 'bunx --bun')
  }
  else if (props.code.includes('npm create')) {
    data.npm = props.code
    data.yarn = props.code.replaceAll('npm create', 'yarn create')
    data.pnpm = props.code.replaceAll('npm create', 'pnpm create')
    data.bun = props.code.replaceAll('npm create', 'bun create')
  }
  else if (props.code.includes('npx')) {
    data.npm = props.code
    data.yarn = props.code.replaceAll('npx', 'yarn dlx')
    data.pnpm = props.code.replaceAll('npx', 'pnpm dlx')
    data.bun = props.code.replaceAll('npx', 'bunx --bun')
  }
  else if (props.code.includes('npm run')) {
    data.npm = props.code
    data.yarn = props.code.replaceAll('npm run', 'yarn')
    data.pnpm = props.code.replaceAll('npm run', 'pnpm')
    data.bun = props.code.replaceAll('npm run', 'bun')
  }

  return data
})

const { config } = useConfig()
</script>

<template>
  <div class="overflow-x-auto">
    <Tabs v-model="config.packageManager" class="gap-0">
      <div class="border-border/50 flex items-center gap-2 border-b px-3 py-1">
        <div class="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
          <TerminalIcon class="text-code size-3" />
        </div>
        <TabsList class="rounded-none bg-transparent p-0">
          <TabsTrigger v-for="key in Object.keys(tabs)" :key="key" :value="key" class="data-[state=active]:bg-accent data-[state=active]:border-input h-7 border border-transparent pt-0.5 data-[state=active]:shadow-none">
            {{ key }}
          </TabsTrigger>
        </TabsList>
      </div>

      <div class="no-scrollbar overflow-x-auto">
        <TabsContent v-for="([key, value]) in Object.entries(tabs)" :key="key" :value="key" class="mt-0 px-4 py-3.5">
          <pre class="language-bash shiki shiki-themes github-light-default github-dark"><code class="relative font-mono text-sm leading-none"><span class="line"><span>{{ value }}</span></span></code></pre>
        </TabsContent>
      </div>
    </Tabs>
    <CopyButton class="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100" :value="tabs[config.packageManager]" />
  </div>
</template>
