<script setup lang="ts">
import { Share03Icon, Tick02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { useClipboard } from '@vueuse/core'

import { Button } from '@/registry/new-york-v4/ui/button'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/registry/new-york-v4/ui/tooltip'

const route = useRoute()
const { copy, copied } = useClipboard()

function handleCopy() {
  copy(window.location.href)
}
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <Button
        size="sm"
        variant="outline"
        class="rounded-lg shadow-none"
        @click="handleCopy"
      >
        <HugeiconsIcon v-if="copied" :icon="Tick02Icon" :stroke-width="2" />
        <HugeiconsIcon v-else :icon="Share03Icon" :stroke-width="2" />
        Share
      </Button>
    </TooltipTrigger>
    <TooltipContent>Copy Link</TooltipContent>
  </Tooltip>
</template>
