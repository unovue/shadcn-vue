<script setup lang="ts">
import type { DialogDescriptionProps } from "@vase-ui/vue/dialog"
import type { HTMLAttributes } from "vue"
import { Dialog } from "@vase-ui/vue/dialog"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ DialogDescriptionProps {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <Dialog.Description
    data-slot="dialog-description"
    :class="cn('cn-dialog-description', props.class)"
  >
    <slot />
  </Dialog.Description>
</template>
