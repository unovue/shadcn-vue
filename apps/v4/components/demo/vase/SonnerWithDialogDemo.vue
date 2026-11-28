<script setup lang="ts">
import type { DialogRootChangeEventDetails } from '@vase-ui/vue/dialog'
import { toast } from 'vue-sonner'
import { Button } from '@/styles/vase-vega/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/styles/vase-vega/ui/dialog'

function onOpenChange(_open: boolean, details: DialogRootChangeEventDetails) {
  if (details.reason === 'outside-press' && (details.event.target as HTMLElement).closest('[data-sonner-toaster]')) {
    details.cancel()
  }
}
</script>

<template>
  <Dialog @open-change="onOpenChange">
    <DialogTrigger>
      <template #element="{ props, elementRef }">
        <Button v-bind="props" :ref="elementRef" variant="outline">
          Dialog with toast
        </Button>
      </template>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Vue Sonner Toast</DialogTitle>
        <DialogDescription> Dialog with toast </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4">
        <Button
          size="sm"
          class="px-3"
          @click="
            () => {
              toast('Event has been created', {
                description: 'Sunday, December 03, 2023 at 9:00 AM',
                action: {
                  label: 'Undo',
                  onClick: () => console.log('Undo'),
                },
              });
            }
          "
        >
          Toast
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
