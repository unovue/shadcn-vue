<script setup lang="ts">
import { Copy01Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useClipboard } from '@vueuse/core'
import { PACKAGE_MANAGERS, TEMPLATES } from '@/lib/templates'
import { Button } from '@/styles/reka-nova/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/styles/reka-nova/ui/dialog'
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldTitle,
} from '@/styles/reka-nova/ui/field'
import { RadioGroup, RadioGroupItem } from '@/styles/reka-nova/ui/radio-group'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/styles/reka-nova/ui/tabs'

defineProps<{ open: boolean }>()
defineEmits<{ 'update:open': [value: boolean] }>()

const params = useDesignSystemSearchParams()
const { config } = useConfig()

const presetId = computed(() => params.preset.value)

const commands = computed(() => {
  const flags = `--preset ${presetId.value} --template ${params.template.value ?? 'nuxt'}`
  return {
    pnpm: `pnpm dlx shadcn-vue@latest init ${flags}`,
    npm: `npx shadcn-vue@latest init ${flags}`,
    yarn: `yarn dlx shadcn-vue@latest init ${flags}`,
    bun: `bunx --bun shadcn-vue@latest init ${flags}`,
  }
})

const currentCommand = computed(
  () => commands.value[config.value.packageManager as keyof typeof commands.value] ?? commands.value.pnpm,
)

const { copy, copied } = useClipboard()

function handleCopy() {
  copy(currentCommand.value)
}
</script>

<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="dark no-scrollbar max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl p-6 shadow-xl **:data-[slot=field-separator]:h-2 sm:max-w-sm">
      <DialogHeader>
        <DialogTitle>Create Project</DialogTitle>
        <DialogDescription>
          Pick a template and configure your project.
        </DialogDescription>
      </DialogHeader>

      <div>
        <FieldGroup>
          <FieldSeparator class="-mx-6" />
          <Field class="-mt-2 gap-3">
            <FieldLabel>Template</FieldLabel>
            <RadioGroup
              :model-value="params.template.value"
              class="grid grid-cols-2 gap-2"
              @update:model-value="params.template.value = $event as any"
            >
              <FieldLabel
                v-for="template in TEMPLATES"
                :key="template.value"
                :for="`template-${template.value}`"
                class="block w-full"
              >
                <Field
                  orientation="horizontal"
                  class="w-full rounded-md transition-colors duration-150 hover:bg-neutral-700/45"
                >
                  <FieldContent class="flex flex-row items-center gap-2 px-2.5 py-1.5">
                    <span
                      class="size-4 shrink-0 text-neutral-100 [&_svg]:size-4 [&_svg]:fill-current"
                      v-html="template.logo"
                    />
                    <FieldTitle>{{ template.title }}</FieldTitle>
                  </FieldContent>
                  <RadioGroupItem
                    :id="`template-${template.value}`"
                    :value="template.value"
                    class="sr-only absolute"
                  />
                </Field>
              </FieldLabel>
            </RadioGroup>
          </Field>
        </FieldGroup>
      </div>

      <DialogFooter class="-mx-6 -mb-6 min-w-0">
        <div class="flex w-full min-w-0 flex-col gap-3 px-6 pb-6">
          <Tabs
            :model-value="config.packageManager"
            class="min-w-0 gap-0 overflow-hidden rounded-xl border-0 ring-1 ring-border"
            @update:model-value="config.packageManager = $event as any"
          >
            <div class="flex items-center gap-2 py-1 pr-1.5 pl-1">
              <TabsList class="bg-transparent font-mono">
                <TabsTrigger
                  v-for="pm in PACKAGE_MANAGERS"
                  :key="pm.value"
                  :value="pm.value"
                  class="py-0 leading-none data-[state=active]:shadow-none"
                >
                  {{ pm.label }}
                </TabsTrigger>
              </TabsList>
              <Button
                size="icon-sm"
                variant="ghost"
                class="ml-auto"
                @click="handleCopy"
              >
                <HugeiconsIcon v-if="copied" :icon="Tick02Icon" />
                <HugeiconsIcon v-else :icon="Copy01Icon" />
                <span class="sr-only">Copy command</span>
              </Button>
            </div>
            <TabsContent
              v-for="pm in PACKAGE_MANAGERS"
              :key="pm.value"
              :value="pm.value"
            >
              <div class="relative overflow-hidden border-t bg-popover p-3">
                <div class="no-scrollbar overflow-x-auto">
                  <code class="whitespace-nowrap font-mono text-sm">{{ commands[pm.value] }}</code>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <Button class="h-9 w-full" @click="handleCopy">
            {{ copied ? 'Copied' : 'Copy Command' }}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
