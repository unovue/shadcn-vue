<script setup lang="ts">
import {
  IconApps,
  IconArrowUp,
  IconAt,
  IconBook,
  IconCircleDashedPlus,
  IconPaperclip,
  IconPlus,
  IconWorld,
  IconX,
} from '@tabler/icons-vue'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/registry/new-york-v4/ui/avatar'
import { Badge } from '@/registry/new-york-v4/ui/badge'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/registry/new-york-v4/ui/command'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/registry/new-york-v4/ui/dropdown-menu'
import { Field, FieldLabel } from '@/registry/new-york-v4/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@/registry/new-york-v4/ui/input-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/registry/new-york-v4/ui/popover'
import { Switch } from '@/registry/new-york-v4/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/registry/new-york-v4/ui/tooltip'

const SAMPLE_DATA = {
  mentionable: [
    {
      type: 'page',
      title: 'Meeting Notes',
      image: '📝',
    },
    {
      type: 'page',
      title: 'Project Dashboard',
      image: '📊',
    },
    {
      type: 'page',
      title: 'Ideas & Brainstorming',
      image: '💡',
    },
    {
      type: 'page',
      title: 'Calendar & Events',
      image: '📅',
    },
    {
      type: 'page',
      title: 'Documentation',
      image: '📚',
    },
    {
      type: 'page',
      title: 'Goals & Objectives',
      image: '🎯',
    },
    {
      type: 'page',
      title: 'Budget Planning',
      image: '💰',
    },
    {
      type: 'page',
      title: 'Team Directory',
      image: '👥',
    },
    {
      type: 'page',
      title: 'Technical Specs',
      image: '🔧',
    },
    {
      type: 'page',
      title: 'Analytics Report',
      image: '📈',
    },
    {
      type: 'user',
      title: 'shadcn',
      image: 'https://github.com/shadcn.png',
      workspace: 'Workspace',
    },
    {
      type: 'user',
      title: 'maxleiter',
      image: 'https://github.com/maxleiter.png',
      workspace: 'Workspace',
    },
    {
      type: 'user',
      title: 'evilrabbit',
      image: 'https://github.com/evilrabbit.png',
      workspace: 'Workspace',
    },
  ],
  models: [
    {
      name: 'Auto',
    },
    {
      name: 'Agent Mode',
      badge: 'Beta',
    },
    {
      name: 'Plan Mode',
    },
  ],
}

const mentions = ref<string[]>([])
const mentionPopoverOpen = ref(false)
const modelPopoverOpen = ref(false)
const selectedModel = ref(SAMPLE_DATA.models[0])
const scopeMenuOpen = ref(false)

const grouped = computed(() => {
  return SAMPLE_DATA.mentionable.reduce(
    (acc, item) => {
      const isAvailable = !mentions.value.includes(item.title)

      if (isAvailable) {
        if (!acc[item.type]) {
          acc[item.type] = []
        }
        acc[item.type]?.push(item)
      }
      return acc
    },
    {} as Record<string, typeof SAMPLE_DATA.mentionable>,
  )
})

const mentionsReference = computed(() => {
  return mentions.value.map((mention) => {
    const item = SAMPLE_DATA.mentionable.find(
      item => item.title === mention,
    )
    return {
      mention,
      item,
    }
  }).filter(reference => !!reference.item)
})

const hasMentions = computed(() => mentions.value.length > 0)
</script>

