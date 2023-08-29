<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '@/utils'
import { computed, useAttrs } from "vue";

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type AlertVariantProps = VariantProps<typeof alertVariants>

withDefaults(defineProps<{
  variant?: AlertVariantProps['variant']
}>(), {
  variant: 'default'
})

defineOptions({
  name: 'Alert',
  inheritAttrs: false,
})

const allAttrs = useAttrs()
const attrs = computed(() => {
  const { class: className, ...rest } = allAttrs
  return {
    className,
    rest: rest
  }
})
</script>
    
<template>
  <div role="alert" v-bind="attrs.rest" :class="cn(alertVariants({ variant }), attrs.className ?? '')">
    <slot />
  </div>
</template>
