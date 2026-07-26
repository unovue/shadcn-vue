<script setup lang="ts">
import { Badge } from "@/registry/bases/reka/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import { Item, ItemContent } from "@/registry/bases/reka/ui/item"
import { Separator } from "@/registry/bases/reka/ui/separator"
</script>

<template>
  <Card>
    <CardHeader>
      <CardDescription>Claimable Balance</CardDescription>
      <CardTitle class="text-5xl tabular-nums">
        $0.00
      </CardTitle>
      <Badge variant="outline">
        <span class="size-2 rounded-full bg-yellow-500" />
        Pending Setup
      </Badge>
    </CardHeader>
    <CardContent class="flex flex-1 flex-col justify-end">
      <Item variant="muted" class="flex-col items-stretch">
        <ItemContent class="gap-3">
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">
              Net Royalties
            </span>
            <span class="text-sm font-medium tabular-nums">$0.00</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">
              Processing Fee
            </span>
            <span class="text-sm font-medium tabular-nums">-$0.00</span>
          </div>
          <Separator />
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">
              Total Ready to Claim
            </span>
            <span class="text-sm font-semibold tabular-nums">
              $0.00 USD
            </span>
          </div>
        </ItemContent>
      </Item>
    </CardContent>
    <CardFooter>
      <CardDescription>
        Once your bank is connected, balances over $10.00 are automatically
        eligible for monthly distribution on the 15th of each month.
      </CardDescription>
    </CardFooter>
  </Card>
</template>
