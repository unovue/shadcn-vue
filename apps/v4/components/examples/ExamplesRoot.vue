<script setup lang="ts">
import ButtonGroupInputGroupDemo from '@/components/demo/ButtonGroupInputGroupDemo.vue'
import FieldSliderDemo from '@/components/demo/FieldSliderDemo.vue'
import InputGroupDemo from '@/components/demo/InputGroupDemo.vue'
import AppearanceSettings from '@/components/examples/AppearanceSettings.vue'
import ButtonGroupDemo from '@/components/examples/ButtonGroupDemo.vue'
import ButtonGroupNested from '@/components/examples/ButtonGroupNested.vue'
import ButtonGroupPopover from '@/components/examples/ButtonGroupPopover.vue'
import EmptyAvatarGroup from '@/components/examples/EmptyAvatarGroup.vue'
import FieldCheckbox from '@/components/examples/FieldCheckbox.vue'
import FieldDemo from '@/components/examples/FieldDemo.vue'
import FieldHear from '@/components/examples/FieldHear.vue'
import InputGroupButton from '@/components/examples/InputGroupButton.vue'
import ItemDemo from '@/components/examples/ItemDemo.vue'
import NotionPromptForm from '@/components/examples/NotionPromptForm.vue'
import SpinnerBadge from '@/components/examples/SpinnerBadge.vue'
import SpinnerEmpty from '@/components/examples/SpinnerEmpty.vue'
import { FieldSeparator } from '@/registry/new-york-v4/ui/field'
</script>

<template>
  <div class="theme-container mx-auto grid gap-8 py-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 2xl:gap-8">
    <div class="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
      <FieldDemo />
    </div>
    <div class="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
      <EmptyAvatarGroup />
      <SpinnerBadge />
      <ButtonGroupInputGroupDemo />
      <FieldSliderDemo />
      <InputGroupDemo />
    </div>
    <div class="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
      <InputGroupButton />
      <ItemDemo />
      <FieldSeparator class="my-4">
        Appearance Settings
      </FieldSeparator>
      <AppearanceSettings />
    </div>
    <div class="order-first flex flex-col gap-6 lg:hidden xl:order-last xl:flex *:[div]:w-full *:[div]:max-w-full">
      <NotionPromptForm />
      <ButtonGroupDemo />
      <FieldCheckbox />
      <div class="flex justify-between gap-4">
        <ButtonGroupNested />
        <ButtonGroupPopover />
      </div>
      <FieldHear />
      <SpinnerEmpty />
    </div>
  </div>
</template>
