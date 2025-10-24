<script setup lang="ts">
import { BadgeCheckIcon, ChevronRightIcon } from 'lucide-vue-next'

import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/registry/new-york-v4/ui/item'
</script>

<template>
  <div class="flex w-full max-w-md flex-col gap-6">
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>Two-factor authentication</ItemTitle>
        <ItemDescription class="text-pretty xl:hidden 2xl:block">
          Verify via email or phone number.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm">
          Enable
        </Button>
      </ItemActions>
    </Item>
    <Item variant="outline" size="sm" as-child>
      <a href="#">
        <ItemMedia>
          <BadgeCheckIcon class="size-5" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Your profile has been verified.</ItemTitle>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon class="size-4" />
        </ItemActions>
      </a>
    </Item>
  </div>
</template>
