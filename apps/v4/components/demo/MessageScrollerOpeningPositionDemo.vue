<script setup lang="ts">
import type { DemoMessage } from '@/lib/message-scroller-demo'
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/styles/reka-rhea/ui/card'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from '@/styles/reka-rhea/ui/message-scroller'
import { Tabs, TabsList, TabsTrigger } from '@/styles/reka-rhea/ui/tabs'

type Position = 'start' | 'end' | 'last-anchor'

const messages: DemoMessage[] = [
  {
    id: 'open-1',
    role: 'user',
    text: 'This is the first message the user sent in the conversation.',
  },
  {
    id: 'open-2',
    role: 'assistant',
    text: 'Workspace creation rose 8%, but first invite completion only rose 2%.',
  },
  {
    id: 'open-3',
    role: 'user',
    text: 'This is the last message the user sent in the conversation.',
  },
  {
    id: 'open-4',
    role: 'assistant',
    text: 'Start with the invite step. Teams are creating workspaces but waiting to add collaborators.\n\nRecommended follow-up:\n\n1. Compare invite drop-off by account size.\n2. Check whether users who skip invites still return within 24 hours.\n3. Review the empty-state copy on the first project screen.\n4. Segment activation by template, since template users may not need invites right away.\n\nIf that pattern holds, the next experiment should make collaboration useful earlier instead of prompting for invites harder.',
  },
]

const positions: { value: Position, label: string }[] = [
  { value: 'start', label: 'start' },
  { value: 'end', label: 'end' },
  { value: 'last-anchor', label: 'last-anchor' },
]

const position = ref<Position>('last-anchor')
const positionKey = ref(0)

function onValueChange(value: unknown) {
  if (value === 'start' || value === 'end' || value === 'last-anchor') {
    position.value = value
    positionKey.value += 1
  }
}

// useMessageScroller reads the scroller context, so it must live inside the
// provider. This inner component drives the opening scroll position and renders
// the transcript through its default slot.
const OpeningPositionScroller = defineComponent({
  name: 'OpeningPositionScroller',
  props: {
    position: { type: String as () => Position, required: true },
    positionKey: { type: Number, required: true },
  },
  setup(props, { slots }) {
    const { scrollToEnd, scrollToMessage, scrollToStart } = useMessageScroller()

    // Scroll positioning is client-only, so drive it from onMounted (which does
    // not run during SSR) plus a watch for later changes.
    let frame = 0
    function applyPosition() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (props.position === 'start') {
          scrollToStart({ behavior: 'auto' })
          return
        }
        if (props.position === 'end') {
          scrollToEnd({ behavior: 'auto' })
          return
        }
        scrollToMessage('open-3', {
          align: 'start',
          behavior: 'auto',
          scrollMargin: 64,
        })
      })
    }

    onMounted(applyPosition)
    watch(() => [props.position, props.positionKey], applyPosition)
    onBeforeUnmount(() => cancelAnimationFrame(frame))

    return () => slots.default?.()
  },
})
</script>

<template>
  <div class="relative flex flex-col gap-4">
    <Card class="mx-auto h-140 w-full max-w-sm gap-0">
      <CardHeader class="gap-1 border-b">
        <CardTitle>Opening Position</CardTitle>
        <CardDescription>
          Choose where a saved transcript opens.
        </CardDescription>
      </CardHeader>
      <CardContent class="flex-1 overflow-hidden p-0">
        <MessageScrollerProvider>
          <OpeningPositionScroller :position="position" :position-key="positionKey">
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent class="p-6">
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
          </OpeningPositionScroller>
        </MessageScrollerProvider>
      </CardContent>
      <CardFooter class="flex items-center justify-center border-t">
        <Tabs
          :model-value="position"
          class="w-full"
          @update:model-value="onValueChange"
        >
          <TabsList class="w-full">
            <TabsTrigger
              v-for="option in positions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardFooter>
    </Card>
    <div class="mx-auto max-w-sm px-0.5 text-center text-xs text-muted-foreground">
      Toggle the defaultScrollPosition to see where the transcript starts when
      you open the thread
    </div>
  </div>
</template>
