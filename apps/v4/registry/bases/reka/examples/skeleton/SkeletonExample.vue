<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import SkeletonAvatar from "~/registry/bases/reka/examples/skeleton/SkeletonAvatar.vue"
import SkeletonCard from "~/registry/bases/reka/examples/skeleton/SkeletonCard.vue"
import SkeletonForm from "~/registry/bases/reka/examples/skeleton/SkeletonForm.vue"
import SkeletonTable from "~/registry/bases/reka/examples/skeleton/SkeletonTable.vue"
import SkeletonText from "~/registry/bases/reka/examples/skeleton/SkeletonText.vue"
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
