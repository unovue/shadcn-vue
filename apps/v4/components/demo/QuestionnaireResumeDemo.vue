<script setup lang="ts">
import { toast } from 'vue-sonner'
import { Button } from '@/styles/reka-nova/ui/button'
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
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/styles/reka-nova/ui/questionnaire'

const items = [
  { name: 'change', required: true },
  { name: 'verification', required: true },
  { name: 'notes' },
] as const

function handleSubmit(event: Event) {
  event.preventDefault()

  const formData = new FormData(event.target as HTMLFormElement)
  const verification = formData.getAll('verification')

  toast('Draft updated', {
    description: `Migration: ${formData.get('change') ?? 'None'} · Verification: ${verification.join(', ') || 'None'} · Notes: ${formData.get('notes') || 'None'}`,
  })
}
</script>

<template>
  <Questionnaire
    class="mx-auto max-w-md"
    default-item="verification"
    :items="items"
    @reset="toast('Saved answers restored')"
    @submit="handleSubmit"
  >
    <QuestionnaireProgress />

    <QuestionnaireItem name="change" required>
      <QuestionnaireTitle>
        What kind of migration is this?
      </QuestionnaireTitle>
      <QuestionnaireDescription>
        This answer was saved during the previous session.
      </QuestionnaireDescription>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="incremental" default-checked>
          Incremental migration
        </QuestionnaireChoice>
        <QuestionnaireChoice value="cutover">
          Single cutover
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireItem name="verification" multiple required>
      <QuestionnaireTitle>
        How should the migration be verified?
      </QuestionnaireTitle>
      <QuestionnaireDescription>
        These checks were selected during the previous session.
      </QuestionnaireDescription>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="tests" default-checked>
          Run migration tests
        </QuestionnaireChoice>
        <QuestionnaireChoice value="typecheck" default-checked>
          Run the typecheck
        </QuestionnaireChoice>
        <QuestionnaireChoice value="manual">
          Perform a manual smoke test
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireItem name="notes">
      <QuestionnaireTitle>
        Anything else the agent should remember?
      </QuestionnaireTitle>
      <QuestionnaireDescription>
        This note was saved with the draft.
      </QuestionnaireDescription>
      <QuestionnaireInput
        aria-label="Saved migration note"
        default-value="Keep the existing public API stable."
      />
    </QuestionnaireItem>

    <QuestionnaireActions>
      <Button type="reset" variant="outline">
        Reset changes
      </Button>
      <QuestionnairePrevious />
      <QuestionnaireNext>
        Next
      </QuestionnaireNext>
      <QuestionnaireSubmit>
        Update draft
      </QuestionnaireSubmit>
    </QuestionnaireActions>
  </Questionnaire>
</template>
