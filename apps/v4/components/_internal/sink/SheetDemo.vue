<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'
import { Input } from '@/registry/new-york-v4/ui/input'
import { Label } from '@/registry/new-york-v4/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/registry/new-york-v4/ui/sheet'

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const
</script>

<template>
  <div class="flex flex-col gap-6 md:flex-row">
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="outline">
          Open
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're
            done.
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
          <SheetClose as-child>
            <Button variant="outline">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>

    <div class="flex gap-2">
      <Sheet v-for="side in SHEET_SIDES" :key="side">
        <SheetTrigger as-child>
          <Button variant="outline" class="capitalize">
            {{ side }}
          </Button>
        </SheetTrigger>
        <SheetContent :side>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're
              done.
            </SheetDescription>
          </SheetHeader>
          <div class="overflow-y-auto px-4 text-sm">
            <h4 class="mb-4 text-lg leading-none font-medium">
              Lorem Ipsum
            </h4>
            <p v-for="index in 10" :key="index" class="mb-4 leading-normal">
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
            <SheetClose as-child>
              <Button variant="outline">
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</template>
