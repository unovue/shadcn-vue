<script lang="ts" setup>
import { useFormField } from './FormItem.vue'
import { cn } from '@/lib/utils'

const { formDescriptionId } = useFormField()
</script>

<template>
  <p
    :id="formDescriptionId"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </p>
</template>
