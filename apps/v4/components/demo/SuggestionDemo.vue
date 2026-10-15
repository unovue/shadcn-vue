<script setup lang="ts">
import { ArrowUpIcon, PlusIcon } from '@lucide/vue'
import { computed, ref } from 'vue'
import { Bubble, BubbleContent } from '@/registry/bases/reka/ui/bubble'
import { Button } from '@/registry/bases/reka/ui/button'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@/registry/bases/reka/ui/input-group'
import { Message, MessageContent } from '@/registry/bases/reka/ui/message'

const suggestions = [
  'Add a dark mode toggle',
  'Fix the failing build',
  'Write tests for the form',
  'Upgrade to Nuxt 4',
  'Add a loading state',
  'Find unused dependencies',
]

const replies: Record<string, string> = {
  'Add a dark mode toggle':
    'Added a ModeToggle to the site header. It calls useColorMode from @vueuse/core.',
  'Fix the failing build':
    'The build failed on a missing import in pages/index.vue. I added it and the build passes.',
  'Write tests for the form':
    'Added four tests in SignupForm.test.ts. They cover the empty, invalid and valid states.',
  'Upgrade to Nuxt 4':
    'Ran the codemod and bumped nuxt to 4. Two pages needed the new app/ directory, so I moved them.',
  'Add a loading state':
    'Added a loading state to the dashboard page. It shows skeletons while the data loads.',
  'Find unused dependencies':
    'Three packages are not imported anywhere: lodash, moment and classnames. Should I remove them?',
}

const text = ref('')
const turn = ref<{ prompt: string, reply: string } | null>(null)
const formRef = ref<HTMLFormElement | null>(null)
const canSend = computed(() => text.value.trim().length > 0)

function send(prompt: string) {
  turn.value = {
    prompt,
    reply:
      replies[prompt] ?? 'This demo only knows the suggestions. Pick one.',
  }
  text.value = ''
}

function onSubmit() {
  if (!canSend.value)
    return

  send(text.value.trim())
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    formRef.value?.requestSubmit()
  }
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-lg flex-col gap-6 py-6 text-sm">
    <div v-if="turn" class="flex flex-col gap-4">
      <Message align="end">
        <MessageContent>
          <Bubble align="end" variant="muted">
            <BubbleContent>{{ turn.prompt }}</BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
      <Message>
        <MessageContent>
          <p>{{ turn.reply }}</p>
        </MessageContent>
      </Message>
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex scroll-fade-x scrollbar-none gap-2 overflow-x-auto overscroll-x-contain">
        <Button
          v-for="suggestion in suggestions"
          :key="suggestion"
          variant="outline"
          size="sm"
          class="shrink-0"
          @click="send(suggestion)"
        >
          {{ suggestion }}
        </Button>
      </div>
      <form ref="formRef" @submit.prevent="onSubmit">
        <InputGroup>
          <InputGroupTextarea
            v-model="text"
            placeholder="Ask the agent to change your code..."
            class="p-3"
            @keydown="onKeydown"
          />
          <InputGroupAddon align="block-end">
            <InputGroupButton
              size="icon-sm"
              variant="outline"
              class="rounded-full"
              aria-label="Attach files"
            >
              <PlusIcon />
            </InputGroupButton>
            <InputGroupButton
              type="submit"
              size="icon-sm"
              variant="default"
              class="ml-auto rounded-full"
              :disabled="!canSend"
              aria-label="Send"
            >
              <ArrowUpIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </div>
  </div>
</template>
