<script setup lang="ts">
import { Bubble, BubbleContent } from '@/styles/reka-rhea/ui/bubble'
import { Message, MessageContent, MessageFooter, MessageHeader } from '@/styles/reka-rhea/ui/message'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Message>
      <MessageContent>
        <MessageHeader>Olivia</MessageHeader>
        <Bubble variant="muted">
          <BubbleContent>I already checked the logs.</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageContent>
        <Bubble>
          <BubbleContent>
            Send the report to the team. Ping @shadcn if you need help.
          </BubbleContent>
        </Bubble>
        <MessageFooter>
          <div>
            Read <span class="font-normal">Yesterday</span>
          </div>
        </MessageFooter>
      </MessageContent>
    </Message>
  </div>
</template>
