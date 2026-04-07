<script setup lang="ts">
import type { DateRange } from "reka-ui"
import { format } from "date-fns"
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/reka/components/example"
import { Alert, AlertDescription } from "@/registry/bases/reka/ui/alert"
import { Badge } from "@/registry/bases/reka/ui/badge"
import { Button } from "@/registry/bases/reka/ui/button"
import { Calendar } from "@/registry/bases/reka/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/bases/reka/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/registry/bases/reka/ui/empty"
import { Field, FieldGroup, FieldLabel } from "@/registry/bases/reka/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/bases/reka/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/registry/bases/reka/ui/item"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/registry/bases/reka/ui/native-select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/bases/reka/ui/popover"
import { Textarea } from "@/registry/bases/reka/ui/textarea"

// Data
const usageItems = [
  { name: "Edge Requests", value: "$1.83K", percentage: 67.34 },
  { name: "Fast Data Transfer", percentage: 52.18, value: "$952.51" },
  { name: "Monitoring data points", percentage: 89.42, value: "$901.20" },
  { name: "Web Analytics Events", percentage: 45.67, value: "$603.71" },
  { name: "Edge Request CPU Duration", percentage: 23.91, value: "$4.65" },
  { name: "Fast Origin Transfer", percentage: 38.75, value: "$3.85" },
  { name: "ISR Reads", percentage: 71.24, value: "$2.86" },
  { name: "Function Invocations", percentage: 15.83, value: "$0.60" },
  { name: "ISR Writes", percentage: 26.23, value: "524.52K / 2M" },
  { name: "Function Duration", percentage: 5.11, value: "5.11 GB Hrs / 1K GB Hrs" },
]

const environments = [
  "All Environments",
  "Production",
  "Preview",
  "Development",
  "Staging",
  "Test",
  "Other",
]

const statuses = [
  { name: "Ready", color: "oklch(0.72 0.19 150)" },
  { name: "Error", color: "oklch(0.64 0.21 25)" },
  { name: "Building", color: "oklch(0.77 0.16 70)" },
  { name: "Queued", color: "oklch(0.72 0.00 0)" },
  { name: "Provisioning", color: "oklch(0.72 0.00 0)" },
  { name: "Canceled", color: "oklch(0.72 0.00 0)" },
]

const billingItems = [
  { month: "November 2025", invoiceDate: new Date(2025, 10, 5), amount: "$10.00", status: "Paid" as const },
  { month: "October 2025", invoiceDate: new Date(2025, 9, 4), amount: "$10.00", status: "Paid" as const },
  { month: "September 2025", invoiceDate: new Date(2025, 8, 4), amount: "$10.00", status: "Paid" as const },
]

const agentFeatures = [
  { id: "code-reviews", title: "Code reviews", description: "with full codebase context to catch hard-to-find bugs." },
  { id: "code-suggestions", title: "Code suggestions", description: "validated in sandboxes before you merge." },
  { id: "root-cause", title: "Root-cause analysis", description: "for production issues with deployment context.", badge: "Requires Observability Plus" },
]

const feedbackTopics = [
  { value: "", label: "Select a topic" },
  { value: "ai", label: "AI" },
  { value: "accounts-and-access-controls", label: "Accounts and Access Controls" },
  { value: "billing", label: "Billing" },
  { value: "cdn", label: "CDN (Firewall, Caching)" },
  { value: "ci-cd", label: "CI/CD (Builds, Deployments, Environment Variables)" },
  { value: "dashboard-interface", label: "Dashboard Interface (Navigation, UI Issues)" },
  { value: "domains", label: "Domains" },
  { value: "frameworks", label: "Frameworks" },
  { value: "marketplace-and-integrations", label: "Marketplace and Integrations" },
  { value: "observability", label: "Observability (Observability, Logs, Monitoring)" },
  { value: "storage", label: "Storage" },
]

// State
const selectedEnvironment = ref(environments[0])
const selectedStatuses = ref<Set<string>>(new Set(statuses.slice(0, 5).map(s => s.name)))
const dateRange = ref<DateRange | undefined>()

