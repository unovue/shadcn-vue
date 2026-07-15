<script setup lang="ts">
import { Button } from '@/styles/reka-nova/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/styles/reka-nova/ui/empty'
import { Spinner } from '@/styles/reka-nova/ui/spinner'
</script>

<template>
  <Empty class="w-full border md:p-6">
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
