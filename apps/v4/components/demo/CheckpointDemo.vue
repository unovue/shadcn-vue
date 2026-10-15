<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
import { computed, ref } from 'vue'
import { Bubble, BubbleContent } from '@/registry/bases/reka/ui/bubble'
import { Button } from '@/registry/bases/reka/ui/button'
import { Marker, MarkerContent } from '@/registry/bases/reka/ui/marker'
import { Message, MessageContent } from '@/registry/bases/reka/ui/message'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
  checkpoint?: { label: string }
}

// The scripted conversation. A checkpoint is data on the agent's turn.
const transcript: ChatMessage[] = [
  {
    id: 'm1',
    role: 'user',
    text: 'Rename the button component to action.',
  },
  {
    id: 'm2',
    role: 'assistant',
    text: 'Renamed Button to Action in components/ui/button/Button.vue.',
    checkpoint: { label: 'Button renamed' },
  },
  {
    id: 'm3',
    role: 'user',
    text: 'Update the docs to match.',
  },
  {
    id: 'm4',
    role: 'assistant',
    text: 'Updated the Button page to say Action.',
  },
]

const messages = ref<ChatMessage[]>(transcript.map(message => ({ ...message })))

// Stream the scripted reply a few characters at a time.
let reply: ChatMessage | undefined
let cursor = 0
const { isActive: busy, pause, resume } = useIntervalFn(() => {
  if (!reply)
    return

  cursor = Math.min(reply.text.length, cursor + 3)
  const last = messages.value.at(-1)
  if (last?.id === reply.id)
    last.text = reply.text.slice(0, cursor)

  if (cursor >= reply.text.length)
    pause()
}, 20, { immediate: false })

// The next scripted message the person can send.
const nextMessage = computed(() => {
  const message = transcript[messages.value.length]
  return message?.role === 'user' ? message : undefined
})

function restore(messageId: string) {
  const index = messages.value.findIndex(message => message.id === messageId)

  if (index === -1)
    return

  messages.value = messages.value.slice(0, index + 1)
}

function sendMessage(message: ChatMessage) {
  const next = transcript[messages.value.length + 1]
  messages.value = [...messages.value, { ...message }]

  if (!next || next.role !== 'assistant')
    return

  messages.value = [...messages.value, { ...next, text: '' }]
  reply = next
  cursor = 0
  resume()
}
</script>

<template>
  <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <template v-for="(message, index) in messages" :key="message.id">
      <Message v-if="message.role === 'user'" align="end">
        <MessageContent>
          <Bubble align="end" variant="muted">
            <BubbleContent>{{ message.text }}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message v-else>
        <MessageContent>
          <p>{{ message.text }}</p>
        </MessageContent>
      </Message>
      <Marker v-if="message.checkpoint" variant="separator">
        <MarkerContent class="inline-flex items-center gap-2">
          {{ message.checkpoint.label }}
          <Button
            v-if="index < messages.length - 1"
            size="xs"
            variant="outline"
            :aria-label="`Restore to ${message.checkpoint.label}`"
            @click="restore(message.id)"
          >
            Restore
          </Button>
        </MarkerContent>
      </Marker>
    </template>
    <Button
      v-if="!busy && nextMessage"
      variant="outline"
      size="sm"
      class="mt-auto self-start"
      @click="sendMessage(nextMessage)"
    >
      Continue
    </Button>
  </div>
</template>
