<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import SkeletonAvatar from "~/registry/bases/vase/examples/skeleton/SkeletonAvatar.vue"
import SkeletonCard from "~/registry/bases/vase/examples/skeleton/SkeletonCard.vue"
import SkeletonForm from "~/registry/bases/vase/examples/skeleton/SkeletonForm.vue"
import SkeletonTable from "~/registry/bases/vase/examples/skeleton/SkeletonTable.vue"
import SkeletonText from "~/registry/bases/vase/examples/skeleton/SkeletonText.vue"
</script>

<template>
  <ExampleWrapper>
    <SkeletonAvatar />
    <SkeletonCard />
    <SkeletonText />
    <SkeletonForm />
    <SkeletonTable />
  </ExampleWrapper>
</template>
