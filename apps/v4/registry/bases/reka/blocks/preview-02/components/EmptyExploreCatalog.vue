<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
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
</script>

<template>
  <Card>
    <CardContent>
      <Empty class="p-4">
        <EmptyMedia variant="icon">
          <IconPlaceholder
            lucide="AudioLinesIcon"
            tabler="IconPlayerRecordFilled"
            hugeicons="AudioWave01Icon"
            phosphor="RecordIcon"
            remixicon="RiRecordCircleLine"
          />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>Explore Catalog</EmptyTitle>
          <EmptyDescription>
            Check your ISRC codes, metadata, and visual assets before going
            live.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>View Catalog</Button>
        </EmptyContent>
      </Empty>
    </CardContent>
  </Card>
</template>
