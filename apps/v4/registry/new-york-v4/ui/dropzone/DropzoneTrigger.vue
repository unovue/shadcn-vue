<script setup lang="ts">
import { computed, inject } from "vue"
import { cn } from "@/lib/utils"
import { DropzoneContextKey } from "./useDropzoneUpload"

const props = defineProps<{
  class?: string
}>()

const context = inject(DropzoneContextKey)

if (!context) {
  throw new Error("DropzoneTrigger must be used within a Dropzone")
}

const inputProps = computed(() => {
  const baseProps = context.getInputProps()
  return {
    ...baseProps,
    style: undefined,
    class: "sr-only",
  }
})

const fileMessageIds = computed(() =>
  context.fileStatuses.value
    .filter(file => file.status === "error")
    .map(file => context.getFileMessageId(file.id)),
)

const ariaDescribedBy = computed(() =>
  context.isInvalid.value ? [context.rootMessageId, ...fileMessageIds.value].join(" ") : undefined,
)
</script>

<template>
  <label
    :class="
      cn(
        'cursor-pointer rounded-sm bg-secondary px-4 py-2 font-medium ring-offset-background transition-colors focus-within:outline-none hover:bg-secondary/80 has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring has-[input:focus-visible]:ring-offset-2 text-foreground',
        props.class,
      )
    "
    @click.stop
  >
    <slot />
    <input
      v-bind="inputProps"
      :aria-describedby="ariaDescribedBy"
      :aria-invalid="context.isInvalid.value"
    >
  </label>
</template>
