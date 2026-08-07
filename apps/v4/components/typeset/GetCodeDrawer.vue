<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@/styles/reka-nova/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/styles/reka-nova/ui/drawer'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const isMobile = useIsMobile()
</script>

<template>
  <Drawer :direction="isMobile ? 'bottom' : 'right'">
    <DrawerTrigger as-child>
      <Button variant="outline" :class="props.class">
        Get Code
      </Button>
    </DrawerTrigger>
    <DrawerContent :data-mobile="isMobile" class="data-[mobile=true]:max-h-[85svh]">
      <DrawerHeader>
        <DrawerTitle>Get Code</DrawerTitle>
        <DrawerDescription>
          Install typeset with the values you picked.
        </DrawerDescription>
      </DrawerHeader>
      <TypesetDocsContent />
      <DrawerFooter>
        <DrawerClose as-child>
          <Button variant="outline">
            Done
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
