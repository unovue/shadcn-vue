<script setup lang="ts">
import { ArrowUpIcon, ChevronDownIcon, PlusIcon } from '@lucide/vue'
import { computed, ref } from 'vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/registry/bases/reka/ui/dropdown-menu'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@/registry/bases/reka/ui/input-group'

const providers = [
  {
    name: 'OpenAI',
    models: [
      { id: 'gpt-5', name: 'GPT-5' },
      { id: 'gpt-5-mini', name: 'GPT-5 mini' },
    ],
  },
  {
    name: 'Anthropic',
    models: [
      { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5' },
      { id: 'claude-haiku-4-5', name: 'Claude Haiku 4.5' },
    ],
  },
]

const models = providers.flatMap(provider => provider.models)

const efforts = [
  { id: 'low', name: 'Low' },
  { id: 'medium', name: 'Medium' },
  { id: 'high', name: 'High' },
]

const text = ref('')
const model = ref(models[0]!.id)
const effort = ref(efforts[1]!.id)
const formRef = ref<HTMLFormElement | null>(null)
const currentModel = computed(() => models.find(item => item.id === model.value) ?? models[0]!)
const currentEffort = computed(() => efforts.find(item => item.id === effort.value) ?? efforts[1]!)
const canSend = computed(() => text.value.trim().length > 0)

function onSubmit() {
  if (!canSend.value)
    return

  text.value = ''
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    formRef.value?.requestSubmit()
  }
}
</script>

<template>
  <div class="mx-auto w-full max-w-lg py-6">
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
            aria-label="Attach"
          >
            <PlusIcon />
          </InputGroupButton>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <InputGroupButton
                size="sm"
                variant="outline"
                :aria-label="`Model: ${currentModel.name}`"
                class="ml-auto"
              >
                {{ currentModel.name }}
                <ChevronDownIcon />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" class="w-48">
              <DropdownMenuRadioGroup v-model="model">
                <template v-for="(provider, index) in providers" :key="provider.name">
                  <DropdownMenuSeparator v-if="index > 0" />
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>{{ provider.name }}</DropdownMenuLabel>
                    <DropdownMenuRadioItem
                      v-for="item in provider.models"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </DropdownMenuRadioItem>
                  </DropdownMenuGroup>
                </template>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <InputGroupButton
                size="sm"
                variant="outline"
                :aria-label="`Effort: ${currentEffort.name}`"
              >
                <span class="text-muted-foreground">Effort</span>
                {{ currentEffort.name }}
                <ChevronDownIcon />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" class="w-36">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Effort</DropdownMenuLabel>
                <DropdownMenuRadioGroup v-model="effort">
                  <DropdownMenuRadioItem
                    v-for="item in efforts"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupButton
            type="submit"
            size="icon-sm"
            variant="default"
            class="rounded-full"
            :disabled="!canSend"
            aria-label="Send"
          >
            <ArrowUpIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  </div>
</template>
