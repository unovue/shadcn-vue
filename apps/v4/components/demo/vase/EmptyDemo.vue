<script setup lang="ts">
import { ArrowUpRightIcon, FolderCode } from '@lucide/vue'
import { cn } from 'cn'
import { Button, buttonVariants } from '@/styles/vase-vega/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/styles/vase-vega/ui/empty'
</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderCode />
      </EmptyMedia>
      <EmptyTitle>No Projects Yet</EmptyTitle>
      <EmptyDescription>
        You haven't created any projects yet. Get started by creating your first
        project.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <div class="flex gap-2">
        <Button>Create Project</Button>
        <Button variant="outline">
          Import Project
        </Button>
      </div>
    </EmptyContent>
    <a href="#" :class="cn(buttonVariants({ variant: 'link', size: 'sm' }), 'text-muted-foreground')">
      Learn More <ArrowUpRightIcon />
    </a>
  </Empty>
</template>
