<script setup lang="ts">
import { computed, ref } from 'vue'
import { toast } from 'vue-sonner'
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/styles/reka-nova/ui/questionnaire'

const items = [
  { name: 'scope', required: true },
  { name: 'checks', required: true },
  { name: 'output', required: true },
] as const

const itemLabels: Record<string, string> = {
  scope: 'Change scope',
  checks: 'Verification',
  output: 'Final output',
}

const item = ref('scope')
const label = computed(() => itemLabels[item.value])

function handleSubmit(event: Event) {
  event.preventDefault()

  const formData = new FormData(event.target as HTMLFormElement)

  toast('Agent workflow configured', {
    description: `Scope: ${formData.get('scope') ?? 'None'} · Verification: ${formData.get('checks') ?? 'None'} · Output: ${formData.get('output') ?? 'None'}`,
  })
}
</script>

<template>
  <div class="relative mx-auto flex h-full w-full max-w-md flex-col">
    <p class="text-muted-foreground absolute end-0 top-0 text-sm" role="status">
      Current checkpoint: {{ label }}
    </p>

    <Questionnaire
      v-model:item="item"
      class="mt-auto"
      :items="items"
      @submit="handleSubmit"
    >
      <QuestionnaireProgress />

      <QuestionnaireItem name="scope" required>
        <QuestionnaireTitle>
          What may the agent change?
        </QuestionnaireTitle>
        <QuestionnaireDescription>
          The host stores the active checkpoint while Questionnaire navigates.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="component">
            Only the target component
          </QuestionnaireChoice>
          <QuestionnaireChoice value="tests">
            Component and related tests
          </QuestionnaireChoice>
          <QuestionnaireChoice value="feature">
            The complete feature area
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="checks" required>
        <QuestionnaireTitle>
          Which verification level should it use?
        </QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="targeted">
            Targeted tests
          </QuestionnaireChoice>
          <QuestionnaireChoice value="package">
            Package tests and typecheck
          </QuestionnaireChoice>
          <QuestionnaireChoice value="full">
            Full workspace verification
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireItem name="output" required>
        <QuestionnaireTitle>
          What should the agent return when finished?
        </QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="summary">
            Concise summary
          </QuestionnaireChoice>
          <QuestionnaireChoice value="diff">
            Summary with changed files
          </QuestionnaireChoice>
          <QuestionnaireChoice value="handoff">
            Detailed implementation handoff
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>

      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireNext>
          Next
        </QuestionnaireNext>
        <QuestionnaireSubmit>
          Save workflow
        </QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  </div>
</template>
