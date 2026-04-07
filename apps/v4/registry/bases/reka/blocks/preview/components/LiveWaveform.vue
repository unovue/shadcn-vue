<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"

// ---- LiveWaveform internal component ----
const active = ref(false)
const processing = ref(true)
const mode = ref<"static" | "scrolling">("static")

const canvasRef = ref<HTMLCanvasElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

const barWidth = 3
const barGap = 2
const barRadius = 1.5
const barHeight = 4
const height = 80
const sensitivity = 1
const historySize = 120
const updateRate = 30
const fadeEdges = true
const fadeWidth = 24

const historyData = ref<number[]>([])
const staticBars = ref<number[]>([])
const gradientCache = ref<CanvasGradient | null>(null)
const lastWidth = ref(0)
const transitionProgress = ref(0)
const lastActiveData = ref<number[]>([])

let animationRef = 0
let processingAnimRef: number | null = null
let resizeObs: ResizeObserver | null = null

function setupResizeObserver() {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container)
    return

  resizeObs = new ResizeObserver(() => {
    const rect = container.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    const ctx = canvas.getContext("2d")
    if (ctx)
      ctx.scale(dpr, dpr)
    gradientCache.value = null
    lastWidth.value = rect.width
  })
  resizeObs.observe(container)
}

function startProcessingAnimation() {
  if (processingAnimRef)
    cancelAnimationFrame(processingAnimRef)

  if (!processing.value || active.value)
    return

  let time = 0
  transitionProgress.value = 0

  const animateProcessing = () => {
    time += 0.03
    transitionProgress.value = Math.min(1, transitionProgress.value + 0.02)
    const barCount = Math.floor(
      (containerRef.value?.getBoundingClientRect().width || 200) / (barWidth + barGap),
    )

    if (mode.value === "static") {
      const halfCount = Math.floor(barCount / 2)
      const newBars: number[] = []
      for (let i = 0; i < barCount; i++) {
        const normalizedPosition = (i - halfCount) / halfCount
        const centerWeight = 1 - Math.abs(normalizedPosition) * 0.4
        const wave1 = Math.sin(time * 1.5 + normalizedPosition * 3) * 0.25
        const wave2 = Math.sin(time * 0.8 - normalizedPosition * 2) * 0.2
        const wave3 = Math.cos(time * 2 + normalizedPosition) * 0.15
        const combinedWave = wave1 + wave2 + wave3
        const processingValue = (0.2 + combinedWave) * centerWeight
        let finalValue = processingValue
        if (lastActiveData.value.length > 0 && transitionProgress.value < 1) {
          const lastDataIndex = Math.min(i, lastActiveData.value.length - 1)
          const lastValue = lastActiveData.value[lastDataIndex] || 0
          finalValue = lastValue * (1 - transitionProgress.value) + processingValue * transitionProgress.value
        }
        newBars.push(Math.max(0.05, Math.min(1, finalValue)))
      }
      staticBars.value = newBars
    }

    processingAnimRef = requestAnimationFrame(animateProcessing)
  }
  animateProcessing()
}

function startAnimationLoop() {
  const canvas = canvasRef.value
  if (!canvas)
    return
  const ctx = canvas.getContext("2d")
  if (!ctx)
    return

  const animate = (currentTime: number) => {
    const rect = canvas.getBoundingClientRect()

    ctx.clearRect(0, 0, rect.width, rect.height)

    const barColor = "gray"
    const step = barWidth + barGap
    const barCount = Math.floor(rect.width / step)
    const centerY = rect.height / 2

    if (mode.value === "static") {
      const dataToRender = staticBars.value
      for (let i = 0; i < barCount && i < dataToRender.length; i++) {
        const value = dataToRender[i] || 0.1
        const x = i * step
        const bh = Math.max(barHeight, value * rect.height * 0.8)
        const y = centerY - bh / 2
        ctx.fillStyle = barColor
        ctx.globalAlpha = 0.4 + value * 0.6
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth, bh, barRadius)
        ctx.fill()
      }
    }
    else {
      for (let i = 0; i < barCount && i < historyData.value.length; i++) {
        const dataIndex = historyData.value.length - 1 - i
        const value = historyData.value[dataIndex] || 0.1
        const x = rect.width - (i + 1) * step
        const bh = Math.max(barHeight, value * rect.height * 0.8)
        const y = centerY - bh / 2
        ctx.fillStyle = barColor
        ctx.globalAlpha = 0.4 + value * 0.6
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth, bh, barRadius)
        ctx.fill()
      }
    }

    if (fadeEdges && fadeWidth > 0 && rect.width > 0) {
      if (!gradientCache.value || lastWidth.value !== rect.width) {
        const gradient = ctx.createLinearGradient(0, 0, rect.width, 0)
        const fadePercent = Math.min(0.3, fadeWidth / rect.width)
        gradient.addColorStop(0, "rgba(255,255,255,1)")
        gradient.addColorStop(fadePercent, "rgba(255,255,255,0)")
        gradient.addColorStop(1 - fadePercent, "rgba(255,255,255,0)")
        gradient.addColorStop(1, "rgba(255,255,255,1)")
        gradientCache.value = gradient
        lastWidth.value = rect.width
      }
      ctx.globalCompositeOperation = "destination-out"
      ctx.fillStyle = gradientCache.value
      ctx.fillRect(0, 0, rect.width, rect.height)
      ctx.globalCompositeOperation = "source-over"
    }

    ctx.globalAlpha = 1
    animationRef = requestAnimationFrame(animate)
  }

  animationRef = requestAnimationFrame(animate)
}

function handleToggleActive() {
  active.value = !active.value
  if (active.value)
    processing.value = false
}

function handleToggleProcessing() {
  processing.value = !processing.value
  if (!processing.value)
    active.value = false
}

onMounted(() => {
  setupResizeObserver()
  startAnimationLoop()
  if (processing.value)
    startProcessingAnimation()
})

onUnmounted(() => {
  if (resizeObs)
    resizeObs.disconnect()
  if (animationRef)
    cancelAnimationFrame(animationRef)
  if (processingAnimRef)
    cancelAnimationFrame(processingAnimRef)
})

watch([processing, active, mode], () => {
  startProcessingAnimation()
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Live Audio Waveform</CardTitle>
      <CardDescription>
        Real-time microphone input visualization with audio reactivity
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div
        ref="containerRef"
        class="relative h-full w-full"
        :style="{ height: `${height}px` }"
        :aria-label="active ? 'Live audio waveform' : processing ? 'Processing audio' : 'Audio waveform idle'"
        role="img"
      >
        <div
          v-if="!active && !processing"
          class="absolute top-1/2 right-0 left-0 -translate-y-1/2 border-t-2 border-dotted border-muted-foreground/20"
        />
        <canvas
          ref="canvasRef"
          class="block h-full w-full"
          aria-hidden="true"
        />
      </div>
    </CardContent>
    <CardFooter class="gap-2">
      <Button
        size="sm"
        :variant="active ? 'default' : 'outline'"
        @click="handleToggleActive"
      >
        {{ active ? "Stop" : "Start" }} Listening
      </Button>
      <Button
        size="sm"
        :variant="processing ? 'default' : 'outline'"
        @click="handleToggleProcessing"
      >
        {{ processing ? "Stop" : "Start" }} Processing
      </Button>
      <Button
        size="sm"
        variant="outline"
        @click="mode = mode === 'static' ? 'scrolling' : 'static'"
      >
        {{ mode === "static" ? "Static" : "Scrolling" }}
      </Button>
    </CardFooter>
  </Card>
</template>
