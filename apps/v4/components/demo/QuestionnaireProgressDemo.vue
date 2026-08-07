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
        How should commits be organized?
      </QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="single">
          Single commit
        </QuestionnaireChoice>
        <QuestionnaireChoice value="logical">
          Logical commits
        </QuestionnaireChoice>
        <QuestionnaireChoice value="squash">
          Squash before review
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireItem name="tests" required>
      <QuestionnaireTitle>Which tests should run?</QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="targeted">
          Targeted tests
        </QuestionnaireChoice>
        <QuestionnaireChoice value="package">
          Package suite
        </QuestionnaireChoice>
        <QuestionnaireChoice value="workspace">
          Full workspace
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireItem name="delivery" required>
      <QuestionnaireTitle>
        How should the work be delivered?
      </QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="patch">
          Patch only
        </QuestionnaireChoice>
        <QuestionnaireChoice value="commit">
          Committed locally
        </QuestionnaireChoice>
        <QuestionnaireChoice value="branch">
          Push a review branch
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
        Finish plan
      </QuestionnaireSubmit>
    </QuestionnaireActions>
  </Questionnaire>
</template>
