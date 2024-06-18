<script setup lang="ts">
import { ref } from 'vue'
import DotsHorizontalIcon from '~icons/radix-icons/dots-horizontal'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/lib/registry/new-york/ui/alert-dialog'
import { Button } from '@/lib/registry/new-york/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/lib/registry/new-york/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/registry/new-york/ui/dropdown-menu'
import { Label } from '@/lib/registry/new-york/ui/label'
import { Switch } from '@/lib/registry/new-york/ui/switch'

// import { toast } from "@/lib/registry/new-york/ui/use-toast"

const open = ref(false)
const showDeleteDialog = ref(false)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="secondary">
        <span class="sr-only">Actions</span>
        <DotsHorizontalIcon class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @select="open = true">
        Content filter preferences
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        class="text-red-600"
        @select="showDeleteDialog = true"
      >
        Delete preset
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <Dialog v-model:open="open">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Content filter preferences</DialogTitle>
        <DialogDescription>
          The content filter flags text that may violate our content policy.
          It&apos;s powered by our moderation endpoint which is free to use
          to moderate your OpenAI API traffic. Learn more.
        </DialogDescription>
      </DialogHeader>
      <div class="py-6">
        <h4 class="text-sm text-muted-foreground">
          Playground Warnings
        </h4>
        <div class="flex items-start justify-between space-x-4 pt-3">
          <Switch id="show" name="show" :default-checked="true" />
          <Label class="grid gap-1 font-normal" for="show">
            <span class="font-semibold">
              Show a warning when content is flagged
            </span>
            <span class="text-sm text-muted-foreground">
              A warning will be shown when sexual, hateful, violent or
              self-harm content is detected.
            </span>
          </Label>
        </div>
      </div>
      <DialogFooter>
        <Button variant="secondary" @click="open = false">
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  <AlertDialog v-model:open="showDeleteDialog">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This preset will no longer be
          accessible by you or others you&apos;ve shared it with.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button
          variant="destructive"
          @click="showDeleteDialog = false"
        >
          Delete
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
