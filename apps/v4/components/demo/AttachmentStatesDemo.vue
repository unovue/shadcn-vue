<script setup lang="ts">
import { CheckIcon, ClockIcon, FileTextIcon, FileWarningIcon, RefreshCwIcon, XIcon } from '@lucide/vue'
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from '@/registry/new-york-v4/ui/attachment'
import { Spinner } from '@/registry/new-york-v4/ui/spinner'
</script>

<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-2 py-12">
    <Attachment state="idle" class="w-full">
      <AttachmentMedia>
        <ClockIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>selected-file.pdf</AttachmentTitle>
        <AttachmentDescription>Ready to upload</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove selected-file.pdf">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment state="uploading" class="w-full">
      <AttachmentMedia>
        <Spinner />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>design-system.zip</AttachmentTitle>
        <AttachmentDescription>Uploading · 64%</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Cancel upload">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment state="processing" class="w-full">
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>market-research.pdf</AttachmentTitle>
        <AttachmentDescription>Processing document</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove market-research.pdf">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment state="error" class="w-full">
      <AttachmentMedia>
        <FileWarningIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
        <AttachmentDescription>
          Upload failed. Try again.
        </AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Retry upload">
          <RefreshCwIcon />
        </AttachmentAction>
        <AttachmentAction aria-label="Remove financial-model.xlsx">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
    <Attachment state="done" class="w-full">
      <AttachmentMedia>
        <CheckIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>uploaded-report.pdf</AttachmentTitle>
        <AttachmentDescription>Uploaded · 1.8 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove uploaded-report.pdf">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  </div>
</template>
