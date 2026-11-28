<script setup lang="ts">
import { Button } from "@/registry/bases/vase/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/bases/vase/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/vase/ui/select"
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <template #element="{ props, elementRef }">
        <Button v-bind="props" :ref="elementRef" variant="outline">
          Open Dialog
        </Button>
      </template>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Select Example</DialogTitle>
        <DialogDescription>
          Use the select below to choose a fruit.
        </DialogDescription>
      </DialogHeader>
      <Select :items="{ apple: 'Apple', banana: 'Banana', blueberry: 'Blueberry', grapes: 'Grapes', pineapple: 'Pineapple' }">
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">
              Apple
            </SelectItem>
            <SelectItem value="banana">
              Banana
            </SelectItem>
            <SelectItem value="blueberry">
              Blueberry
            </SelectItem>
            <SelectItem value="grapes">
              Grapes
            </SelectItem>
            <SelectItem value="pineapple">
              Pineapple
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </DialogContent>
  </Dialog>
</template>
