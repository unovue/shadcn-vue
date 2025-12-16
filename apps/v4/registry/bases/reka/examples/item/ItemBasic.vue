<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/registry/bases/reka/ui/item"
import { Example } from "~/registry/bases/reka/components/example"
</script>

<template>
  <Example title="Basic Item">
    <ItemGroup class="w-full max-w-md">
      <Item>
        <ItemMedia>
          <IconPlaceholder
            lucide="UserIcon"
            tabler="IconUser"
            hugeicons="User02Icon"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>John Doe</ItemTitle>
          <ItemDescription>Software Engineer</ItemDescription>
        </ItemContent>
      </Item>

      <Item>
        <ItemMedia>
          <IconPlaceholder
            lucide="MailIcon"
            tabler="IconMail"
            hugeicons="Mail01Icon"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Email Notifications</ItemTitle>
          <ItemDescription>Receive email updates about your account</ItemDescription>
        </ItemContent>
      </Item>

      <Item>
        <ItemMedia>
          <IconPlaceholder
            lucide="BellIcon"
            tabler="IconBell"
            hugeicons="Notification02Icon"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Push Notifications</ItemTitle>
          <ItemDescription>Receive push notifications on your device</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  </Example>
</template>
