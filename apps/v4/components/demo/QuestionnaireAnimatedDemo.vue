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
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/styles/reka-nova/ui/questionnaire'

const items = [
  { name: 'task', required: true },
  { name: 'review', required: true },
  { name: 'delivery', required: true },
] as const

const itemClass = 'data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300 motion-reduce:animate-none'

function handleSubmit(event: Event) {
  event.preventDefault()

  const formData = new FormData(event.target as HTMLFormElement)

  toast('Agent workflow saved', {
    description: `Task: ${formData.get('task') ?? 'None'} · Review: ${formData.get('review') ?? 'None'} · Delivery: ${formData.get('delivery') ?? 'None'}`,
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

    <QuestionnaireItem :class="itemClass" name="task" required>
      <QuestionnaireTitle>
        What should the agent do?
      </QuestionnaireTitle>
      <QuestionnaireDescription>
        Choose the task for this run.
      </QuestionnaireDescription>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="implement">
          Implement the requested change
        </QuestionnaireChoice>
        <QuestionnaireChoice value="debug">
          Debug the current behavior
        </QuestionnaireChoice>
        <QuestionnaireChoice value="review">
          Review the open pull request
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireItem :class="itemClass" name="review" required>
      <QuestionnaireTitle>
        How closely should the work be reviewed?
      </QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="self">
          Self review only
        </QuestionnaireChoice>
        <QuestionnaireChoice value="pair">
          Pair review before merge
        </QuestionnaireChoice>
        <QuestionnaireChoice value="team">
          Team review before merge
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireItem :class="itemClass" name="delivery" required>
      <QuestionnaireTitle>
        How should the result be delivered?
      </QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="branch">
          Push to a branch
        </QuestionnaireChoice>
        <QuestionnaireChoice value="pull-request">
          Open a pull request
        </QuestionnaireChoice>
        <QuestionnaireChoice value="patch">
          Share a patch file
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
</template>
