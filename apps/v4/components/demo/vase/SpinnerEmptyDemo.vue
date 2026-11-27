<script setup lang="ts">
import { Button } from '@/styles/vase-vega/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/styles/vase-vega/ui/empty'
import { Spinner } from '@/styles/vase-vega/ui/spinner'
</script>

<template>
  <Empty class="w-full">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <Spinner />
      </EmptyMedia>
      <EmptyTitle>Processing your request</EmptyTitle>
      <EmptyDescription>
        Please wait while we process your request. Do not refresh the page.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <Button variant="outline" size="sm">
        Cancel
      </Button>
    </EmptyContent>
  </Empty>
</template>
