<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TypesetLockableParam } from '@/lib/typeset/params'
import { SquareLock01Icon, SquareUnlock01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  param: TypesetLockableParam
  class?: HTMLAttributes['class']
}>()

const { isLocked, toggleLock } = useTypesetLocks()
const locked = computed(() => isLocked(props.param))
</script>

<template>
  <button
    type="button"
    :title="locked ? 'Unlock' : 'Lock'"
    :aria-label="locked ? 'Unlock' : 'Lock'"
    :data-locked="locked"
    :class="cn(
      'flex size-4 cursor-pointer items-center justify-center rounded opacity-0 ring-foreground/60 transition-opacity outline-none group-focus-within/picker:opacity-100 group-hover/picker:opacity-100 focus:opacity-100 focus-visible:ring-1 data-[locked=true]:opacity-100 max-md:hidden pointer-coarse:hidden',
      props.class,
    )"
    @click="toggleLock(param)"
  >
    <HugeiconsIcon
      :icon="locked ? SquareLock01Icon : SquareUnlock01Icon"
      :stroke-width="2"
      class="size-5 text-foreground"
    />
  </button>
</template>