<template>
  <form class="[--radius:1.2rem]">
    <Field>
      <FieldLabel for="notion-prompt" class="sr-only">
        Prompt
      </FieldLabel>
      <InputGroup>
        <InputGroupTextarea
          id="notion-prompt"
          placeholder="Ask, search, or make anything..."
        />
        <InputGroupAddon align="block-start">
          <Popover v-model:open="mentionPopoverOpen">
            <Tooltip>
              <TooltipTrigger
                as-child
                @focus.capture.stop
              >
                <PopoverTrigger as-child>
                  <InputGroupButton
                    variant="outline"
                    :size="!hasMentions ? 'sm' : 'icon-sm'"
                    class="rounded-full transition-transform"
                  >
                    <IconAt /> {{ !hasMentions && "Add context" }}
                  </InputGroupButton>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>Mention a person, page, or date</TooltipContent>
            </Tooltip>
            <PopoverContent class="p-0 [--radius:1.2rem]" align="start">
              <Command>
                <CommandInput placeholder="Search pages..." />
                <CommandList>
                  <CommandEmpty>No pages found</CommandEmpty>
                  <CommandGroup
                    v-for="([type, items]) of Object.entries(grouped)"
                    :key="type"
                    :heading="type === 'page' ? 'Pages' : 'Users'"
                  >
                    <CommandItem
                      v-for="item in items"
                      :key="item.title"
                      :value="item.title"
                      @select="(event) => {
                        mentions = [...mentions, event.detail.value as string]
                        mentionPopoverOpen = false
                      }"
                    >
                      <span v-if="item.type === 'page'" class="flex size-4 items-center justify-center">
                        {{ item.image }}
                      </span>
                      <Avatar v-else class="size-4">
                        <AvatarImage :src="item.image" />
                        <AvatarFallback>{{ item.title[0] }}</AvatarFallback>
                      </Avatar>

                      {{ item.title }}
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <div class="no-scrollbar -m-1.5 flex gap-1 overflow-y-auto p-1.5">
            <template v-for="{ mention, item } in mentionsReference" :key="mention">
              <InputGroupButton
                v-if="item"
                size="sm"
                variant="secondary"
                class="rounded-full !pl-2"
                @click="() => {
                  mentions = [...mentions].filter(m => m !== mention)
                }"
              >
                <span v-if="item.type === 'page'" class="flex size-4 items-center justify-center">
                  {{ item.image }}
                </span>
                <Avatar v-else class="size-4">
                  <AvatarImage :src="item.image" />
                  <AvatarFallback>{{ item.title[0] }}</AvatarFallback>
                </Avatar>
                {{ item.title }}
                <IconX />
              </InputGroupButton>
            </template>
          </div>
        </InputGroupAddon>
        <InputGroupAddon align="block-end" class="gap-1">
          <Tooltip>
            <TooltipTrigger as-child>
              <InputGroupButton
                size="icon-sm"
                class="rounded-full"
                aria-label="Attach file"
              >
                <IconPaperclip />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>Attach file</TooltipContent>
          </Tooltip>
          <DropdownMenu v-model:open="modelPopoverOpen">
            <Tooltip>
              <TooltipTrigger as-child>
                <DropdownMenuTrigger as-child>
                  <InputGroupButton size="sm" class="rounded-full">
                    {{ selectedModel?.name }}
                  </InputGroupButton>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Select AI model</TooltipContent>
            </Tooltip>
            <DropdownMenuContent
              side="top"
              align="start"
              class="[--radius:1rem]"
            >
              <DropdownMenuGroup class="w-42">
                <DropdownMenuLabel class="text-muted-foreground text-xs">
                  Select Agent Mode
                </DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  v-for="model in SAMPLE_DATA.models"
                  :key="model.name"
                  :model-value="model.name === selectedModel?.name"
                  class="pl-2 *:[span:first-child]:right-2 *:[span:first-child]:left-auto"
                  @update:model-value="(checked) => {
                    if (checked) {
                      selectedModel = model
                    }
                  }"
                >
                  {{ model.name }}
                  <Badge
                    v-if="model.badge"
                    variant="secondary"
                    class="h-5 rounded-sm bg-blue-100 px-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                  >
                    {{ model.badge }}
                  </Badge>
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu v-model:open="scopeMenuOpen">
            <DropdownMenuTrigger as-child>
              <InputGroupButton size="sm" class="rounded-full">
                <IconWorld /> All Sources
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="end"
              class="[--radius:1rem]"
            >
              <DropdownMenuGroup>
                <DropdownMenuItem
                  as-child
                  @select.prevent
                >
                  <label for="web-search">
                    <IconWorld /> Web Search
                    <Switch
                      id="web-search"
                      class="ml-auto"
                      :default-value="true"
                    />
                  </label>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  as-child
                  @select.prevent
                >
                  <label for="apps">
                    <IconApps /> Apps and Integrations
                    <Switch id="apps" class="ml-auto" :default-value="true" />
                  </label>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconCircleDashedPlus /> All Sources I can access
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Avatar class="size-4">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    shadcn
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent class="w-72 p-0 [--radius:1rem]">
                    <Command>
                      <CommandInput
                        placeholder="Find or use knowledge in..."
                        auto-focus
                      />
                      <CommandList>
                        <CommandEmpty>No knowledge found</CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            v-for="user in SAMPLE_DATA.mentionable
                              .filter((item) => item.type === 'user')"
                            :key="user.title"
                            :value="user.title"
                            @select="() => {
                              // Handle user selection here
                              console.log('Selected user:', user.title)
                            }"
                          >
                            <Avatar class="size-4">
                              <AvatarImage :src="user.image" />
                              <AvatarFallback>
                                {{ user.title[0] }}
                              </AvatarFallback>
                            </Avatar>
                            {{ user.title }}
                            <span class="text-muted-foreground">
                              - {{ user.workspace }}
                            </span>
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  <IconBook /> Help Center
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconPlus /> Connect Apps
                </DropdownMenuItem>
                <DropdownMenuLabel class="text-muted-foreground text-xs">
                  We'll only search in the sources selected here.
                </DropdownMenuLabel>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupButton
            aria-label="Send"
            class="ml-auto rounded-full"
            variant="default"
            size="icon-sm"
          >
            <IconArrowUp />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  </form>
</template>
