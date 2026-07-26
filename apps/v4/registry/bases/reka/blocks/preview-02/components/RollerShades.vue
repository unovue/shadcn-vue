<script setup lang="ts">
import { computed, ref } from "vue"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import { Slider } from "@/registry/bases/reka/ui/slider"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/bases/reka/ui/toggle-group"

const position = ref([50])

const preset = computed(() => {
  if ((position.value[0] ?? 0) <= 10)
    return "open"
  if ((position.value[0] ?? 0) >= 90)
    return "closed"
  return "half"
})

function handlePresetChange(value: unknown) {
  const arr = Array.isArray(value) ? value as string[] : [value as string]
  const v = arr[0]
  if (v === "open")
    position.value = [0]
  else if (v === "half")
    position.value = [50]
  else if (v === "closed")
    position.value = [100]
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Living Room</CardTitle>
      <CardDescription>Roller Shades</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      <div class="flex h-32 flex-col overflow-hidden rounded-lg border bg-muted">
        <div
          class="bg-muted-foreground transition-all duration-300"
          :style="{ height: `${position[0]}%` }"
        />
      </div>
      <div class="flex items-center gap-3">
        <span class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Open
        </span>
        <Slider
          v-model="position"
          :max="100"
          class="flex-1"
        />
        <span class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Close
        </span>
      </div>
    </CardContent>
    <CardFooter>
      <ToggleGroup
        :model-value="[preset]"
        variant="outline"
        :spacing="1"
        class="w-full"
        @update:model-value="handlePresetChange"
      >
        <ToggleGroupItem value="open" class="flex-1">
          Open
        </ToggleGroupItem>
        <ToggleGroupItem value="half" class="flex-1">
          Half
        </ToggleGroupItem>
        <ToggleGroupItem value="closed" class="flex-1">
          Closed
        </ToggleGroupItem>
      </ToggleGroup>
    </CardFooter>
  </Card>
</template>
