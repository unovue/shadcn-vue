<script setup lang="ts">
import {
  ArrowRight02Icon,
  ArrowUp01Icon,
  Search01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'

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
} from '@/styles/reka-rhea/ui/alert-dialog'
import { Badge } from '@/styles/reka-rhea/ui/badge'
import { Button } from '@/styles/reka-rhea/ui/button'
import { ButtonGroup } from '@/styles/reka-rhea/ui/button-group'
import { Card, CardContent } from '@/styles/reka-rhea/ui/card'
import { Checkbox } from '@/styles/reka-rhea/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/styles/reka-rhea/ui/dropdown-menu'
import { Field, FieldGroup } from '@/styles/reka-rhea/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/styles/reka-rhea/ui/input-group'
import { RadioGroup, RadioGroupItem } from '@/styles/reka-rhea/ui/radio-group'
import { Switch } from '@/styles/reka-rhea/ui/switch'
import { Textarea } from '@/styles/reka-rhea/ui/textarea'
</script>

<template>
  <Card class="w-full">
    <CardContent class="flex flex-col gap-6">
      <div class="flex gap-2">
        <Button>
          Button
          <HugeiconsIcon
            :icon="ArrowRight02Icon"
            :stroke-width="2"
            data-icon="inline-end"
          />
        </Button>
        <Button variant="secondary">
          Secondary
        </Button>
        <Button variant="outline">
          Outline
        </Button>
      </div>
      <FieldGroup>
        <Field>
          <InputGroup>
            <InputGroupInput placeholder="Name" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>
                <HugeiconsIcon :icon="Search01Icon" :stroke-width="2" />
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
          <Badge variant="outline" class="hidden 4xl:flex">
            Outline
          </Badge>
        </div>
        <RadioGroup
          default-value="apple"
          class="ml-auto flex w-fit gap-3"
          aria-label="Fruit preference"
        >
          <RadioGroupItem value="apple" aria-label="Apple" />
          <RadioGroupItem value="banana" aria-label="Banana" />
        </RadioGroup>
        <div class="flex gap-3">
          <Checkbox :default-value="true" aria-label="Enable email alerts" />
          <Checkbox
            class="hidden 4xl:flex"
            aria-label="Enable push alerts"
          />
        </div>
        <Switch
          :default-value="true"
          class="flex 4xl:hidden"
          aria-label="Enable compact notifications"
        />
      </div>
      <div class="flex items-center gap-4">
        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button variant="outline">
              <span class="hidden md:flex style-sera:md:hidden">
                Alert Dialog
              </span>
              <span class="flex md:hidden style-sera:md:flex">Dialog</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent size="sm" class="theme-neutral">
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
        <ButtonGroup class="ml-auto">
          <Button variant="outline">
            <span class="style-sera:hidden">Button Group</span>
            <span class="hidden style-sera:block">Group</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open quick actions"
              >
                <HugeiconsIcon :icon="ArrowUp01Icon" :stroke-width="2" />
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
                <DropdownMenuItem variant="destructive">
                  Delete Conversation
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
        <Switch
          :default-value="true"
          class="hidden 4xl:flex"
          aria-label="Enable advanced setting"
        />
      </div>
    </CardContent>
  </Card>
</template>
