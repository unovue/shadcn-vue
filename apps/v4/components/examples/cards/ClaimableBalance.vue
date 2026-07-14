<script setup lang="ts">
import { Badge } from '@/styles/reka-rhea/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/styles/reka-rhea/ui/card'
import { Item, ItemContent } from '@/styles/reka-rhea/ui/item'
import { Separator } from '@/styles/reka-rhea/ui/separator'

const netRoyalties = 1248.75
const processingFee = 37.46
const totalClaimable = netRoyalties - processingFee

function formatCurrency(amount: number) {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardDescription>Claimable Balance</CardDescription>
      <CardTitle class="text-4xl tabular-nums">
        ${{ formatCurrency(totalClaimable) }}
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
            <span class="text-sm font-medium tabular-nums">
              ${{ formatCurrency(netRoyalties) }}
            </span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">
              Processing Fee
            </span>
            <span class="text-sm font-medium tabular-nums">
              -${{ formatCurrency(processingFee) }}
            </span>
          </div>
          <Separator />
          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">
              Total Ready to Claim
            </span>
            <span class="text-sm font-semibold tabular-nums">
              ${{ formatCurrency(totalClaimable) }} USD
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
