<script setup lang="ts">
import { Button } from "@/registry/bases/vase/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/bases/vase/ui/dialog"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="No Close Button" class="items-center justify-center">
    <Dialog>
      <DialogTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline">
            No Close Button
          </Button>
        </template>
      </DialogTrigger>
      <DialogContent :show-close-button="false">
        <DialogHeader>
          <DialogTitle>No Close Button</DialogTitle>
          <DialogDescription>
            This dialog doesn't have a close button in the top-right
            corner.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <template #element="{ props, elementRef }">
              <Button v-bind="props" :ref="elementRef" variant="outline">
                Close
              </Button>
            </template>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Example>
</template>
