<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import { Card, CardContent } from "@/registry/bases/reka/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
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
} from "@/registry/bases/reka/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/registry/bases/reka/ui/item"
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

const isCreatingCodespace = ref(false)

function createCodespace() {
  isCreatingCodespace.value = true
  setTimeout(() => {
    isCreatingCodespace.value = false
  }, 2000)
}
</script>

<template>
  <Card>
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
              <ItemDescription>Your workspaces in the cloud</ItemDescription>
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
                <DropdownMenuContent align="end" class="w-56">
                  <DropdownMenuGroup>
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
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
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
                  </DropdownMenuGroup>
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
                class="text-xs text-muted-foreground underline underline-offset-4"
              >
                Learn more about codespaces
              </a>
            </EmptyContent>
          </Empty>
          <Separator class="-mx-2 my-2 w-auto!" />
          <div class="p-1.5 text-xs text-muted-foreground">
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
            <div class="rounded-md border bg-muted/30 p-2">
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
</template>
