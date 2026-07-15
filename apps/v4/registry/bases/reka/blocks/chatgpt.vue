<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/reka/components/example"
import { Alert, AlertDescription } from "@/registry/bases/reka/ui/alert"
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
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/bases/reka/ui/dropdown-menu"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/registry/bases/reka/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/registry/bases/reka/ui/input-group"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/registry/bases/reka/ui/item"
import { Kbd } from "@/registry/bases/reka/ui/kbd"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/bases/reka/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/bases/reka/ui/tooltip"

// PromptForm state
const dictateEnabled = ref(false)

// ModelSelector state
const mode = ref("auto")
const model = ref("gpt-5.1")

// CreateProjectForm state
const projectName = ref("")
const selectedCategory = ref<string | null>("homework")
const memorySetting = ref<"default" | "project-only">("default")
const selectedColor = ref<string | null>("var(--foreground)")

const categories = [
  { id: "homework", label: "Homework" },
  { id: "writing", label: "Writing" },
  { id: "health", label: "Health" },
  { id: "travel", label: "Travel" },
]

const colors = [
  "var(--foreground)",
  "#fa423e",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#10b981",
  "#6366f1",
  "#14b8a6",
  "#f97316",
  "#fbbc04",
]

function toggleCategory(categoryId: string) {
  selectedCategory.value = selectedCategory.value === categoryId ? null : categoryId
}
</script>

