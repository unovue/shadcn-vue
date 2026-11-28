<script setup lang="ts">
import { ref } from "vue"
import { toast } from "vue-sonner"
import { Example } from "@/registry/bases/vase/components/example"
import { Button } from "@/registry/bases/vase/ui/button"
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxViewport,
} from "@/registry/bases/vase/ui/combobox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/bases/vase/ui/dialog"
import {
  Field,
  FieldLabel,
} from "@/registry/bases/vase/ui/field"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
]

const open = ref(false)
</script>

<template>
  <Example title="Combobox in Dialog">
    <Dialog v-model:open="open" :modal="false">
      <DialogTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline">
            Open Dialog
          </Button>
        </template>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Framework</DialogTitle>
          <DialogDescription>
            Choose your preferred framework from the list below.
          </DialogDescription>
        </DialogHeader>
        <Field>
          <FieldLabel for="framework-dialog" class="sr-only">
            Framework
          </FieldLabel>
          <Combobox :items="frameworks">
            <ComboboxInput
              id="framework-dialog"
              placeholder="Select a framework"
            />
            <ComboboxList>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxViewport>
                <template #item="{ item }">
                  <ComboboxItem :value="item">
                    {{ item }}
                  </ComboboxItem>
                </template>
              </ComboboxViewport>
            </ComboboxList>
          </Combobox>
        </Field>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            @click="open = false"
          >
            Cancel
          </Button>
          <Button
            type="button"
            @click="() => {
              toast('Framework selected.')
              open = false
            }"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Example>
</template>
