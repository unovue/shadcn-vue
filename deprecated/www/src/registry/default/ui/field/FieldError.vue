<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  errors?: Array<{ message?: string } | undefined>
}>()

const content = computed(() => {
  if (!props.errors || props.errors.length === 0)
    return null

  if (props.errors.length === 1 && props.errors[0]?.message) {
    return props.errors[0].message
  }

  return props.errors.some(e => e?.message)
    ? props.errors
    : null
})
</script>

<template>
  <div
    v-if="$slots.default || content"
    role="alert"
    data-slot="field-error"
    :class="cn('text-destructive text-sm font-normal', props.class)"
  >
    <slot v-if="$slots.default" />

    <template v-else-if="typeof content === 'string'">
      {{ content }}
    </template>

    <ul v-else-if="Array.isArray(content)" class="ml-4 flex list-disc flex-col gap-1">
      <li v-for="(error, index) in content" :key="index">
        {{ error?.message }}
      </li>
    </ul>
  </div>
</template>
