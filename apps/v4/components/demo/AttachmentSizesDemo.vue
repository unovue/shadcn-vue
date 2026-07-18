<script setup lang="ts">
import { FileTextIcon } from '@lucide/vue'
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from '@/registry/new-york-v4/ui/attachment'
</script>

<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-3 py-12">
    <Attachment size="default" class="w-full">
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>Default attachment</AttachmentTitle>
        <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
    <Attachment size="sm" class="w-full">
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>Small attachment</AttachmentTitle>
        <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
      </AttachmentContent>
    </Attachment>
    <Attachment size="xs" class="w-full">
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>Extra small attachment</AttachmentTitle>
      </AttachmentContent>
    </Attachment>
  </div>
</template>
