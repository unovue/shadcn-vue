<script setup lang="ts">
import type { DemoMessage } from '@/lib/message-scroller-demo'
import { defineComponent, h } from 'vue'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/registry/new-york-v4/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/registry/new-york-v4/ui/dropdown-menu'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from '@/registry/new-york-v4/ui/message-scroller'

const messages: DemoMessage[] = [
  {
    id: 'command-activation',
    role: 'user',
    text: 'We\'re seeing activation dip after workspace creation. Can you help me find the likely step?',
  },
  {
    id: 'command-activation-reply',
    role: 'assistant',
    text: 'The sharpest drop is between creating the workspace and inviting the first teammate.\n\nWorkspace creation is still healthy, but the invite step is where users pause. That suggests the product is asking for collaboration before the user has enough confidence in the workspace.',
  },
  {
    id: 'command-compare',
    role: 'user',
    text: 'What should I compare before we change the onboarding flow?',
  },
  {
    id: 'command-compare-reply',
    role: 'assistant',
    text: 'Compare three cohorts:\n\n1. Users who choose a template before inviting teammates.\n2. Users who start from a blank workspace.\n3. Users who skip invites and return within 24 hours.\n\nIf template users invite faster, the fix is probably better first-run guidance rather than a louder invite prompt.',
  },
  {
    id: 'command-experiment',
    role: 'user',
    text: 'Can you turn that into an experiment?',
  },
  {
    id: 'command-experiment-reply',
    role: 'assistant',
    text: 'Yes. Create a variant that shows a short checklist after workspace creation:\n\n- Pick a template.\n- Add one project detail.\n- Invite a teammate when the workspace has context.\n\nMeasure first invite completion, 24-hour return rate, and whether teams create a second project.',
  },
  {
    id: 'command-risk',
    role: 'user',
    text: 'What\'s the risk if we delay the invite prompt?',
  },
  {
    id: 'command-risk-reply',
    role: 'assistant',
    text: 'The main risk is reducing team creation for accounts that already know who they want to invite.\n\nTo protect that path, keep the invite action visible in the header and only change the primary empty-state guidance. That gives confident teams a direct route without forcing uncertain users through the invite step too early.',
  },
]

const userMessages = messages.filter(message => message.role === 'user')

function getTrimmedMessageText(message: DemoMessage) {
  const text = message.text
  return text.length > 42 ? `${text.slice(0, 39)}...` : text
}

// The menu drives the transcript via `scrollToMessage`, so it must be rendered
// inside the provider where `useMessageScroller` is available.
const CommandMenu = defineComponent({
  name: 'CommandMenu',
  setup() {
    const { scrollToMessage } = useMessageScroller()
    return () =>
      h(DropdownMenu, null, () => [
        h(DropdownMenuTrigger, { asChild: true }, () =>
          h(Button, { type: 'button', variant: 'secondary' }, () => 'Jump to...')),
        h(DropdownMenuContent, { align: 'end', side: 'bottom', class: 'w-64' }, () =>
          h(DropdownMenuGroup, null, () => [
            h(DropdownMenuLabel, null, () => 'Conversations'),
            ...userMessages.map(message =>
              h(
                DropdownMenuItem,
                {
                  key: message.id,
                  onClick: () =>
                    scrollToMessage(message.id, {
                      align: 'start',
                      behavior: 'smooth',
                    }),
                },
                () => h('span', { class: 'line-clamp-1 min-w-0' }, getTrimmedMessageText(message)),
              )),
          ])),
      ])
  },
})
</script>

<template>
  <MessageScrollerProvider default-scroll-position="end">
    <div class="relative flex flex-col gap-4">
      <Card class="mx-auto h-140 w-full max-w-sm gap-0">
        <CardHeader class="gap-1 border-b">
          <CardTitle>Commands</CardTitle>
          <CardDescription>
            Drive the transcript from outside.
          </CardDescription>
          <CardAction>
            <CommandMenu />
          </CardAction>
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
      <div class="mx-auto max-w-sm px-0.5 text-center text-xs text-balance text-muted-foreground">
        Use the controls to jump to any message in the conversation.
      </div>
    </div>
  </MessageScrollerProvider>
</template>
