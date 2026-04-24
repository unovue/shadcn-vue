<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Badge } from "@/registry/bases/reka/ui/badge"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
</script>

<template>
  <Card class="relative w-full max-w-md overflow-hidden pt-0">
    <div class="absolute inset-0 z-30 aspect-video bg-primary opacity-50 mix-blend-color" />
    <img
      src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Photo by mymind on Unsplash"
      title="Photo by mymind on Unsplash"
      class="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
    >
    <CardHeader>
      <CardTitle>Observability Plus is replacing Monitoring</CardTitle>
      <CardDescription>
        Switch to the improved way to explore your data, with natural
        language. Monitoring will no longer be available on the Pro plan in
        November, 2025
      </CardDescription>
    </CardHeader>
    <CardFooter>
      <Button>
        Create Query
        <IconPlaceholder
          lucide="PlusIcon"
          tabler="IconPlus"
          hugeicons="PlusSignIcon"
          phosphor="PlusIcon"
          remixicon="RiAddLine"
          data-icon="inline-end"
        />
      </Button>
      <Badge variant="secondary" class="ml-auto">
        Warning
      </Badge>
    </CardFooter>
  </Card>
</template>
