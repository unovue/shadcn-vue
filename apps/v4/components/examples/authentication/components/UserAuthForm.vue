<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Icons } from '@/components/Icons'
import { cn } from '@/lib/utils'
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/registry/new-york-v4/ui/field'
import { Input } from '@/registry/new-york-v4/ui/input'
import { Spinner } from '@/registry/new-york-v4/ui/spinner'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const isLoading = ref(false)

async function onSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = (true)

  setTimeout(() => {
    isLoading.value = (false)
  }, 3000)
}
</script>

<template>
  <div :class="cn('grid gap-6', props.class)">
    <form @submit="onSubmit">
      <FieldGroup>
        <Field>
          <FieldLabel class="sr-only" for="email">
            Email
          </FieldLabel>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autocapitalize="none"
            autocomplete="email"
            autocorrect="off"
            :disabled="isLoading"
          />
        </Field>
        <Field>
          <Button :disabled="isLoading">
            <Spinner v-if="isLoading" />
            Sign In with Email
          </Button>
        </Field>
      </FieldGroup>
    </form>
    <FieldSeparator>Or continue with</FieldSeparator>
    <Button variant="outline" type="button" disabled="{isLoading}">
      <Spinner v-if="isLoading" />
      <Icons.gitHub v-else class="mr-2 h-4 w-4" />

      GitHub
    </Button>
  </div>
</template>
