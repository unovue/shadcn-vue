<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/registry/bases/reka/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/bases/reka/ui/input-group"
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Social Links</CardTitle>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field>
          <FieldLabel for="spotify-url">
            Spotify Artist URL
          </FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <IconPlaceholder
                lucide="CirclePlusIcon"
                tabler="IconCirclePlus"
                hugeicons="PlusSignCircleIcon"
                phosphor="PlusCircleIcon"
                remixicon="RiAddCircleLine"
              />
            </InputGroupAddon>
            <InputGroupInput
              id="spotify-url"
              default-value="spotify.com/artist/3j...2k"
            />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="instagram-handle">
            Instagram Handle
          </FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <IconPlaceholder
                lucide="CameraIcon"
                tabler="IconCamera"
                hugeicons="Camera01Icon"
                phosphor="CameraIcon"
                remixicon="RiCameraLine"
              />
            </InputGroupAddon>
            <InputGroupInput
              id="instagram-handle"
              default-value="@julianduryea_music"
            />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="soundcloud-url">
            SoundCloud URL
          </FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <IconPlaceholder
                lucide="CloudIcon"
                tabler="IconCloud"
                hugeicons="CloudUploadIcon"
                phosphor="CloudIcon"
                remixicon="RiCloudLine"
              />
            </InputGroupAddon>
            <InputGroupInput
              id="soundcloud-url"
              placeholder="soundcloud.com/username"
            />
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel for="website-url">
            Website
          </FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <IconPlaceholder
                lucide="GlobeIcon"
                tabler="IconWorld"
                hugeicons="Globe02Icon"
                phosphor="GlobeIcon"
                remixicon="RiGlobalLine"
              />
            </InputGroupAddon>
            <InputGroupInput
              id="website-url"
              placeholder="https://yoursite.com"
            />
          </InputGroup>
        </Field>
      </FieldGroup>
    </CardContent>
    <CardFooter class="justify-end gap-2">
      <Button variant="secondary">
        Discard
      </Button>
      <Button>Save Changes</Button>
    </CardFooter>
  </Card>
</template>
