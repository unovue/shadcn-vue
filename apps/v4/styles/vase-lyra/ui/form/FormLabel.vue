<script lang="ts" setup>
import type { HTMLAttributes, LabelHTMLAttributes } from 'vue'
import { cn } from 'cn'
import { Label } from '@/styles/vase-lyra/ui/label'
import { useFormField } from './useFormField'

interface Props extends /* @vue-ignore */ LabelHTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { error, formItemId } = useFormField()
</script>

<template>
  <Label
    data-slot="form-label"
    :data-error="!!error"
    :class="cn(
      'data-[error=true]:text-destructive',
      props.class,
    )"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>
