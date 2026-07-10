<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york-v4/ui/avatar'
import { Bubble, BubbleContent } from '@/registry/new-york-v4/ui/bubble'
import { Message, MessageAvatar, MessageContent } from '@/registry/new-york-v4/ui/message'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/registry/new-york-v4/ui/message-scroller'

interface ChatMessage {
  id: string
  author: 'me' | 'rabbit'
  text: string
}

const messages: ChatMessage[] = [
  { id: 'm1', author: 'rabbit', text: 'Morning! Did the deploy finish?' },
  { id: 'm2', author: 'me', text: 'Yep, went out at 6am. All green.' },
  { id: 'm3', author: 'rabbit', text: 'Any regressions overnight?' },
  { id: 'm4', author: 'me', text: 'Nothing on the dashboards. Error rate is flat.' },
  { id: 'm5', author: 'rabbit', text: 'Nice. What about the new scroller?' },
  { id: 'm6', author: 'me', text: 'Anchoring, follow-live-edge and prepend restore all working.' },
  { id: 'm7', author: 'rabbit', text: 'And the jump-to-message button?' },
  { id: 'm8', author: 'me', text: 'That too. Scroll up and it fades in at the bottom.' },
  { id: 'm9', author: 'rabbit', text: 'Ship it. 🚀' },
  { id: 'm10', author: 'me', text: 'Already did.' },
]
</script>

<template>
  <div class="h-[420px] w-full max-w-md">
    <MessageScrollerProvider default-scroll-position="end">
      <MessageScroller class="rounded-xl border">
        <MessageScrollerViewport class="p-4">
          <MessageScrollerContent>
            <MessageScrollerItem
              v-for="message in messages"
              :key="message.id"
              :message-id="message.id"
              :scroll-anchor="message.author === 'me'"
            >
              <Message :align="message.author === 'me' ? 'end' : 'start'">
                <MessageAvatar>
                  <Avatar>
                    <AvatarImage
                      :src="message.author === 'me' ? '/avatars/10.png' : '/avatars/02.png'"
                      :alt="message.author"
                    />
                    <AvatarFallback>{{ message.author === 'me' ? 'ME' : 'R' }}</AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent>
                  <Bubble :variant="message.author === 'me' ? 'default' : 'muted'">
                    <BubbleContent>{{ message.text }}</BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </MessageScrollerItem>
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton direction="end" />
      </MessageScroller>
    </MessageScrollerProvider>
  </div>
</template>
