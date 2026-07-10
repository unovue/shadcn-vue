<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york-v4/ui/avatar'
import { Bubble, BubbleContent, BubbleGroup } from '@/registry/new-york-v4/ui/bubble'
import { Message, MessageAvatar, MessageContent } from '@/registry/new-york-v4/ui/message'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-6 py-12">
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="/avatars/03.png" alt="@avatar" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent>
            The build failed during dependency installation.
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message align="end">
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="/avatars/10.png" alt="@avatar" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <Bubble>
          <BubbleContent>Can you share the exact error?</BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
    <Message>
      <MessageAvatar>
        <Avatar>
          <AvatarImage src="/avatars/03.png" alt="@avatar" />
          <AvatarFallback>R</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <BubbleGroup>
          <Bubble variant="muted">
            <BubbleContent>Here&apos;s the error from the logs</BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>
              Something went wrong with the build. The libraries are not
              installed correctly. Try running the build again.
            </BubbleContent>
          </Bubble>
        </BubbleGroup>
      </MessageContent>
    </Message>
  </div>
</template>
