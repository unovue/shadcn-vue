<script setup lang="ts">
import { IconInfoCircle, IconStar } from '@tabler/icons-vue'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/registry/new-york-v4/ui/input-group'
import { Label } from '@/registry/new-york-v4/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/registry/new-york-v4/ui/popover'

const isFavorite = ref(false)
</script>

<template>
  <div class="grid w-full max-w-sm gap-6">
    <Label for="input-secure-19" class="sr-only">
      Input Secure
    </Label>
    <InputGroup class="[--radius:9999px]">
      <InputGroupInput id="input-secure-19" class="!pl-0.5" />
      <Popover>
        <PopoverTrigger as-child>
          <InputGroupAddon>
            <InputGroupButton
              variant="secondary"
              size="icon-xs"
              aria-label="Info"
            >
              <IconInfoCircle />
            </InputGroupButton>
          </InputGroupAddon>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          :align-offset="10"
          class="flex flex-col gap-1 rounded-xl text-sm"
        >
          <p class="font-medium">
            Your connection is not secure.
          </p>
          <p>You should not enter any sensitive information on this site.</p>
        </PopoverContent>
      </Popover>
      <InputGroupAddon class="text-muted-foreground !pl-1">
        https://
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          aria-label="Favorite"
          @click="isFavorite = !isFavorite"
        >
          <IconStar
            :data-favorite="isFavorite"
            class="data-[favorite=true]:fill-primary data-[favorite=true]:stroke-primary"
          />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </div>
</template>
