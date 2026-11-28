<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/vase/components/example"
import CardDefault from "~/registry/bases/vase/examples/card/CardDefault.vue"
import CardFooterWithBorder from "~/registry/bases/vase/examples/card/CardFooterWithBorder.vue"
import CardFooterWithBorderSmall from "~/registry/bases/vase/examples/card/CardFooterWithBorderSmall.vue"
import CardHeaderWithBorder from "~/registry/bases/vase/examples/card/CardHeaderWithBorder.vue"
import CardHeaderWithBorderSmall from "~/registry/bases/vase/examples/card/CardHeaderWithBorderSmall.vue"
import CardLogin from "~/registry/bases/vase/examples/card/CardLogin.vue"
import CardMeetingNotes from "~/registry/bases/vase/examples/card/CardMeetingNotes.vue"
import CardSmall from "~/registry/bases/vase/examples/card/CardSmall.vue"
import CardWithImage from "~/registry/bases/vase/examples/card/CardWithImage.vue"
import CardWithImageSmall from "~/registry/bases/vase/examples/card/CardWithImageSmall.vue"
</script>

<template>
  <ExampleWrapper>
    <CardDefault />
    <CardSmall />
    <CardHeaderWithBorder />
    <CardFooterWithBorder />
    <CardHeaderWithBorderSmall />
    <CardFooterWithBorderSmall />
    <CardWithImage />
    <CardWithImageSmall />
    <CardLogin />
    <CardMeetingNotes />
  </ExampleWrapper>
</template>
