<script setup lang="ts">
import {
  CheckIcon,
  CopyIcon,
  PencilIcon,
  RefreshCcwIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from '@lucide/vue'
import { createReusableTemplate, useClipboard } from '@vueuse/core'
import { ref } from 'vue'
import Markdown from '@/components/Markdown.vue'
import { Bubble, BubbleContent } from '@/registry/bases/reka/ui/bubble'
import { Button } from '@/registry/bases/reka/ui/button'
import {
  Message,
  MessageContent,
  MessageFooter,
} from '@/registry/bases/reka/ui/message'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/registry/bases/reka/ui/tooltip'

const reply = `Install Dialog, then open it from the gear button in \`SiteHeader.vue\`.

\`\`\`bash
npx shadcn-vue@latest add dialog
\`\`\`

Wrap the button in a \`DialogTrigger\` and put the settings form in \`DialogContent\`. Focus moves into the dialog when it opens, and **Esc** closes it.`

const { copy, copied } = useClipboard({ copiedDuring: 2000, legacy: true })
const feedback = ref<'like' | 'dislike' | null>(null)

const [DefineMessageAction, MessageAction] = createReusableTemplate<{
  label: string
  pressed?: boolean
  onClick?: () => void
}>()
</script>

<template>
  <DefineMessageAction v-slot="{ label, pressed, onClick, $slots }">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          variant="ghost"
          size="icon-sm"
          :aria-label="label"
          :aria-pressed="pressed"
          @click="onClick?.()"
        >
          <component :is="$slots.default" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ label }}</p>
      </TooltipContent>
    </Tooltip>
  </DefineMessageAction>

  <div class="mx-auto flex w-full max-w-md flex-col gap-8 py-6 text-sm">
    <Message align="end">
      <MessageContent class="gap-2">
        <Bubble align="end" variant="muted">
          <BubbleContent>
            How do I add a settings dialog? It should open from the gear icon
            in the header.
          </BubbleContent>
        </Bubble>
        <MessageFooter>
          <MessageAction label="Copy">
            <CopyIcon />
          </MessageAction>
          <MessageAction label="Edit">
            <PencilIcon />
          </MessageAction>
        </MessageFooter>
      </MessageContent>
    </Message>
    <Message>
      <MessageContent class="gap-2">
        <Markdown :value="reply" />
        <MessageFooter class="px-0">
          <MessageAction
            :label="copied ? 'Copied' : 'Copy'"
            @click="copy(reply)"
          >
            <CheckIcon v-if="copied" />
            <CopyIcon v-else />
          </MessageAction>
          <MessageAction
            label="Good response"
            :pressed="feedback === 'like'"
            @click="feedback = feedback === 'like' ? null : 'like'"
          >
            <ThumbsUpIcon :class="feedback === 'like' ? 'fill-current' : undefined" />
          </MessageAction>
          <MessageAction
            label="Bad response"
            :pressed="feedback === 'dislike'"
            @click="feedback = feedback === 'dislike' ? null : 'dislike'"
          >
            <ThumbsDownIcon :class="feedback === 'dislike' ? 'fill-current' : undefined" />
          </MessageAction>
          <MessageAction label="Retry">
            <RefreshCcwIcon />
          </MessageAction>
        </MessageFooter>
      </MessageContent>
    </Message>
  </div>
</template>
