<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Badge } from "@/registry/bases/reka/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Front Door</CardTitle>
      <CardDescription>Smart Lock Pro</CardDescription>
      <CardAction>
        <div class="flex items-center gap-1.5 text-sm text-muted-foreground">
          Locked
          <IconPlaceholder
            lucide="LockIcon"
            tabler="IconLock"
            hugeicons="SquareLock02Icon"
            phosphor="LockKeyIcon"
            remixicon="RiLockLine"
            class="size-4"
          />
        </div>
      </CardAction>
    </CardHeader>
    <CardContent>
      <div class="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-muted bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)]">
        <Badge variant="destructive" class="absolute top-2 right-2">
          Live
        </Badge>
      </div>
    </CardContent>
  </Card>
</template>
