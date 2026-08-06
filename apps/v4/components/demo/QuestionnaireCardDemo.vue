<script setup lang="ts">
import { toast } from 'vue-sonner'
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/styles/reka-nova/ui/card'
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
  {
    choices: [{ value: 'fix' }, { value: 'refactor' }, { value: 'docs' }],
    name: 'task',
    required: true,
  },
  {
    choices: [{ value: 'summary' }, { value: 'files' }, { value: 'review' }],
    name: 'output',
    required: true,
  },
] as const

function handleSubmit(event: Event) {
  event.preventDefault()

  const formData = new FormData(event.target as HTMLFormElement)

  toast('Agent task created', {
    description: `Task: ${formData.get('task') ?? 'None'} · Handoff: ${formData.get('output') ?? 'None'}`,
  })
}
</script>

<template>
  <Questionnaire
    class="mx-auto max-w-md"
    default-item="task"
    :items="items"
    shortcuts="numbers"
    @submit="handleSubmit"
  >
    <Card>
      <QuestionnaireItem name="task" required>
        <CardHeader>
          <QuestionnaireTitle>
            What should the agent work on?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Choose the task that should be handled next.
          </QuestionnaireDescription>
          <CardAction>
            <QuestionnaireProgress />
          </CardAction>
        </CardHeader>
        <CardContent>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="fix">
              Fix the failing tests
            </QuestionnaireChoice>
            <QuestionnaireChoice value="refactor">
              Refactor the data layer
            </QuestionnaireChoice>
            <QuestionnaireChoice value="docs">
              Update the integration guide
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </CardContent>
      </QuestionnaireItem>

      <QuestionnaireItem name="output" required>
        <CardHeader>
          <QuestionnaireTitle>
            What should the final handoff include?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Pick the level of detail needed for review.
          </QuestionnaireDescription>
          <CardAction>
            <QuestionnaireProgress />
          </CardAction>
        </CardHeader>
        <CardContent>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="summary">
              Summary only
            </QuestionnaireChoice>
            <QuestionnaireChoice value="files">
              Summary and changed files
            </QuestionnaireChoice>
            <QuestionnaireChoice value="review">
              Full review handoff
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </CardContent>
      </QuestionnaireItem>

      <CardFooter>
        <QuestionnaireActions class="w-full">
          <QuestionnairePrevious />
          <QuestionnaireNext>
            Next
          </QuestionnaireNext>
          <QuestionnaireSubmit>
            Create task
          </QuestionnaireSubmit>
        </QuestionnaireActions>
      </CardFooter>
    </Card>
  </Questionnaire>
</template>
