<script setup lang="ts">
import type { QuestionnaireItemStatus } from '@/styles/reka-nova/ui/questionnaire'
import { ref } from 'vue'
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
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/styles/reka-nova/ui/questionnaire'

const items = [
  { name: 'task', required: true },
  { name: 'constraints' },
  { name: 'review', required: true },
] as const

const constraintStatus = ref<QuestionnaireItemStatus>('unanswered')

function handleSubmit(event: Event) {
  event.preventDefault()

  const formData = new FormData(event.target as HTMLFormElement)
  const constraints = constraintStatus.value === 'skipped'
    ? 'Skipped'
    : (formData.get('constraints') ?? 'None')

  toast('Agent brief submitted', {
    description: `Task: ${formData.get('task') ?? 'None'} · Constraints: ${constraints} · Review: ${formData.get('review') ?? 'None'}`,
  })
}
</script>

<template>
  <Questionnaire
    class="mx-auto max-w-md"
    default-item="task"
    :items="items"
    @submit="handleSubmit"
  >
    <QuestionnaireProgress />

    <QuestionnaireItem name="task" required>
      <QuestionnaireTitle>
        What kind of change is this?
      </QuestionnaireTitle>
      <QuestionnaireDescription>
        Choose the category that best describes the work.
      </QuestionnaireDescription>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="feature">
          New feature
        </QuestionnaireChoice>
        <QuestionnaireChoice value="fix">
          Bug fix
        </QuestionnaireChoice>
        <QuestionnaireChoice value="refactor">
          Refactor
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireItem name="constraints" @update:status="constraintStatus = $event">
      <QuestionnaireTitle>
        Are there any implementation constraints?
      </QuestionnaireTitle>
      <QuestionnaireDescription>
        Answer if needed, or intentionally skip this question.
      </QuestionnaireDescription>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="no-dependencies">
          Do not add dependencies
        </QuestionnaireChoice>
        <QuestionnaireChoice value="no-migrations">
          Do not change the database
        </QuestionnaireChoice>
        <QuestionnaireChoice value="preserve-api">
          Preserve the public API
        </QuestionnaireChoice>
        <QuestionnaireInput
          aria-label="Another implementation constraint"
          placeholder="Describe another constraint…"
        />
      </QuestionnaireChoices>
    </QuestionnaireItem>

    <QuestionnaireItem name="review" required>
      <QuestionnaireTitle>
        How should the work be reviewed?
      </QuestionnaireTitle>
      <QuestionnaireDescription>
        Choose the checks the agent should complete before handoff.
      </QuestionnaireDescription>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="tests">
          Run the test suite
        </QuestionnaireChoice>
        <QuestionnaireChoice value="diff">
          Review the final diff
        </QuestionnaireChoice>
        <QuestionnaireChoice value="both">
          Tests and diff review
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireActions>
      <QuestionnairePrevious />
      <QuestionnaireSkip />
      <QuestionnaireNext>
        Next
      </QuestionnaireNext>
      <QuestionnaireSubmit>
        Submit brief
      </QuestionnaireSubmit>
    </QuestionnaireActions>
  </Questionnaire>
</template>
