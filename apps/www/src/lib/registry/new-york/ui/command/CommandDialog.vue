<script setup lang="ts" generic="T">
import type { DialogRootEmits, DialogRootProps } from 'radix-vue'
import { useEmitAsProps } from 'radix-vue'
import Command from './Command.vue'
import { Dialog, DialogContent } from '@/lib/registry/new-york/ui/dialog'

type ArrayOrWrapped<T> = T extends any[] ? T : Array<T>
interface CommandDialogProps extends DialogRootProps {
  filterFunction?: (val: ArrayOrWrapped<T>, term: string) => ArrayOrWrapped<T>
}

const props = defineProps<CommandDialogProps>()
const emits = defineEmits<DialogRootEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <Dialog v-bind="{ ...props, ...emitsAsProps }">
    <DialogContent class="overflow-hidden p-0 shadow-lg">
      <Command :filter-function="props.filterFunction" class="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
        <slot />
      </Command>
    </DialogContent>
  </Dialog>
</template>
