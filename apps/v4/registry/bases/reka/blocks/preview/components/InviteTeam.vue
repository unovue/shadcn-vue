<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import { Field, FieldLabel } from "@/registry/bases/reka/ui/field"
import { Input } from "@/registry/bases/reka/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/bases/reka/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/reka/ui/select"
import { Separator } from "@/registry/bases/reka/ui/separator"

const invites = [
  { email: "alex@example.com", role: "editor" },
  { email: "sam@example.com", role: "viewer" },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Invite Team</CardTitle>
      <CardDescription>Add members to your workspace</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      <div class="flex flex-col gap-3">
        <div
          v-for="invite in invites"
          :key="invite.email"
          class="flex items-center gap-2"
        >
          <Input :model-value="invite.email" class="flex-1" />
          <Select
            :default-value="invite.role"
          >
            <SelectTrigger class="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectItem value="admin">
                  Admin
                </SelectItem>
                <SelectItem value="editor">
                  Editor
                </SelectItem>
                <SelectItem value="viewer">
                  Viewer
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button variant="outline">
        <IconPlaceholder
          lucide="PlusIcon"
          tabler="IconPlus"
          hugeicons="PlusSignIcon"
          phosphor="PlusIcon"
          remixicon="RiAddLine"
          data-icon="inline-start"
        />
        Add another
      </Button>
      <Separator />
      <Field>
        <FieldLabel for="invite-link">
          Or share invite link
        </FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="invite-link"
            model-value="https://app.co/invite/x8f2k"
            readonly
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton size="icon-xs" aria-label="Copy link">
              <IconPlaceholder
                lucide="CopyIcon"
                tabler="IconCopy"
                hugeicons="Copy01Icon"
                phosphor="CopyIcon"
                remixicon="RiFileCopyLine"
              />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </CardContent>
    <CardFooter>
      <Button class="w-full">
        Send Invites
      </Button>
    </CardFooter>
  </Card>
</template>
