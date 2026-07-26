<script setup lang="ts">
import { CopyIcon, FileSearchIcon, XIcon } from '@lucide/vue'
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from '@/registry/new-york-v4/ui/attachment'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/registry/new-york-v4/ui/dialog'
</script>

<template>
  <div class="mx-auto w-full max-w-sm py-12">
    <Dialog>
      <Attachment class="w-full">
        <AttachmentMedia>
          <FileSearchIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>research-summary.pdf</AttachmentTitle>
          <AttachmentDescription>Open preview dialog</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Copy link">
            <CopyIcon />
          </AttachmentAction>
          <AttachmentAction aria-label="Remove research-summary.pdf">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
        <DialogTrigger as-child>
          <AttachmentTrigger aria-label="Preview research-summary.pdf" />
        </DialogTrigger>
      </Attachment>

      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>research-summary.pdf</DialogTitle>
          <DialogDescription>
            The attachment trigger fills the card and opens the dialog, while
            the actions stay independently clickable above it.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>
</template>
