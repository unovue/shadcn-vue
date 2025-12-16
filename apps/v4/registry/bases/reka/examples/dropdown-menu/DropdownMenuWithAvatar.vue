<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/reka/components/example"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/bases/reka/ui/avatar"
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
  <Example title="With Avatar">
    <div class="flex items-center justify-between gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger :as-child="true">
          <Button
            variant="outline"
            class="h-12 justify-start px-2 md:max-w-[200px]"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
              <AvatarFallback class="rounded-lg">
                CN
              </AvatarFallback>
            </Avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">shadcn</span>
              <span class="truncate text-xs text-muted-foreground">
                shadcn@example.com
              </span>
            </div>
            <IconPlaceholder
              lucide="ChevronsUpDownIcon"
              tabler="IconSelector"
              hugeicons="UnfoldMoreIcon"
              class="ml-auto text-muted-foreground"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-(--radix-dropdown-menu-trigger-width) min-w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="BadgeCheckIcon"
                tabler="IconRosetteDiscountCheck"
                hugeicons="CheckmarkBadgeIcon"
              />
              Account
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
                lucide="BellIcon"
                tabler="IconBell"
                hugeicons="NotificationIcon"
              />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="LogOutIcon"
                tabler="IconLogout"
                hugeicons="LogoutIcon"
              />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger :as-child="true">
          <Button variant="ghost" size="icon" class="rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="top">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="BadgeCheckIcon"
                tabler="IconRosetteDiscountCheck"
                hugeicons="CheckmarkBadgeIcon"
              />
              Account
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
                lucide="BellIcon"
                tabler="IconBell"
                hugeicons="NotificationIcon"
              />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <IconPlaceholder
                lucide="LogOutIcon"
                tabler="IconLogout"
                hugeicons="LogoutIcon"
              />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </Example>
</template>
