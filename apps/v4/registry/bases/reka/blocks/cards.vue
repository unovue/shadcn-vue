<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/reka/components/example"
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
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/registry/bases/reka/ui/avatar"
import { Badge } from "@/registry/bases/reka/ui/badge"
import { Button } from "@/registry/bases/reka/ui/button"
import { ButtonGroup } from "@/registry/bases/reka/ui/button-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import { Checkbox } from "@/registry/bases/reka/ui/checkbox"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/bases/reka/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/bases/reka/ui/empty"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/registry/bases/reka/ui/field"
import { Input } from "@/registry/bases/reka/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/bases/reka/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/registry/bases/reka/ui/item"

import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/bases/reka/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/reka/ui/select"
import { Separator } from "@/registry/bases/reka/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/bases/reka/ui/sheet"
import { Slider } from "@/registry/bases/reka/ui/slider"
import { Switch } from "@/registry/bases/reka/ui/switch"
import { Textarea } from "@/registry/bases/reka/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/bases/reka/ui/tooltip"

// Field Examples State
const gpuCount = ref(8)
const priceRange = ref([200, 800])
const computeEnvironment = ref("kubernetes")

function adjustGpu(adjustment: number) {
  const newValue = gpuCount.value + adjustment
  if (newValue >= 1 && newValue <= 99) {
    gpuCount.value = newValue
  }
}

// Button Group State
const label = ref("personal")

// Form State
const firstName = ref("")
const lastName = ref("")
const email = ref("")
const bio = ref("")
const role = ref("")
const agreeToTerms = ref(false)

// Badge Examples
const badgeVariants = ["default", "secondary", "outline", "destructive"] as const

// Avatar Data
const avatars = [
  { src: "/avatars/01.png", fallback: "JD" },
  { src: "/avatars/02.png", fallback: "AB" },
  { src: "/avatars/03.png", fallback: "CD" },
  { src: "/avatars/04.png", fallback: "EF" },
  { src: "/avatars/05.png", fallback: "GH" },
]
</script>

