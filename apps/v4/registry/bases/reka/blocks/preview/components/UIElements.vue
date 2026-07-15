<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
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
} from "@/registry/bases/reka/ui/alert-dialog"
import { Badge } from "@/registry/bases/reka/ui/badge"
import { Button } from "@/registry/bases/reka/ui/button"
import { ButtonGroup } from "@/registry/bases/reka/ui/button-group"
import { Card, CardContent } from "@/registry/bases/reka/ui/card"
import { Checkbox } from "@/registry/bases/reka/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/bases/reka/ui/dropdown-menu"
import { Field, FieldGroup } from "@/registry/bases/reka/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/bases/reka/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/registry/bases/reka/ui/item"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/bases/reka/ui/radio-group"
import { Slider } from "@/registry/bases/reka/ui/slider"
import { Switch } from "@/registry/bases/reka/ui/switch"
import { Textarea } from "@/registry/bases/reka/ui/textarea"

const sliderValue = ref<number[]>([500])
</script>

<template>
  <Card class="w-full">
    <CardContent class="flex flex-col gap-6">
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-2">
          <Button>Button</Button>
          <Button variant="secondary">
            Secondary
          </Button>
          <Button variant="outline">
            Outline
          </Button>
          <Button variant="ghost">
            Ghost
          </Button>
        </div>
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Two-factor authentication</ItemTitle>
            <ItemDescription class="text-pretty xl:hidden 2xl:block">
              Verify via email or phone number.
            </ItemDescription>
          </ItemContent>
          <ItemActions class="hidden md:flex">
            <Button size="sm" variant="secondary">
              Enable
            </Button>
          </ItemActions>
        </Item>
      </div>
      <Slider
        v-model="sliderValue"
        :max="1000"
        :min="0"
        :step="10"
        class="flex-1"
        aria-label="Slider"
      />
      <FieldGroup>
        <Field>
          <InputGroup>
            <InputGroupInput placeholder="Name" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>
                <IconPlaceholder
                  lucide="SearchIcon"
                  tabler="IconSearch"
                  hugeicons="Search01Icon"
                  phosphor="MagnifyingGlassIcon"
                  remixicon="RiSearchLine"
                />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field class="flex-1">
          <Textarea placeholder="Message" class="resize-none" />
        </Field>
      </FieldGroup>
      <div class="flex items-center gap-2">
        <div class="flex gap-2">
          <Badge>Badge</Badge>
          <Badge variant="secondary">
            Secondary
          </Badge>
          <Badge variant="outline">
            Outline
          </Badge>
        </div>
        <RadioGroup default-value="apple" class="ml-auto flex w-fit gap-3">
          <RadioGroupItem value="apple" />
          <RadioGroupItem value="banana" />
        </RadioGroup>
        <div class="flex gap-3">
          <Checkbox :default-checked="true" />
          <Checkbox />
        </div>
      </div>
      <div class="flex items-center gap-4">
        <AlertDialog>
          <AlertDialogTrigger :as-child="true">
            <Button variant="outline">
              <span class="hidden md:block">Alert Dialog</span>
              <span class="block md:hidden">Dialog</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
              <AlertDialogDescription>
                Do you want to allow the USB accessory to connect to this
                device and your data?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Don't allow</AlertDialogCancel>
              <AlertDialogAction>Allow</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <ButtonGroup>
          <Button variant="outline">
            Button Group
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger :as-child="true">
              <Button variant="outline" size="icon">
                <IconPlaceholder
                  lucide="ChevronUpIcon"
                  tabler="IconChevronUp"
                  hugeicons="ArrowUp01Icon"
                  phosphor="CaretUpIcon"
                  remixicon="RiArrowUpSLine"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" class="w-40">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
                <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                <DropdownMenuItem>Block User</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>Conversation</DropdownMenuLabel>
                <DropdownMenuItem>Share Conversation</DropdownMenuItem>
                <DropdownMenuItem>Copy Conversation</DropdownMenuItem>
                <DropdownMenuItem>Report Conversation</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive">
                  Delete Conversation
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
        <Switch :default-checked="true" class="ml-auto" />
      </div>
    </CardContent>
  </Card>
</template>
