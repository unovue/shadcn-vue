<script setup lang="ts">
import {
  Dropzone,
  DropzoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneTrigger,
  useDropzoneUpload,
} from '@/registry/new-york-v4/ui/dropzone'

const dropzone = useDropzoneUpload({
  onDropFile: async (file: File) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    return {
      status: 'success' as const,
      result: URL.createObjectURL(file),
    }
  },
  validation: {
    accept: ['image/png', 'image/jpeg', 'image/jpg'],
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 4,
  },
})
</script>

<template>
  <div class="w-full max-w-lg mx-auto">
    <Dropzone v-bind="dropzone" class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:justify-between gap-2">
        <DropzoneDescription class="text-sm">
          Select up to 4 images (max 5MB)
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
              Upload images
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
          class="grid gap-1.5 grid-cols-4 pr-1 max-h-48 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-track]:bg-muted-foreground/20"
        >
          <DropzoneFileListItem
            v-for="file in dropzone.fileStatuses.value" :key="file.id" :file="file"
            class="overflow-hidden rounded bg-secondary shadow-sm group relative"
          >
            <div class="relative">
              <div v-if="file.status === 'pending'" class="aspect-square animate-pulse bg-black/20" />
              <img
                v-if="file.status === 'success'" :src="file.result" :alt="`uploaded-${file.fileName}`"
                class="aspect-square object-cover w-full"
              >
              <DropzoneRemoveFile variant="ghost" size="sm" class="absolute cursor-pointer top-0.5 right-0.5 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="text-white"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </DropzoneRemoveFile>
            </div>
            <div class="p-1">
              <p class="truncate text-xs leading-tight">
                {{ file.fileName }}
              </p>
            </div>
          </DropzoneFileListItem>
        </DropzoneFileList>
      </div>
    </Dropzone>
  </div>
</template>
