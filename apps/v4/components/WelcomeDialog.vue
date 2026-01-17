<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/registry/new-york-v4/ui/dialog'

const STORAGE_KEY = 'shadcn-vue-welcome-dismissed'

const hasSeenWelcome = useLocalStorage(STORAGE_KEY, false)
const open = ref(false)

// Show dialog on mount if user hasn't seen it
onMounted(() => {
  if (!hasSeenWelcome.value) {
    // Small delay to let the page render first
    setTimeout(() => {
      open.value = true
    }, 500)
  }
})

function handleDismiss() {
  hasSeenWelcome.value = true
  open.value = false
}

function handleOpenChange(value: boolean) {
  if (!value) {
    handleDismiss()
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="handleOpenChange">
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle class="text-xl">
          Welcome to shadcn-vue
        </DialogTitle>
        <DialogDescription class="text-base">
          Build your perfect theme and get started with a new project.
        </DialogDescription>
      </DialogHeader>

      <div class="space-y-4 py-2">
        <div class="flex gap-3">
          <div class="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium">
            1
          </div>
          <div>
            <h4 class="font-medium">
              Customize your theme
            </h4>
            <p class="text-muted-foreground text-sm">
              Use the pickers on the right to choose your style, colors, fonts, and more.
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <div class="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium">
            2
          </div>
          <div>
            <h4 class="font-medium">
              Preview components
            </h4>
            <p class="text-muted-foreground text-sm">
              Browse components and blocks in the left sidebar to see how they look with your theme.
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <div class="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-medium">
            3
          </div>
          <div>
            <h4 class="font-medium">
              Create your project
            </h4>
            <p class="text-muted-foreground text-sm">
              Click "Create Project" to get the CLI commands for your customized setup.
            </p>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button @click="handleDismiss">
          Get Started
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
