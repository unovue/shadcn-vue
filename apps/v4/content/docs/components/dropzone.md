---
title: Dropzone
description: A drag-and-drop file upload component with support for multiple files, validation, and upload progress.
component: true
---

::component-preview
---
name: DropzoneDemo
description: A dropzone with file upload functionality
---
::

## Installation

::code-tabs

::tabs-list

  ::tabs-trigger{value="cli"}
  CLI
  ::

  ::tabs-trigger{value="manual"}
  Manual
  ::

::

::tabs-content{value="cli"}

```bash
npx shadcn-vue@latest add dropzone
```

::

::tabs-content{value="manual"}
  ::steps
    ::step
    Install the following dependencies:
    ::

    ```bash
    npm install vue3-dropzone
    ```

    ::step
    Copy and paste the [GitHub source code](https://github.com/unovue/shadcn-vue/tree/dev/apps/v4/registry/new-york-v4/ui/dropzone) into your project.
    ::

    ::step
    Update the import paths to match your project setup.
    ::
  ::
::

::

## Usage

```vue showLineNumbers
<script setup lang="ts">
import {
  Dropzone,
  DropzoneArea,
  DropzoneDescription,
  DropzoneMessage,
  DropzoneTrigger,
  useDropzoneUpload,
} from '@/components/ui/dropzone'

const dropzone = useDropzoneUpload({
  onDropFile: async (file: File) => {
    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return { status: 'success', result: file.name }
  },
  validation: {
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB
  },
})
</script>

<template>
  <Dropzone v-bind="dropzone">
    <div>
      <div class="flex justify-between">
        <DropzoneDescription>
          Select files to upload
        </DropzoneDescription>
        <DropzoneMessage />
      </div>
      <DropzoneArea>
        <DropzoneTrigger class="flex flex-col items-center gap-4 bg-transparent p-10 text-center text-sm">
          <div>
            <p class="font-semibold">Upload files</p>
            <p class="text-sm text-muted-foreground">
              Click here or drag and drop to upload
            </p>
          </div>
        </DropzoneTrigger>
      </DropzoneArea>
    </div>
  </Dropzone>
</template>
```

## Examples

### Single File Upload

Perfect for profile pictures or single document uploads with automatic replacement when max files is reached.

::component-preview
---
name: DropzoneSingleFile
description: Single file upload with avatar preview
---
::

```vue showLineNumbers
<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dropzone,
  DropzoneArea,
  DropzoneMessage,
  DropzoneTrigger,
  useDropzoneUpload,
} from '@/components/ui/dropzone'

const previewUrl = ref<string | null>(null)

const dropzone = useDropzoneUpload({
  onDropFile: async (file: File) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // Revoke previous URL if it exists
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
    }
    
    // Create new URL and store reference for cleanup
    previewUrl.value = URL.createObjectURL(file)
    
    return {
      status: 'success' as const,
      result: previewUrl.value,
    }
  },
  onRemoveFile: async (id: string) => {
    // Revoke blob URL when removing file
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
      previewUrl.value = null
    }
  },
  validation: {
    accept: ['image/png', 'image/jpeg', 'image/jpg'],
    maxSize: 10 * 1024 * 1024,
    maxFiles: 1,
  },
  shiftOnMaxFiles: true,
})

// Clean up on unmount
onUnmounted(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
})

const avatarSrc = computed(() => dropzone.fileStatuses.value[0]?.result ?? '')
const isPending = computed(() => dropzone.fileStatuses.value[0]?.status === 'pending')
const hasAvatar = computed(() => !!dropzone.fileStatuses.value[0]?.result)
</script>

<template>
  <div>
    <Dropzone v-bind="dropzone">
      <div class="flex justify-between">
        <DropzoneMessage />
      </div>
      <DropzoneArea>
        <DropzoneTrigger class="flex gap-8 bg-transparent text-sm">
          <Avatar :class="cn(isPending && 'animate-pulse', 'size-10')">
            <AvatarImage v-if="hasAvatar" class="object-cover" :src="avatarSrc" />
            <AvatarFallback>JG</AvatarFallback>
          </Avatar>
          <div class="flex flex-col gap-1 font-semibold">
            <p>Upload a new avatar</p>
            <p class="text-xs text-muted-foreground">Please select an image smaller than 10MB</p>
          </div>
        </DropzoneTrigger>
      </DropzoneArea>
    </Dropzone>
  </div>
</template>
```

### Multiple Files Upload

Ideal for document uploads with detailed file management and retry functionality.

::component-preview
---
name: DropzoneMultiFile
description: Multiple file upload with progress and retry
---
::

```vue showLineNumbers
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
} from '@/components/ui/dropzone'

const dropzone = useDropzoneUpload({
  onDropFile: async () => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 500 + 1000)
    )

    if (Math.random() > 0.8) {
      return {
        status: 'error' as const,
        error: 'Failed to upload file',
      }
    }
    return {
      status: 'success' as const,
      result: undefined,
    }
  },
  validation: {
    maxFiles: 4,
    maxSize: 5 * 1024 * 1024,
  },
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <Dropzone v-bind="dropzone">
      <div>
        <div class="flex justify-between">
          <DropzoneDescription>
            Select up to 4 files (max 5MB)
          </DropzoneDescription>
          <DropzoneMessage />
        </div>
        <DropzoneArea>
          <DropzoneTrigger class="flex flex-col items-center gap-4 bg-transparent p-10 text-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 13v8"></path>
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="m8 17 4-4 4 4"></path>
            </svg>
            <div>
              <p class="font-semibold">Upload files</p>
              <p class="text-sm text-muted-foreground">
                Click here or drag and drop to upload
              </p>
            </div>
          </DropzoneTrigger>
        </DropzoneArea>
      </div>

      <DropzoneFileList class="flex flex-col gap-3">
        <DropzoneFileListItem
          v-for="file in dropzone.fileStatuses.value"
          :key="file.id"
          :file="file"
          class="flex flex-col gap-3"
        >
          <div class="flex justify-between">
            <div class="flex min-w-0 items-center gap-2 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              </svg>
              <p class="truncate">{{ file.fileName }}</p>
            </div>
            <div class="flex items-center gap-1">
              <DropzoneRetryFile
                v-if="file.status === 'error'"
                variant="ghost"
                class="hover:border"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                  <path d="M21 3v5h-5"></path>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                  <path d="M8 16H3v5"></path>
                </svg>
              </DropzoneRetryFile>

              <DropzoneRemoveFile
                variant="ghost"
                class="hover:border"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </DropzoneRemoveFile>
            </div>
          </div>
          <InfiniteProgress :status="file.status" />
          <div class="flex justify-between text-sm text-muted-foreground">
            <p>{{ (file.file.size / (1024 * 1024)).toFixed(2) }} MB</p>
            <DropzoneFileMessage />
          </div>
        </DropzoneFileListItem>
      </DropzoneFileList>
    </Dropzone>
  </div>
</template>
```

### Multiple Images Upload

Perfect for image galleries with visual previews in a grid layout.

::component-preview
---
name: DropzoneMultiImage
description: Multiple image upload with grid preview
---
::

```vue showLineNumbers
<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
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
} from '@/components/ui/dropzone'

// Track created blob URLs for cleanup
const createdUrls = new Set<string>()

const dropzone = useDropzoneUpload({
  onDropFile: async (file: File) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const url = URL.createObjectURL(file)
    createdUrls.add(url)
    return {
      status: 'success' as const,
      result: url,
    }
  },
  onRemoveFile: async (id: string) => {
    // Revoke blob URL when file is removed
    const file = dropzone.fileStatuses.value.find(f => f.id === id)
    if (file?.result && typeof file.result === 'string' && createdUrls.has(file.result)) {
      URL.revokeObjectURL(file.result)
      createdUrls.delete(file.result)
    }
  },
  validation: {
    accept: ['image/png', 'image/jpeg', 'image/jpg'],
    maxSize: 5 * 1024 * 1024,
    maxFiles: 4,
  },
})

// Clean up blob URLs on unmount
onBeforeUnmount(() => {
  for (const url of createdUrls) {
    URL.revokeObjectURL(url)
  }
  createdUrls.clear()
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <Dropzone v-bind="dropzone">
      <div>
        <div class="flex justify-between">
          <DropzoneDescription>
            Please select up to 4 images (max 5MB)
          </DropzoneDescription>
          <DropzoneMessage />
        </div>
        <DropzoneArea>
          <DropzoneTrigger class="flex flex-col items-center gap-4 bg-transparent p-10 text-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 13v8"></path>
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="m8 17 4-4 4 4"></path>
            </svg>
            <div>
              <p class="font-semibold">Upload images</p>
              <p class="text-sm text-muted-foreground">
                Click here or drag and drop to upload
              </p>
            </div>
          </DropzoneTrigger>
        </DropzoneArea>
      </div>

      <DropzoneFileList class="grid gap-3 p-0 md:grid-cols-2 lg:grid-cols-3">
        <DropzoneFileListItem
          v-for="file in dropzone.fileStatuses.value"
          :key="file.id"
          :file="file"
          class="overflow-hidden rounded-md bg-secondary p-0 shadow-sm"
        >
          <div
            v-if="file.status === 'pending'"
            class="aspect-video animate-pulse bg-black/20"
          />
          <img
            v-if="file.status === 'success'"
            :src="file.result"
            :alt="`uploaded-${file.fileName}`"
            class="aspect-video object-cover"
          />
          <div class="flex items-center justify-between p-2 pl-4">
            <div class="min-w-0">
              <p class="truncate text-sm">{{ file.fileName }}</p>
              <p class="text-xs text-muted-foreground">
                {{ (file.file.size / (1024 * 1024)).toFixed(2) }} MB
              </p>
            </div>
            <DropzoneRemoveFile
              variant="ghost"
              class="shrink-0 hover:outline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </DropzoneRemoveFile>
          </div>
        </DropzoneFileListItem>
      </DropzoneFileList>
    </Dropzone>
  </div>
</template>
```

## API Reference

### useDropzoneUpload

The `useDropzoneUpload` composable provides the core functionality for file dropping, validation, and upload handling.

#### Options

| Option | Type | Description |
| ------ | ---- | ----------- |
| `onDropFile` | `(file: File) => Promise<DropzoneResult>` | Required. Function to handle file upload. Must return a promise with upload result. |
| `onRemoveFile` | `(id: string) => void \| Promise<void>` | Optional. Function called when a file is removed. |
| `onFileUploaded` | `(result: TUploadRes) => void` | Optional. Callback when a file is successfully uploaded. |
| `onFileUploadError` | `(error: TUploadError) => void` | Optional. Callback when file upload fails. |
| `onAllUploaded` | `() => void` | Optional. Callback when all files are uploaded. |
| `onRootError` | `(error: string \| undefined) => void` | Optional. Callback when validation errors occur. |
| `maxRetryCount` | `number` | Optional. Maximum number of retry attempts. Default: `3` (provided by `useDropzoneUpload`) |
| `autoRetry` | `boolean` | Optional. Whether to automatically retry failed uploads. |
| `shapeUploadError` | `(error: TUploadError) => string \| void` | Optional. Function to transform error messages. |
| `shiftOnMaxFiles` | `boolean` | Optional. Whether to replace oldest file when max files reached. |
| `validation` | `ValidationOptions` | Optional. File validation rules. |

#### Validation Options

| Option | Type | Description |
| ------ | ---- | ----------- |
| `accept` | `string \| string[]` | Accepted file types (MIME types or extensions). |
| `minSize` | `number` | Minimum file size in bytes. |
| `maxSize` | `number` | Maximum file size in bytes. |
| `maxFiles` | `number` | Maximum number of files allowed. |

#### Return Value

| Property | Type | Description |
| -------- | ---- | ----------- |
| `getRootProps` | `Function` | Props for the root dropzone element. |
| `getInputProps` | `Function` | Props for the hidden file input. |
| `fileStatuses` | `Ref<FileStatus[]>` | Reactive array of file upload statuses. |
| `isInvalid` | `Ref<boolean>` | Whether the dropzone has validation errors. |
| `isDragActive` | `Ref<boolean>` | Whether files are being dragged over the dropzone. |
| `rootError` | `Ref<string \| undefined>` | Current validation error message. |
| `onRemoveFile` | `(id: string) => Promise<void>` | Function to remove a file. |
| `onRetry` | `(id: string) => Promise<void>` | Function to retry a failed upload. |
| `canRetry` | `(id: string) => boolean` | Whether a file can be retried. |

### Components

#### Dropzone

Root container component that provides context to all child components.

```vue
<template>
  <Dropzone v-bind="dropzone">
    <!-- Your dropzone content -->
  </Dropzone>
</template>
```

#### DropzoneArea

Defines the active drop area where files can be dropped.

#### DropzoneTrigger

Clickable area that opens the file dialog when clicked.

#### DropzoneDescription

Displays help text or instructions for the dropzone.

#### DropzoneMessage

Displays validation error messages or status information.

#### DropzoneFileList

Container for displaying uploaded files.

#### DropzoneFileListItem

Individual file item within the file list. Provides context for file-specific actions.

**Props:**
- `file: FileStatus` - File status object

#### DropzoneFileMessage

Displays messages specific to an individual file (requires DropzoneFileListItem context).

#### DropzoneRemoveFile

Button component for removing files (requires DropzoneFileListItem context).

#### DropzoneRetryFile

Button component for retrying failed uploads. Only shows when file status is "error" and retries are available.

#### InfiniteProgress

Progress indicator that shows upload status with different states for pending, success, and error.

**Props:**
- `status: "pending" | "success" | "error"` - Current upload status

### File Status Object

```typescript
interface FileStatus<TUploadRes = unknown, TUploadError = unknown> {
  id: string          // Unique file identifier  
  fileName: string    // Original file name
  file: File         // File object
  tries: number      // Number of upload attempts
  status: "pending" | "error" | "success"  // Current status  
  result?: TUploadRes   // Upload result (when status is "success")
  error?: TUploadError  // Error details (when status is "error")
}
```