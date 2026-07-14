<script setup lang="ts">
import { computed } from 'vue'
import { CardFooter } from '@/styles/reka-rhea/ui/card'
import { useMessageScrollerScrollable } from '@/styles/reka-rhea/ui/message-scroller'

const scrollable = useMessageScrollerScrollable()

const status = computed(() => getScrollStatus(scrollable.value))

function getScrollStatus({ start, end }: { start: boolean, end: boolean }) {
  if (start && end)
    return 'You can scroll both ways.'
  if (end)
    return 'You are at the top. You can only scroll down.'
  if (start)
    return 'You are at the bottom. You can only scroll up.'
  return 'All messages fit in the viewport.'
}
</script>

<template>
  <CardFooter class="justify-center border-t text-center text-sm text-muted-foreground">
    {{ status }}
  </CardFooter>
</template>
