<script setup lang="ts">
import type { MessageAnimationId } from '@/lib/message-scroller-demo'
import {
  ArrowUpIcon,
  MessageCircleDashedIcon,
  RotateCwIcon,
} from '@lucide/vue'
import { computed, ref } from 'vue'
import {
  createDemoChat,
  MESSAGE_ANIMATION_PRESETS,
  useDemoChat,
} from '@/lib/message-scroller-demo'
import { Button } from '@/styles/reka-rhea/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/styles/reka-rhea/ui/card'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/styles/reka-rhea/ui/empty'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/styles/reka-rhea/ui/message-scroller'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/styles/reka-rhea/ui/select'

const chat = createDemoChat()
  .user('Can user messages pop in like iMessage without breaking anchoring?')
  .sleep(1000)
  .assistant('Yes. Animate the user row with transform and opacity, and let the assistant response stream normally below it.\n\nThat keeps the row measurement predictable while still giving the newly sent bubble a more tactile entrance.')
  .user('What makes the animation feel more like iMessage?')
  .sleep(1000)
  .assistant('Use a quick spring from the trailing edge: a little scale, a small upward move, and no layout animation.\n\nThe bubble feels tactile, but the measured row stays predictable, so anchoring and auto-scroll do not have to fight a changing layout.')
  .user('Can I switch between presets while testing the same thread?')
  .sleep(1000)
  .assistant('Yes. Keep the conversation in place while you change the preset, then send the next message to compare the new entrance against the same context.\n\nThat makes it easier to judge the difference between a subtle fade, a snappy pop, and a more dramatic 3D tilt without rebuilding the scenario each time.')

const { messages, status, nextMessage, send, reset } = useDemoChat(chat, { chunkDelayMs: 15 })

const presetId = ref<MessageAnimationId>('fade')
const isBusy = computed(() => status.value === 'streaming')
const presetName = computed(
  () => MESSAGE_ANIMATION_PRESETS.find(preset => preset.id === presetId.value)?.name,
)

function onSend() {
  if (!nextMessage.value || isBusy.value)
    return
  send()
}
</script>

<template>
  <div class="relative flex flex-col gap-4">
    <Card class="mx-auto h-140 w-full max-w-sm gap-0">
      <CardHeader class="border-b">
        <CardTitle>Animation</CardTitle>
        <CardDescription>
          Choose how user messages are animated when they are added to the
          conversation.
        </CardDescription>
        <CardAction class="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Reset animated messages"
            :disabled="messages.length === 0 || isBusy"
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
            <EmptyTitle>No Messages Yet</EmptyTitle>
            <EmptyDescription>
              Click the button below to send the first message.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
        <MessageScrollerProvider v-else>
          <MessageScroller>
            <MessageScrollerViewport>
              <MessageScrollerContent :aria-busy="isBusy" class="p-6">
                <MessageAnimated
                  v-for="message in messages"
                  :key="message.id"
                  :message="message"
                  :animation-preset="presetId"
                  user-variant="muted"
                  assistant-variant="ghost"
                />
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
      </CardContent>
      <CardFooter class="border-t">
        <Select v-model="presetId">
          <SelectTrigger aria-label="Animation preset">
            <SelectValue>{{ presetName }}</SelectValue>
          </SelectTrigger>
          <SelectContent align="start" side="top">
            <SelectGroup>
              <SelectItem
                v-for="animation in MESSAGE_ANIMATION_PRESETS"
                :key="animation.id"
                :value="animation.id"
              >
                {{ animation.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          type="button"
          size="icon"
          class="ml-auto"
          :disabled="!nextMessage || isBusy"
          @click="onSend"
        >
          <ArrowUpIcon />
          <span class="sr-only">Send Message</span>
        </Button>
      </CardFooter>
    </Card>
    <div class="mx-auto max-w-sm px-0.5 text-center text-xs text-balance text-muted-foreground">
      Select an animation then click send to see it in action.
    </div>
  </div>
</template>
