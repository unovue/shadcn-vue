<script setup lang="ts">
import { Add01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'

import { Button } from '@/styles/reka-rhea/ui/button'
import { Card, CardContent } from '@/styles/reka-rhea/ui/card'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/styles/reka-rhea/ui/empty'
</script>

<template>
  <Card>
    <CardContent>
      <Empty class="p-4">
        <EmptyMedia variant="icon">
          <HugeiconsIcon :icon="Add01Icon" :stroke-width="2" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>Distribute Track</EmptyTitle>
          <EmptyDescription>
            Upload your first master to start reaching listeners on Spotify,
            Apple Music, and more.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create Release</Button>
        </EmptyContent>
      </Empty>
    </CardContent>
  </Card>
</template>
