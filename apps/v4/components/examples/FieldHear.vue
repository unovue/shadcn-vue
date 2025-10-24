<script setup lang="ts">
import { Card, CardContent } from '@/registry/new-york-v4/ui/card'
import { Checkbox } from '@/registry/new-york-v4/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@/registry/new-york-v4/ui/field'

const options = [
  {
    label: 'Social Media',
    value: 'social-media',
  },

  {
    label: 'Search Engine',
    value: 'search-engine',
  },
  {
    label: 'Referral',
    value: 'referral',
  },
  {
    label: 'Other',
    value: 'other',
  },
]
</script>

<template>
  <Card class="py-4 shadow-none">
    <CardContent class="px-4">
      <form>
        <FieldGroup>
          <FieldSet class="gap-4">
            <FieldLegend>How did you hear about us?</FieldLegend>
            <FieldDescription class="line-clamp-1">
              Select the option that best describes how you heard about us.
            </FieldDescription>
            <FieldGroup class="flex flex-row flex-wrap gap-2 [--radius:9999rem]">
              <FieldLabel
                v-for="option in options"
                :key="option.value"
                :for="option.value"
                class="!w-fit"
              >
                <Field
                  orientation="horizontal"
                  class="gap-1.5 overflow-hidden !px-3 !py-1.5 transition-all duration-100 ease-linear group-has-data-[state=checked]/field-label:!px-2"
                >
                  <Checkbox
                    :id="option.value"
                    :value="option.value"

                    :default-value="option.value === 'social-media'"
                    class="-ml-6 -translate-x-1 rounded-full transition-all duration-100 ease-linear data-[state=checked]:ml-0 data-[state=checked]:translate-x-0"
                  />
                  <FieldTitle>{{ option.label }}</FieldTitle>
                </Field>
              </FieldLabel>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </CardContent>
  </Card>
</template>
