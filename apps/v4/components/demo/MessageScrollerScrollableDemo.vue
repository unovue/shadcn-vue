<script setup lang="ts">
import type { DemoMessage } from '@/lib/message-scroller-demo'
import { defineComponent, h } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/new-york-v4/ui/card'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScrollerScrollable,
} from '@/registry/new-york-v4/ui/message-scroller'

const messages: DemoMessage[] = Array.from({ length: 12 }, (_, index) => ({
  id: `scrollable-${index + 1}`,
  role: index % 2 === 0 ? 'user' : 'assistant',
  text:
    index % 2 === 0
      ? `Review scroll checkpoint ${index + 1}.`
      : `Checkpoint ${index + 1} is synced. The scrollable hook updates as the viewport moves.\n\nWhen the reader is at the first message, the footer should only point them down. Once they move into the middle of the transcript, it should explain that both directions are available.\n\nAt the latest message, the footer should switch again and only point them back up.`,
}))

function getScrollStatus({ start, end }: { start: boolean, end: boolean }) {
  if (start && end)
    return 'You can scroll both ways.'
  if (end)
    return 'You are at the top. You can only scroll down.'
  if (start)
    return 'You are at the bottom. You can only scroll up.'
  return 'All messages fit in the viewport.'
}

// The footer reads the scrollable state, so it must live inside the provider.
const ScrollStateFooter = defineComponent({
  name: 'ScrollStateFooter',
  setup() {
    const scrollable = useMessageScrollerScrollable()
    return () =>
      h(
        CardFooter,
        { class: 'justify-center border-t text-center text-sm text-muted-foreground' },
        () => getScrollStatus(scrollable.value),
      )
  },
})
</script>

<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-4">
    <Card class="h-140 w-full gap-0 overflow-hidden">
      <CardHeader class="gap-1 border-b">
        <CardTitle>Scroll Status</CardTitle>
        <CardDescription>
          Where the reader can scroll to based on current scroll position.
        </CardDescription>
      </CardHeader>
      <MessageScrollerProvider default-scroll-position="start">
        <CardContent class="flex-1 overflow-hidden p-0">
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent class="gap-4 p-6">
                <MessageAnimated
                  v-for="message in messages"
                  :key="message.id"
                  :message="message"
                  :scroll-anchor="message.role === 'user'"
                  user-variant="muted"
                  assistant-variant="ghost"
                />
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </CardContent>
        <ScrollStateFooter />
      </MessageScrollerProvider>
    </Card>
    <div class="px-0.5 text-center text-xs text-muted-foreground">
      Scroll the transcript to see the footer update.
    </div>
  </div>
</template>
