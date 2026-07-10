<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york-v4/ui/avatar'
import { Bubble, BubbleContent } from '@/registry/new-york-v4/ui/bubble'
import { Button } from '@/registry/new-york-v4/ui/button'
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
  author: 'me' | 'assistant'
  text: string
}

const REPLY = 'Sure — the MessageScroller follows the live edge only while you are pinned to the bottom. Scroll up at any point and it releases, so the incoming tokens no longer drag your view. Scroll back down and it re-attaches automatically.'

const messages = ref<ChatMessage[]>([
  { id: 'seed-1', author: 'me', text: 'Explain how auto-scroll works.' },
])

let counter = 0
let timer: ReturnType<typeof setInterval> | null = null

function stop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function stream() {
  stop()
  counter += 1
  const turnId = `turn-${counter}`
  messages.value.push({ id: `${turnId}-q`, author: 'me', text: 'Tell me more.' })
  const replyId = `${turnId}-a`
  messages.value.push({ id: replyId, author: 'assistant', text: '' })

  const words = REPLY.split(' ')
  let index = 0
  timer = setInterval(() => {
    const message = messages.value.find(item => item.id === replyId)
    if (!message)
      return stop()
    message.text = words.slice(0, index + 1).join(' ')
    index += 1
    if (index >= words.length)
      stop()
  }, 90)
}

onBeforeUnmount(stop)
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-3">
    <div class="h-[380px]">
      <MessageScrollerProvider :auto-scroll="true" default-scroll-position="end">
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
                        :src="message.author === 'me' ? '/avatars/10.png' : '/avatars/04.png'"
                        :alt="message.author"
                      />
                      <AvatarFallback>{{ message.author === 'me' ? 'ME' : 'AI' }}</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent>
                    <Bubble :variant="message.author === 'me' ? 'default' : 'muted'">
                      <BubbleContent>
                        {{ message.text }}<span v-if="message.author === 'assistant' && !message.text" class="shimmer">Thinking…</span>
                      </BubbleContent>
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
    <Button variant="outline" @click="stream">
      Stream a reply
    </Button>
  </div>
</template>
