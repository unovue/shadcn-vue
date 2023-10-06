<script lang="ts">
import { type InjectionKey } from 'vue'

export const FORMI_TEM_INJECTION_KEY
  = Symbol() as InjectionKey<string>
</script>

<script lang="ts" setup>
import { provide } from 'vue'
import { useId } from 'radix-vue'
import { cn } from '@/lib/utils'

const id = useId()
provide(FORMI_TEM_INJECTION_KEY, id)
</script>

<template>
  <div :class="cn('space-y-2', $attrs.class ?? '')">
    <slot />
  </div>
</template>
