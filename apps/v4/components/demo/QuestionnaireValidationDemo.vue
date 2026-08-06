<script setup lang="ts">
import { ref } from 'vue'
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

type ItemName = 'detail' | 'audience'

const items = [
  { name: 'detail', required: true },
  { name: 'audience', required: true },
] as const

const item = ref<string>('detail')
const errors = ref<Partial<Record<ItemName, string>>>({})

function clearError(name: ItemName) {
  if (errors.value[name]) {
    delete errors.value[name]
  }
}

function handleSubmit(event: Event) {
  event.preventDefault()

  const formData = new FormData(event.target as HTMLFormElement)
  const detail = formData.get('detail')
  const audience = formData.get('audience')

  // Public answers need enough context to stand on their own.
  if (audience === 'public' && detail === 'summary') {
    errors.value = {
      detail: 'Public answers need enough context. Choose a complete answer.',
    }
    item.value = 'detail'
    return
  }

  errors.value = {}
  toast('Agent response configured', {
    description: `Detail: ${detail} · Audience: ${audience}`,
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
    <Card class="w-full">
      <QuestionnaireItem :invalid="Boolean(errors.detail)" name="detail" required>
        <CardHeader>
          <QuestionnaireTitle>
            How much detail should the answer include?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Choose the response depth.
          </QuestionnaireDescription>
          <CardAction>
            <QuestionnaireProgress v-slot="{ current, total }" class="min-w-0">
              {{ current }} / {{ total }}
            </QuestionnaireProgress>
          </CardAction>
        </CardHeader>
        <CardContent>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="summary" @change="clearError('detail')">
              Concise summary
            </QuestionnaireChoice>
            <QuestionnaireChoice value="complete" @change="clearError('detail')">
              Complete answer
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError>
            <template v-if="errors.detail">
              {{ errors.detail }}
            </template>
          </QuestionnaireError>
        </CardContent>
      </QuestionnaireItem>

      <QuestionnaireItem :invalid="Boolean(errors.audience)" name="audience" required>
        <CardHeader>
          <QuestionnaireTitle>
            Who will read the answer?
          </QuestionnaireTitle>
          <QuestionnaireDescription>
            Public answers require complete context.
          </QuestionnaireDescription>
          <CardAction>
            <QuestionnaireProgress v-slot="{ current, total }" class="min-w-0">
              {{ current }} / {{ total }}
            </QuestionnaireProgress>
          </CardAction>
        </CardHeader>
        <CardContent>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="team" @change="clearError('audience')">
              My team
            </QuestionnaireChoice>
            <QuestionnaireChoice value="public" @change="clearError('audience')">
              Public audience
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError>
            <template v-if="errors.audience">
              {{ errors.audience }}
            </template>
          </QuestionnaireError>
        </CardContent>
      </QuestionnaireItem>

      <CardFooter>
        <QuestionnaireActions>
          <QuestionnairePrevious />
          <QuestionnaireNext>
            Next
          </QuestionnaireNext>
          <QuestionnaireSubmit>
            Validate answers
          </QuestionnaireSubmit>
        </QuestionnaireActions>
      </CardFooter>
    </Card>
  </Questionnaire>
</template>
