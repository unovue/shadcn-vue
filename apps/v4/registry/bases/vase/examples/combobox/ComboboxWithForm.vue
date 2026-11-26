<script setup lang="ts">
import { toast } from "vue-sonner"
import { Example } from "@/registry/bases/vase/components/example"
import { Button } from "@/registry/bases/vase/ui/button"
import { Card, CardContent, CardFooter } from "@/registry/bases/vase/ui/card"
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxViewport,
} from "@/registry/bases/vase/ui/combobox"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/registry/bases/vase/ui/field"

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
]

function handleSubmit(event: Event) {
  event.preventDefault()
  const formData = new FormData(event.target as HTMLFormElement)
  const framework = formData.get("framework") as string
  toast(`You selected ${framework} as your framework.`)
}
</script>

<template>
  <Example title="Form with Combobox">
    <Card class="w-full max-w-sm" size="sm">
      <CardContent>
        <form
          id="form-with-combobox"
          class="w-full"
          @submit="handleSubmit"
        >
          <FieldGroup>
            <Field>
              <FieldLabel for="framework">
                Framework
              </FieldLabel>
              <Combobox :items="frameworks">
                <ComboboxInput
                  id="framework"
                  name="framework"
                  placeholder="Select a framework"
                  required
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
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="form-with-combobox">
          Submit
        </Button>
      </CardFooter>
    </Card>
  </Example>
</template>
