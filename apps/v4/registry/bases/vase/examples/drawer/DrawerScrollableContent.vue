<script setup lang="ts">
import { Button } from "@/registry/bases/vase/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/bases/vase/ui/drawer"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="Scrollable Content">
    <Drawer swipe-direction="right">
      <DrawerTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline">
            Scrollable Content
          </Button>
        </template>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div class="no-scrollbar overflow-y-auto px-4">
          <p
            v-for="index in 10"
            :key="index"
            class="style-lyra:mb-2 style-lyra:leading-relaxed mb-4 leading-normal"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
            in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <template #element="{ props, elementRef }">
              <Button v-bind="props" :ref="elementRef" variant="outline">
                Cancel
              </Button>
            </template>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </Example>
</template>
