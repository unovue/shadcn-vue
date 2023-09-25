<script lang="ts">
import { FieldContextKey, useFieldError, useIsFieldDirty, useIsFieldTouched, useIsFieldValid } from 'vee-validate'
import { inject } from 'vue'

export function useFormField() {
  const fieldContext = inject(FieldContextKey)

  const fieldState = {
    valid: useIsFieldValid(),
    isDirty: useIsFieldDirty(),
    isTouched: useIsFieldTouched(),
    error: useFieldError(),
  }

  if (!fieldContext)
    throw new Error('useFormField should be used within <FormField>')

  const { id, name } = fieldContext

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}
</script>

<script lang="ts" setup>
// eslint-disable-next-line import/first
import { cn } from '@/lib/utils'
</script>

<template>
  <div :class="cn('space-y-2', $attrs.class ?? '')">
    <slot />
  </div>
</template>
