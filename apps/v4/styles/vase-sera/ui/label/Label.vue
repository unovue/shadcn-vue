<script setup lang="ts">
import type { HTMLAttributes, LabelHTMLAttributes } from 'vue'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ LabelHTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <label
    data-slot="label"
    :class="
      cn(
        'gap-2 font-semibold peer-data-[slot=checkbox]:text-sm peer-data-[slot=radio-group-item]:text-sm peer-data-[slot=switch]:text-sm group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 peer-data-[slot=checkbox]:font-normal peer-data-[slot=radio-group-item]:font-normal peer-data-[slot=switch]:font-normal uppercase text-xs tracking-wide peer-data-[slot=checkbox]:normal-case peer-data-[slot=checkbox]:tracking-normal peer-data-[slot=radio-group-item]:normal-case peer-data-[slot=radio-group-item]:tracking-normal peer-data-[slot=switch]:normal-case peer-data-[slot=switch]:tracking-normal flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed peer-has-disabled:cursor-not-allowed peer-has-disabled:opacity-50',
        props.class,
      )
    "
  >
    <slot />
  </label>
</template>
