<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import DialogChatSettings from "~/registry/bases/vase/examples/dialog/DialogChatSettings.vue"
import DialogNoCloseButton from "~/registry/bases/vase/examples/dialog/DialogNoCloseButton.vue"
import DialogScrollableContent from "~/registry/bases/vase/examples/dialog/DialogScrollableContent.vue"
import DialogWithForm from "~/registry/bases/vase/examples/dialog/DialogWithForm.vue"
import DialogWithStickyFooter from "~/registry/bases/vase/examples/dialog/DialogWithStickyFooter.vue"
</script>

<template>
  <ExampleWrapper>
    <DialogWithForm />
    <DialogScrollableContent />
    <DialogWithStickyFooter />
    <DialogNoCloseButton />
    <DialogChatSettings />
  </ExampleWrapper>
</template>
