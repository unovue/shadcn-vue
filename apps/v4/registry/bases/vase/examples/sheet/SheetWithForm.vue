<script setup lang="ts">
import { Button } from "@/registry/bases/vase/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/registry/bases/vase/ui/field"
import { Input } from "@/registry/bases/vase/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/bases/vase/ui/sheet"
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
          Make changes to your profile here. Click save when you're
          done.
        </SheetDescription>
      </SheetHeader>
      <div class="style-vega:px-4 style-maia:px-6 style-mira:px-6 style-lyra:px-4 style-nova:px-4">
        <FieldGroup>
          <Field>
            <FieldLabel for="sheet-demo-name">
              Name
            </FieldLabel>
            <Input id="sheet-demo-name" default-value="Pedro Duarte" />
          </Field>
          <Field>
            <FieldLabel for="sheet-demo-username">
              Username
            </FieldLabel>
            <Input id="sheet-demo-username" default-value="@peduarte" />
          </Field>
        </FieldGroup>
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
