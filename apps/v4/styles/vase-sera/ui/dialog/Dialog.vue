<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from '@vase-ui/vue/dialog'
import { Dialog } from '@vase-ui/vue/dialog'

interface Props extends /* @vue-ignore */ DialogRootProps {}
interface Emits extends /* @vue-ignore */ DialogRootEmits {}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Dialog.Root v-slot="slotProps">
    <slot v-bind="slotProps" />
  </Dialog.Root>
</template>
