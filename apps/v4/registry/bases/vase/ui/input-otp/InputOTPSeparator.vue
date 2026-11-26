<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"
import { IconPlaceholder } from "@/registry/bases/vase/components/icon-placeholder"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="input-otp-separator"
    role="separator"
    :class="cn('cn-input-otp-separator flex items-center', props.class)"
  >
    <slot>
      <IconPlaceholder
        lucide="MinusIcon"
        tabler="IconMinus"
        hugeicons="MinusSignIcon"
        phosphor="MinusIcon"
        remixicon="RiSubtractLine"
      />
    </slot>
  </div>
</template>
