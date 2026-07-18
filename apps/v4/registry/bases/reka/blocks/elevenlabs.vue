<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue"
import { cn } from "@/lib/utils"
import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/reka/components/example"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"

// Types
type AgentState = "connecting" | "initializing" | "listening" | "speaking" | "thinking"

// Bar Visualizer state
const barVisualizerState = ref<AgentState>("speaking")

// Waveform state
const waveformActive = ref(false)
const waveformProcessing = ref(true)
const waveformMode = ref<"static" | "scrolling">("static")

function handleToggleActive() {
  waveformActive.value = !waveformActive.value
  if (waveformActive.value) {
    waveformProcessing.value = false
  }
}

function handleToggleProcessing() {
  waveformProcessing.value = !waveformProcessing.value
  if (waveformProcessing.value) {
    waveformActive.value = false
  }
}

// Bar Visualizer Component Logic
const barCount = 20
const minHeight = 15
const maxHeight = 90

interface BarData {
  heightPct: number
  isHighlighted: boolean
}

const fakeVolumeBands = ref<number[]>(new Array(barCount).fill(0.2))
const highlightedIndices = ref<number[]>([])
let animationFrameId: number | null = null
let sequenceIndex = 0

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

function getSequenceForState(state: AgentState) {
  if (state === "thinking" || state === "listening") {
    return generateListeningSequence(barCount)
  }
  else if (state === "connecting" || state === "initializing") {
    return generateConnectingSequence(barCount)
  }
  return [new Array(barCount).fill(0).map((_, idx) => idx)]
}

function getIntervalForState(state: AgentState) {
  if (state === "connecting")
    return 2000 / barCount
  if (state === "thinking")
    return 150
  if (state === "listening")
    return 500
  return 1000
}

let lastSequenceUpdate = 0
let lastVolumeUpdate = 0
const volumeUpdateInterval = 50
const startTime = Date.now() / 1000

function animateVisualizer(timestamp: number) {
  const state = barVisualizerState.value
  const sequence = getSequenceForState(state)
  const interval = getIntervalForState(state)

  // Update sequence
  if (timestamp - lastSequenceUpdate >= interval) {
    sequenceIndex = (sequenceIndex + 1) % sequence.length
    highlightedIndices.value = sequence[sequenceIndex] || []
    lastSequenceUpdate = timestamp
  }

  // Update fake volume (for speaking/listening states)
  if ((state === "speaking" || state === "listening") && timestamp - lastVolumeUpdate >= volumeUpdateInterval) {
    const time = Date.now() / 1000 - startTime
    const newBands = new Array(barCount)

    for (let i = 0; i < barCount; i++) {
      const waveOffset = i * 0.5
      const baseVolume = Math.sin(time * 2 + waveOffset) * 0.3 + 0.5
      const randomNoise = Math.random() * 0.2
      newBands[i] = Math.max(0.1, Math.min(1, baseVolume + randomNoise))
    }

    fakeVolumeBands.value = newBands
    lastVolumeUpdate = timestamp
  }
  else if (state !== "speaking" && state !== "listening") {
    fakeVolumeBands.value = new Array(barCount).fill(0.2)
  }

  animationFrameId = requestAnimationFrame(animateVisualizer)
}

const bars = computed<BarData[]>(() => {
  return fakeVolumeBands.value.map((volume, index) => {
    const heightPct = Math.min(maxHeight, Math.max(minHeight, volume * 100 + 5))
    const isHighlighted = highlightedIndices.value.includes(index)
    return { heightPct, isHighlighted }
  })
})

// Live Waveform Component Logic
const waveformBars = ref<number[]>([])
let waveformAnimationId: number | null = null

function animateWaveform() {
  const processing = waveformProcessing.value
  const active = waveformActive.value

  if (processing && !active) {
    const time = Date.now() / 1000
    const barWidth = 3
    const barGap = 2
    const barCount = Math.floor(300 / (barWidth + barGap))
    const processingData: number[] = []

    if (waveformMode.value === "static") {
      const halfCount = Math.floor(barCount / 2)
      for (let i = 0; i < barCount; i++) {
        const normalizedPosition = (i - halfCount) / halfCount
        const centerWeight = 1 - Math.abs(normalizedPosition) * 0.4
        const wave1 = Math.sin(time * 1.5 + normalizedPosition * 3) * 0.25
        const wave2 = Math.sin(time * 0.8 - normalizedPosition * 2) * 0.2
        const wave3 = Math.cos(time * 2 + normalizedPosition) * 0.15
        const combinedWave = wave1 + wave2 + wave3
        const processingValue = (0.2 + combinedWave) * centerWeight
        processingData.push(Math.max(0.05, Math.min(1, processingValue)))
      }
    }
    else {
      for (let i = 0; i < barCount; i++) {
        const normalizedPosition = (i - barCount / 2) / (barCount / 2)
        const centerWeight = 1 - Math.abs(normalizedPosition) * 0.4
        const wave1 = Math.sin(time * 1.5 + i * 0.15) * 0.25
        const wave2 = Math.sin(time * 0.8 - i * 0.1) * 0.2
        const wave3 = Math.cos(time * 2 + i * 0.05) * 0.15
        const combinedWave = wave1 + wave2 + wave3
        const processingValue = (0.2 + combinedWave) * centerWeight
        processingData.push(Math.max(0.05, Math.min(1, processingValue)))
      }
    }

    waveformBars.value = processingData
  }
  else if (!active && !processing) {
    // Fade out
    waveformBars.value = waveformBars.value.map(v => Math.max(0, v - 0.03))
    if (waveformBars.value.every(v => v <= 0)) {
      waveformBars.value = []
    }
  }

  waveformAnimationId = requestAnimationFrame(animateWaveform)
}

