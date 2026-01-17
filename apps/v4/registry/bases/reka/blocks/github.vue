<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/reka/components/example"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/bases/reka/ui/avatar"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/bases/reka/ui/command"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/bases/reka/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  FieldDescription,
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
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/registry/bases/reka/ui/item"
import { Kbd } from "@/registry/bases/reka/ui/kbd"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/bases/reka/ui/popover"
import { Separator } from "@/registry/bases/reka/ui/separator"
import { Spinner } from "@/registry/bases/reka/ui/spinner"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/bases/reka/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/bases/reka/ui/tooltip"

// State
const isCreatingCodespace = ref(false)
const selectedBranch = ref("main")

function createCodespace() {
  isCreatingCodespace.value = true
  setTimeout(() => {
    isCreatingCodespace.value = false
  }, 2000)
}

const branches = [
  "main",
  "develop",
  "feature/123",
  "feature/user-authentication",
  "feature/dashboard-redesign",
  "bugfix/login-error",
  "hotfix/security-patch",
  "release/v2.0.0",
  "feature/api-integration",
  "bugfix/memory-leak",
  "feature/dark-mode",
  "feature/responsive-design",
  "bugfix/typo-fix",
  "feature/search-functionality",
  "release/v1.9.0",
]

const menuItems = [
  { icon: { lucide: "HomeIcon", tabler: "IconHome", hugeicons: "HomeIcon", phosphor: "HouseIcon", remixicon: "RiHomeLine" }, label: "Home" },
  { icon: { lucide: "CircleIcon", tabler: "IconCircle", hugeicons: "CircleIcon", phosphor: "CircleIcon", remixicon: "RiCircleLine" }, label: "Issues" },
  { icon: { lucide: "GitBranchIcon", tabler: "IconGitBranch", hugeicons: "GitBranchIcon", phosphor: "GitBranchIcon", remixicon: "RiGitBranchLine" }, label: "Pull requests" },
  { icon: { lucide: "LayoutGridIcon", tabler: "IconLayoutGrid", hugeicons: "GridIcon", phosphor: "GridFourIcon", remixicon: "RiGridLine" }, label: "Projects" },
  { icon: { lucide: "MailIcon", tabler: "IconMail", hugeicons: "MailIcon", phosphor: "EnvelopeIcon", remixicon: "RiMailLine" }, label: "Discussions" },
  { icon: { lucide: "ServerIcon", tabler: "IconServer", hugeicons: "ServerStackIcon", phosphor: "HardDrivesIcon", remixicon: "RiHardDriveLine" }, label: "Codespaces" },
  { icon: { lucide: "BotIcon", tabler: "IconRobot", hugeicons: "RoboticIcon", phosphor: "RobotIcon", remixicon: "RiRobotLine" }, label: "Copilot" },
  { icon: { lucide: "SparklesIcon", tabler: "IconSparkles", hugeicons: "SparklesIcon", phosphor: "SparkleIcon", remixicon: "RiSparklingLine" }, label: "Spark" },
]

const contributors = [
  { name: "shadcn", image: "/avatars/01.png", commits: 1234 },
  { name: "vercel", image: "/avatars/02.png", commits: 567 },
  { name: "github", image: "/avatars/03.png", commits: 89 },
]
</script>

