<script setup lang="ts">
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"

const envVars = [
  { key: "DATABASE_URL", masked: true },
  { key: "NEXT_PUBLIC_API", masked: false },
  { key: "STRIPE_SECRET", masked: true },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Environment Variables</CardTitle>
      <CardDescription>Production · 8 variables</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-2">
      <div
        v-for="env in envVars"
        :key="env.key"
        class="flex items-center gap-2 rounded-md px-2.5 py-2 font-mono text-xs ring ring-border"
      >
        <span class="font-medium">{{ env.key }}</span>
        <span class="ml-auto text-muted-foreground">
          {{ env.masked ? "••••••••" : "https://api.example.com" }}
        </span>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline">
        Edit
      </Button>
      <Button class="ml-auto">
        Deploy
      </Button>
    </CardFooter>
  </Card>
</template>
