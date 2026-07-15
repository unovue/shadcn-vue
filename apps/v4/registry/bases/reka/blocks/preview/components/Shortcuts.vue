<script setup lang="ts">
import { Card, CardContent } from "@/registry/bases/reka/ui/card"
import {
  Item,
  ItemActions,
  ItemGroup,
  ItemHeader,
  ItemSeparator,
  ItemTitle,
} from "@/registry/bases/reka/ui/item"
import { Kbd } from "@/registry/bases/reka/ui/kbd"

const shortcuts = [
  { label: "Search", keys: ["⌘", "K"] },
  { label: "Quick Actions", keys: ["⌘", "J"] },
  { label: "New File", keys: ["⌘", "N"] },
  { label: "Save", keys: ["⌘", "S"] },
  { label: "Toggle Sidebar", keys: ["⌘", "B"] },
]
</script>

<template>
  <Card>
    <CardContent>
      <div class="flex flex-col gap-3">
        <div class="text-sm font-medium">
          Shortcuts
        </div>
        <ItemGroup class="gap-2 text-muted-foreground" data-size="xs">
          <template
            v-for="({ label, keys }, i) in shortcuts"
            :key="label"
          >
            <ItemSeparator v-if="i > 0" />
            <Item
              variant="default"
              size="xs"
              class="border-0 px-0 py-0"
            >
              <ItemHeader>
                <ItemTitle class="font-normal">
                  {{ label }}
                </ItemTitle>
                <ItemActions>
                  <div class="flex gap-1">
                    <Kbd
                      v-for="key in keys"
                      :key="key"
                    >{{ key }}</Kbd>
                  </div>
                </ItemActions>
              </ItemHeader>
            </Item>
          </template>
        </ItemGroup>
      </div>
    </CardContent>
  </Card>
</template>
