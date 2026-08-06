<script setup lang="ts">
import { toast } from 'vue-sonner'
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
    choices: [
      { value: 'source' },
      { value: 'tests' },
      { value: 'docs' },
      { value: 'history' },
    ],
    name: 'context',
    required: true,
  },
] as const

function handleSubmit(event: Event) {
  event.preventDefault()

  const context = new FormData(event.target as HTMLFormElement).getAll('context')

  toast('Context selected', {
    description: `Context: ${context.join(', ') || 'None'}`,
  })
}
</script>

<template>
  <Questionnaire
    class="mx-auto max-w-md"
    :items="items"
    shortcuts="letters"
    @submit="handleSubmit"
  >
    <QuestionnaireItem name="context" multiple required>
      <QuestionnaireTitle>
        What context should the agent inspect?
      </QuestionnaireTitle>
      <QuestionnaireDescription>
        Select every source that may affect the implementation.
      </QuestionnaireDescription>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="source">
          Relevant source files
        </QuestionnaireChoice>
        <QuestionnaireChoice value="tests">
          Existing tests
        </QuestionnaireChoice>
        <QuestionnaireChoice value="docs">
          Architecture documentation
        </QuestionnaireChoice>
        <QuestionnaireChoice value="history">
          Recent commit history
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireActions>
      <QuestionnaireSubmit>
        Share context
      </QuestionnaireSubmit>
    </QuestionnaireActions>
  </Questionnaire>
</template>
