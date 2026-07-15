<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from "@/registry/bases/reka/ui/tabs"
</script>

<template>
  <Tabs default-value="home">
    <TabsList>
      <TabsTrigger value="home">
        Home
      </TabsTrigger>
      <TabsTrigger value="settings">
        Settings
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>
