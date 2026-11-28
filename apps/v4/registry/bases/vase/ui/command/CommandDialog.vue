<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from "@vase-ui/vue/dialog"
import type { HTMLAttributes } from "vue"
import { cn } from "cn"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/registry/bases/vase/ui/dialog"
import Command from "./Command.vue"

interface Props extends /* @vue-ignore */ DialogRootProps {
  title?: string
  description?: string
  class?: HTMLAttributes["class"]
  showCloseButton?: boolean
}
interface Emits extends /* @vue-ignore */ DialogRootEmits {}

const props = withDefaults(defineProps<Props>(), {
  title: "Command Palette",
  description: "Search for a command to run...",
  showCloseButton: false,
})
defineEmits<Emits>()
</script>

<template>
  <Dialog v-slot="slotProps">
    <DialogContent
      :class="cn('cn-command-dialog top-1/3 translate-y-0 overflow-hidden p-0', props.class)"
      :show-close-button="showCloseButton"
    >
      <DialogHeader class="sr-only">
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>{{ description }}</DialogDescription>
      </DialogHeader>
      <Command>
        <slot v-bind="slotProps" />
      </Command>
    </DialogContent>
  </Dialog>
</template>
