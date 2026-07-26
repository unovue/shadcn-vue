<script setup lang="ts">
import { RotateCwIcon } from '@lucide/vue'
import { computed, ref } from 'vue'
import { Bubble, BubbleContent } from '@/styles/reka-rhea/ui/bubble'
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
import { Marker, MarkerContent } from '@/styles/reka-rhea/ui/marker'
import {
  Message,
  MessageContent,
  MessageHeader,
} from '@/styles/reka-rhea/ui/message'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/styles/reka-rhea/ui/message-scroller'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/styles/reka-rhea/ui/tooltip'

type GroupChatItem
  = | {
    id: string
    type: 'event'
    text: string
    scrollAnchor?: boolean
  }
  | {
    id: string
    type: 'message'
    sender: string
    role: 'assistant' | 'participant'
    text: string
    scrollAnchor?: boolean
  }

const currentUser = 'Grace'

const initialItems: GroupChatItem[] = [
  {
    id: 'group-1',
    type: 'message',
    sender: 'Grace',
    role: 'participant',
    text: '@mary, the astrophage line keeps matching Venus energy output. Can you check my math?',
  },
  {
    id: 'group-2',
    type: 'message',
    sender: 'Mary (Agent)',
    role: 'assistant',
    text: 'Yes. Confirmed. The curve points to a microorganism harvesting stellar energy and breeding near carbon dioxide. If @rocky agrees, this is the clue we need.',
  },
  {
    id: 'group-3',
    type: 'message',
    sender: 'Grace',
    role: 'participant',
    text: 'ping @rocky',
    scrollAnchor: true,
  },
]

const rockyMarker: GroupChatItem = {
  id: 'group-4',
  type: 'event',
  text: 'Rocky has joined the chat',
  scrollAnchor: true,
}

const rockyMessage: GroupChatItem = {
  id: 'group-5',
  type: 'message',
  sender: 'Rocky',
  role: 'participant',
  text: 'Amaze. Astrophage eats light, makes heat, goes to carbon dioxide. Rocky has fuel model. Grace is smart.',
}

const demoKey = ref(0)
const rockyTurn = ref<'idle' | 'marker' | 'message'>('idle')

const items = computed(() => {
  if (rockyTurn.value === 'message')
    return [...initialItems, rockyMarker, rockyMessage]
  if (rockyTurn.value === 'marker')
    return [...initialItems, rockyMarker]
  return initialItems
})
const buttonLabel = computed(() =>
  rockyTurn.value === 'idle' ? 'Add Rocky' : 'Send Message as Rocky',
)
const isComplete = computed(() => rockyTurn.value === 'message')

function advance() {
  rockyTurn.value = rockyTurn.value === 'idle' ? 'marker' : 'message'
}

function reset() {
  rockyTurn.value = 'idle'
  demoKey.value += 1
}

function messageVariant(item: Extract<GroupChatItem, { type: 'message' }>) {
  if (item.sender === currentUser)
    return 'muted'
  return item.role === 'assistant' ? 'ghost' : 'tinted'
}
</script>

<template>
  <MessageScrollerProvider>
    <div class="relative flex flex-col gap-4">
      <Card class="mx-auto h-140 w-full max-w-sm gap-0">
        <CardHeader class="gap-1 border-b">
          <CardTitle>Group Chat</CardTitle>
          <CardDescription>
            A group chat with several participants and an assistant. The
            Marker is marked as a turn.
          </CardDescription>
          <CardAction>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Reset conversation"
                  :disabled="rockyTurn === 'idle'"
                  @click="reset"
                >
                  <RotateCwIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset</p>
              </TooltipContent>
            </Tooltip>
          </CardAction>
        </CardHeader>
        <CardContent class="min-h-0 flex-1 p-0">
          <MessageScrollerProvider>
            <MessageScroller :key="demoKey">
              <MessageScrollerViewport>
                <MessageScrollerContent class="p-(--card-spacing)">
                  <template v-for="item in items" :key="item.id">
                    <MessageScrollerItem
                      v-if="item.type === 'message'"
                      :message-id="item.id"
                      :scroll-anchor="item.scrollAnchor"
                    >
                      <Message :align="item.sender === currentUser ? 'end' : 'start'">
                        <MessageContent>
                          <MessageHeader v-if="item.sender !== currentUser">
                            {{ item.sender }}
                          </MessageHeader>
                          <Bubble :variant="messageVariant(item)">
                            <BubbleContent>{{ item.text }}</BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                    <MessageScrollerItem
                      v-else
                      :scroll-anchor="item.scrollAnchor"
                    >
                      <Marker variant="separator">
                        <MarkerContent>{{ item.text }}</MarkerContent>
                      </Marker>
                    </MessageScrollerItem>
                  </template>
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        </CardContent>
        <CardFooter class="flex flex-col items-center gap-2 border-t">
          <Button
            type="button"
            :disabled="isComplete"
            class="w-full"
            variant="secondary"
            @click="advance"
          >
            {{ buttonLabel }}
          </Button>
          <p class="text-xs text-muted-foreground">
            {{ rockyTurn === 'idle'
              ? 'This will create a marker and make it the anchor'
              : 'Now send Rocky\'s reply into the conversation' }}
          </p>
        </CardFooter>
      </Card>
      <div class="mx-auto max-w-sm px-0.5 text-center text-xs text-balance text-muted-foreground">
        When a user joins, a marker is created. scrollAnchor on the marker
        marks it as the next turn
      </div>
    </div>
  </MessageScrollerProvider>
</template>
