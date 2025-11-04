<script setup lang="ts">
import { SearchIcon } from "lucide-vue-next"
import { Button } from "@/registry/default/ui/button"
import { ButtonGroup } from "@/registry/default/ui/button-group"
import { Input } from "@/registry/default/ui/input"
</script>

<template>
  <ButtonGroup>
    <Input placeholder="Search..." />
    <Button variant="outline" aria-label="Search">
      <SearchIcon />
    </Button>
  </ButtonGroup>
</template>
