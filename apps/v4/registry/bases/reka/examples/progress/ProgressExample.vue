<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import FileUploadList from "~/registry/bases/reka/examples/progress/FileUploadList.vue"
import ProgressControlled from "~/registry/bases/reka/examples/progress/ProgressControlled.vue"
import ProgressValues from "~/registry/bases/reka/examples/progress/ProgressValues.vue"
import ProgressWithLabel from "~/registry/bases/reka/examples/progress/ProgressWithLabel.vue"
</script>

<template>
  <ExampleWrapper>
    <ProgressValues />
    <ProgressWithLabel />
    <ProgressControlled />
    <FileUploadList />
  </ExampleWrapper>
</template>
