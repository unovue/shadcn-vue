<script lang="ts" setup>
import Slot from './Slot.vue'
import { useFormField } from './FormItem.vue'

const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
</script>

<template>
  <Slot
    :id="formItemId"
    :aria-describedby="!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`"
    :aria-invalid="!!error"
  >
    <slot />
  </Slot>
</template>
