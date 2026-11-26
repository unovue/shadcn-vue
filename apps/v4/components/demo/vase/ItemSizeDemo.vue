<script setup lang="ts">
import { BadgeCheckIcon, ChevronRightIcon } from '@lucide/vue'
import { Button } from '@/styles/vase-vega/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/styles/vase-vega/ui/item'
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>Basic Item</ItemTitle>
        <ItemDescription>
          A simple item with title and description.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Action
        </Button>
      </ItemActions>
    </Item>
    <Item variant="outline" size="sm" as="a" href="#">
      <ItemMedia>
        <BadgeCheckIcon class="size-5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Your profile has been verified.</ItemTitle>
      </ItemContent>
      <ItemActions>
        <ChevronRightIcon class="size-4" />
      </ItemActions>
    </Item>
  </div>
</template>
