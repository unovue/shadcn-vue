<script setup lang="ts">
import { Button } from '@/styles/vase-vega/ui/button'
import { Input } from '@/styles/vase-vega/ui/input'
import { Label } from '@/styles/vase-vega/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/styles/vase-vega/ui/sheet'
</script>

<template>
  <Sheet>
    <SheetTrigger>
      <template #element="{ props, elementRef }">
        <Button v-bind="props" :ref="elementRef" variant="outline">
          Open
        </Button>
      </template>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <div class="grid flex-1 auto-rows-min gap-6 px-4">
        <div class="grid gap-3">
          <Label for="sheet-demo-name">Name</Label>
          <Input id="sheet-demo-name" default-value="Pedro Duarte" />
        </div>
        <div class="grid gap-3">
          <Label for="sheet-demo-username">Username</Label>
          <Input id="sheet-demo-username" default-value="@peduarte" />
        </div>
      </div>
      <SheetFooter>
        <Button type="submit">
          Save changes
        </Button>
        <SheetClose>
          <template #element="{ props, elementRef }">
            <Button v-bind="props" :ref="elementRef" variant="outline">
              Close
            </Button>
          </template>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
