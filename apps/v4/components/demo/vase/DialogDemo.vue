<script setup lang="ts">
import { Button } from '@/styles/vase-vega/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/styles/vase-vega/ui/dialog'
import { Input } from '@/styles/vase-vega/ui/input'
import { Label } from '@/styles/vase-vega/ui/label'
</script>

<template>
  <Dialog>
    <form>
      <DialogTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline">
            Open Dialog
          </Button>
        </template>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4">
          <div class="grid gap-3">
            <Label for="name-1">Name</Label>
            <Input id="name-1" name="name" default-value="Pedro Duarte" />
          </div>
          <div class="grid gap-3">
            <Label for="username-1">Username</Label>
            <Input id="username-1" name="username" default-value="@peduarte" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <template #element="{ props, elementRef }">
              <Button v-bind="props" :ref="elementRef" variant="outline">
                Cancel
              </Button>
            </template>
          </DialogClose>
          <Button type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </form>
  </Dialog>
</template>
