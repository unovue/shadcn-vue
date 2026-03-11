<script setup lang="ts">
import {
  Dropzone,
  DropzoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneFileMessage,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneRetryFile,
  DropzoneTrigger,
  InfiniteProgress,
  useDropzoneUpload,
} from '@/registry/new-york-v4/ui/dropzone'

const dropzone = useDropzoneUpload({
  onDropFile: async () => {
    await new Promise(resolve =>
      setTimeout(resolve, Math.random() * 300 + 800),
    )

    if (Math.random() > 0.75) {
      return {
        status: 'error' as const,
        error: 'Upload failed',
      }
    }
    return {
      status: 'success' as const,
      result: undefined,
    }
  },
  validation: {
    maxFiles: 4,
    maxSize: 5 * 1024 * 1024, // 5MB
  },
})
</script>

<template>
  <div class="w-full max-w-md mx-auto">
    <Dropzone v-bind="dropzone" class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:justify-between gap-2">
        <DropzoneDescription class="text-sm">
          Select up to 4 files (max 5MB)
        </DropzoneDescription>
        <DropzoneMessage class="text-sm" />
      </div>

      <DropzoneArea>
        <DropzoneTrigger
          class="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 text-center hover:border-muted-foreground/50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="text-muted-foreground"
          >
            <path d="M12 13v8" />
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="m8 17 4-4 4 4" />
          </svg>
          <div class="text-sm">
            <p class="font-medium">
              Upload files
            </p>
            <p class="text-muted-foreground">
              Click or drag and drop
            </p>
          </div>
        </DropzoneTrigger>
      </DropzoneArea>

      <div class="overflow-clip rounded-md mt-4">
        <DropzoneFileList
          v-if="dropzone.fileStatuses.value.length > 0"
          class="space-y-2 max-h-48 pr-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-track]:bg-muted-foreground/20"
        >
          <DropzoneFileListItem
            v-for="file in dropzone.fileStatuses.value" :key="file.id" :file="file"
            class="rounded-md border p-3"
          >
            <div class="flex items-center justify-between gap-2">
              <div class="flex min-w-0 items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="text-muted-foreground shrink-0"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                </svg>
                <div class="min-w-0">
                  <p class="text-sm font-medium truncate">
                    {{ file.fileName }}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    {{ (file.file.size / (1024 * 1024)).toFixed(2) }} MB
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-1">
                <DropzoneRetryFile v-if="file.status === 'error'" variant="ghost" size="sm" class="p-1 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M8 16H3v5" />
                  </svg>
                </DropzoneRetryFile>
                <DropzoneRemoveFile variant="ghost" size="sm" class="p-1 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </DropzoneRemoveFile>
              </div>
            </div>
            <InfiniteProgress :status="file.status" class="mt-2" />
            <DropzoneFileMessage class="text-xs text-right mt-1" />
          </DropzoneFileListItem>
        </DropzoneFileList>
      </div>
    </Dropzone>
  </div>
</template>
