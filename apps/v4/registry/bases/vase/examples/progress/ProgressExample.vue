<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import FileUploadList from "~/registry/bases/vase/examples/progress/FileUploadList.vue"
import ProgressControlled from "~/registry/bases/vase/examples/progress/ProgressControlled.vue"
import ProgressValues from "~/registry/bases/vase/examples/progress/ProgressValues.vue"
import ProgressWithLabel from "~/registry/bases/vase/examples/progress/ProgressWithLabel.vue"
</script>

<template>
  <ExampleWrapper>
    <ProgressValues />
    <ProgressWithLabel />
    <ProgressControlled />
    <FileUploadList />
  </ExampleWrapper>
</template>
