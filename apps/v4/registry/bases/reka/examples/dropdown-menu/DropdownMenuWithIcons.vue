<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/bases/reka/ui/dropdown-menu"
</script>

<template>
  <Example title="With Icons">
    <DropdownMenu>
      <DropdownMenuTrigger :as-child="true">
        <Button variant="outline" class="w-fit">
          Open
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconPlaceholder
              lucide="UserIcon"
              tabler="IconUser"
              hugeicons="UserIcon"
            />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPlaceholder
              lucide="CreditCardIcon"
              tabler="IconCreditCard"
              hugeicons="CreditCardIcon"
            />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPlaceholder
              lucide="SettingsIcon"
              tabler="IconSettings"
              hugeicons="SettingsIcon"
            />
            Settings
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
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </Example>
</template>
