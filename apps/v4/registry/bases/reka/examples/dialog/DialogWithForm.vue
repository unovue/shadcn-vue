<script setup lang="ts">
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/bases/reka/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/registry/bases/reka/ui/field"
import { Input } from "@/registry/bases/reka/ui/input"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="With Form" class="items-center justify-center">
    <Dialog>
      <form>
        <DialogTrigger :as-child="true">
          <Button variant="outline">
            Edit Profile
          </Button>
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
              <FieldLabel html-for="name-1">
                Name
              </FieldLabel>
              <Input id="name-1" name="name" default-value="Pedro Duarte" />
            </Field>
            <Field>
              <FieldLabel html-for="username-1">
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
            <DialogClose :as-child="true">
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
  </Example>
</template>
