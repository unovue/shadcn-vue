<script setup lang="ts">
import { Button } from '@/styles/vase-vega/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/styles/vase-vega/ui/dialog'
import { Input } from '@/styles/vase-vega/ui/input'
import { Label } from '@/styles/vase-vega/ui/label'
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <template #element="{ props, elementRef }">
        <Button v-bind="props" :ref="elementRef" variant="outline">
          Share
        </Button>
      </template>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Share link</DialogTitle>
        <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription>
      </DialogHeader>
      <div class="flex items-center gap-2">
        <div class="grid flex-1 gap-2">
          <Label for="link" class="sr-only">
            Link
          </Label>
          <Input
            id="link"
            default-value="https://ui.shadcn.com/docs/installation"
            read-only
          />
        </div>
      </div>
      <DialogFooter class="sm:justify-start">
        <DialogClose>
          <template #element="{ props, elementRef }">
            <Button v-bind="props" :ref="elementRef" type="button" variant="secondary">
              Close
            </Button>
          </template>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
