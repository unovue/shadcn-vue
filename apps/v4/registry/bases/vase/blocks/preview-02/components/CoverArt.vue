<script setup lang="ts">
import { cn } from "cn"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { buttonVariants } from "@/registry/bases/vase/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/registry/bases/vase/ui/card"
import { Item } from "@/registry/bases/vase/ui/item"
import { Label } from "@/registry/bases/vase/ui/label"
</script>

<template>
  <Card>
    <CardContent class="flex flex-col gap-3">
      <Label
        for="cover-art"
        class="text-center text-xs font-normal tracking-wider text-muted-foreground uppercase"
      >
        Cover Art
      </Label>
      <Item class="aspect-square" variant="outline">
        <label
          for="cover-art"
          class="flex size-full cursor-pointer items-center justify-center"
        >
          <IconPlaceholder
            lucide="ImageIcon"
            tabler="IconPhoto"
            hugeicons="Image01Icon"
            phosphor="ImageIcon"
            remixicon="RiImageLine"
            class="size-10 text-muted-foreground/50"
          />
        </label>
      </Item>
      <input
        id="cover-art"
        type="file"
        accept="image/jpeg,image/png"
        class="sr-only"
      >
    </CardContent>
    <CardFooter class="flex-col gap-2">
      <label
        for="cover-art"
        data-slot="button"
        data-variant="secondary"
        :class="cn(buttonVariants({ variant: 'secondary' }), 'w-full cursor-pointer')"
      >
        Upload Artwork
      </label>
      <CardDescription class="text-center text-xs">
        Minimum 3000 × 3000px
        <br>
        JPEG or PNG only
      </CardDescription>
    </CardFooter>
  </Card>
</template>
