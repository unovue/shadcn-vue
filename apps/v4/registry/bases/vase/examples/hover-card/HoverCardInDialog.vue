<script setup lang="ts">
import { Example } from "@/registry/bases/vase/components/example"
import { Button } from "@/registry/bases/vase/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/bases/vase/ui/dialog"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/registry/bases/vase/ui/hover-card"
</script>

<template>
  <Example title="In Dialog">
    <Dialog>
      <DialogTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline">
            Open Dialog
          </Button>
        </template>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hover Card Example</DialogTitle>
          <DialogDescription>
            Hover over the button below to see the hover card.
          </DialogDescription>
        </DialogHeader>
        <HoverCard>
          <HoverCardTrigger :delay="100" :close-delay="100">
            <template #element="{ props, elementRef }">
              <Button v-bind="props" :ref="elementRef" variant="outline" class="w-fit">
                Hover me
              </Button>
            </template>
          </HoverCardTrigger>
          <HoverCardContent class="w-64">
            <div class="style-lyra:gap-1 style-nova:gap-1.5 style-vega:gap-2 style-maia:gap-2 style-mira:gap-1 flex flex-col">
              <h4 class="font-medium">
                Hover Card
              </h4>
              <p>
                This hover card appears inside a dialog. Hover over the button
                to see it.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </DialogContent>
    </Dialog>
  </Example>
</template>
