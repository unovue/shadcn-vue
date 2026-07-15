<script setup lang="ts">
import { Button } from "@/registry/bases/reka/ui/button"
import { Card, CardContent } from "@/registry/bases/reka/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/bases/reka/ui/empty"
import { Spinner } from "@/registry/bases/reka/ui/spinner"
</script>

<template>
  <Card>
    <CardContent class="p-0">
      <Empty class="p-4">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>Syncing your accounts</EmptyTitle>
          <EmptyDescription>
            We're pulling in your latest transactions. This usually takes
            a few seconds.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">
            Cancel
          </Button>
        </EmptyContent>
      </Empty>
    </CardContent>
  </Card>
</template>
