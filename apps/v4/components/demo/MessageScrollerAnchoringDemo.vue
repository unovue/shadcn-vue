<script setup lang="ts">
import type { DemoMessage, DemoRole } from '@/lib/message-scroller-demo'
import {
  ArrowUpIcon,
  MessageCircleDashedIcon,
  RotateCwIcon,
} from '@lucide/vue'
import { computed, ref } from 'vue'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/new-york-v4/ui/card'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/registry/new-york-v4/ui/empty'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/registry/new-york-v4/ui/message-scroller'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/registry/new-york-v4/ui/toggle-group'

const scriptedMessages: DemoMessage[] = [
  {
    id: 'anchor-1-user',
    role: 'user',
    text: 'Can you show me how anchoring behaves when a new prompt starts the turn?',
  },
  {
    id: 'anchor-1-assistant',
    role: 'assistant',
    text: 'Append the user prompt first, then append the assistant response. With User selected, the prompt settles near the top and the assistant response fills in below it.',
  },
  {
    id: 'anchor-2-user',
    role: 'user',
    text: 'What changes when assistant messages are the anchor?',
  },
  {
    id: 'anchor-2-assistant',
    role: 'assistant',
    text: 'Now each assistant response is the item `MessageScroller` keeps in view. This is useful when the reply is the moment you want readers to land on after each turn.',
  },
  {
    id: 'anchor-3-user',
    role: 'user',
    text: 'Can I switch roles and keep adding turns?',
  },
  {
    id: 'anchor-3-assistant',
    role: 'assistant',
    text: 'Yes. The next appended message with the selected role becomes the anchor, so you can compare user and assistant anchoring without resetting the demo.',
  },
]

const anchorRole = ref<DemoRole>('user')
const messages = ref<DemoMessage[]>([])
const messageIndex = ref(0)
const nextMessage = computed<DemoMessage | null>(() => scriptedMessages[messageIndex.value] ?? null)

function reset() {
  messages.value = []
  messageIndex.value = 0
}

function onValueChange(value: unknown) {
  const nextValue = Array.isArray(value) ? value[0] : value

  if (nextValue === 'user' || nextValue === 'assistant') {
    anchorRole.value = nextValue
    reset()
  }
}

function send() {
  if (!nextMessage.value)
    return

  messages.value = [...messages.value, nextMessage.value]
  messageIndex.value += 1
}
</script>

<template>
  <div class="relative flex flex-col gap-4">
    <Card class="mx-auto h-140 w-full max-w-sm gap-0">
      <CardHeader class="border-b">
        <CardTitle>Anchoring Turns</CardTitle>
        <CardDescription>
          Choose which role settles near the top edge.
        </CardDescription>
        <CardAction>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Reset anchored turns"
            :disabled="messages.length === 0"
            @click="reset"
          >
            <RotateCwIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent class="min-h-0 flex-1 overflow-hidden p-0">
        <Empty v-if="messages.length === 0" class="h-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageCircleDashedIcon />
            </EmptyMedia>
            <EmptyTitle>No anchored messages yet</EmptyTitle>
            <EmptyDescription>
              Send the first message to see the selected role anchor.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
        <MessageScrollerProvider v-else>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent class="p-6">
                <MessageAnimated
                  v-for="message in messages"
                  :key="message.id"
                  :message="message"
                  :scroll-anchor="message.role === anchorRole"
                  user-variant="muted"
                  assistant-variant="ghost"
                />
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </CardContent>
      <CardFooter>
        <ToggleGroup
          type="multiple"
          aria-label="Select scroll anchor role"
          :model-value="[anchorRole]"
          @update:model-value="onValueChange"
        >
          <ToggleGroupItem value="user" aria-label="Anchor user messages">
            User
          </ToggleGroupItem>
          <ToggleGroupItem value="assistant" aria-label="Anchor assistant messages">
            Assistant
          </ToggleGroupItem>
        </ToggleGroup>
        <Button
          type="button"
          size="icon"
          class="ml-auto"
          :disabled="!nextMessage"
          @click="send"
        >
          <ArrowUpIcon />
          <span class="sr-only">Send Message</span>
        </Button>
      </CardFooter>
    </Card>
    <div class="mx-auto max-w-xs px-0.5 text-center text-xs text-muted-foreground">
      Toggle the anchor role, then send messages to compare where turns
      settle.
    </div>
  </div>
</template>
