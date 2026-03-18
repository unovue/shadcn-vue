<script setup lang="ts">
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/registry/bases/reka/ui/card"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="Footer with Border">
    <Card class="mx-auto w-full max-w-sm">
      <CardContent>
        <p>
          The footer has a border-t class applied, creating a visual
          separation between the content and footer sections.
        </p>
      </CardContent>
      <CardFooter class="border-t">
        <Button variant="outline" class="w-full">
          Footer with Border
        </Button>
      </CardFooter>
    </Card>
  </Example>
</template>
