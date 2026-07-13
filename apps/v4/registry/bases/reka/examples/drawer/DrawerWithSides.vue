<script setup lang="ts">
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/bases/reka/ui/drawer"
import { Example } from "~/registry/bases/reka/components/example"

const DRAWER_SIDES = ["top", "right", "bottom", "left"] as const

// The drawer sits at the edge it dismisses toward: a drawer on the
// `top` edge swipes `up` to close, one on the `bottom` edge swipes `down`.
const SIDE_TO_SWIPE_DIRECTION = {
  top: "up",
  right: "right",
  bottom: "down",
  left: "left",
} as const
</script>

<template>
  <Example title="Sides">
    <div class="flex flex-wrap gap-2">
      <Drawer
        v-for="side in DRAWER_SIDES"
        :key="side"
        :swipe-direction="SIDE_TO_SWIPE_DIRECTION[side]"
      >
        <DrawerTrigger :as-child="true">
          <Button variant="outline" class="capitalize">
            {{ side }}
          </Button>
        </DrawerTrigger>
        <DrawerContent class="data-[swipe-direction=down]:max-h-[50vh] data-[swipe-direction=up]:max-h-[50vh]">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>
              Set your daily activity goal.
            </DrawerDescription>
          </DrawerHeader>
          <div class="no-scrollbar overflow-y-auto px-4">
            <p
              v-for="index in 10"
              :key="index"
              class="style-lyra:mb-2 style-lyra:leading-relaxed mb-4 leading-normal"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose :as-child="true">
              <Button variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  </Example>
</template>
