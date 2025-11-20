<script setup lang="ts">
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import { SidebarInput } from "@/registry/new-york-v4/ui/sidebar"
</script>

<template>
  <Card class="gap-2 py-4 shadow-none">
    <CardHeader class="px-4">
      <CardTitle class="text-sm">
        Subscribe to our newsletter
      </CardTitle>
      <CardDescription>
        Opt-in to receive updates and news about the sidebar.
      </CardDescription>
    </CardHeader>
    <CardContent class="px-4">
      <form>
        <div class="grid gap-2.5">
          <SidebarInput type="email" placeholder="Email" />
          <Button
            class="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none"
            size="sm"
          >
            Subscribe
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