<template>
  <ExampleWrapper>
    <!-- Codespaces Card -->
    <Example title="Codespaces" class="min-h-[550px] lg:p-12">
      <Card class="mx-auto w-full max-w-sm" size="sm">
        <CardContent>
          <Tabs default-value="codespaces">
            <TabsList class="w-full">
              <TabsTrigger value="codespaces">
                Codespaces
              </TabsTrigger>
              <TabsTrigger value="local">
                Local
              </TabsTrigger>
            </TabsList>
            <TabsContent value="codespaces">
              <Item size="sm" class="px-1 pt-2">
                <ItemContent>
                  <ItemTitle>Codespaces</ItemTitle>
                  <ItemDescription>
                    Your workspaces in the cloud
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Tooltip>
                    <TooltipTrigger :as-child="true">
                      <Button variant="ghost" size="icon-sm">
                        <IconPlaceholder
                          lucide="PlusIcon"
                          tabler="IconPlus"
                          hugeicons="PlusSignIcon"
                          phosphor="PlusIcon"
                          remixicon="RiAddLine"
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      Create a codespace on main
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenu>
                    <Tooltip>
                      <TooltipTrigger :as-child="true">
                        <DropdownMenuTrigger :as-child="true">
                          <Button variant="ghost" size="icon-sm">
                            <IconPlaceholder
                              lucide="MoreHorizontalIcon"
                              tabler="IconDots"
                              hugeicons="MoreHorizontalCircle01Icon"
                              phosphor="DotsThreeOutlineIcon"
                              remixicon="RiMoreLine"
                            />
                          </Button>
                        </DropdownMenuTrigger>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        Codespace repository configuration
                      </TooltipContent>
                    </Tooltip>
                    <DropdownMenuContent align="end" class="w-56">
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="PlusIcon"
                          tabler="IconPlus"
                          hugeicons="PlusSignIcon"
                          phosphor="PlusIcon"
                          remixicon="RiAddLine"
                        />
                        New with options...
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="ContainerIcon"
                          tabler="IconBox"
                          hugeicons="CubeIcon"
                          phosphor="CubeIcon"
                          remixicon="RiBox1Line"
                        />
                        Configure dev container
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="ZapIcon"
                          tabler="IconBolt"
                          hugeicons="ZapIcon"
                          phosphor="LightningIcon"
                          remixicon="RiFlashlightLine"
                        />
                        Set up prebuilds
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="ServerIcon"
                          tabler="IconServer"
                          hugeicons="ServerStackIcon"
                          phosphor="HardDrivesIcon"
                          remixicon="RiHardDriveLine"
                        />
                        Manage codespaces
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="ShareIcon"
                          tabler="IconShare2"
                          hugeicons="Share03Icon"
                          phosphor="ShareIcon"
                          remixicon="RiShareLine"
                        />
                        Share deep link
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <IconPlaceholder
                          lucide="InfoIcon"
                          tabler="IconInfoCircle"
                          hugeicons="AlertCircleIcon"
                          phosphor="InfoIcon"
                          remixicon="RiInformationLine"
                        />
                        What are codespaces?
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </ItemActions>
              </Item>
              <Separator class="-mx-2 my-2 w-auto!" />
              <Empty class="p-4">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <IconPlaceholder
                      lucide="ServerIcon"
                      tabler="IconServer"
                      hugeicons="ServerStackIcon"
                      phosphor="HardDrivesIcon"
                      remixicon="RiHardDriveLine"
                    />
                  </EmptyMedia>
                  <EmptyTitle>No codespaces</EmptyTitle>
                  <EmptyDescription>
                    You don't have any codespaces with this repository checked out
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button
                    size="sm"
                    :disabled="isCreatingCodespace"
                    @click="createCodespace"
                  >
                    <Spinner v-if="isCreatingCodespace" data-icon="inline-start" />
                    Create Codespace
                  </Button>
                  <a
                    href="#learn-more"
                    class="text-muted-foreground text-xs underline underline-offset-4"
                  >
                    Learn more about codespaces
                  </a>
                </EmptyContent>
              </Empty>
              <Separator class="-mx-2 my-2 w-auto!" />
              <div class="text-muted-foreground p-1.5 text-xs">
                Codespace usage for this repository is paid for by
                <span class="font-medium">shadcn</span>.
              </div>
            </TabsContent>
            <TabsContent value="local">
              <Tabs default-value="https">
                <TabsList
                  variant="line"
                  class="w-full justify-start border-b *:[button]:flex-0"
                >
                  <TabsTrigger value="https">
                    HTTPS
                  </TabsTrigger>
                  <TabsTrigger value="ssh">
                    SSH
                  </TabsTrigger>
                  <TabsTrigger value="cli">
                    GitHub CLI
                  </TabsTrigger>
                </TabsList>
                <div class="bg-muted/30 rounded-md border p-2">
                  <TabsContent value="https">
                    <Field class="gap-2">
                      <FieldLabel for="https-url" class="sr-only">
                        HTTPS URL
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton variant="ghost" size="icon-xs">
                            <IconPlaceholder
                              lucide="CopyIcon"
                              tabler="IconCopy"
                              hugeicons="Copy01Icon"
                              phosphor="CopyIcon"
                              remixicon="RiFileCopyLine"
                            />
                          </InputGroupButton>
                        </InputGroupAddon>
                        <InputGroupInput
                          id="https-url"
                          model-value="https://github.com/shadcn-ui/ui.git"
                          readonly
                        />
                      </InputGroup>
                      <FieldDescription>
                        Clone using the web URL.
                      </FieldDescription>
                    </Field>
                  </TabsContent>
                  <TabsContent value="ssh">
                    <Field class="gap-2">
                      <FieldLabel for="ssh-url" class="sr-only">
                        SSH URL
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton variant="ghost" size="icon-xs">
                            <IconPlaceholder
                              lucide="CopyIcon"
                              tabler="IconCopy"
                              hugeicons="Copy01Icon"
                              phosphor="CopyIcon"
                              remixicon="RiFileCopyLine"
                            />
                          </InputGroupButton>
                        </InputGroupAddon>
                        <InputGroupInput
                          id="ssh-url"
                          model-value="git@github.com:shadcn-ui/ui.git"
                          readonly
                        />
                      </InputGroup>
                      <FieldDescription>
                        Use a password-protected SSH key.
                      </FieldDescription>
                    </Field>
                  </TabsContent>
                  <TabsContent value="cli">
                    <Field class="gap-2">
                      <FieldLabel for="cli-command" class="sr-only">
                        CLI Command
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton variant="ghost" size="icon-xs">
                            <IconPlaceholder
                              lucide="CopyIcon"
                              tabler="IconCopy"
                              hugeicons="Copy01Icon"
                              phosphor="CopyIcon"
                              remixicon="RiFileCopyLine"
                            />
                          </InputGroupButton>
                        </InputGroupAddon>
                        <InputGroupInput
                          id="cli-command"
                          model-value="gh repo clone shadcn-ui/ui"
                          readonly
                        />
                      </InputGroup>
                      <FieldDescription>
                        Work fast with our official CLI.
                        <a href="#learn-more">Learn more</a>
                      </FieldDescription>
                    </Field>
                  </TabsContent>
                </div>
              </Tabs>
              <Separator class="-mx-2 my-2 w-auto!" />
              <div class="flex flex-col">
                <Button
                  variant="ghost"
                  size="sm"
                  class="justify-start gap-1.5"
                >
                  <IconPlaceholder
                    lucide="MonitorIcon"
                    tabler="IconDeviceDesktop"
                    hugeicons="ComputerIcon"
                    phosphor="MonitorIcon"
                    remixicon="RiComputerLine"
                    data-icon="inline-start"
                  />
                  Open with GitHub Desktop
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  class="justify-start gap-1.5"
                >
                  <IconPlaceholder
                    lucide="DownloadIcon"
                    tabler="IconDownload"
                    hugeicons="DownloadIcon"
                    phosphor="DownloadIcon"
                    remixicon="RiDownloadLine"
                    data-icon="inline-start"
                  />
                  Download ZIP
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </Example>

    <!-- Repository Toolbar -->
    <Example title="Repository Toolbar">
      <div class="flex items-center gap-2">
        <InputGroup>
          <InputGroupInput placeholder="Go to file" />
          <InputGroupAddon align="inline-start">
            <InputGroupButton variant="ghost" size="icon-xs">
              <IconPlaceholder
                lucide="SearchIcon"
                tabler="IconSearch"
                hugeicons="SearchIcon"
                phosphor="MagnifyingGlassIcon"
                remixicon="RiSearchLine"
              />
            </InputGroupButton>
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>t</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <DropdownMenu>
          <DropdownMenuTrigger :as-child="true">
            <Button variant="outline">
              Add File
              <IconPlaceholder
                lucide="ChevronDownIcon"
                tabler="IconChevronDown"
                hugeicons="ArrowDown01Icon"
                phosphor="CaretDownIcon"
                remixicon="RiArrowDownSLine"
                data-icon="inline-end"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="PlusIcon"
                tabler="IconPlus"
                hugeicons="PlusSignIcon"
                phosphor="PlusIcon"
                remixicon="RiAddLine"
              />
              Create new file
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="UploadIcon"
                hugeicons="Upload01Icon"
                tabler="IconUpload"
                phosphor="UploadIcon"
                remixicon="RiUploadLine"
              />
              Upload files
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Popover>
          <Tooltip>
            <TooltipTrigger :as-child="true">
              <PopoverTrigger :as-child="true">
                <Button variant="outline" size="icon">
                  <IconPlaceholder
                    lucide="CloudCogIcon"
                    hugeicons="AiCloud01Icon"
                    tabler="IconCloudCog"
                    phosphor="CloudArrowUpIcon"
                    remixicon="RiUploadCloudLine"
                  />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>New Agent Task</TooltipContent>
          </Tooltip>
          <PopoverContent class="w-80">
            <Field>
              <FieldLabel for="new-agent-task">
                New Agent Task
              </FieldLabel>
              <InputGroup>
                <InputGroupTextarea placeholder="Describe your task in natural language." />
                <InputGroupAddon align="block-end">
                  <Popover>
                    <Tooltip>
                      <PopoverTrigger :as-child="true">
                        <TooltipTrigger :as-child="true">
                          <InputGroupButton variant="outline" size="icon-sm">
                            <IconPlaceholder
                              lucide="GitBranchIcon"
                              hugeicons="GitBranchIcon"
                              tabler="IconGitBranch"
                              phosphor="GitBranchIcon"
                              remixicon="RiGitBranchLine"
                            />
                          </InputGroupButton>
                        </TooltipTrigger>
                      </PopoverTrigger>
                      <TooltipContent>Select a branch</TooltipContent>
                    </Tooltip>
                    <PopoverContent side="bottom" align="start" class="p-1">
                      <Field>
                        <FieldLabel for="select-branch" class="sr-only">
                          Select a Branch
                        </FieldLabel>
                        <Command>
                          <CommandInput id="select-branch" placeholder="Find a branch" />
                          <CommandEmpty>No branches found</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              <CommandItem
                                v-for="branch in branches"
                                :key="branch"
                                :value="branch"
                                :data-checked="selectedBranch === branch"
                                @select="selectedBranch = branch"
                              >
                                {{ branch }}
                              </CommandItem>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </Field>
                    </PopoverContent>
                  </Popover>
                  <Tooltip>
                    <TooltipTrigger :as-child="true">
                      <InputGroupButton
                        variant="ghost"
                        size="icon-sm"
                        class="ml-auto"
                      >
                        <IconPlaceholder
                          lucide="SendIcon"
                          hugeicons="SentIcon"
                          tabler="IconSend"
                          phosphor="PaperPlaneTiltIcon"
                          remixicon="RiSendPlaneLine"
                        />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent class="flex items-center gap-2 pr-2">
                      Start Task <Kbd>⏎</Kbd>
                    </TooltipContent>
                  </Tooltip>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </PopoverContent>
        </Popover>
      </div>
    </Example>

    <!-- Account Menu / Navbar -->
    <Example title="Account Menu">
      <header class="flex h-14 w-full items-center gap-2">
        <Drawer direction="left">
          <DrawerTrigger :as-child="true">
            <Button variant="outline" size="icon">
              <IconPlaceholder
                lucide="MenuIcon"
                hugeicons="Menu09Icon"
                tabler="IconMenu"
                phosphor="ListIcon"
                remixicon="RiListUnordered"
              />
              <span class="sr-only">Open menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent class="max-w-72">
            <DrawerHeader class="flex flex-row items-center justify-between px-5 pb-0">
              <DrawerTitle>Menu</DrawerTitle>
              <DrawerClose :as-child="true">
                <Button variant="ghost" size="icon-sm">
                  <IconPlaceholder
                    lucide="XIcon"
                    tabler="IconX"
                    hugeicons="Cancel01Icon"
                    phosphor="XIcon"
                    remixicon="RiCloseLine"
                  />
                  <span class="sr-only">Close</span>
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <div class="p-2">
              <ItemGroup class="gap-px">
                <Item
                  v-for="item in menuItems"
                  :key="item.label"
                  :as-child="true"
                  size="xs"
                >
                  <a href="#">
                    <ItemMedia variant="icon">
                      <IconPlaceholder
                        :lucide="item.icon.lucide"
                        :tabler="item.icon.tabler"
                        :hugeicons="item.icon.hugeicons"
                        :phosphor="item.icon.phosphor"
                        :remixicon="item.icon.remixicon"
                      />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{{ item.label }}</ItemTitle>
                    </ItemContent>
                  </a>
                </Item>
                <ItemSeparator />
                <Item :as-child="true" size="xs">
                  <a href="#">
                    <ItemMedia variant="icon">
                      <IconPlaceholder
                        lucide="SearchIcon"
                        tabler="IconSearch"
                        hugeicons="SearchIcon"
                        phosphor="MagnifyingGlassIcon"
                        remixicon="RiSearchLine"
                      />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Explore</ItemTitle>
                    </ItemContent>
                  </a>
                </Item>
                <Item :as-child="true" size="xs">
                  <a href="#">
                    <ItemMedia variant="icon">
                      <IconPlaceholder
                        lucide="ShoppingBagIcon"
                        tabler="IconShoppingBag"
                        hugeicons="ShoppingBasket01Icon"
                        phosphor="BagIcon"
                        remixicon="RiShoppingBagLine"
                      />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>Marketplace</ItemTitle>
                    </ItemContent>
                  </a>
                </Item>
              </ItemGroup>
            </div>
          </DrawerContent>
        </Drawer>
        <div class="flex-1" />
        <DropdownMenu>
          <DropdownMenuTrigger :as-child="true">
            <Button variant="ghost" size="icon" class="rounded-full">
              <Avatar size="xs">
                <AvatarImage src="/avatars/01.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-56">
            <DropdownMenuLabel class="font-normal">
              <div class="flex flex-col space-y-1">
                <p class="text-sm font-medium leading-none">
                  shadcn
                </p>
                <p class="text-muted-foreground text-xs leading-none">
                  m@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="UserIcon"
                  tabler="IconUser"
                  hugeicons="User02Icon"
                  phosphor="UserIcon"
                  remixicon="RiUserLine"
                />
                Your profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="BookIcon"
                  tabler="IconBook"
                  hugeicons="BookIcon"
                  phosphor="BookIcon"
                  remixicon="RiBookLine"
                />
                Your repositories
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="LayoutGridIcon"
                  tabler="IconLayoutGrid"
                  hugeicons="GridIcon"
                  phosphor="GridFourIcon"
                  remixicon="RiGridLine"
                />
                Your projects
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconPlaceholder
                  lucide="StarIcon"
                  tabler="IconStar"
                  hugeicons="Star01Icon"
                  phosphor="StarIcon"
                  remixicon="RiStarLine"
                />
                Your stars
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="SettingsIcon"
                tabler="IconSettings"
                hugeicons="Settings01Icon"
                phosphor="GearIcon"
                remixicon="RiSettingsLine"
              />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="LogOutIcon"
                tabler="IconLogout"
                hugeicons="Logout01Icon"
                phosphor="SignOutIcon"
                remixicon="RiLogoutBoxLine"
              />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </Example>

    <!-- Contributors -->
    <Example title="Contributors">
      <Card class="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Contributors</CardTitle>
          <CardDescription>
            People who have contributed to this repository
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ItemGroup>
            <Item
              v-for="contributor in contributors"
              :key="contributor.name"
              size="sm"
            >
              <ItemMedia>
                <Avatar size="sm">
                  <AvatarImage :src="contributor.image" :alt="contributor.name" />
                  <AvatarFallback>{{ contributor.name[0].toUpperCase() }}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{{ contributor.name }}</ItemTitle>
                <ItemDescription>{{ contributor.commits }} commits</ItemDescription>
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
          </ItemGroup>
        </CardContent>
        <CardFooter>
          <Button variant="outline" class="w-full">
            View all contributors
          </Button>
        </CardFooter>
      </Card>
    </Example>
  </ExampleWrapper>
</template>
