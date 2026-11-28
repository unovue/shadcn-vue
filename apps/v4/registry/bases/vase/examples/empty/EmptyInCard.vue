<script setup lang="ts">
import { cn } from "cn"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/vase/components/example"
import { Button, buttonVariants } from "@/registry/bases/vase/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/bases/vase/ui/empty"
</script>

<template>
  <Example title="In Card">
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconPlaceholder
            lucide="FolderIcon"
            tabler="IconFolder"
            hugeicons="Folder01Icon"
            phosphor="FolderIcon"
            remixicon="RiFolderLine"
          />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          You haven't created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div class="flex gap-2">
          <a href="#" :class="buttonVariants()">Create project</a>
          <Button variant="outline">
            Import project
          </Button>
        </div>
        <a href="#" :class="cn(buttonVariants({ variant: 'link' }), 'text-muted-foreground')">
          Learn more
          <IconPlaceholder
            lucide="ArrowUpRightIcon"
            tabler="IconArrowUpRight"
            hugeicons="ArrowUpRight01Icon"
            phosphor="ArrowUpRightIcon"
            remixicon="RiArrowRightUpLine"
          />
        </a>
      </EmptyContent>
    </Empty>
  </Example>
</template>
