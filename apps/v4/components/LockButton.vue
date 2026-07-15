<script setup lang="ts">
import type { LockableParam } from '@/composables/useLocks'
import {
  SquareLock01Icon,
  SquareUnlock01Icon,
} from '@hugeicons/core-free-icons'

import { HugeiconsIcon } from '@hugeicons/vue'
import { useLocks } from '@/composables/useLocks'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/registry/new-york-v4/ui/tooltip'

const props = defineProps<{
  param: LockableParam
  class?: string
}>()

const { isLocked, toggleLock } = useLocks()
const locked = computed(() => isLocked(props.param))
</script>

<template>
  <Tooltip>
    <TooltipTrigger as-child>
      <button
        type="button"
        :data-locked="locked"
        :class="cn(
          'flex size-4 cursor-pointer items-center justify-center rounded opacity-0 transition-opacity group-focus-within/picker:opacity-100 group-hover/picker:opacity-100 focus:opacity-100 data-[locked=true]:opacity-100 pointer-coarse:hidden',
          props.class,
        )"
        :aria-label="locked ? 'Unlock' : 'Lock'"
        @click="toggleLock(param)"
      >
        <HugeiconsIcon
          :icon="locked ? SquareLock01Icon : SquareUnlock01Icon"
          :stroke-width="2"
          class="text-foreground size-5"
        />
      </button>
    </TooltipTrigger>
    <TooltipContent>{{ locked ? "Unlock" : "Lock" }}</TooltipContent>
  </Tooltip>
</template>
