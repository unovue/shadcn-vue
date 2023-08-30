<script setup lang="ts">
import {
  SwitchRoot,
  type SwitchRootEmits,
  type SwitchRootProps,
  SwitchThumb,
} from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<SwitchRootProps & { class?: string }>()

const emits = defineEmits<SwitchRootEmits>()
</script>

<template>
  <SwitchRoot
    v-bind="props"
    :class="
      cn(
        'peer inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent data-[disabled]:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-secondary',
        props.class,
      )
    "
    @update:checked="emits('update:checked', $event)"
  >
    <SwitchThumb
      :class="
        cn(
          'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 ease-in-out duration-200',
          props.class,
        )
      "
    />
  </SwitchRoot>
</template>
