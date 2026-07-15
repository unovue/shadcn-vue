<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, ref } from 'vue'
import { parsePresetInput } from '@/lib/parse-preset-input'
import { cn } from '@/lib/utils'
import { Button } from '@/styles/reka-nova/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/styles/reka-nova/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/styles/reka-nova/ui/drawer'
import { Field, FieldContent, FieldLabel } from '@/styles/reka-nova/ui/field'
import { Input } from '@/styles/reka-nova/ui/input'

const props = defineProps<{
  class?: HTMLAttributes['class']
  label?: string
}>()

const PRESET_EXAMPLE = '4PgC4Q3AuEL4s'
const PRESET_TITLE = 'Open Preset'
const PRESET_DESCRIPTION = 'Paste a preset code to load a saved configuration.'

const params = useDesignSystemSearchParams()
const isMobile = useIsMobile()
const { open, setOpen } = useOpenPreset()

const input = ref('')
const nextPreset = computed(() => parsePresetInput(input.value))
const isInvalid = computed(() => input.value.trim().length > 0 && nextPreset.value === null)

const triggerClass = computed(() => cn(
  'touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none hover:bg-muted! pointer-coarse:h-10!',
  props.class,
))

function handleOpenChange(nextOpen: boolean) {
  setOpen(nextOpen)
  if (!nextOpen)
    input.value = ''
}

function handleSubmit(event: Event) {
  event.preventDefault()
  if (!nextPreset.value)
    return

  params.preset.value = nextPreset.value
  handleOpenChange(false)
}
</script>

<template>
  <Drawer v-if="isMobile" :open="open" @update:open="handleOpenChange">
    <DrawerTrigger as-child>
      <Button variant="outline" :class="triggerClass">
        {{ props.label ?? 'Open Preset' }}
      </Button>
    </DrawerTrigger>
    <DrawerContent class="dark rounded-t-2xl!">
      <DrawerHeader>
        <DrawerTitle class="text-xl">
          {{ PRESET_TITLE }}
        </DrawerTitle>
        <DrawerDescription>{{ PRESET_DESCRIPTION }}</DrawerDescription>
      </DrawerHeader>
      <form @submit="handleSubmit">
        <div class="px-4 py-2">
          <Field :data-invalid="isInvalid || undefined">
            <FieldLabel for="preset-code" class="sr-only">
              Preset code
            </FieldLabel>
            <FieldContent>
              <Input
                id="preset-code"
                v-model="input"
                :placeholder="`${PRESET_EXAMPLE} or --preset ${PRESET_EXAMPLE}`"
                autocapitalize="none"
                autocorrect="off"
                :spellcheck="false"
                :aria-invalid="isInvalid"
                class="h-10 md:h-8"
              />
            </FieldContent>
          </Field>
        </div>
        <DrawerFooter>
          <Button type="submit" class="h-10" :disabled="!nextPreset">
            Open
          </Button>
          <DrawerClose as-child>
            <Button variant="outline" type="button" class="h-10">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </DrawerContent>
  </Drawer>

  <Dialog v-else :open="open" @update:open="handleOpenChange">
    <DialogTrigger as-child>
      <Button variant="outline" :class="triggerClass">
        {{ props.label ?? 'Open Preset' }}
      </Button>
    </DialogTrigger>
    <DialogContent class="dark">
      <form @submit="handleSubmit">
        <DialogHeader>
          <DialogTitle>{{ PRESET_TITLE }}</DialogTitle>
          <DialogDescription>{{ PRESET_DESCRIPTION }}</DialogDescription>
        </DialogHeader>
        <div class="py-4">
          <Field :data-invalid="isInvalid || undefined">
            <FieldLabel for="preset-code-desktop" class="sr-only">
              Preset code
            </FieldLabel>
            <FieldContent>
              <Input
                id="preset-code-desktop"
                v-model="input"
                :placeholder="`${PRESET_EXAMPLE} or --preset ${PRESET_EXAMPLE}`"
                autocapitalize="none"
                autocorrect="off"
                :spellcheck="false"
                :aria-invalid="isInvalid"
                class="h-10 md:h-8"
              />
            </FieldContent>
          </Field>
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" :disabled="!nextPreset">
            Open
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
