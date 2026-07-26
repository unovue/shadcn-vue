<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Alert, AlertDescription } from "@/registry/bases/reka/ui/alert"
import { Badge } from "@/registry/bases/reka/ui/badge"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/registry/bases/reka/ui/item"

const agentFeatures = [
  {
    id: "code-reviews",
    title: "Code reviews",
    description: "with full codebase context to catch",
    highlight: "hard-to-find",
    suffix: "bugs.",
  },
  {
    id: "code-suggestions",
    title: "Code suggestions",
    description: "validated in sandboxes before you merge.",
  },
  {
    id: "root-cause",
    title: "Root-cause analysis",
    description: "for production issues with deployment context.",
    badge: true,
  },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Ship faster &amp; safer with Vercel Agent</CardTitle>
      <CardDescription>
        Your use is subject to Vercel's
        <a href="#">Public Beta Agreement</a> and
        <a href="#">AI Product Terms</a>.
      </CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      <ItemGroup class="gap-0">
        <Item size="xs" class="px-0">
          <ItemMedia variant="icon" class="self-start">
            <IconPlaceholder
              lucide="CheckCircle2Icon"
              tabler="IconCircleCheckFilled"
              hugeicons="CheckmarkCircle02Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleLine"
              class="size-5 fill-primary text-primary-foreground"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle class="inline leading-relaxed font-normal text-muted-foreground *:[strong]:font-medium *:[strong]:text-foreground">
              <strong>Code reviews</strong> with full codebase context to catch
              <strong>hard-to-find</strong> bugs.
            </ItemTitle>
          </ItemContent>
        </Item>
        <Item size="xs" class="px-0">
          <ItemMedia variant="icon" class="self-start">
            <IconPlaceholder
              lucide="CheckCircle2Icon"
              tabler="IconCircleCheckFilled"
              hugeicons="CheckmarkCircle02Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleLine"
              class="size-5 fill-primary text-primary-foreground"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle class="inline leading-relaxed font-normal text-muted-foreground *:[strong]:font-medium *:[strong]:text-foreground">
              <strong>Code suggestions</strong> validated in sandboxes before you merge.
            </ItemTitle>
          </ItemContent>
        </Item>
        <Item size="xs" class="px-0">
          <ItemMedia variant="icon" class="self-start">
            <IconPlaceholder
              lucide="CheckCircle2Icon"
              tabler="IconCircleCheckFilled"
              hugeicons="CheckmarkCircle02Icon"
              phosphor="CheckCircleIcon"
              remixicon="RiCheckboxCircleLine"
              class="size-5 fill-primary text-primary-foreground"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle class="inline leading-relaxed font-normal text-muted-foreground *:[strong]:font-medium *:[strong]:text-foreground">
              <strong>Root-cause analysis</strong> for production issues with deployment context.
              <Badge variant="secondary" class="bg-chart-1 text-chart-5">
                Requires Observability Plus
              </Badge>
            </ItemTitle>
          </ItemContent>
        </Item>
      </ItemGroup>
      <Alert>
        <AlertDescription>
          Pro teams get $100 in Vercel Agent trial credit for 2 weeks after activation.
        </AlertDescription>
      </Alert>
    </CardContent>
    <CardFooter class="justify-end gap-2">
      <Button variant="outline">
        Cancel
      </Button>
      <Button>Enable with $100 credits</Button>
    </CardFooter>
  </Card>
</template>
