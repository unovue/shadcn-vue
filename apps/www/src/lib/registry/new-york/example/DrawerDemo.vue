<script setup lang="ts">
import { ref } from 'vue'
import { MinusIcon, PlusIcon } from '@radix-icons/vue'
import { VisStackedBar, VisXYContainer } from '@unovis/vue'
import { Button } from '@/lib/registry/new-york/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/lib/registry/new-york/ui/drawer'

const goal = ref(350)

type Data = typeof data[number]
const data = [
  { goal: 400 },
  { goal: 300 },
  { goal: 200 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 239 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 349 },
]
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button variant="outline">
        Open Drawer
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <div class="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div class="p-4 pb-0">
          <div class="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              class="h-8 w-8 shrink-0 rounded-full"
              :disabled="goal <= 200"
              @click="goal -= 10"
            >
              <MinusIcon class="h-4 w-4" />
              <span class="sr-only">Decrease</span>
            </Button>
            <div class="flex-1 text-center">
              <div class="text-7xl font-bold tracking-tighter">
                {{ goal }}
              </div>
              <div class="text-[0.70rem] uppercase text-muted-foreground">
                Calories/day
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              class="h-8 w-8 shrink-0 rounded-full"
              :disabled="goal >= 400"
              @click="goal += 10"
            >
              <PlusIcon class="h-4 w-4" />
              <span class="sr-only">Increase</span>
            </Button>
          </div>
          <div class="my-3 px-3 h-[120px]">
            <VisXYContainer
              :data="data"
              class="h-[120px]"
              :style="{
                'opacity': 0.9,
                '--theme-primary': `hsl(var(--foreground))`,
              }"
            >
              <VisStackedBar
                :x="(d: Data, i :number) => i"
                :y="(d: Data) => d.goal"
                color="var(--theme-primary)"
                :bar-padding="0.1"
                :rounded-corners="0"
              />
            </VisXYContainer>
          </div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose as-child>
            <Button variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>
