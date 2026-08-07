<script setup lang="ts">
import type { QuestionnaireShortcutMode } from '@/styles/reka-nova/ui/questionnaire'
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'
import { NativeSelect, NativeSelectOption } from '@/styles/reka-nova/ui/native-select'
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/styles/reka-nova/ui/questionnaire'

const items = [
  {
    choices: [{ value: 'inspect' }, { value: 'tests' }, { value: 'patch' }],
    name: 'action',
    required: true,
  },
] as const

const mode = ref<'letters' | 'numbers' | 'none'>('letters')

const shortcuts = computed<QuestionnaireShortcutMode | undefined>(() =>
  mode.value === 'none' ? undefined : mode.value)

function handleSubmit(event: Event) {
  event.preventDefault()

  const action = new FormData(event.target as HTMLFormElement).get('action')

  toast('Next action selected', {
    description: `Action: ${action ?? 'None'} · Shortcuts: ${shortcuts.value ?? 'none'}`,
  })
}
</script>

<template>
  <div class="relative mx-auto flex h-full w-full max-w-md flex-col">
    <NativeSelect v-model="mode" class="absolute end-0 top-0" aria-label="Shortcut style">
      <NativeSelectOption value="none">
        No shortcuts
      </NativeSelectOption>
      <NativeSelectOption value="letters">
        Letters
      </NativeSelectOption>
      <NativeSelectOption value="numbers">
        Numbers
      </NativeSelectOption>
    </NativeSelect>

    <Questionnaire
      class="mt-auto"
      :items="items"
      :shortcuts="shortcuts"
      @submit="handleSubmit"
    >
      <QuestionnaireItem name="action" required>
        <QuestionnaireTitle>
          What should the agent do next?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          Use the displayed shortcut or navigate with the keyboard.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="inspect">
            Inspect the implementation
          </QuestionnaireChoice>
          <QuestionnaireChoice value="tests">
            Run the relevant tests
          </QuestionnaireChoice>
          <QuestionnaireChoice value="patch">
            Prepare the patch
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnaireSubmit>
          Confirm action
        </QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  </div>
</template>
