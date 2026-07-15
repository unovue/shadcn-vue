<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import DialogChatSettings from "~/registry/bases/reka/examples/dialog/DialogChatSettings.vue"
import DialogNoCloseButton from "~/registry/bases/reka/examples/dialog/DialogNoCloseButton.vue"
import DialogScrollableContent from "~/registry/bases/reka/examples/dialog/DialogScrollableContent.vue"
import DialogWithForm from "~/registry/bases/reka/examples/dialog/DialogWithForm.vue"
import DialogWithStickyFooter from "~/registry/bases/reka/examples/dialog/DialogWithStickyFooter.vue"
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
