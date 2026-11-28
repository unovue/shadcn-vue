<script setup lang="ts">
import { ref } from "vue"
import { ButtonGroup } from "@/registry/bases/vase/ui/button-group"
import { Input } from "@/registry/bases/vase/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/vase/ui/select"
import { Example } from "~/registry/bases/vase/components/example"

const duration = ref("hours")
</script>

<template>
  <Example title="With Select and Input">
    <ButtonGroup>
      <Select v-model="duration" :items="{ hours: 'Hours', days: 'Days', weeks: 'Weeks' }">
        <SelectTrigger id="duration">
          <SelectValue placeholder="Select duration" />
        </SelectTrigger>
        <SelectContent align="start">
          <SelectItem value="hours">
            Hours
          </SelectItem>
          <SelectItem value="days">
            Days
          </SelectItem>
          <SelectItem value="weeks">
            Weeks
          </SelectItem>
        </SelectContent>
      </Select>
      <Input />
    </ButtonGroup>
  </Example>
</template>
