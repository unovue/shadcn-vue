<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/registry/new-york-v4/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/new-york-v4/ui/drawer'
import { cn } from '~/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { config } = useConfig()
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button :class="cn('sm:hidden', props.class)" v-bind="$attrs">
        Copy Code
      </Button>
    </DrawerTrigger>
    <DrawerContent class="h-auto">
      <DrawerHeader>
        <DrawerTitle class="capitalize">
          {{ config.activeTheme === "neutral" ? "Default" : config.activeTheme }}
        </DrawerTitle>
        <DrawerDescription>
          Copy and paste the following code into your CSS file.
        </DrawerDescription>
      </DrawerHeader>
      <CustomizerCode :theme-name="config.activeTheme" />
    </DrawerContent>
  </Drawer>
  <Dialog>
    <DialogTrigger as-child>
      <Button :class="cn('hidden sm:flex', props.class)" v-bind="$attrs">
        Copy Code
      </Button>
    </DialogTrigger>
    <DialogContent class="rounded-xl border-none bg-clip-padding shadow-2xl ring-4 ring-neutral-200/80 outline-none md:max-w-2xl dark:bg-neutral-800 dark:ring-neutral-900">
      <DialogHeader>
        <DialogTitle class="capitalize">
          {{ config.activeTheme === "neutral" ? "Default" : config.activeTheme }}
        </DialogTitle>
        <DialogDescription>
          Copy and paste the following code into your CSS file.
        </DialogDescription>
      </DialogHeader>
      <CustomizerCode :theme-name="config.activeTheme" />
    </DialogContent>
  </Dialog>
</template>
