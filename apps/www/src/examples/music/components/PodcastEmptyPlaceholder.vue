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
  <div class="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
    <div class="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        class="h-10 w-10 text-muted-foreground"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="11" r="1" />
        <path d="M11 17a1 1 0 0 1 2 0c0 .5-.34 3-.5 4.5a.5.5 0 0 1-1 0c-.16-1.5-.5-4-.5-4.5ZM8 14a5 5 0 1 1 8 0" />
        <path d="M17 18.5a9 9 0 1 0-10 0" />
      </svg>

      <h3 class="mt-4 text-lg font-semibold">
        No episodes added
      </h3>
      <p class="mb-4 mt-2 text-sm text-muted-foreground">
        You have not added any podcasts. Add one below.
      </p>
      <Dialog>
        <DialogTrigger>
          <Button size="sm" class="relative">
            Add Podcast
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Podcast</DialogTitle>
            <DialogDescription>
              Copy and paste the podcast feed URL to import.
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4">
            <div class="grid gap-2">
              <Label for="url">Podcast URL</Label>
              <Input id="url" placeholder="https://example.com/feed.xml" />
            </div>
          </div>
          <DialogFooter>
            <Button>Import Podcast</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  </div>
</template>
