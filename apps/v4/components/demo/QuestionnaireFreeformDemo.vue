<script setup lang="ts">
import { toast } from 'vue-sonner'
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/styles/reka-nova/ui/questionnaire'

const items = [
  {
    choices: [
      { value: 'incremental' },
      { value: 'module' },
      { value: 'rewrite' },
    ],
    name: 'approach',
    required: true,
  },
] as const

function handleSubmit(event: Event) {
  event.preventDefault()

  const approach = new FormData(event.target as HTMLFormElement).get('approach')

  toast('Approach selected', {
    description: `Approach: ${approach ?? 'None'}`,
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
    <QuestionnaireItem name="approach" required>
      <QuestionnaireTitle>
        How should the agent approach this refactor?
      </QuestionnaireTitle>
      <QuestionnaireDescription>
        Choose a strategy or write a more specific instruction.
      </QuestionnaireDescription>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="incremental">
          Make the smallest safe change
        </QuestionnaireChoice>
        <QuestionnaireChoice value="module">
          Refactor one module at a time
        </QuestionnaireChoice>
        <QuestionnaireChoice value="rewrite">
          Replace the implementation completely
        </QuestionnaireChoice>
        <QuestionnaireInput
          aria-label="Another refactoring approach"
          placeholder="Describe another approach…"
        />
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireActions>
      <QuestionnaireSubmit>
        Use this approach
      </QuestionnaireSubmit>
    </QuestionnaireActions>
  </Questionnaire>
</template>
