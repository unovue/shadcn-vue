<script setup lang="ts">
import { toast } from 'vue-sonner'
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
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
  { name: 'strategy', required: true },
  { name: 'tests', required: true },
  { name: 'delivery', required: true },
] as const

function handleSubmit(event: Event) {
  event.preventDefault()

  const formData = new FormData(event.target as HTMLFormElement)

  toast('Pull request plan ready', {
    description: `Scope: ${formData.get('scope') ?? 'None'} · Commits: ${formData.get('strategy') ?? 'None'} · Tests: ${formData.get('tests') ?? 'None'} · Delivery: ${formData.get('delivery') ?? 'None'}`,
  })
}
</script>

<template>
  <Questionnaire
    class="mx-auto max-w-md"
    default-item="scope"
    :items="items"
    @submit="handleSubmit"
  >
    <QuestionnaireProgress v-slot="{ current, total }" class="w-full">
      <div aria-hidden="true" class="mb-2 flex gap-1.5">
        <span
          v-for="step in total"
          :key="step"
          class="h-1.5 flex-1 rounded-full"
          :class="step <= current ? 'bg-primary' : 'bg-muted'"
        />
      </div>
      <span>Checkpoint {{ current }} of {{ total }}</span>
    </QuestionnaireProgress>

    <QuestionnaireItem name="scope" required>
      <QuestionnaireTitle>
        How large is the change?
      </QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="small">
          Small patch
        </QuestionnaireChoice>
        <QuestionnaireChoice value="medium">
          Feature-sized change
        </QuestionnaireChoice>
        <QuestionnaireChoice value="large">
          Cross-package change
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireItem name="strategy" required>
      <QuestionnaireTitle>
        How should the commits be organized?
      </QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="single">
          A single commit
        </QuestionnaireChoice>
        <QuestionnaireChoice value="grouped">
          Grouped by concern
        </QuestionnaireChoice>
        <QuestionnaireChoice value="stacked">
          Stacked pull requests
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireItem name="tests" required>
      <QuestionnaireTitle>
        Which tests should run before review?
      </QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="targeted">
          Targeted tests
        </QuestionnaireChoice>
        <QuestionnaireChoice value="package">
          Package test suite
        </QuestionnaireChoice>
        <QuestionnaireChoice value="workspace">
          Full workspace suite
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireItem name="delivery" required>
      <QuestionnaireTitle>
        When should the pull request open?
      </QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="draft">
          Open as a draft now
        </QuestionnaireChoice>
        <QuestionnaireChoice value="ready">
          Open when checks pass
        </QuestionnaireChoice>
        <QuestionnaireChoice value="manual">
          Wait for a manual review
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
        Create plan
      </QuestionnaireSubmit>
    </QuestionnaireActions>
  </Questionnaire>
</template>