<template>
  <ExampleWrapper>
    <!-- Observability Card -->
    <Example title="Card" class="items-center justify-center">
      <Card class="relative w-full max-w-md overflow-hidden pt-0">
        <div class="bg-primary absolute inset-0 z-30 aspect-video opacity-50 mix-blend-color" />
        <img
          src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo by mymind on Unsplash"
          title="Photo by mymind on Unsplash"
          class="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
        >
        <CardHeader>
          <CardTitle>Observability Plus is replacing Monitoring</CardTitle>
          <CardDescription>
            Switch to the improved way to explore your data, with natural
            language.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>
            Create Query
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
              data-icon="inline-end"
            />
          </Button>
          <Badge variant="secondary" class="ml-auto">
            Warning
          </Badge>
        </CardFooter>
      </Card>
    </Example>

    <!-- Form Example -->
    <Example title="Form">
      <Card class="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Enter your information to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <div class="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel for="first-name">
                    First Name
                  </FieldLabel>
                  <Input
                    id="first-name"
                    v-model="firstName"
                    placeholder="John"
                  />
                </Field>
                <Field>
                  <FieldLabel for="last-name">
                    Last Name
                  </FieldLabel>
                  <Input
                    id="last-name"
                    v-model="lastName"
                    placeholder="Doe"
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel for="email">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="john@example.com"
                />
              </Field>
              <Field>
                <FieldLabel for="role">
                  Role
                </FieldLabel>
                <Select v-model="role">
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="developer">
                        Developer
                      </SelectItem>
                      <SelectItem value="designer">
                        Designer
                      </SelectItem>
                      <SelectItem value="manager">
                        Manager
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel for="bio">
                  Bio
                </FieldLabel>
                <Textarea
                  id="bio"
                  v-model="bio"
                  placeholder="Tell us about yourself..."
                />
              </Field>
              <Field orientation="horizontal">
                <Checkbox id="terms" v-model:checked="agreeToTerms" />
                <FieldLabel for="terms">
                  I agree to the terms and conditions
                </FieldLabel>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter class="flex justify-between">
          <Button variant="outline">
            Cancel
          </Button>
          <Button type="submit">
            Create Account
          </Button>
        </CardFooter>
      </Card>
    </Example>

    <!-- Field Examples -->
    <Example title="Fields">
      <FieldSet class="w-full max-w-md">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Compute Environment</FieldLegend>
            <FieldDescription>
              Select the compute environment for your cluster.
            </FieldDescription>
            <RadioGroup v-model="computeEnvironment">
              <FieldLabel for="kubernetes-r2h">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Kubernetes</FieldTitle>
                    <FieldDescription>
                      Run GPU workloads on a K8s configured cluster. This is the default.
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    id="kubernetes-r2h"
                    value="kubernetes"
                    aria-label="Kubernetes"
                  />
                </Field>
              </FieldLabel>
              <FieldLabel for="vm-z4k">
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Virtual Machine</FieldTitle>
                    <FieldDescription>
                      Access a VM configured cluster to run workloads. (Coming soon)
                    </FieldDescription>
                  </FieldContent>
                  <RadioGroupItem
                    id="vm-z4k"
                    value="vm"
                    aria-label="Virtual Machine"
                  />
                </Field>
              </FieldLabel>
            </RadioGroup>
          </FieldSet>
          <FieldSeparator />
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel for="number-of-gpus-f6l">
                Number of GPUs
              </FieldLabel>
              <FieldDescription>You can add more later.</FieldDescription>
            </FieldContent>
            <ButtonGroup>
              <Input
                id="number-of-gpus-f6l"
                :model-value="gpuCount"
                :size="3"
                :maxlength="3"
                @update:model-value="gpuCount = Number($event)"
              />
              <Button
                variant="outline"
                size="icon"
                type="button"
                aria-label="Decrement"
                :disabled="gpuCount <= 1"
                @click="adjustGpu(-1)"
              >
                <IconPlaceholder
                  lucide="MinusIcon"
                  tabler="IconMinus"
                  hugeicons="MinusSignIcon"
                  phosphor="MinusIcon"
                  remixicon="RiSubtractLine"
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                type="button"
                aria-label="Increment"
                :disabled="gpuCount >= 99"
                @click="adjustGpu(1)"
              >
                <IconPlaceholder
                  lucide="PlusIcon"
                  tabler="IconPlus"
                  hugeicons="PlusSignIcon"
                  phosphor="PlusIcon"
                  remixicon="RiAddLine"
                />
              </Button>
            </ButtonGroup>
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel for="tinting">
                Wallpaper Tinting
              </FieldLabel>
              <FieldDescription>
                Allow the wallpaper to be tinted.
              </FieldDescription>
            </FieldContent>
            <Switch id="tinting" default-checked />
          </Field>
          <FieldSeparator />
          <Field>
            <FieldTitle>Price Range</FieldTitle>
            <FieldDescription>
              Set your budget range ($<span class="font-medium tabular-nums">{{ priceRange[0] }}</span> -
              <span class="font-medium tabular-nums">{{ priceRange[1] }}</span>).
            </FieldDescription>
            <Slider
              v-model="priceRange"
              :max="1000"
              :min="0"
              :step="10"
              class="mt-2 w-full"
              aria-label="Price Range"
            />
          </Field>
          <Field orientation="horizontal">
            <Button type="submit">
              Submit
            </Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </Example>

    <!-- Button Group Examples -->
    <Example title="Button Group" class="items-center justify-center">
      <div class="flex flex-col gap-6">
        <ButtonGroup>
          <ButtonGroup class="hidden sm:flex">
            <Button variant="outline" size="icon-sm" aria-label="Go Back">
              <IconPlaceholder
                lucide="ArrowLeftIcon"
                tabler="IconArrowLeft"
                hugeicons="ArrowLeft01Icon"
                phosphor="ArrowLeftIcon"
                remixicon="RiArrowLeftLine"
              />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="sm">
              Archive
            </Button>
            <Button variant="outline" size="sm">
              Report
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="sm">
              Snooze
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger :as-child="true">
                <Button
                  variant="outline"
                  size="icon-sm"
                  aria-label="More Options"
                >
                  <IconPlaceholder
                    lucide="ChevronDownIcon"
                    tabler="IconChevronDown"
                    hugeicons="ArrowDown01Icon"
                    phosphor="CaretDownIcon"
                    remixicon="RiArrowDownSLine"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="MailCheckIcon"
                      tabler="IconMailCheck"
                      hugeicons="MailValidation01Icon"
                      phosphor="EnvelopeIcon"
                      remixicon="RiMailLine"
                    />
                    Mark as Read
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="ArchiveIcon"
                      tabler="IconArchive"
                      hugeicons="ArchiveIcon"
                      phosphor="ArchiveIcon"
                      remixicon="RiArchiveLine"
                    />
                    Archive
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="ClockIcon"
                      tabler="IconClock"
                      hugeicons="ClockIcon"
                      phosphor="ClockIcon"
                      remixicon="RiTimeLine"
                    />
                    Snooze
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconPlaceholder
                      lucide="CalendarPlusIcon"
                      tabler="IconCalendarPlus"
                      hugeicons="CalendarAdd01Icon"
                      phosphor="CalendarPlusIcon"
                      remixicon="RiCalendarEventLine"
                    />
                    Add to Calendar
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <IconPlaceholder
                        lucide="TagIcon"
                        tabler="IconTag"
                        hugeicons="TagIcon"
                        phosphor="TagIcon"
                        remixicon="RiPriceTagLine"
                      />
                      Label As...
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup v-model="label">
                        <DropdownMenuRadioItem value="personal">
                          Personal
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="work">
                          Work
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="other">
                          Other
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive">
                    <IconPlaceholder
                      lucide="Trash2Icon"
                      tabler="IconTrash"
                      hugeicons="Delete02Icon"
                      phosphor="TrashIcon"
                      remixicon="RiDeleteBinLine"
                    />
                    Trash
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
          <ButtonGroup class="hidden sm:flex">
            <Button variant="outline" size="icon-sm" aria-label="Previous">
              <IconPlaceholder
                lucide="ArrowLeftIcon"
                tabler="IconArrowLeft"
                hugeicons="ArrowLeft01Icon"
                phosphor="ArrowLeftIcon"
                remixicon="RiArrowLeftLine"
              />
            </Button>
            <Button variant="outline" size="icon-sm" aria-label="Next">
              <IconPlaceholder
                lucide="ArrowRightIcon"
                tabler="IconArrowRight"
                hugeicons="ArrowRight01Icon"
                phosphor="ArrowRightIcon"
                remixicon="RiArrowRightLine"
              />
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </div>
    </Example>

    <!-- Empty State with Avatar Group -->
    <Example title="Empty State" class="items-center justify-center">
      <Empty class="w-full max-w-sm">
        <EmptyHeader>
          <EmptyMedia>
            <AvatarGroup>
              <Avatar
                v-for="avatar in avatars"
                :key="avatar.fallback"
                size="sm"
              >
                <AvatarImage :src="avatar.src" />
                <AvatarFallback>{{ avatar.fallback }}</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          </EmptyMedia>
          <EmptyTitle>No team members</EmptyTitle>
          <EmptyDescription>
            You don't have any team members yet. Invite your first team member to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
              data-icon="inline-start"
            />
            Invite Member
          </Button>
        </EmptyContent>
      </Empty>
    </Example>

    <!-- Input Group Examples -->
    <Example title="Input Groups">
      <div class="flex w-full max-w-md flex-col gap-4">
        <InputGroup>
          <InputGroupAddon>
            <IconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="SearchIcon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search..." />
        </InputGroup>

        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="example.com" />
        </InputGroup>

        <InputGroup>
          <InputGroupInput placeholder="Enter amount" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>USD</InputGroupText>
          </InputGroupAddon>
        </InputGroup>

        <InputGroup>
          <InputGroupTextarea placeholder="Write your message..." />
          <InputGroupAddon align="block-end">
            <Tooltip>
              <TooltipTrigger :as-child="true">
                <InputGroupButton variant="ghost" size="icon-sm">
                  <IconPlaceholder
                    lucide="PaperclipIcon"
                    tabler="IconPaperclip"
                    hugeicons="AttachmentIcon"
                    phosphor="PaperclipIcon"
                    remixicon="RiAttachmentLine"
                  />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>Attach file</TooltipContent>
            </Tooltip>
            <InputGroupButton variant="default" size="icon-sm" class="ml-auto">
              <IconPlaceholder
                lucide="SendIcon"
                tabler="IconSend"
                hugeicons="SentIcon"
                phosphor="PaperPlaneTiltIcon"
                remixicon="RiSendPlaneLine"
              />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </Example>

    <!-- Sheet Example -->
    <Example title="Sheet" class="items-center justify-center">
      <Sheet>
        <SheetTrigger :as-child="true">
          <Button variant="outline">
            Open Settings
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
            <SheetDescription>
              Make changes to your settings here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div class="grid gap-4 py-4">
            <Field>
              <FieldLabel for="name">
                Name
              </FieldLabel>
              <Input id="name" placeholder="John Doe" />
            </Field>
            <Field>
              <FieldLabel for="username">
                Username
              </FieldLabel>
              <Input id="username" placeholder="@johndoe" />
            </Field>
          </div>
          <SheetFooter>
            <SheetClose :as-child="true">
              <Button variant="outline">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit">
              Save changes
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Example>

    <!-- Badge Examples -->
    <Example title="Badges" class="items-center justify-center">
      <div class="flex flex-wrap gap-4">
        <Badge>Default</Badge>
        <Badge variant="secondary">
          Secondary
        </Badge>
        <Badge variant="outline">
          Outline
        </Badge>
        <Badge variant="destructive">
          Destructive
        </Badge>
      </div>
    </Example>

    <!-- Item Example -->
    <Example title="Items">
      <Card class="w-full max-w-md">
        <CardContent class="p-0">
          <Item>
            <ItemMedia>
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>John Doe</ItemTitle>
              <ItemDescription>john@example.com</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="ghost" size="icon-sm">
                <IconPlaceholder
                  lucide="MoreHorizontalIcon"
                  tabler="IconDots"
                  hugeicons="MoreHorizontalCircle01Icon"
                  phosphor="DotsThreeOutlineIcon"
                  remixicon="RiMoreLine"
                />
              </Button>
            </ItemActions>
          </Item>
          <Separator />
          <Item>
            <ItemMedia variant="icon">
              <IconPlaceholder
                lucide="SettingsIcon"
                tabler="IconSettings"
                hugeicons="Settings01Icon"
                phosphor="GearIcon"
                remixicon="RiSettingsLine"
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Settings</ItemTitle>
              <ItemDescription>Manage your preferences</ItemDescription>
            </ItemContent>
            <ItemActions>
              <IconPlaceholder
                lucide="ChevronRightIcon"
                tabler="IconChevronRight"
                hugeicons="ArrowRight01Icon"
                phosphor="CaretRightIcon"
                remixicon="RiArrowRightSLine"
                class="text-muted-foreground size-5"
              />
            </ItemActions>
          </Item>
          <Separator />
          <Item>
            <ItemMedia variant="icon">
              <IconPlaceholder
                lucide="BellIcon"
                tabler="IconBell"
                hugeicons="Notification01Icon"
                phosphor="BellIcon"
                remixicon="RiNotification3Line"
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Notifications</ItemTitle>
              <ItemDescription>Configure notifications</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Switch />
            </ItemActions>
          </Item>
        </CardContent>
      </Card>
    </Example>

    <!-- Alert Dialog Example -->
    <Example title="Alert Dialog" class="items-center justify-center">
      <AlertDialog>
        <AlertDialogTrigger :as-child="true">
          <Button variant="destructive">
            Delete Account
          </Button>
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
            <AlertDialogAction>Yes, delete my account</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Example>
  </ExampleWrapper>
</template>
