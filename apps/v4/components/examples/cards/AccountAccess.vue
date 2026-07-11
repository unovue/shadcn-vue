<script setup lang="ts">
import {
  AlertCircleIcon,
  ArrowRight01Icon,
  SquareLock02Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'

import { Button } from '@/styles/reka-rhea/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/styles/reka-rhea/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/styles/reka-rhea/ui/field'
import { Input } from '@/styles/reka-rhea/ui/input'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/styles/reka-rhea/ui/item'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Account Access</CardTitle>
      <CardDescription>
        Update your credentials or re-authenticate.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field>
          <FieldLabel for="email-address">
            Email Address
          </FieldLabel>
          <Input
            id="email-address"
            type="email"
            placeholder="artist@studio.inc"
          />
        </Field>
        <Field>
          <div class="flex items-center justify-between">
            <FieldLabel for="current-password">
              Current Password
            </FieldLabel>
            <a
              href="#"
              class="text-xs font-medium tracking-wider text-muted-foreground uppercase hover:text-foreground"
            >
              Forgot?
            </a>
          </div>
          <Input
            id="current-password"
            type="password"
            placeholder="••••••••••••••••••••••••"
          />
        </Field>
      </FieldGroup>
    </CardContent>
    <CardFooter class="flex-col gap-4">
      <Button class="w-full">
        <HugeiconsIcon :icon="SquareLock02Icon" :stroke-width="2" />
        Update Security
      </Button>
      <Item variant="muted" as-child>
        <a href="#">
          <ItemMedia variant="icon">
            <HugeiconsIcon
              :icon="AlertCircleIcon"
              class="text-destructive"
              :stroke-width="2"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Danger Zone</ItemTitle>
            <ItemDescription class="line-clamp-1">
              Archive account and remove catalog
            </ItemDescription>
          </ItemContent>
          <HugeiconsIcon
            :icon="ArrowRight01Icon"
            class="size-4"
            :stroke-width="2"
          />
        </a>
      </Item>
    </CardFooter>
  </Card>
</template>