function toggleStatus(statusName: string) {
  const next = new Set(selectedStatuses.value)
  if (next.has(statusName)) {
    next.delete(statusName)
  }
  else {
    next.add(statusName)
  }
  selectedStatuses.value = next
}

function getCircumference() {
  return 2 * Math.PI * 42.5
}

function getStrokePercent(percentage: number) {
  const normalizedPercentage = Math.min(Math.max(percentage, 0), 100)
  return (normalizedPercentage / 100) * getCircumference()
}
</script>

<template>
  <ExampleWrapper>
    <!-- Deployment Filter -->
    <Example title="Deployment Filter" container-class-name="col-span-full">
      <div class="flex w-full flex-wrap items-center gap-2 *:w-full lg:*:w-auto">
        <Popover>
          <PopoverTrigger :as-child="true">
            <Button variant="outline" class="justify-start">
              <IconPlaceholder
                lucide="CalendarIcon"
                tabler="IconCalendar"
                hugeicons="Calendar01Icon"
                phosphor="CalendarIcon"
                remixicon="RiCalendarLine"
                data-icon="inline-start"
                class="text-muted-foreground"
              />
              <template v-if="dateRange?.start">
                <template v-if="dateRange.end">
                  {{ format(dateRange.start.toDate('UTC'), "LLL dd, y") }} -
                  {{ format(dateRange.end.toDate('UTC'), "LLL dd, y") }}
                </template>
                <template v-else>
                  {{ format(dateRange.start.toDate('UTC'), "LLL dd, y") }}
                </template>
              </template>
              <template v-else>
                Select Date Range
              </template>
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0" align="start">
            <Calendar
              v-model="(dateRange as any)"
              mode="range"
              :number-of-months="2"
            />
          </PopoverContent>
        </Popover>
        <InputGroup class="lg:ml-auto lg:max-w-72">
          <InputGroupAddon>
            <IconPlaceholder
              lucide="Search"
              tabler="IconSearch"
              hugeicons="Search01Icon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            />
          </InputGroupAddon>
          <InputGroupInput placeholder="All Authors..." />
          <InputGroupAddon align="inline-end">
            <IconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconChevronDown"
              hugeicons="ArrowDown01Icon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
              class="text-muted-foreground"
            />
          </InputGroupAddon>
        </InputGroup>
        <DropdownMenu>
          <DropdownMenuTrigger :as-child="true">
            <Button variant="outline" class="justify-between">
              {{ selectedEnvironment }}
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                data-icon="inline-end"
                class="text-muted-foreground"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56" align="end">
            <DropdownMenuItem
              v-for="environment in environments"
              :key="environment"
              :data-active="selectedEnvironment === environment"
              @select="selectedEnvironment = environment"
            >
              {{ environment }}
              <IconPlaceholder
                lucide="CheckIcon"
                tabler="IconCheck"
                hugeicons="Tick02Icon"
                phosphor="CheckIcon"
                remixicon="RiCheckLine"
                class="ml-auto opacity-0 group-data-[active=true]/dropdown-menu-item:opacity-100"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger :as-child="true">
            <Button variant="outline" class="justify-between">
              <div class="flex items-center -space-x-0.5">
                <div
                  v-for="status in statuses"
                  :key="status.name"
                  :style="{ '--color': status.color }"
                  class="size-2.5 shrink-0 rounded-full border grayscale transition-all data-[active=true]:border-(--color) data-[active=true]:bg-(--color) data-[active=true]:grayscale-0"
                  :data-active="selectedStatuses.has(status.name)"
                />
              </div>
              Status {{ selectedStatuses.size }}/{{ statuses.length }}
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                data-icon="inline-end"
                class="text-muted-foreground ml-auto"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56" align="end">
            <DropdownMenuItem
              v-for="status in statuses"
              :key="status.name"
              :data-active="selectedStatuses.has(status.name)"
              :style="{ '--color': status.color }"
              @select="toggleStatus(status.name)"
            >
              <div class="flex items-center gap-2">
                <div class="size-2 rounded-full bg-(--color)" />
                {{ status.name }}
              </div>
              <IconPlaceholder
                lucide="CheckIcon"
                tabler="IconCheck"
                hugeicons="Tick02Icon"
                phosphor="CheckIcon"
                remixicon="RiCheckLine"
                class="ml-auto opacity-0 group-data-[active=true]/dropdown-menu-item:opacity-100"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Example>

    <!-- Usage Card -->
    <Example title="Usage" class="items-center">
      <Card class="w-full max-w-sm gap-4">
        <CardHeader>
          <CardTitle class="px-1 text-sm">
            5 days remaining in cycle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ItemGroup class="gap-0">
            <Item
              v-for="item in usageItems"
              :key="item.name"
              size="xs"
              :as-child="true"
              class="px-0 group-hover/item-group:bg-transparent"
            >
              <a href="#">
                <ItemMedia variant="icon" class="text-primary">
                  <!-- Circular Gauge -->
                  <svg
                    aria-hidden="true"
                    fill="none"
                    height="16"
                    width="16"
                    stroke-width="2"
                    viewBox="0 0 100 100"
                    class="-rotate-90"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="42.5"
                      stroke-width="12"
                      stroke-dashoffset="0"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="opacity-20"
                      stroke="currentColor"
                      :style="{ strokeDasharray: `${getCircumference()} ${getCircumference()}` }"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42.5"
                      stroke-width="12"
                      stroke-dashoffset="0"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke="currentColor"
                      class="transition-all duration-300"
                      :style="{ strokeDasharray: `${getStrokePercent(item.percentage)} ${getCircumference()}` }"
                    />
                  </svg>
                </ItemMedia>
                <ItemContent class="inline-block truncate">
                  <ItemTitle class="inline">
                    {{ item.name }}
                  </ItemTitle>
                </ItemContent>
                <ItemActions>
                  <span class="text-muted-foreground font-mono text-xs font-medium tabular-nums">
                    {{ item.value }}
                  </span>
                </ItemActions>
              </a>
            </Item>
          </ItemGroup>
        </CardContent>
      </Card>
    </Example>

    <!-- Observability Card -->
    <Example title="Observability" class="items-center justify-center">
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
            language. Monitoring will no longer be available on the Pro plan in
            November, 2025
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

    <!-- Billing List -->
    <Example
      title="Billing"
      class="items-center lg:p-16"
      container-class-name="col-span-full"
    >
      <ItemGroup class="max-w-7xl gap-0 rounded-lg border">
        <template
          v-for="(item, index) in billingItems"
          :key="item.month"
        >
          <Item class="grid grid-cols-[1fr_auto] lg:grid-cols-[2fr_1fr_1fr_auto]">
            <ItemContent>
              <ItemTitle>
                {{ item.month }}
                <Badge
                  variant="secondary"
                  class="bg-green-100 text-green-700 hover:bg-green-100"
                >
                  {{ item.status }}
                </Badge>
              </ItemTitle>
              <ItemDescription>
                Infrastructure usage & Vercel platform
              </ItemDescription>
            </ItemContent>
            <ItemContent class="hidden lg:flex">
              <ItemTitle>Total Due</ItemTitle>
              <ItemDescription>{{ item.amount }}</ItemDescription>
            </ItemContent>
            <ItemContent class="hidden lg:flex">
              <ItemDescription>
                Invoiced {{ format(item.invoiceDate, "d MMM yyyy") }}
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <DropdownMenu>
                <DropdownMenuTrigger :as-child="true">
                  <Button variant="ghost" size="icon">
                    <IconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDots"
                      hugeicons="MoreHorizontalCircle01Icon"
                      phosphor="DotsThreeOutlineIcon"
                      remixicon="RiMoreLine"
                    />
                    <span class="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View invoice</DropdownMenuItem>
                  <DropdownMenuItem>Download PDF</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Contact support</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ItemActions>
            <ItemFooter class="col-span-full w-full border-t pt-4 lg:hidden">
              <ItemContent>
                <ItemTitle>Total Due</ItemTitle>
                <ItemDescription>{{ item.amount }}</ItemDescription>
              </ItemContent>
              <ItemContent>
                <ItemDescription>
                  Invoiced {{ format(item.invoiceDate, "d MMM yyyy") }}
                </ItemDescription>
              </ItemContent>
            </ItemFooter>
          </Item>
          <ItemSeparator
            v-if="index !== billingItems.length - 1"
            class="my-0"
          />
        </template>
      </ItemGroup>
    </Example>

    <!-- Anomaly Alert -->
    <Example title="Anomaly Alert" class="items-center justify-center">
      <Card class="w-full max-w-xs">
        <CardContent class="p-6">
          <Empty class="mx-auto p-0">
            <EmptyHeader>
              <EmptyTitle>Get alerted for anomalies</EmptyTitle>
              <EmptyDescription>
                Automatically monitor your projects for anomalies and get
                notified.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button>Upgrade to Observability Plus</Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>
    </Example>

    <!-- Activate Agent Dialog -->
    <Example title="Activate Agent" class="items-center justify-center">
      <Dialog>
        <DialogTrigger :as-child="true">
          <Button variant="outline">
            Activate Agent
          </Button>
        </DialogTrigger>
        <DialogContent :show-close-button="false">
          <DialogHeader>
            <DialogTitle>Ship faster & safer with Vercel Agent</DialogTitle>
            <DialogDescription>
              Your use is subject to Vercel's
              <a href="#">Public Beta Agreement</a> and
              <a href="#">AI Product Terms</a>.
            </DialogDescription>
          </DialogHeader>
          <div class="no-scrollbar flex max-h-[50vh] flex-col gap-4 overflow-y-auto">
            <ItemGroup class="gap-0 pr-2">
              <Item
                v-for="feature in agentFeatures"
                :key="feature.id"
                size="xs"
                class="px-0"
              >
                <ItemMedia variant="icon" class="self-start">
                  <IconPlaceholder
                    lucide="CheckCircle2Icon"
                    tabler="IconCircleCheckFilled"
                    hugeicons="CheckmarkCircle02Icon"
                    phosphor="CheckCircleIcon"
                    remixicon="RiCheckboxCircleLine"
                    class="fill-primary text-primary-foreground size-5"
                  />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle class="text-muted-foreground inline leading-relaxed font-normal">
                    <strong class="text-foreground font-medium">{{ feature.title }}</strong>
                    {{ feature.description }}
                    <Badge
                      v-if="feature.badge"
                      variant="secondary"
                      class="bg-blue-100 text-blue-700 hover:bg-blue-100"
                    >
                      {{ feature.badge }}
                    </Badge>
                  </ItemTitle>
                </ItemContent>
              </Item>
            </ItemGroup>
            <Alert class="hidden sm:grid">
              <IconPlaceholder
                lucide="CircleDollarSignIcon"
                hugeicons="DollarCircleIcon"
                tabler="IconCoin"
                phosphor="CurrencyCircleDollarIcon"
                remixicon="RiMoneyDollarCircleLine"
              />
              <AlertDescription>
                Pro teams get $100 in Vercel Agent trial credit for 2 weeks.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <DialogClose :as-child="true">
              <Button variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button>Enable with $100 credits</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Example>

    <!-- Feedback Form -->
    <Example title="Feedback Form" class="items-center justify-center">
      <Card class="w-full max-w-sm" size="sm">
        <CardContent>
          <form id="feedback-form">
            <FieldGroup>
              <Field>
                <FieldLabel for="topic">
                  Topic
                </FieldLabel>
                <NativeSelect id="topic">
                  <NativeSelectOption
                    v-for="topic in feedbackTopics"
                    :key="topic.value"
                    :value="topic.value"
                  >
                    {{ topic.label }}
                  </NativeSelectOption>
                </NativeSelect>
              </Field>
              <Field>
                <FieldLabel for="feedback">
                  Feedback
                </FieldLabel>
                <Textarea
                  id="feedback"
                  placeholder="Your feedback helps us improve..."
                />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" form="feedback-form">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </Example>
  </ExampleWrapper>
</template>
