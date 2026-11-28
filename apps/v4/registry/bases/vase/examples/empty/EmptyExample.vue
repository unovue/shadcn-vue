<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import EmptyBasic from "~/registry/bases/vase/examples/empty/EmptyBasic.vue"
import EmptyInCard from "~/registry/bases/vase/examples/empty/EmptyInCard.vue"
import EmptyWithBorder from "~/registry/bases/vase/examples/empty/EmptyWithBorder.vue"
import EmptyWithIcon from "~/registry/bases/vase/examples/empty/EmptyWithIcon.vue"
import EmptyWithMutedBackground from "~/registry/bases/vase/examples/empty/EmptyWithMutedBackground.vue"
import EmptyWithMutedBackgroundAlt from "~/registry/bases/vase/examples/empty/EmptyWithMutedBackgroundAlt.vue"
</script>

<template>
  <ExampleWrapper>
    <EmptyBasic />
    <EmptyWithMutedBackground />
    <EmptyWithBorder />
    <EmptyWithIcon />
    <EmptyWithMutedBackgroundAlt />
    <EmptyInCard />
  </ExampleWrapper>
</template>
