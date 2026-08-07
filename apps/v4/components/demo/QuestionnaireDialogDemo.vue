<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { Button } from '@/styles/reka-nova/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/styles/reka-nova/ui/dialog'
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
  { name: 'tests', required: true },
] as const

const open = ref(false)

function handleSubmit(event: Event) {
  event.preventDefault()

  const formData = new FormData(event.target as HTMLFormElement)

  open.value = false
  toast('Clarification sent', {
    description: `Scope: ${formData.get('scope') ?? 'None'} · Verification: ${formData.get('tests') ?? 'None'}`,
  })
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline">
        Open clarification
      </Button>
    </DialogTrigger>
    <DialogContent>
      <Questionnaire default-item="scope" :items="items" @submit="handleSubmit">
        <QuestionnaireItem name="scope" required>
          <DialogHeader>
            <QuestionnaireProgress />
            <QuestionnaireTitle as-child>
              <DialogTitle>Which files are in scope?</DialogTitle>
            </QuestionnaireTitle>
            <QuestionnaireDescription as-child>
              <DialogDescription>
                Choose how broadly the agent can update the workspace.
              </DialogDescription>
            </QuestionnaireDescription>
          </DialogHeader>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="component">
              Component only
            </QuestionnaireChoice>
            <QuestionnaireChoice value="feature">
              Complete feature directory
            </QuestionnaireChoice>
            <QuestionnaireChoice value="workspace">
              Any related workspace file
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <QuestionnaireItem name="tests" required>
          <DialogHeader>
            <QuestionnaireProgress />
            <QuestionnaireTitle as-child>
              <DialogTitle>How much verification is needed?</DialogTitle>
            </QuestionnaireTitle>
            <QuestionnaireDescription as-child>
              <DialogDescription>
                Choose the checks the agent should run before handoff.
              </DialogDescription>
            </QuestionnaireDescription>
          </DialogHeader>
          <QuestionnaireChoices>
            <QuestionnaireChoice value="targeted">
              Targeted tests
            </QuestionnaireChoice>
            <QuestionnaireChoice value="package">
              Package tests
            </QuestionnaireChoice>
            <QuestionnaireChoice value="full">
              Full workspace verification
            </QuestionnaireChoice>
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>

        <DialogFooter>
          <DialogClose as-child>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireNext>
              Next
            </QuestionnaireNext>
            <QuestionnaireSubmit>
              Send answer
            </QuestionnaireSubmit>
          </QuestionnaireActions>
        </DialogFooter>
      </Questionnaire>
    </DialogContent>
  </Dialog>
</template>
