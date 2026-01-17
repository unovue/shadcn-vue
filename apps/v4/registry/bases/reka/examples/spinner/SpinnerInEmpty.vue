<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Button } from "@/registry/bases/reka/ui/button"
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
          <Button :as-child="true">
            <a href="#">Create project</a>
          </Button>
          <Button variant="outline">
            Import project
          </Button>
        </div>
        <Button variant="link" :as-child="true" class="text-muted-foreground">
          <a href="#">
            Learn more
            <IconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            />
          </a>
        </Button>
      </EmptyContent>
    </Empty>
  </Example>
</template>
