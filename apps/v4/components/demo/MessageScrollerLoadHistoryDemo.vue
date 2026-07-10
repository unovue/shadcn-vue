<script setup lang="ts">
import type { DemoMessage } from '@/lib/message-scroller-demo'
import { RotateCwIcon } from '@lucide/vue'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'
import { createDemoChat } from '@/lib/message-scroller-demo'
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
import { Marker, MarkerContent } from '@/registry/new-york-v4/ui/marker'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/registry/new-york-v4/ui/message-scroller'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/registry/new-york-v4/ui/tooltip'

const chat = createDemoChat()
  .user('Can you summarize the incident channel?')
  .assistant(
    'The first alert was a delayed export job. It started backing up around 09:42 UTC and triggered the warning once the retry queue crossed the threshold.\n\nNo customer-facing checkout paths were affected, but exports for larger workspaces were running about 12 minutes behind.',
  )
  .user('Was checkout affected?')
  .assistant(
    'No checkout errors were reported. Payment authorization, order creation, and confirmation emails stayed inside their normal latency bands.\n\nThe only elevated metric was export queue depth, which maps to analytics downloads instead of checkout.',
  )
  .user('What changed in the last deploy?')
  .assistant(
    'Only the export queue worker changed. The deploy moved large CSV jobs onto the shared retry policy, which made each failed attempt hold a worker slot longer than before.\n\nThe app deploy did not include checkout, pricing, or billing API changes.',
  )
  .user('Do we need to roll back?')
  .assistant(
    'Not yet. Queue depth is recovering after we reduced retry concurrency, and the oldest pending job is now under five minutes old.\n\nKeep rollback ready if the queue starts climbing again, but the current trend points toward recovery.',
  )
  .user('Keep watching for customer-visible issues.')
  .assistant(
    'I will watch the queue and support tags for another 15 minutes. I am tracking export failures, delayed download requests, and any support thread that mentions missing reports.\n\nIf those stay quiet through the next batch window, we can close this as an internal degradation.',
  )

const history: DemoMessage[] = chat.turns.map((turn, index) => ({
  id: `history-${index}`,
  role: turn.role,
  text: turn.text,
}))
const INITIAL_VISIBLE_COUNT = 5

const demoKey = ref(0)
const messages = ref<DemoMessage[]>(history.slice(-INITIAL_VISIBLE_COUNT))

const canLoadHistory = computed(() => messages.value.length < history.length)
const canReset = computed(() => messages.value.length > INITIAL_VISIBLE_COUNT)

function loadHistory() {
  // Prepend the earlier messages to the top; preserveScrollOnPrepend keeps
  // the viewport anchored so the reader's place does not jump.
  const remaining = history.slice(0, history.length - messages.value.length)
  messages.value.unshift(...remaining)
  toast('History loaded', {
    description: 'Scroll up to see earlier messages.',
  })
}

function reset() {
  messages.value = history.slice(-INITIAL_VISIBLE_COUNT)
  demoKey.value += 1
}
</script>

<template>
  <MessageScrollerProvider>
    <div class="relative flex flex-col gap-4">
      <Card class="mx-auto h-140 w-full max-w-sm gap-0">
        <CardHeader class="gap-1 border-b">
          <CardTitle>Load History</CardTitle>
          <CardDescription>
            Prepended messages keep your place.
          </CardDescription>
          <CardAction>
            <Tooltip>
              <TooltipTrigger as-child>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Reset loaded messages"
                  :disabled="!canReset"
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
        <CardContent class="flex-1 overflow-hidden p-0">
          <MessageScroller :key="demoKey">
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
                <MessageScrollerItem :scroll-anchor="false">
                  <Marker variant="separator">
                    <MarkerContent>End of Conversation</MarkerContent>
                  </Marker>
                </MessageScrollerItem>
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </CardContent>
        <CardFooter class="flex flex-col items-center gap-2 border-t">
          <Button
            type="button"
            :disabled="!canLoadHistory"
            class="w-full"
            variant="secondary"
            @click="loadHistory"
          >
            {{ canLoadHistory ? 'Load History' : 'History Loaded' }}
          </Button>
          <p class="text-xs text-muted-foreground">
            Restore earlier messages while keeping your place.
          </p>
        </CardFooter>
      </Card>
      <div class="mx-auto max-w-sm px-0.5 text-center text-xs text-balance text-muted-foreground">
        Click Load History to load the entire conversation
      </div>
    </div>
  </MessageScrollerProvider>
</template>
