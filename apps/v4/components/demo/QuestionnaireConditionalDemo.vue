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

const runtime = ref('local')

const items = computed(() => [
  { name: 'runtime', required: true },
  { disabled: runtime.value !== 'cloud', name: 'environment', required: true },
  { name: 'approval', required: true },
])

function handleSubmit(event: Event) {
  event.preventDefault()

  const formData = new FormData(event.target as HTMLFormElement)

  toast('Execution plan saved', {
    description: `Runtime: ${formData.get('runtime') ?? 'None'} · Environment: ${formData.get('environment') ?? 'Not applicable'} · Approval: ${formData.get('approval') ?? 'None'}`,
  })
}
</script>

<template>
  <Questionnaire
    class="mx-auto max-w-md"
    default-item="runtime"
    :items="items"
    @submit="handleSubmit"
  >
    <QuestionnaireProgress />

    <QuestionnaireItem name="runtime" required>
      <QuestionnaireTitle>
        Where should the agent run?
      </QuestionnaireTitle>
      <QuestionnaireDescription>
        Cloud runs add an environment question to this flow.
      </QuestionnaireDescription>
      <QuestionnaireChoices>
        <QuestionnaireChoice
          :checked="runtime === 'local'"
          value="local"
          @change="runtime = 'local'"
        >
          Local workspace
        </QuestionnaireChoice>
        <QuestionnaireChoice
          :checked="runtime === 'cloud'"
          value="cloud"
          @change="runtime = 'cloud'"
        >
          Cloud workspace
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireItem
      name="environment"
      :disabled="runtime !== 'cloud'"
      required
    >
      <QuestionnaireTitle>
        Which cloud environment should it use?
      </QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="preview">
          Preview
        </QuestionnaireChoice>
        <QuestionnaireChoice value="staging">
          Staging
        </QuestionnaireChoice>
        <QuestionnaireChoice value="isolated">
          Isolated sandbox
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireItem name="approval" required>
      <QuestionnaireTitle>
        When should the agent request approval?
      </QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="writes">
          Before writing files
        </QuestionnaireChoice>
        <QuestionnaireChoice value="commands">
          Before running commands
        </QuestionnaireChoice>
        <QuestionnaireChoice value="sensitive">
          Only for sensitive actions
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
        Save execution plan
      </QuestionnaireSubmit>
    </QuestionnaireActions>
  </Questionnaire>
</template>