onMounted(() => {
  animationFrameId = requestAnimationFrame(animateVisualizer)
  waveformAnimationId = requestAnimationFrame(animateWaveform)
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  if (waveformAnimationId) {
    cancelAnimationFrame(waveformAnimationId)
  }
})
</script>

<template>
  <ExampleWrapper>
    <!-- Bar Visualizer Demo -->
    <Example title="Bar Visualizer">
      <Card>
        <CardHeader>
          <CardTitle>Audio Frequency Visualizer</CardTitle>
          <CardDescription>
            Real-time frequency band visualization with animated state transitions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            :data-state="barVisualizerState"
            :class="cn(
              'relative flex justify-center gap-1.5 items-end',
              'bg-muted h-40 w-full max-w-full overflow-hidden rounded-lg p-4',
            )"
          >
            <div
              v-for="(bar, index) in bars"
              :key="index"
              :data-highlighted="bar.isHighlighted"
              :class="cn(
                'max-w-[12px] min-w-[8px] flex-1 transition-all duration-150',
                'rounded-full',
                'bg-border data-[highlighted=true]:bg-primary',
                barVisualizerState === 'speaking' && 'bg-primary',
                barVisualizerState === 'thinking' && bar.isHighlighted && 'animate-pulse',
              )"
              :style="{
                height: `${bar.heightPct}%`,
                animationDuration: barVisualizerState === 'thinking' ? '300ms' : undefined,
              }"
            />
          </div>
        </CardContent>
        <CardFooter class="gap-2">
          <Button
            size="sm"
            :variant="barVisualizerState === 'connecting' ? 'default' : 'outline'"
            @click="barVisualizerState = 'connecting'"
          >
            Connecting
          </Button>
          <Button
            size="sm"
            :variant="barVisualizerState === 'listening' ? 'default' : 'outline'"
            @click="barVisualizerState = 'listening'"
          >
            Listening
          </Button>
          <Button
            size="sm"
            :variant="barVisualizerState === 'speaking' ? 'default' : 'outline'"
            @click="barVisualizerState = 'speaking'"
          >
            Speaking
          </Button>
        </CardFooter>
      </Card>
    </Example>

    <!-- Waveform Demo -->
    <Example title="Waveform" class="items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Live Audio Waveform</CardTitle>
          <CardDescription>
            Real-time microphone input visualization with audio reactivity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            class="bg-muted relative flex h-20 w-full items-center justify-center overflow-hidden rounded-lg"
          >
            <div class="flex h-full items-center gap-[2px]">
              <div
                v-for="(value, index) in waveformBars"
                :key="index"
                class="bg-muted-foreground w-[3px] rounded-full transition-all duration-75"
                :style="{ height: `${Math.max(4, value * 60)}px` }"
              />
              <template v-if="waveformBars.length === 0">
                <div
                  v-for="i in 60"
                  :key="`placeholder-${i}`"
                  class="bg-border w-[3px] rounded-full"
                  style="height: 4px"
                />
              </template>
            </div>
          </div>
        </CardContent>
        <CardFooter class="gap-2">
          <Button
            size="sm"
            :variant="waveformActive ? 'default' : 'outline'"
            @click="handleToggleActive"
          >
            {{ waveformActive ? 'Stop' : 'Start' }} Listening
          </Button>
          <Button
            size="sm"
            :variant="waveformProcessing ? 'default' : 'outline'"
            @click="handleToggleProcessing"
          >
            {{ waveformProcessing ? 'Stop' : 'Start' }} Processing
          </Button>
          <Button
            size="sm"
            variant="outline"
            @click="waveformMode = waveformMode === 'static' ? 'scrolling' : 'static'"
          >
            {{ waveformMode === 'static' ? 'Static' : 'Scrolling' }}
          </Button>
        </CardFooter>
      </Card>
    </Example>
  </ExampleWrapper>
</template>
