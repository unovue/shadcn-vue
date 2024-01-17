<script setup lang="ts" generic="T">
import { reactiveOmit } from '@vueuse/core'
import { useEmitAsProps } from 'radix-vue'
import type { DialogRootEmits, DialogRootProps } from 'radix-vue'
import Command from './Command.vue'
import { Dialog, DialogContent } from '@/lib/registry/default/ui/dialog'

type ArrayOrWrapped<T> = T extends any[] ? T : Array<T>
interface CommandDialogProps extends DialogRootProps {
  filterFunction?: (val: ArrayOrWrapped<T>, term: string) => ArrayOrWrapped<T>
}

const props = defineProps<CommandDialogProps>()
const emits = defineEmits<DialogRootEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <Dialog v-bind="{ ...reactiveOmit(props, 'filterFunction'), ...emitsAsProps }">
    <DialogContent class="p-0 overflow-hidden shadow-lg">
      <Command :filter-function="props.filterFunction" class="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
        <slot />
      </Command>
    </DialogContent>
  </Dialog>
</template>
