<script setup lang="ts">
import { Example, ExampleWrapper } from "@/registry/bases/vase/components/example"
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

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const
</script>

<template>
  <ExampleWrapper>
    <Example title="With Form">
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
    </Example>

    <Example title="No Close Button">
      <Sheet>
        <SheetTrigger>
          <template #element="{ props, elementRef }">
            <Button v-bind="props" :ref="elementRef" variant="outline">
              No Close Button
            </Button>
          </template>
        </SheetTrigger>
        <SheetContent :show-close-button="false">
          <SheetHeader>
            <SheetTitle>No Close Button</SheetTitle>
            <SheetDescription>
              This sheet doesn't have a close button in the top-right corner. You can only close it using the button below.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </Example>

    <Example title="Sides">
      <div class="flex flex-wrap gap-2">
        <Sheet v-for="side in SHEET_SIDES" :key="side">
          <SheetTrigger>
            <template #element="{ props, elementRef }">
              <Button v-bind="props" :ref="elementRef" variant="outline" class="capitalize">
                {{ side }}
              </Button>
            </template>
          </SheetTrigger>
          <SheetContent
            :side="side"
            class="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
          >
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div class="no-scrollbar style-vega:px-4 style-maia:px-6 style-mira:px-6 style-lyra:px-4 style-nova:px-4 overflow-y-auto">
              <p
                v-for="index in 10"
                :key="index"
                class="style-lyra:mb-2 style-lyra:leading-relaxed mb-4 leading-normal"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit
                esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </div>
            <SheetFooter>
              <Button type="submit">
                Save changes
              </Button>
              <SheetClose>
                <template #element="{ props, elementRef }">
                  <Button v-bind="props" :ref="elementRef" variant="outline">
                    Cancel
                  </Button>
                </template>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </Example>
  </ExampleWrapper>
</template>
