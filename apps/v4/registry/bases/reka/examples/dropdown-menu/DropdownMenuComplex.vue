<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/bases/reka/ui/dropdown-menu"

const notifications = ref({
  email: true,
  sms: false,
  push: true,
})
const theme = ref("light")
</script>

<template>
  <Example title="Complex">
    <DropdownMenu>
      <DropdownMenuTrigger :as-child="true">
        <Button variant="outline" class="w-fit">
          Complex Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="style-maia:w-56 style-mira:w-48 style-nova:w-48 style-vega:w-56 style-lyra:w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>File</DropdownMenuLabel>
          <DropdownMenuItem>
            <IconPlaceholder
              lucide="FileIcon"
              tabler="IconFile"
              hugeicons="FileIcon"
            />
            New File
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPlaceholder
              lucide="FolderIcon"
              tabler="IconFolder"
              hugeicons="FolderIcon"
            />
            New Folder
            <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <IconPlaceholder
                lucide="FolderOpenIcon"
                tabler="IconFolderOpen"
                hugeicons="FolderOpenIcon"
              />
              Open Recent
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="FileCodeIcon"
                    tabler="IconFileCode"
                    hugeicons="CodeIcon"
                  />
                  Project Alpha
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="FileCodeIcon"
                    tabler="IconFileCode"
                    hugeicons="CodeIcon"
                  />
                  Project Beta
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <IconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDots"
                      hugeicons="MoreHorizontalCircle01Icon"
                    />
                    More Projects
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="FileCodeIcon"
                        tabler="IconFileCode"
                        hugeicons="CodeIcon"
                      />
                      Project Gamma
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <IconPlaceholder
                        lucide="FileCodeIcon"
                        tabler="IconFileCode"
                        hugeicons="CodeIcon"
                      />
                      Project Delta
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="FolderSearchIcon"
                    tabler="IconFolderSearch"
                    hugeicons="SearchIcon"
                  />
                  Browse...
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <IconPlaceholder
              lucide="SaveIcon"
              tabler="IconDeviceFloppy"
              hugeicons="FloppyDiskIcon"
            />
            Save
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPlaceholder
              lucide="DownloadIcon"
              tabler="IconDownload"
              hugeicons="DownloadIcon"
            />
            Export
            <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>View</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            v-model:checked="notifications.email"
          >
            <IconPlaceholder
              lucide="EyeIcon"
              tabler="IconEye"
              hugeicons="EyeIcon"
            />
            Show Sidebar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            v-model:checked="notifications.sms"
          >
            <IconPlaceholder
              lucide="LayoutIcon"
              tabler="IconLayout"
              hugeicons="LayoutIcon"
            />
            Show Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <IconPlaceholder
                lucide="PaletteIcon"
                tabler="IconPalette"
                hugeicons="PaintBoardIcon"
              />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuRadioGroup v-model="theme">
                  <DropdownMenuRadioItem value="light">
                    <IconPlaceholder
                      lucide="SunIcon"
                      tabler="IconSun"
                      hugeicons="SunIcon"
                    />
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <IconPlaceholder
                      lucide="MoonIcon"
                      tabler="IconMoon"
                      hugeicons="MoonIcon"
                    />
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    <IconPlaceholder
                      lucide="MonitorIcon"
                      tabler="IconDeviceDesktop"
                      hugeicons="ComputerIcon"
                    />
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <IconPlaceholder
              lucide="UserIcon"
              tabler="IconUser"
              hugeicons="UserIcon"
            />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPlaceholder
              lucide="CreditCardIcon"
              tabler="IconCreditCard"
              hugeicons="CreditCardIcon"
            />
            Billing
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <IconPlaceholder
                lucide="SettingsIcon"
                tabler="IconSettings"
                hugeicons="SettingsIcon"
              />
              Settings
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="KeyboardIcon"
                    tabler="IconKeyboard"
                    hugeicons="KeyboardIcon"
                  />
                  Keyboard Shortcuts
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="LanguagesIcon"
                    tabler="IconLanguage"
                    hugeicons="LanguageCircleIcon"
                  />
                  Language
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <IconPlaceholder
                      lucide="BellIcon"
                      tabler="IconBell"
                      hugeicons="NotificationIcon"
                    />
                    Notifications
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>
                        Notification Types
                      </DropdownMenuLabel>
                      <DropdownMenuCheckboxItem
                        v-model:checked="notifications.push"
                      >
                        <IconPlaceholder
                          lucide="BellIcon"
                          tabler="IconBell"
                          hugeicons="NotificationIcon"
                        />
                        Push Notifications
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        v-model:checked="notifications.email"
                      >
                        <IconPlaceholder
                          lucide="MailIcon"
                          tabler="IconMail"
                          hugeicons="MailIcon"
                        />
                        Email Notifications
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconPlaceholder
                    lucide="ShieldIcon"
                    tabler="IconShield"
                    hugeicons="ShieldIcon"
                  />
                  Privacy & Security
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconPlaceholder
              lucide="HelpCircleIcon"
              tabler="IconHelpCircle"
              hugeicons="HelpCircleIcon"
            />
            Help & Support
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="File01Icon"
            />
            Documentation
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <IconPlaceholder
              lucide="LogOutIcon"
              tabler="IconLogout"
              hugeicons="LogoutIcon"
            />
            Sign Out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </Example>
</template>
