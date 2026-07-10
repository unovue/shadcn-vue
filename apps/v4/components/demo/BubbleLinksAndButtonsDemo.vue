<script setup lang="ts">
import { toast } from 'vue-sonner'
import { Bubble, BubbleContent, BubbleGroup } from '@/registry/new-york-v4/ui/bubble'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Bubble variant="muted">
      <BubbleContent>How can I help you today?</BubbleContent>
    </Bubble>
    <BubbleGroup>
      <Bubble variant="tinted" align="end">
        <BubbleContent as-child>
          <button type="button" @click="() => toast('You clicked forgot password')">
            I forgot my password
          </button>
        </BubbleContent>
      </Bubble>
      <Bubble variant="tinted" align="end">
        <BubbleContent as-child>
          <button type="button" @click="() => toast('You clicked help with subscription')">
            I need help with my subscription
          </button>
        </BubbleContent>
      </Bubble>
      <Bubble variant="tinted" align="end">
        <BubbleContent as-child>
          <button
            type="button"
            @click="() =>
              toast('You clicked something else. Talk to a human.')"
          >
            Something else. Talk to a human.
          </button>
        </BubbleContent>
      </Bubble>
    </BubbleGroup>
  </div>
</template>
