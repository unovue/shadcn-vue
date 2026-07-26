<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import EmptyBasic from "~/registry/bases/reka/examples/empty/EmptyBasic.vue"
import EmptyInCard from "~/registry/bases/reka/examples/empty/EmptyInCard.vue"
import EmptyWithBorder from "~/registry/bases/reka/examples/empty/EmptyWithBorder.vue"
import EmptyWithIcon from "~/registry/bases/reka/examples/empty/EmptyWithIcon.vue"
import EmptyWithMutedBackground from "~/registry/bases/reka/examples/empty/EmptyWithMutedBackground.vue"
import EmptyWithMutedBackgroundAlt from "~/registry/bases/reka/examples/empty/EmptyWithMutedBackgroundAlt.vue"
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
