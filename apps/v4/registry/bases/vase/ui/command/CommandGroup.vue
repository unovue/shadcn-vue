<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"
import { computed, useId } from "vue"
import { provideCommandGroupContext, useCommand } from "."

const props = defineProps<{
  class?: HTMLAttributes["class"]
  heading?: string
}>()

const command = useCommand()
const id = useId()
const headingId = useId()

const isRender = computed(() => command.isGroupVisible(id))

provideCommandGroupContext({ id })
</script>

<template>
  <div
    :id="id"
    data-slot="command-group"
    role="group"
    :aria-labelledby="heading ? headingId : undefined"
    :class="cn('cn-command-group', props.class)"
    :hidden="isRender ? undefined : true"
  >
    <div
      v-if="heading"
      :id="headingId"
      data-slot="command-group-heading"
      cmdk-group-heading=""
      class="cn-command-group-heading"
      aria-hidden="true"
    >
      {{ heading }}
    </div>
    <slot />
  </div>
</template>
