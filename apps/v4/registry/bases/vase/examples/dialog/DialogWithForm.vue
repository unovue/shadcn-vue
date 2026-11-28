<script setup lang="ts">
import { Button } from "@/registry/bases/vase/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/bases/vase/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/registry/bases/vase/ui/field"
import { Input } from "@/registry/bases/vase/ui/input"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="With Form" class="items-center justify-center">
    <Dialog>
      <form>
        <DialogTrigger>
          <template #element="{ props, elementRef }">
            <Button v-bind="props" :ref="elementRef" variant="outline">
              Edit Profile
            </Button>
          </template>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're
              done. Your profile will be updated immediately.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel for="name-1">
                Name
              </FieldLabel>
              <Input id="name-1" name="name" default-value="Pedro Duarte" />
            </Field>
            <Field>
              <FieldLabel for="username-1">
                Username
              </FieldLabel>
              <Input
                id="username-1"
                name="username"
                default-value="@peduarte"
              />
            </Field>
          </FieldGroup>
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
  </Example>
</template>
