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
import { Spinner } from "@/registry/bases/vase/ui/spinner"
</script>

<template>
  <Example title="In Empty State" container-class="lg:col-span-full">
    <Empty class="min-h-[300px]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
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
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </a>
      </EmptyContent>
    </Empty>
  </Example>
</template>
