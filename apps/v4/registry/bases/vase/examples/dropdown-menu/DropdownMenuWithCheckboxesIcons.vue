<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Example } from "@/registry/bases/vase/components/example"
import { Button } from "@/registry/bases/vase/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/registry/bases/vase/ui/dropdown-menu"

const notifications = ref({
  email: true,
  sms: false,
  push: true,
})
</script>

<template>
  <Example title="Checkboxes with Icons">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <template #element="{ props, elementRef }">
          <Button v-bind="props" :ref="elementRef" variant="outline" class="w-fit">
            Notifications
          </Button>
        </template>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            v-model="notifications.email"
          >
            <IconPlaceholder
              lucide="MailIcon"
              tabler="IconMail"
              hugeicons="MailIcon"
              phosphor="EnvelopeIcon"
              remixicon="RiMailLine"
            />
            Email notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            v-model="notifications.sms"
          >
            <IconPlaceholder
              lucide="MessageSquareIcon"
              tabler="IconMessage"
              hugeicons="MessageIcon"
              phosphor="ChatIcon"
              remixicon="RiChat1Line"
            />
            SMS notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            v-model="notifications.push"
          >
            <IconPlaceholder
              lucide="BellIcon"
              tabler="IconBell"
              hugeicons="NotificationIcon"
              phosphor="BellIcon"
              remixicon="RiNotification3Line"
            />
            Push notifications
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  </Example>
</template>
