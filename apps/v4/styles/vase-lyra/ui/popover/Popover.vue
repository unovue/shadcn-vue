<script lang="ts">
import type { InjectionKey, ShallowRef } from 'vue'

export const popoverAnchorKey: InjectionKey<ShallowRef<Element | null>> = Symbol('popoverAnchor')
</script>

<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from '@vase-ui/vue/popover'
import { Popover } from '@vase-ui/vue/popover'
import { provide, shallowRef } from 'vue'

interface Props extends /* @vue-ignore */ PopoverRootProps {}
interface Emits extends /* @vue-ignore */ PopoverRootEmits {}

defineProps<Props>()
defineEmits<Emits>()

provide(popoverAnchorKey, shallowRef<Element | null>(null))
</script>

<template>
  <Popover.Root v-slot="slotProps">
    <slot v-bind="slotProps" />
  </Popover.Root>
</template>
