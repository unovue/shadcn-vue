<script setup lang="ts">
import { IconCheck, IconCopy } from '@tabler/icons-vue'
import { useClipboard } from '@vueuse/core'
import { computed } from 'vue'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/registry/new-york-v4/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/registry/new-york-v4/ui/tooltip'

const props = defineProps<{
  commands: Record<string, string>
}>()

const { config } = useConfig()

const command = computed(() => props.commands[config.value.packageManager] ?? '')
const { copy, copied } = useClipboard({ source: command, copiedDuring: 2000 })
</script>

<template>
  <Tabs v-model="config.packageManager" class="gap-0 overflow-hidden rounded-xl border">
    <div class="flex items-center gap-2 border-b p-1.5">
      <TabsList class="h-auto *:data-[slot=tabs-trigger]:pt-0">
        <TabsTrigger v-for="key in Object.keys(commands)" :key="key" :value="key">
          {{ key }}
        </TabsTrigger>
      </TabsList>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <Button
              size="icon-sm"
              variant="ghost"
              class="ml-auto"
              @click="copy()"
            >
              <IconCheck v-if="copied" />
              <IconCopy v-else />
              <span class="sr-only">Copy command</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {{ copied ? 'Copied!' : 'Copy command' }}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    <TabsContent v-for="(cmd, key) in commands" :key="key" :value="key" class="mt-0">
      <div class="bg-surface text-surface-foreground px-3 py-3">
        <div class="no-scrollbar overflow-x-auto">
          <code class="font-mono text-sm whitespace-nowrap">{{ cmd }}</code>
        </div>
      </div>
    </TabsContent>
  </Tabs>
</template>
