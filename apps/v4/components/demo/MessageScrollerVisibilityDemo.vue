<script setup lang="ts">
import type { DemoMessage } from '@/lib/message-scroller-demo'
import { defineComponent, h } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/new-york-v4/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/registry/new-york-v4/ui/hover-card'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
  useMessageScrollerVisibility,
} from '@/registry/new-york-v4/ui/message-scroller'

const messages: DemoMessage[] = [
  {
    id: 'vis-brief',
    role: 'user',
    text: 'Review the incident handoff and tell me what to read first.',
  },
  {
    id: 'vis-brief-reply',
    role: 'assistant',
    text: 'Start with the summary and the impact section. The regression affected the upload queue, but the recovery path completed for every queued job.',
  },
  {
    id: 'vis-impact',
    role: 'user',
    text: 'What was the customer impact?',
  },
  {
    id: 'vis-impact-reply',
    role: 'assistant',
    text: 'Impact was limited to delayed processing.\n\nNo records were dropped, and the reconciliation worker confirmed each retry batch. Support saw confusion from two customers, but there were no checkout or billing errors.',
  },
  {
    id: 'vis-actions',
    role: 'user',
    text: 'What actions are open?',
  },
  {
    id: 'vis-actions-reply',
    role: 'assistant',
    text: 'Keep the retry window enabled until the next deploy, then add a queue-depth alert as the long-term fix.\n\nThe alert should fire on sustained queue growth, not a single short spike.',
  },
  {
    id: 'vis-checklist',
    role: 'user',
    text: 'Give me the follow-up checklist.',
  },
  {
    id: 'vis-checklist-reply',
    role: 'assistant',
    text: 'After that, compare the queue recovery graph with the deploy timeline so the handoff shows exactly when processing returned to baseline. That makes it easier for support and engineering to answer the same customer questions without re-reading the whole incident thread.\n\nI would also add a short owner note beside each follow-up item. The checklist is small, but ownership keeps the retry-window decision, alert tuning, and support macro from drifting into separate follow-up conversations.\n\nKeep the retry window enabled until the next deploy, then add a queue-depth alert as the long-term fix.\n\nThe alert should fire on sustained queue growth, not a single short spike.',
  },
]

const userMessages = messages.filter(message => message.role === 'user')

function getTrimmedMessageText(message: DemoMessage) {
  const text = message.text
  return text.length > 42 ? `${text.slice(0, 39)}...` : text
}

// The outline reads visibility state and scrolls the viewport, so it must live
// inside the provider. Render it with h() to keep the composables inside the
// MessageScroller context.
const TranscriptOutline = defineComponent({
  name: 'TranscriptOutline',
  setup() {
    const { scrollToMessage } = useMessageScroller()
    const visibility = useMessageScrollerVisibility()

    return () => {
      const currentAnchorId = visibility.value.currentAnchorId

      return h(HoverCard, null, {
        default: () => [
          h(HoverCardTrigger, { asChild: true }, {
            default: () =>
              h(
                'button',
                {
                  'type': 'button',
                  'aria-label': 'Open transcript outline',
                  'class': 'flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-md transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                },
                userMessages.map(message =>
                  h('span', {
                    'key': message.id,
                    'data-current': message.id === currentAnchorId,
                    'class': 'h-0.5 w-4 rounded-full bg-muted-foreground/40 data-[current=true]:bg-foreground',
                  }),
                ),
              ),
          }),
          h(
            HoverCardContent,
            {
              align: 'center',
              side: 'left',
              sideOffset: -28,
              class: 'flex w-64 flex-col gap-1 rounded-2xl p-1',
            },
            {
              default: () =>
                userMessages.map(message =>
                  h(
                    'button',
                    {
                      'key': message.id,
                      'type': 'button',
                      'aria-current': currentAnchorId === message.id ? 'location' : undefined,
                      'class': 'flex min-h-7 items-center rounded-xl px-2 py-1.5 text-left text-sm transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground aria-current:bg-accent aria-current:text-accent-foreground',
                      'onClick': () =>
                        scrollToMessage(message.id, {
                          align: 'start',
                          behavior: 'smooth',
                        }),
                    },
                    h('span', { class: 'line-clamp-1 min-w-0' }, getTrimmedMessageText(message)),
                  ),
                ),
            },
          ),
        ],
      })
    }
  },
})
</script>

<template>
  <MessageScrollerProvider :scroll-margin="12">
    <div class="relative flex flex-col gap-4">
      <div class="relative mx-auto w-full max-w-sm">
        <Card class="h-140 w-full gap-0">
          <CardHeader class="gap-1 border-b">
            <CardTitle>Transcript Outline</CardTitle>
            <CardDescription>
              Track the current anchored turn.
            </CardDescription>
          </CardHeader>
          <CardContent class="flex-1 overflow-hidden p-0">
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
          </CardContent>
        </Card>
        <div class="absolute top-1/2 -right-12 -translate-y-1/2">
          <TranscriptOutline />
        </div>
      </div>
      <div class="mx-auto max-w-sm px-0.5 text-center text-xs text-muted-foreground">
        Open the outline to jump between anchored turns as you read.
      </div>
    </div>
  </MessageScrollerProvider>
</template>
