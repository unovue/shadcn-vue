<script setup lang="ts">
import { Button } from "@/registry/default/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card"
import { SidebarInput } from "@/registry/default/ui/sidebar"
</script>

<template>
  <Card class="shadow-none">
    <form>
      <CardHeader class="p-4 pb-0">
        <CardTitle class="text-sm">
          Subscribe to our newsletter
        </CardTitle>
        <CardDescription>
          Opt-in to receive updates and news about the sidebar.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-2.5 p-4">
        <SidebarInput type="email" placeholder="Email" />
        <Button
          class="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none"
          size="sm"
        >
          Subscribe
        </Button>
      </CardContent>
    </form>
  </Card>
</template>
