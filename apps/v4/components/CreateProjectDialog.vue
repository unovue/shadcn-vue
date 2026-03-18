<script setup lang="ts">
import type { PackageManager } from '@/composables/useUserConfig'
import { Tick02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useClipboard } from '@vueuse/core'
import { CopyIcon } from 'lucide-vue-next'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/registry/new-york-v4/ui/dialog'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/registry/new-york-v4/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/registry/new-york-v4/ui/tooltip'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const params = useDesignSystemSearchParams()
const { config } = useConfig()

const TEMPLATES = [
  { value: 'nuxt', label: 'Nuxt', createCommand: 'npx nuxi@latest init' },
  { value: 'vite', label: 'Vite', createCommand: 'npm create vite@latest' },
] as const

const PACKAGE_MANAGERS: { value: PackageManager, label: string, runCommand: string }[] = [
  { value: 'pnpm', label: 'pnpm', runCommand: 'pnpm dlx' },
  { value: 'npm', label: 'npm', runCommand: 'npx' },
  { value: 'yarn', label: 'yarn', runCommand: 'yarn dlx' },
  { value: 'bun', label: 'bun', runCommand: 'bunx' },
]

const currentTemplate = computed(() => TEMPLATES.find(t => t.value === params.template.value) ?? TEMPLATES[0])
const currentPackageManager = computed(() => PACKAGE_MANAGERS.find(pm => pm.value === config.value.packageManager) ?? PACKAGE_MANAGERS[0])

function buildInitCommand() {
  const pm = currentPackageManager.value
  const parts = [`${pm.runCommand} shadcn-vue@latest init`]

  // Add style
  if (params.style.value && params.style.value !== 'vega') {
    parts.push(`--style ${params.style.value}`)
  }

  // Add base color
  if (params.baseColor.value && params.baseColor.value !== 'neutral') {
    parts.push(`--base-color ${params.baseColor.value}`)
  }

  // Add theme (primary color)
  if (params.theme.value && params.theme.value !== params.baseColor.value) {
    parts.push(`--theme ${params.theme.value}`)
  }

  // Add icon library
  if (params.iconLibrary.value && params.iconLibrary.value !== 'lucide') {
    parts.push(`--icon-library ${params.iconLibrary.value}`)
  }

  return parts.join(' \\\n  ')
}

const initCommand = computed(() => buildInitCommand())

const steps = computed(() => {
  const template = currentTemplate.value
  const pm = currentPackageManager.value

  return [
    {
      title: `Create a new ${template.label} project`,
      command: `${template.createCommand} my-app`,
    },
    {
      title: 'Navigate to the project directory',
      command: 'cd my-app',
    },
    {
      title: 'Initialize shadcn-vue with your theme',
      command: initCommand.value,
    },
    {
      title: 'Start adding components',
      command: `${pm.runCommand} shadcn-vue@latest add button`,
    },
  ]
})

const { copy, copied } = useClipboard()
const copiedIndex = ref<number | null>(null)

function copyCommand(command: string, index: number) {
  // Remove line continuations for copying
  const cleanCommand = command.replace(/\s*\\\n\s*/g, ' ')
  copy(cleanCommand)
  copiedIndex.value = index
  setTimeout(() => {
    copiedIndex.value = null
  }, 2000)
}

function handleOpenChange(value: boolean) {
  emit('update:open', value)
}
</script>

<template>
  <Dialog :open="open" @update:open="handleOpenChange">
    <DialogContent class="max-w-2xl">
      <DialogHeader>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogDescription>
          Follow these steps to create a new project with your custom theme.
        </DialogDescription>
      </DialogHeader>

      <Tabs v-model="params.template.value" class="w-full">
        <div class="flex items-center justify-between gap-4">
          <TabsList class="grid w-fit grid-cols-2">
            <TabsTrigger
              v-for="template in TEMPLATES"
              :key="template.value"
              :value="template.value"
            >
              {{ template.label }}
            </TabsTrigger>
          </TabsList>

          <div class="flex items-center gap-1">
            <Button
              v-for="pm in PACKAGE_MANAGERS"
              :key="pm.value"
              variant="ghost"
              size="sm"
              class="h-7 px-2 text-xs" :class="[
                config.packageManager === pm.value
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground',
              ]"
              @click="config.packageManager = pm.value"
            >
              {{ pm.label }}
            </Button>
          </div>
        </div>

        <TabsContent
          v-for="template in TEMPLATES"
          :key="template.value"
          :value="template.value"
          class="mt-4 space-y-4"
        >
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="space-y-2"
          >
            <div class="flex items-center gap-2">
              <div class="bg-primary text-primary-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                {{ index + 1 }}
              </div>
              <span class="text-sm font-medium">{{ step.title }}</span>
            </div>
            <div class="bg-muted relative ml-8 rounded-md">
              <pre class="overflow-x-auto p-3 text-sm"><code>{{ step.command }}</code></pre>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="absolute top-1.5 right-1.5 size-7"
                    @click="copyCommand(step.command, index)"
                  >
                    <HugeiconsIcon
                      v-if="copiedIndex === index"
                      :icon="Tick02Icon"
                      :stroke-width="2"
                      class="size-4"
                    />
                    <CopyIcon v-else class="size-4" />
                    <span class="sr-only">Copy</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {{ copiedIndex === index ? 'Copied!' : 'Copy' }}
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div class="bg-muted/50 mt-2 rounded-lg border p-4">
        <p class="text-muted-foreground text-sm">
          <strong class="text-foreground">Note:</strong> Your theme configuration will be applied during initialization.
          You can always customize it later by editing your <code class="bg-muted rounded px-1 py-0.5">components.json</code> file.
        </p>
      </div>
    </DialogContent>
  </Dialog>
</template>
