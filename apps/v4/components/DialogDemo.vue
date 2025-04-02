<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/registry/new-york-v4/ui/dialog'
import { Input } from '@/registry/new-york-v4/ui/input'
import { Label } from '@/registry/new-york-v4/ui/label'
</script>

<template>
  <div class="flex flex-col items-start gap-4 md:flex-row">
    <Dialog>
      <form>
        <DialogTrigger as-child>
          <Button variant="outline">
            Edit Profile
          </Button>
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
            <DialogClose as-child>
              <Button variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>

    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline">
          Scrollable Content
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>
            This is a dialog with scrollable content.
          </DialogDescription>
        </DialogHeader>
        <div class="-mx-6 max-h-[500px] overflow-y-auto px-6 text-sm">
          <h4 class="mb-4 text-lg leading-none font-medium">
            Lorem Ipsum
          </h4>
          <p v-for="index in 10" :key="index" class="mb-4 leading-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </DialogContent>
    </Dialog>

    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline">
          Sticky Footer
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Scrollable Content</DialogTitle>
          <DialogDescription>
            This is a dialog with scrollable content.
          </DialogDescription>
        </DialogHeader>
        <div class="-mx-6 max-h-[500px] overflow-y-auto px-6 text-sm">
          <h4 class="mb-4 text-lg leading-none font-medium">
            Lorem Ipsum
          </h4>
          <p v-for="index in 10" :key="index" class="mb-4 leading-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
