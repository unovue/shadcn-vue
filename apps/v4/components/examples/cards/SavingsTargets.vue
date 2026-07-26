<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/styles/reka-rhea/ui/card'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
} from '@/styles/reka-rhea/ui/item'
import { Progress } from '@/styles/reka-rhea/ui/progress'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Savings Targets</CardTitle>
      <CardDescription>
        Active milestones for 2024 across your portfolio. Monitor how close
        you are to each savings goal.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <ItemGroup class="gap-3">
        <Item
          role="listitem"
          variant="muted"
          class="flex-col items-stretch"
        >
          <ItemContent class="gap-3">
            <ItemDescription class="cn-font-heading text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Retirement
            </ItemDescription>
            <span class="text-3xl font-semibold tabular-nums">
              $420,000
            </span>
            <Progress :model-value="65" aria-label="Retirement savings progress" />
          </ItemContent>
          <ItemFooter>
            <span class="text-sm text-muted-foreground">
              65% achieved
            </span>
            <span class="text-sm font-medium tabular-nums">$273,000</span>
          </ItemFooter>
        </Item>
        <Item
          role="listitem"
          variant="muted"
          class="flex-col items-stretch"
        >
          <ItemContent class="gap-3">
            <ItemDescription class="cn-font-heading text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Real Estate
            </ItemDescription>
            <span class="text-3xl font-semibold tabular-nums">
              $85,000
            </span>
            <Progress :model-value="32" aria-label="Real estate savings progress" />
          </ItemContent>
          <ItemFooter>
            <span class="text-sm text-muted-foreground">
              32% achieved
            </span>
            <span class="text-sm font-medium tabular-nums">$27,200</span>
          </ItemFooter>
        </Item>
      </ItemGroup>
    </CardContent>
    <CardFooter>
      <CardDescription class="text-center">
        You have not met your targets for this year.
      </CardDescription>
    </CardFooter>
  </Card>
</template>
