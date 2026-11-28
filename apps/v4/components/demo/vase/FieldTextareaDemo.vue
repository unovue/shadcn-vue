<script setup lang="ts">
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/styles/vase-vega/ui/field'
import { Textarea } from '@/styles/vase-vega/ui/textarea'
</script>

<template>
  <div class="w-full max-w-md">
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel for="feedback">
            Feedback
          </FieldLabel>
          <Textarea
            id="feedback"
            placeholder="Your feedback helps us improve..."
            :rows="4"
          />
          <FieldDescription>
            Share your thoughts about our service.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  </div>
</template>
