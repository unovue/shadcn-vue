<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/registry/new-york-v4/ui/button'
import { useClipboard } from '@vueuse/core'
import { CheckIcon, ClipboardIcon } from 'lucide-vue-next'

import { toRefs } from 'vue'

import { cn } from '@/lib/utils'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/registry/new-york-v4/ui/tooltip'

const props = withDefaults(defineProps<{
  value?: string
  class?: HTMLAttributes['class']
  variant?: ButtonVariants['variant']
}>(), {
  value: '',
  variant: 'ghost',
})
const { value } = toRefs(props)

const { copy, copied } = useClipboard({ source: value })
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Button
        data-slot="copy-button"
        size="icon"
        :variant="variant"
        :class="cn(
          'bg-code absolute top-3 right-2 z-10 size-7 hover:opacity-100 focus-visible:opacity-100',
          props.class,
        )"
        v-bind="$attrs"
        @click="copy()"
      >
        <span class="sr-only">Copy</span>
        <CheckIcon v-if="copied" />  <ClipboardIcon v-else />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      {{ copied ? "Copied" : "Copy to Clipboard" }}
    </TooltipContent>
  </Tooltip>
</template>
