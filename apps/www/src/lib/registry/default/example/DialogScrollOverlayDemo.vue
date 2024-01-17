<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
  DialogTrigger,
} from '@/lib/registry/default/ui/dialog'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        Edit Profile
      </Button>
    </DialogTrigger>
    <DialogScrollContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Modal title</DialogTitle>
        <DialogDescription>
          Here is modal with overlay scroll
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4 h-[300dvh]">
        <p>
          This is some placeholder content to show the scrolling behavior for modals. Instead of repeating the text in the modal, we use an inline style to set a minimum height, thereby extending the length of the overall modal and demonstrating the overflow scrolling. When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
        </p>
      </div>
      <DialogFooter>
        <Button type="submit">
          Save changes
        </Button>
      </DialogFooter>
    </DialogScrollContent>
  </Dialog>
</template>
