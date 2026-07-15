<script setup lang="ts">
import { CopyIcon, RefreshCcwIcon, ThumbsDownIcon, ThumbsUpIcon } from '@lucide/vue'
import { Bubble, BubbleContent } from '@/styles/reka-rhea/ui/bubble'
import { Button } from '@/styles/reka-rhea/ui/button'
import { Message, MessageContent, MessageFooter } from '@/styles/reka-rhea/ui/message'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Message>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>
            The install failure is coming from the workspace package.
          </BubbleContent>
        </Bubble>
        <MessageFooter>
          <Button variant="ghost" size="icon" aria-label="Copy" title="Copy">
            <CopyIcon />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Like" title="Like">
            <ThumbsUpIcon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Dislike"
            title="Dislike"
          >
            <ThumbsDownIcon />
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageContent>
        <Bubble>
          <BubbleContent>Okay drop me a link. Taking a look...</BubbleContent>
        </Bubble>
        <MessageFooter class="gap-2">
          <span class="font-normal text-destructive">Failed to send</span>
          <Button
            variant="ghost"
            size="icon-sm"
            title="Retry"
            aria-label="Retry"
          >
            <RefreshCcwIcon />
          </Button>
        </MessageFooter>
      </MessageContent>
    </Message>
  </div>
</template>
