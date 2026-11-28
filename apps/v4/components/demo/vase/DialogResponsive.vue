<script setup lang="ts">
import { useMediaQuery, useMounted } from '@vueuse/core'
import { computed, ref } from 'vue'
import { Button } from '@/styles/vase-vega/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/styles/vase-vega/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/styles/vase-vega/ui/drawer'
import { Input } from '@/styles/vase-vega/ui/input'
import { Label } from '@/styles/vase-vega/ui/label'

const isMounted = useMounted()
const matchesDesktop = useMediaQuery('(min-width: 640px)')
// The server cannot read the viewport, so the server and the first render of the browser both show the dialog.
const isDesktop = computed(() => !isMounted.value || matchesDesktop.value)

const Modal = computed(() => ({
  Root: isDesktop.value ? Dialog : Drawer,
  Trigger: isDesktop.value ? DialogTrigger : DrawerTrigger,
  Content: isDesktop.value ? DialogContent : DrawerContent,
  Header: isDesktop.value ? DialogHeader : DrawerHeader,
  Title: isDesktop.value ? DialogTitle : DrawerTitle,
  Description: isDesktop.value ? DialogDescription : DrawerDescription,
  Footer: isDesktop.value ? DialogFooter : DrawerFooter,
  Close: isDesktop.value ? DialogClose : DrawerClose,
}))

const open = ref(false)
</script>

<template>
  <component :is="Modal.Root" v-model:open="open">
    <component :is="Modal.Trigger">
      <template #element="{ props, elementRef }">
        <Button v-bind="props" :ref="elementRef" variant="outline">
          Open Dialog
        </Button>
      </template>
    </component>
    <component
      :is="Modal.Content"
      class="sm:max-w-md" :class="[
        { 'px-2 pb-8 *:px-4': !isDesktop },
      ]"
    >
      <component :is="Modal.Header">
        <component :is="Modal.Title">
          Share Link
        </component>
        <component :is="Modal.Description">
          Anyone who has this link will be able to view this.
        </component>
      </component>

      <div class="flex items-center gap-2">
        <div class="grid flex-1 gap-2">
          <Label for="link" class="sr-only">
            Link
          </Label>
          <Input
            id="link"
            default-value="https://www.shadcn-vue.com/docs/installation"
            read-only
          />
        </div>
      </div>

      <component :is="Modal.Footer" class="pt-4">
        <component :is="Modal.Close">
          <template #element="{ props, elementRef }">
            <Button v-bind="props" :ref="elementRef" variant="outline">
              Close
            </Button>
          </template>
        </component>
      </component>
    </component>
  </component>
</template>
