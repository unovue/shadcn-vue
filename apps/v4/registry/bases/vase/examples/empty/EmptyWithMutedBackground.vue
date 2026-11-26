<script setup lang="ts">
import { cn } from "cn"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/vase/components/example"
import { Button, buttonVariants } from "@/registry/bases/vase/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/registry/bases/vase/ui/empty"
</script>

<template>
  <Example title="With Muted Background">
    <Empty class="bg-muted">
      <EmptyHeader>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>
          No results found for your search. Try adjusting your search terms.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button>Try again</Button>
        <a href="#" :class="cn(buttonVariants({ variant: 'link' }), 'text-muted-foreground')">
          Learn more
          <IconPlaceholder
            lucide="ArrowUpRightIcon"
            tabler="IconArrowUpRight"
            hugeicons="ArrowUpRight01Icon"
            phosphor="ArrowUpRightIcon"
            remixicon="RiArrowRightUpLine"
          />
        </a>
      </EmptyContent>
    </Empty>
  </Example>
</template>
