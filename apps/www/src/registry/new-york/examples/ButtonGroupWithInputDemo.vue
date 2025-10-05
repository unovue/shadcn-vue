<script setup lang="ts">
import { SearchIcon } from "lucide-vue-next"
import { Button } from "@/registry/new-york/ui/button"
import { ButtonGroup } from "@/registry/new-york/ui/button-group"
import { Input } from "@/registry/new-york/ui/input"
</script>

<template>
  <ButtonGroup>
    <Input placeholder="Search..." />
    <Button variant="outline" aria-label="Search">
      <SearchIcon />
    </Button>
  </ButtonGroup>
</template>
