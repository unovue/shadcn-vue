<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { Check, Clipboard } from 'lucide-vue-next'
import { toRefs } from 'vue'
import { Button } from '@/registry/new-york/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/registry/new-york/ui/tooltip'

const props = withDefaults(defineProps<{
  code?: string
}>(), {
  code: '',
})
const { code } = toRefs(props)

const { copy, copied } = useClipboard({ source: code })
</script>

<template>
  <Tooltip :delay-duration="100">
    <TooltipTrigger as-child>
      <Button
        size="icon"
        variant="ghost"
        class="h-7 w-7 [&_svg]:size-3.5"
        @click="copy()"
      >
        <span class="sr-only">Copy</span>
        <Check v-if="copied" />
        <Clipboard v-else />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Copy code</TooltipContent>
  </Tooltip>
</template>
