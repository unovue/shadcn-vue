<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/lib/registry/default/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/registry/default/ui/card'
import { themes } from '@/lib/registry/themes'
import { useConfigStore } from '@/stores/config'

const { theme, radius, setRadius, setTheme } = useConfigStore()

const goal = ref(350)

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
  <Card>
    <CardHeader class-name="pb-4">
      <CardTitle class-name="text-base">
        Move Goal
      </CardTitle>
      <CardDescription>Set your daily activity goal.</CardDescription>
    </CardHeader>
    <CardContent class-name="pb-2">
      <div class="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          class-name="h-8 w-8 shrink-0 rounded-full"
          :disabled="goal <= 200"
          @click="goal -= 10"
        >
          <Minus class-name="h-4 w-4" />
          <span class="sr-only">Decrease</span>
        </Button>
        <div class="flex-1 text-center">
          <div class="text-5xl font-bold tracking-tighter">
            {{ goal }}
          </div>
          <div class="text-[0.70rem] uppercase text-muted-foreground">
            Calories/day
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          class-name="h-8 w-8 shrink-0 rounded-full"
          :disabled="goal >= 400"
          @click="goal += 10 "
        >
          <Plus class-name="h-4 w-4" />
          <span class="sr-only">Increase</span>
        </Button>
      </div>
      <div class="my-3 h-[60px]">
        <!-- <ResponsiveContainer width="100%" height="100%">
          <BarChart data="{data}">
            <Bar
              data-key="goal"
              style="{"
              {
              fill: "var(--theme-primary)",
              opacity: 0.2,
              "--theme-primary": `hsl(${
              theme?.cssVars[mode="==" "dark" ? "dark" : "light"].primary
              })`,
              } as React.CSSProperties
              }
            />
          </BarChart>
        </ResponsiveContainer> -->
      </div>
    </CardContent>
    <CardFooter>
      <Button class-name="w-full">
        Set Goal
      </Button>
    </CardFooter>
  </Card>
</template>
