<script setup lang="ts">
import type { Color } from '@/lib/colors'
import { useClipboard } from '@vueuse/core'
import { Check, Clipboard } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

defineProps<{
  color: Color
}>()

const { format, setLastCopied, lastCopied } = useColors()
const { copied, copy } = useClipboard()
</script>

<template>
  <button
    class="group relative flex aspect-[3/1] w-full flex-1 cursor-pointer flex-col gap-2 text-(--text) sm:aspect-[2/3] sm:h-auto sm:w-auto [&>svg]:absolute [&>svg]:top-4 [&>svg]:right-4 [&>svg]:z-10 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:opacity-0 [&>svg]:transition-opacity"
    :data-last-copied="lastCopied === color[format]"
    :style="{ '--bg': `${color.oklch}`, '--text': color.foreground }"
    @click="() => {
      copy(color[format])
      setLastCopied(color[format])
      toast.success(`Copied ${color[format]} to clipboard.`)
    }"
  >
    <Check v-if="copied" class="group-hover:opacity-100 group-data-[last-copied=true]:opacity-100" />
    <Clipboard v-else class="group-hover:opacity-100" />
    <div class="border-ghost after:border-input w-full flex-1 rounded-md bg-(--bg) after:rounded-lg md:rounded-lg" />
    <div class="flex w-full flex-col items-center justify-center gap-1">
      <span class="text-muted-foreground group-hover:text-foreground group-data-[last-copied=true]:text-primary font-mono text-xs tabular-nums transition-colors sm:hidden xl:flex">
        {{ color.className }}
      </span>
      <span class="text-muted-foreground group-hover:text-foreground group-data-[last-copied=true]:text-primary hidden font-mono text-xs tabular-nums transition-colors sm:flex xl:hidden">
        {{ color.scale }}
      </span>
    </div>
  </button>
</template>
