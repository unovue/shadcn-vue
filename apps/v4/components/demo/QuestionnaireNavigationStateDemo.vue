<script setup lang="ts">
import type { QuestionnaireItemStatus } from '@/styles/reka-nova/ui/questionnaire'
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

type ItemName = 'permission' | 'verification'

const items = [
  { name: 'permission', required: true },
  { name: 'verification', required: true },
] as const

const item = ref<ItemName>('permission')
const statuses = ref<Record<ItemName, QuestionnaireItemStatus>>({
  permission: 'unanswered',
  verification: 'unanswered',
})

const unanswered = computed(() => statuses.value[item.value] === 'unanswered')

function setStatus(name: ItemName, status: QuestionnaireItemStatus) {
  statuses.value = { ...statuses.value, [name]: status }
}

function handleSubmit(event: Event) {
  event.preventDefault()

  const formData = new FormData(event.target as HTMLFormElement)

  toast('Permissions saved', {
    description: `Permission: ${formData.get('permission') ?? 'None'} · Verification: ${formData.get('verification') ?? 'None'}`,
  })
}
</script>

<template>
  <Questionnaire
    v-model:item="item"
    class="mx-auto max-w-md"
    :items="items"
    @submit="handleSubmit"
  >
    <QuestionnaireProgress />

    <QuestionnaireItem
      name="permission"
      required
      @update:status="setStatus('permission', $event)"
    >
      <QuestionnaireTitle>What may the agent modify?</QuestionnaireTitle>
      <QuestionnaireDescription>
        Next is intentionally disabled until an answer is selected.
      </QuestionnaireDescription>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="files">
          Project files
        </QuestionnaireChoice>
        <QuestionnaireChoice value="tests">
          Project files and tests
        </QuestionnaireChoice>
        <QuestionnaireChoice value="config">
          Files, tests, and configuration
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireItem
      name="verification"
      required
      @update:status="setStatus('verification', $event)"
    >
      <QuestionnaireTitle>
        What must pass before completion?
      </QuestionnaireTitle>
      <QuestionnaireChoices>
        <QuestionnaireChoice value="tests">
          Tests
        </QuestionnaireChoice>
        <QuestionnaireChoice value="types">
          Tests and types
        </QuestionnaireChoice>
        <QuestionnaireChoice value="all">
          Tests, types, and visual QA
        </QuestionnaireChoice>
      </QuestionnaireChoices>
      <QuestionnaireError />
    </QuestionnaireItem>

    <QuestionnaireActions>
      <QuestionnairePrevious />
      <QuestionnaireNext
        class="data-[status=unanswered]:opacity-50"
        :disabled="unanswered"
        variant="secondary"
      >
        Next
      </QuestionnaireNext>
      <QuestionnaireSubmit :disabled="unanswered">
        Save permissions
      </QuestionnaireSubmit>
    </QuestionnaireActions>
  </Questionnaire>
</template>
