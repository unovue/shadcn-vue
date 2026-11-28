<script setup lang="ts">
import { cn } from "cn"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button, buttonVariants } from "@/registry/bases/vase/ui/button"
import { ButtonGroup } from "@/registry/bases/vase/ui/button-group"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="With Like">
    <ButtonGroup>
      <Button variant="outline">
        <IconPlaceholder
          lucide="HeartIcon"
          tabler="IconHeart"
          hugeicons="FavouriteIcon"
          phosphor="HeartIcon"
          remixicon="RiHeartLine"
          data-icon="inline-start"
        />
        Like
      </Button>
      <span
        data-slot="button"
        data-variant="outline"
        data-size="icon"
        :class="cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'w-12')"
      >1.2K</span>
    </ButtonGroup>
  </Example>
</template>
