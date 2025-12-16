<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Tabs, TabsList, TabsTrigger } from "@/registry/bases/reka/ui/tabs"
</script>

<template>
  <Tabs default-value="home">
    <TabsList>
      <TabsTrigger value="home">
        <IconPlaceholder
          lucide="HomeIcon"
          tabler="IconHome"
          hugeicons="HomeIcon"
        />
      </TabsTrigger>
      <TabsTrigger value="search">
        <IconPlaceholder
          lucide="SearchIcon"
          tabler="IconSearch"
          hugeicons="SearchIcon"
        />
      </TabsTrigger>
      <TabsTrigger value="settings">
        <IconPlaceholder
          lucide="SettingsIcon"
          tabler="IconSettings"
          hugeicons="SettingsIcon"
        />
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
