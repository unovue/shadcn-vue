<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/registry/default/ui/dialog'
import { Input } from '@/lib/registry/default/ui/input'
import { Label } from '@/lib/registry/default/ui/label'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="secondary">
        Save
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[475px]">
      <DialogHeader>
        <DialogTitle>Save preset</DialogTitle>
        <DialogDescription>
          This will save the current playground state as a preset which you
          can access later or share with others.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input id="name" auto-focus />
        </div>
        <div class="grid gap-2">
          <Label for="description">Description</Label>
          <Input id="description" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
