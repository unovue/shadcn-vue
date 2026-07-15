<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/registry/bases/reka/ui/card"
import { Item } from "@/registry/bases/reka/ui/item"
import { Label } from "@/registry/bases/reka/ui/label"
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
      <Button
        variant="secondary"
        class="w-full"
        as-child
      >
        <label for="cover-art" class="cursor-pointer">
          Upload Artwork
        </label>
      </Button>
      <CardDescription class="text-center text-xs">
        Minimum 3000 × 3000px
        <br>
        JPEG or PNG only
      </CardDescription>
    </CardFooter>
  </Card>
</template>
