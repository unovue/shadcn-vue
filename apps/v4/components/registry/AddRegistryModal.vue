<script setup lang="ts">
import type { DirectoryRegistry } from "@/lib/directory-registry"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/registry/new-york-v4/ui/dialog"

interface Props {
  open: boolean
  registry: DirectoryRegistry
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: "update:open", value: boolean): void
}>()
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="dialog-ring animate-none! rounded-xl sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add Registry</DialogTitle>
        <DialogDescription>
          Run this command to add {{ registry.name }} to your project.
        </DialogDescription>
      </DialogHeader>
      <ProsePre
        v-if="registry.command"
        :code="registry?.command"
        language="bash"
      />
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
