<script setup lang="ts">
import type { AlertDialogCloseProps } from '@vase-ui/vue/alert-dialog'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '@/styles/vase-vega/ui/button'
import { AlertDialog } from '@vase-ui/vue/alert-dialog'
import { cn } from 'cn'
import { buttonVariants } from '@/styles/vase-vega/ui/button'

interface Props extends /* @vue-ignore */ AlertDialogCloseProps {
  class?: HTMLAttributes['class']
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'outline',
  size: 'default',
})
</script>

<template>
  <AlertDialog.Close
    data-slot="alert-dialog-cancel"
    :class="cn(
      '',
      buttonVariants({ variant, size }),
      props.class,
    )"
  >
    <slot />
  </AlertDialog.Close>
</template>
