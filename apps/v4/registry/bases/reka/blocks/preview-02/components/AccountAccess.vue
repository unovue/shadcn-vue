<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/registry/bases/reka/ui/field"
import { Input } from "@/registry/bases/reka/ui/input"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/registry/bases/reka/ui/item"
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
            default-value="artist@studio.inc"
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
            default-value="password123"
          />
        </Field>
      </FieldGroup>
    </CardContent>
    <CardFooter class="flex-col gap-4">
      <Button class="w-full">
        <IconPlaceholder
          lucide="LockKeyholeIcon"
          tabler="IconLock"
          hugeicons="SquareLock02Icon"
          phosphor="LockKeyIcon"
          remixicon="RiLockLine"
        />
        Update Security
      </Button>
      <Item variant="muted" as="a" href="#">
        <ItemMedia variant="icon">
          <IconPlaceholder
            lucide="AlertCircleIcon"
            tabler="IconAlertCircle"
            hugeicons="AlertCircleIcon"
            phosphor="WarningCircleIcon"
            remixicon="RiErrorWarningLine"
            class="text-destructive"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Danger Zone</ItemTitle>
          <ItemDescription class="line-clamp-1">
            Archive account and remove catalog
          </ItemDescription>
        </ItemContent>
        <IconPlaceholder
          lucide="ArrowRightIcon"
          tabler="IconArrowRight"
          hugeicons="ArrowRight01Icon"
          phosphor="ArrowRightIcon"
          remixicon="RiArrowRightLine"
          class="size-4"
        />
      </Item>
    </CardFooter>
  </Card>
</template>
