<script setup lang="ts">
import RadixIconsCheck from '~icons/radix-icons/check'

interface CheckBoxProps {
  id?: string
  modelValue?: boolean
  required?: boolean
  disabled?: boolean
  invalid?: boolean
  checked?: boolean
}

const props = defineProps<CheckBoxProps>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex items-center">
    <input
      :id="props.id"
      type="checkbox"
      :value="props.modelValue"
      :required="props.required"
      :disabled="props.disabled"
      :class="{
        'ring-destructive-light dark:ring-destructive': props.invalid,
        '!cursor-not-allowed opacity-50': props.disabled,
      }"
      :checked="props.checked"
      class="w-4 h-4 peer cursor-pointer shrink-0 relative checked:bg-primary appearance-none text-foreground border border-primary rounded"
      @input="
        ($event) =>
          emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
    >

    <RadixIconsCheck
      class="absolute pointer-events-none hidden peer-checked:block w-4 h-3 text-background"
    />
  </div>
</template>
