<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { Bubble, BubbleContent } from '@/registry/new-york-v4/ui/bubble'
import { Button } from '@/registry/new-york-v4/ui/button'
import { Marker, MarkerContent } from '@/registry/new-york-v4/ui/marker'
import { Message, MessageContent } from '@/registry/new-york-v4/ui/message'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from '@/registry/new-york-v4/ui/message-scroller'

const turns = [
  { id: 'intro', label: 'Intro', title: 'Kickoff', lines: ['Welcome to the project sync.', 'Let\'s walk through the agenda.'] },
  { id: 'design', label: 'Design', title: 'Design review', lines: ['The new scroller anchors each turn.', 'Peek keeps the previous turn in view.'] },
  { id: 'build', label: 'Build', title: 'Build status', lines: ['Registry generation is wired up.', 'Docs and demos are in progress.'] },
  { id: 'ship', label: 'Ship', title: 'Release', lines: ['Everything is green.', 'Jump to any turn using the buttons above.'] },
]

// Controls must live inside the provider to access the scroll API.
const JumpBar = defineComponent({
  name: 'JumpBar',
  setup() {
    const { scrollToMessage } = useMessageScroller()
    return () =>
      h(
        'div',
        { class: 'flex flex-wrap gap-2' },
        turns.map(turn =>
          h(
            Button,
            {
              key: turn.id,
              variant: 'outline',
              size: 'sm',
              onClick: () => scrollToMessage(turn.id, { align: 'start' }),
            },
            () => turn.label,
          ),
        ),
      )
  },
})
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <MessageScrollerProvider default-scroll-position="start">
      <JumpBar />
      <div class="h-[360px]">
        <MessageScroller class="rounded-xl border">
          <MessageScrollerViewport class="p-4">
            <MessageScrollerContent>
              <MessageScrollerItem
                v-for="turn in turns"
                :key="turn.id"
                :message-id="turn.id"
                scroll-anchor
              >
                <div class="flex flex-col gap-4">
                  <Marker variant="separator">
                    <MarkerContent>{{ turn.title }}</MarkerContent>
                  </Marker>
                  <Message v-for="(line, index) in turn.lines" :key="index">
                    <MessageContent>
                      <Bubble variant="muted">
                        <BubbleContent>{{ line }}</BubbleContent>
                      </Bubble>
                    </MessageContent>
                  </Message>
                </div>
              </MessageScrollerItem>
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton direction="start" />
          <MessageScrollerButton direction="end" />
        </MessageScroller>
      </div>
    </MessageScrollerProvider>
  </div>
</template>
