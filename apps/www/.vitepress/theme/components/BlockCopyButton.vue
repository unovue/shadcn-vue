<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { toRefs } from 'vue'
import { CheckIcon, ClipboardIcon } from '@radix-icons/vue'
import { Button } from '@/lib/registry/new-york/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/lib/registry/new-york/ui/tooltip'

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
        variant="outline"
        class="h-7 w-7 [&_svg]:size-3.5"
        @click="copy()"
      >
        <span class="sr-only">Copy</span>
        <CheckIcon v-if="copied" />
        <ClipboardIcon v-else />
      </Button>
    </TooltipTrigger>
    <TooltipContent>Copy code</TooltipContent>
  </Tooltip>
</template>
