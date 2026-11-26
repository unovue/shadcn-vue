<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import { Button } from "@/registry/bases/vase/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/bases/vase/ui/hover-card"

const HOVER_CARD_SIDES = ["top", "right", "bottom", "left"] as const
</script>

<template>
  <Example title="Sides">
    <div class="flex flex-wrap items-center justify-center gap-4">
      <HoverCard
        v-for="side in HOVER_CARD_SIDES"
        :key="side"
      >
        <HoverCardTrigger :delay="100" :close-delay="100">
          <template #element="{ props, elementRef }">
            <Button v-bind="props" :ref="elementRef" variant="outline" class="capitalize">
              {{ side }}
            </Button>
          </template>
        </HoverCardTrigger>
        <HoverCardContent :side="side" class="w-64">
          <div class="style-lyra:gap-1 style-nova:gap-1.5 style-vega:gap-2 style-maia:gap-2 style-mira:gap-1 flex flex-col">
            <h4 class="font-medium">
              Hover Card
            </h4>
            <p>
              This hover card appears on the {{ side }} side of the trigger.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  </Example>
</template>
