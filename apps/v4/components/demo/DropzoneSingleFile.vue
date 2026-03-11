<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york-v4/ui/avatar'
import {
  Dropzone,
  DropzoneArea,
  DropzoneMessage,
  DropzoneTrigger,
  useDropzoneUpload,
} from '@/registry/new-york-v4/ui/dropzone'

const dropzone = useDropzoneUpload({
  onDropFile: async (file: File) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      status: 'success' as const,
      result: URL.createObjectURL(file),
    }
  },
  validation: {
    accept: ['image/png', 'image/jpeg', 'image/jpg'],
    maxSize: 10 * 1024 * 1024,
    maxFiles: 1,
  },
  shiftOnMaxFiles: true,
})

const avatarSrc = computed(() => dropzone.fileStatuses.value[0]?.result ?? '')
const isPending = computed(() => dropzone.fileStatuses.value[0]?.status === 'pending')
const hasAvatar = computed(() => !!dropzone.fileStatuses.value[0]?.result)
</script>

<template>
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
          <p class="text-xs text-muted-foreground">
            Please select an image smaller than 10MB
          </p>
        </div>
      </DropzoneTrigger>
    </DropzoneArea>
  </Dropzone>
</template>
