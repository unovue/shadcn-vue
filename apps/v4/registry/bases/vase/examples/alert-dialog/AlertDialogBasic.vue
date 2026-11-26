<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/bases/vase/ui/alert-dialog"
import { Button } from "@/registry/bases/vase/ui/button"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="Basic" class="items-center">
    <AlertDialog>
      <AlertDialogTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline">
            Default
          </Button>
        </template>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </Example>
</template>
