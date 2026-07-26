<script setup lang="ts">
import { ExampleWrapper } from "@/registry/bases/reka/components/example"
import CardDefault from "~/registry/bases/reka/examples/card/CardDefault.vue"
import CardFooterWithBorder from "~/registry/bases/reka/examples/card/CardFooterWithBorder.vue"
import CardFooterWithBorderSmall from "~/registry/bases/reka/examples/card/CardFooterWithBorderSmall.vue"
import CardHeaderWithBorder from "~/registry/bases/reka/examples/card/CardHeaderWithBorder.vue"
import CardHeaderWithBorderSmall from "~/registry/bases/reka/examples/card/CardHeaderWithBorderSmall.vue"
import CardLogin from "~/registry/bases/reka/examples/card/CardLogin.vue"
import CardMeetingNotes from "~/registry/bases/reka/examples/card/CardMeetingNotes.vue"
import CardSmall from "~/registry/bases/reka/examples/card/CardSmall.vue"
import CardWithImage from "~/registry/bases/reka/examples/card/CardWithImage.vue"
import CardWithImageSmall from "~/registry/bases/reka/examples/card/CardWithImageSmall.vue"
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