<template>
  <ExampleWrapper>
    <!-- Prompt Form -->
    <Example title="Prompt Form">
      <Field>
        <FieldLabel for="prompt" class="sr-only">
          Prompt
        </FieldLabel>
        <InputGroup>
          <InputGroupTextarea id="prompt" placeholder="Ask anything" />
          <InputGroupAddon align="block-end">
            <DropdownMenu>
              <Tooltip>
                <DropdownMenuTrigger :as-child="true">
                  <TooltipTrigger :as-child="true">
                    <InputGroupButton
                      variant="ghost"
                      size="icon-sm"
                      class="rounded-4xl"
                      @click="dictateEnabled = !dictateEnabled"
                    >
                      <IconPlaceholder
                        lucide="PlusIcon"
                        tabler="IconPlus"
                        hugeicons="PlusSignIcon"
                        phosphor="PlusIcon"
                        remixicon="RiAddLine"
                      />
                    </InputGroupButton>
                  </TooltipTrigger>
                </DropdownMenuTrigger>
                <TooltipContent>
                  Add files and more <Kbd>/</Kbd>
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent class="w-56">
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="PaperclipIcon"
                    tabler="IconPaperclip"
                    hugeicons="AttachmentIcon"
                    phosphor="PaperclipIcon"
                    remixicon="RiAttachmentLine"
                  />
                  Add photos & files
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="SparklesIcon"
                    tabler="IconSparkles"
                    hugeicons="SparklesIcon"
                    phosphor="SparkleIcon"
                    remixicon="RiSparklingLine"
                  />
                  Deep research
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="ShoppingBagIcon"
                    tabler="IconShoppingBag"
                    hugeicons="ShoppingBag01Icon"
                    phosphor="BagIcon"
                    remixicon="RiShoppingBagLine"
                  />
                  Shopping research
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="WandIcon"
                    tabler="IconWand"
                    hugeicons="MagicWand05Icon"
                    phosphor="MagicWandIcon"
                    remixicon="RiMagicLine"
                  />
                  Create image
                </DropdownMenuItem>
                <Tooltip>
                  <TooltipTrigger :as-child="true">
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="MousePointerIcon"
                        tabler="IconPointer"
                        hugeicons="Cursor01Icon"
                        phosphor="HandPointingIcon"
                        remixicon="RiHand"
                      />
                      Agent mode
                    </DropdownMenuItem>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <div class="font-medium">
                      35 left
                    </div>
                    <div class="text-primary-foreground/80 text-xs">
                      More available for purchase
                    </div>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <IconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDots"
                      hugeicons="MoreHorizontalCircle01Icon"
                      phosphor="DotsThreeOutlineIcon"
                      remixicon="RiMoreLine"
                    />
                    More
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="ShareIcon"
                        tabler="IconShare"
                        hugeicons="Share03Icon"
                        phosphor="ShareIcon"
                        remixicon="RiShareLine"
                      />
                      Add sources
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="BookOpenIcon"
                        tabler="IconBook"
                        hugeicons="BookIcon"
                        phosphor="BookOpenIcon"
                        remixicon="RiBookOpenLine"
                      />
                      Study and learn
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="GlobeIcon"
                        tabler="IconWorld"
                        hugeicons="GlobalIcon"
                        phosphor="GlobeIcon"
                        remixicon="RiGlobeLine"
                      />
                      Web search
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="PenToolIcon"
                        tabler="IconPencil"
                        hugeicons="PenIcon"
                        phosphor="PencilIcon"
                        remixicon="RiPencilLine"
                      />
                      Canvas
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
            <Tooltip>
              <TooltipTrigger :as-child="true">
                <InputGroupButton
                  variant="ghost"
                  size="icon-sm"
                  class="ml-auto rounded-4xl"
                  @click="dictateEnabled = !dictateEnabled"
                >
                  <IconPlaceholder
                    lucide="AudioLinesIcon"
                    tabler="IconMicrophone"
                    hugeicons="AudioWave01Icon"
                    phosphor="MicrophoneIcon"
                    remixicon="RiMicLine"
                  />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>Dictate</TooltipContent>
            </Tooltip>
            <InputGroupButton
              size="icon-sm"
              variant="default"
              class="rounded-4xl"
            >
              <IconPlaceholder
                lucide="ArrowUpIcon"
                tabler="IconArrowUp"
                hugeicons="ArrowUp02Icon"
                phosphor="ArrowUpIcon"
                remixicon="RiArrowUpLine"
              />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </Example>

    <!-- Model Selector -->
    <Example title="Model Selector">
      <DropdownMenu>
        <DropdownMenuTrigger :as-child="true">
          <Button variant="ghost" class="gap-2">
            ChatGPT 5.1
            <IconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconChevronDown"
              hugeicons="ArrowDown01Icon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
              class="text-muted-foreground size-4"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-60" align="start">
          <DropdownMenuLabel class="text-muted-foreground text-xs font-normal">
            GPT-5.1
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup v-model="mode">
            <DropdownMenuRadioItem value="auto">
              <Item size="xs" class="p-0">
                <ItemContent>
                  <ItemTitle>Auto</ItemTitle>
                  <ItemDescription class="text-xs">
                    Decides how long to think
                  </ItemDescription>
                </ItemContent>
              </Item>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="instant">
              <Item size="xs" class="p-0">
                <ItemContent>
                  <ItemTitle>Instant</ItemTitle>
                  <ItemDescription class="text-xs">
                    Answers right away
                  </ItemDescription>
                </ItemContent>
              </Item>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="thinking">
              <Item size="xs" class="p-0">
                <ItemContent>
                  <ItemTitle>Thinking</ItemTitle>
                  <ItemDescription class="text-xs">
                    Thinks longer for better answers
                  </ItemDescription>
                </ItemContent>
              </Item>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span class="font-medium">Legacy models</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup v-model="model">
                <DropdownMenuRadioItem value="gpt-4">
                  GPT-4
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="gpt-4-turbo">
                  GPT-4 Turbo
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="gpt-3.5">
                  GPT-3.5
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>

    <!-- Group Chat Dialog -->
    <Example title="Group Chat Dialog" class="items-center justify-center">
      <AlertDialog>
        <AlertDialogTrigger :as-child="true">
          <Button>Start Group Chat</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Use ChatGPT together</AlertDialogTitle>
            <AlertDialogDescription>
              Add people to your chats to plan, share ideas, and get creative.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter class="flex-row items-center justify-between sm:justify-between">
            <a
              href="#"
              class="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4"
            >
              Learn more
            </a>
            <div class="flex gap-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Start group chat</AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Example>

    <!-- Create Project Form -->
    <Example title="Create Project" class="items-center justify-center">
      <Card class="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
          <CardDescription>
            Start a new project to keep chats, files, and custom instructions in
            one place.
          </CardDescription>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger :as-child="true">
                <Button variant="ghost" size="icon">
                  <IconPlaceholder
                    lucide="SettingsIcon"
                    tabler="IconSettings"
                    hugeicons="Settings01Icon"
                    phosphor="GearIcon"
                    remixicon="RiSettingsLine"
                  />
                  <span class="sr-only">Memory</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" class="w-72">
                <DropdownMenuRadioGroup v-model="memorySetting">
                  <DropdownMenuRadioItem value="default">
                    <Item size="xs">
                      <ItemContent>
                        <ItemTitle>Default</ItemTitle>
                        <ItemDescription class="text-xs">
                          Project can access memories from outside chats, and
                          vice versa.
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="project-only">
                    <Item size="xs">
                      <ItemContent>
                        <ItemTitle>Project Only</ItemTitle>
                        <ItemDescription class="text-xs">
                          Project can only access its own memories. Its memories
                          are hidden from outside chats.
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>
                  Note that this setting can't be changed later.
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel for="project-name" class="sr-only">
                Project Name
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="project-name"
                  v-model="projectName"
                  placeholder="Copenhagen Trip"
                />
                <InputGroupAddon>
                  <Popover>
                    <PopoverTrigger :as-child="true">
                      <InputGroupButton variant="ghost" size="icon-xs">
                        <IconPlaceholder
                          :style="{ '--color': selectedColor }"
                          lucide="FolderIcon"
                          phosphor="FolderIcon"
                          remixicon="RiFolderLine"
                          tabler="IconFolder"
                          hugeicons="FolderIcon"
                          class="text-(--color)"
                        />
                      </InputGroupButton>
                    </PopoverTrigger>
                    <PopoverContent align="start" class="w-60 p-3">
                      <div class="flex flex-wrap gap-2">
                        <Button
                          v-for="color in colors"
                          :key="color"
                          size="icon"
                          variant="ghost"
                          class="rounded-full p-1"
                          :style="{ '--color': color }"
                          :data-checked="selectedColor === color"
                          @click="selectedColor = color"
                        >
                          <span class="group-data-[checked=true]/button:ring-offset-background size-5 rounded-full bg-(--color) ring-2 ring-transparent ring-offset-2 ring-offset-(--color) group-data-[checked=true]/button:ring-(--color)" />
                          <span class="sr-only">{{ color }}</span>
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </InputGroupAddon>
              </InputGroup>
              <FieldDescription class="flex flex-wrap gap-2">
                <Badge
                  v-for="category in categories"
                  :key="category.id"
                  :variant="selectedCategory === category.id ? 'default' : 'outline'"
                  :data-checked="selectedCategory === category.id"
                  :as-child="true"
                >
                  <button @click="toggleCategory(category.id)">
                    <IconPlaceholder
                      lucide="CircleCheckIcon"
                      tabler="IconCircleCheck"
                      hugeicons="CheckmarkCircle02Icon"
                      phosphor="CheckCircleIcon"
                      remixicon="RiCheckboxCircleLine"
                      data-icon="inline-start"
                      class="hidden group-data-[checked=true]/badge:inline"
                    />
                    {{ category.label }}
                  </button>
                </Badge>
              </FieldDescription>
            </Field>
            <Field>
              <Alert class="bg-muted">
                <IconPlaceholder
                  lucide="LightbulbIcon"
                  tabler="IconBulb"
                  hugeicons="BulbIcon"
                  phosphor="LightbulbIcon"
                  remixicon="RiLightbulbLine"
                />
                <AlertDescription class="text-xs">
                  Projects keep chats, files, and custom instructions in one
                  place. Use them for ongoing work, or just to keep things tidy.
                </AlertDescription>
              </Alert>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </Example>
  </ExampleWrapper>
</template>
