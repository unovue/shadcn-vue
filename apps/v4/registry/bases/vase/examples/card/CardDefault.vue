<script setup lang="ts">
import { Button } from "@/registry/bases/vase/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/vase/ui/card"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="Default Size">
    <Card size="default" class="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Default Card</CardTitle>
        <CardDescription>
          This card uses the default size variant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          The card component supports a size prop that defaults to
          "default" for standard spacing and sizing.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" class="w-full">
          Action
        </Button>
      </CardFooter>
    </Card>
  </Example>
</template>
