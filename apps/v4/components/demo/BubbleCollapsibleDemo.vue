<script setup lang="ts">
import { ChevronDownIcon } from '@lucide/vue'
import { ref } from 'vue'
import { Bubble, BubbleContent } from '@/registry/new-york-v4/ui/bubble'
import { Button } from '@/registry/new-york-v4/ui/button'
import { Collapsible, CollapsibleTrigger } from '@/registry/new-york-v4/ui/collapsible'

const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`

const previewLength = 180
const open = ref(false)
const preview = computed(() => `${text.slice(0, previewLength)}...`)
const isLong = computed(() => text.length > previewLength)
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Bubble variant="muted">
      <BubbleContent>How can I help you today?</BubbleContent>
    </Bubble>

    <Bubble variant="muted" align="end">
      <BubbleContent class="whitespace-pre-line">
        <Collapsible v-model:open="open">
          <div>{{ (open || !isLong) ? text : preview }}</div>
          <template v-if="isLong">
            <CollapsibleTrigger as-child>
              <Button variant="link" class="gap-1 p-0 text-muted-foreground">
                {{ open ? "Show less" : "Show more" }}
                <ChevronDownIcon
                  data-icon="inline-end"
                  class="group-data-panel-open/button:rotate-180 size-4"
                />
              </Button>
            </CollapsibleTrigger>
          </template>
        </Collapsible>
      </BubbleContent>
    </Bubble>
  </div>
</template>
