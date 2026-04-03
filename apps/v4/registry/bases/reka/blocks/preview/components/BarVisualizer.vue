<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"

type AgentState = "connecting" | "initializing" | "listening" | "speaking" | "thinking"

const state = ref<AgentState>("speaking")
const barCount = 20
const minHeight = 15
const maxHeight = 90

// Fake volume bands for demo
const fakeVolumeBands = ref<number[]>(new Array(barCount).fill(0.2))
let fakeAnimationRef: number | undefined

function generateConnectingSequence(columns: number): number[][] {
  const seq = []
  for (let x = 0; x < columns; x++) {
    seq.push([x, columns - 1 - x])
  }
  return seq
}

function generateListeningSequence(columns: number): number[][] {
  const center = Math.floor(columns / 2)
  return [[center], [-1]]
}

const sequence = computed(() => {
  if (state.value === "thinking" || state.value === "listening") {
    return generateListeningSequence(barCount)
  }
  else if (state.value === "connecting" || state.value === "initializing") {
    return generateConnectingSequence(barCount)
  }
  else {
    return [new Array(barCount).fill(0).map((_, idx) => idx)]
  }
})

const currentFrame = ref<number[]>([])
let animatorFrameId: number | null = null
let animatorIndex = 0

function startAnimator() {
  if (animatorFrameId !== null)
    cancelAnimationFrame(animatorFrameId)
  animatorIndex = 0
  currentFrame.value = sequence.value[0] || []
  const interval = state.value === "connecting"
    ? 2000 / barCount
    : state.value === "thinking"
      ? 150
      : state.value === "listening"
        ? 500
        : 1000

  let startTime = performance.now()
  const animate = (time: number) => {
    if (time - startTime >= interval) {
      animatorIndex = (animatorIndex + 1) % sequence.value.length
      currentFrame.value = sequence.value[animatorIndex] || []
      startTime = time
    }
    animatorFrameId = requestAnimationFrame(animate)
  }
  animatorFrameId = requestAnimationFrame(animate)
}

function updateFakeVolume() {
  if (state.value !== "speaking" && state.value !== "listening") {
    fakeVolumeBands.value = new Array(barCount).fill(0.2)
    return
  }
  let lastUpdate = 0
  const startTime = Date.now() / 1000

  const update = (timestamp: number) => {
    if (timestamp - lastUpdate >= 50) {
      const time = Date.now() / 1000 - startTime
      const newBands = new Array(barCount)
      for (let i = 0; i < barCount; i++) {
        const waveOffset = i * 0.5
        const baseVolume = Math.sin(time * 2 + waveOffset) * 0.3 + 0.5
        const randomNoise = Math.random() * 0.2
        newBands[i] = Math.max(0.1, Math.min(1, baseVolume + randomNoise))
      }
      fakeVolumeBands.value = newBands
      lastUpdate = timestamp
    }
    fakeAnimationRef = requestAnimationFrame(update)
  }
  fakeAnimationRef = requestAnimationFrame(update)
}

watch(state, () => {
  if (fakeAnimationRef)
    cancelAnimationFrame(fakeAnimationRef)
  updateFakeVolume()
  startAnimator()
}, { immediate: true })

onMounted(() => {
  startAnimator()
  updateFakeVolume()
})

onUnmounted(() => {
  if (animatorFrameId !== null)
    cancelAnimationFrame(animatorFrameId)
  if (fakeAnimationRef)
    cancelAnimationFrame(fakeAnimationRef)
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Audio Frequency Visualizer</CardTitle>
      <CardDescription>
        Real-time frequency band visualization with animated state transitions
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div
        :data-state="state"
        :class="cn(
          'relative flex justify-center gap-1.5 items-end',
          'h-40 max-w-full overflow-hidden rounded-lg bg-muted p-4',
        )"
      >
        <div
          v-for="(volume, index) in fakeVolumeBands"
          :key="index"
          :data-highlighted="currentFrame.includes(index)"
          :class="cn(
            'max-w-[12px] min-w-[8px] flex-1 transition-all duration-150',
            'rounded-full',
            'bg-border data-[highlighted=true]:bg-chart-3',
            state === 'speaking' && 'bg-chart-3',
            state === 'thinking' && currentFrame.includes(index) && 'animate-pulse',
          )"
          :style="{
            height: `${Math.min(maxHeight, Math.max(minHeight, volume * 100 + 5))}%`,
            animationDuration: state === 'thinking' ? '300ms' : undefined,
          }"
        />
      </div>
    </CardContent>
    <CardFooter class="gap-2">
      <Button
        size="sm"
        :variant="state === 'connecting' ? 'default' : 'outline'"
        @click="state = 'connecting'"
      >
        Connecting
      </Button>
      <Button
        size="sm"
        :variant="state === 'listening' ? 'default' : 'outline'"
        @click="state = 'listening'"
      >
        Listening
      </Button>
      <Button
        size="sm"
        :variant="state === 'speaking' ? 'default' : 'outline'"
        @click="state = 'speaking'"
      >
        Speaking
      </Button>
    </CardFooter>
  </Card>
</template>
