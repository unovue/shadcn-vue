<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york-v4/ui/avatar'
import { Button } from '@/registry/new-york-v4/ui/button'
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxItemIndicator, ComboboxList, ComboboxSeparator, ComboboxTrigger, ComboboxViewport } from '@/registry/new-york-v4/ui/combobox'
import { Check, ChevronDownIcon, ChevronsUpDown, PlusCircleIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]
const value = ref<typeof frameworks[number]>()
const selectedFrameworks = ref<typeof frameworks>([])

const users = [
  { id: '1', username: 'shadcn' },
  { id: '2', username: 'leerob' },
  { id: '3', username: 'evilrabbit' },
] as const

const selectedUser = ref<typeof users[0]>()

const timezones = [
  {
    label: 'Americas',
    timezones: [
      { value: 'America/New_York', label: '(GMT-5) New York' },
      { value: 'America/Los_Angeles', label: '(GMT-8) Los Angeles' },
      { value: 'America/Chicago', label: '(GMT-6) Chicago' },
      { value: 'America/Toronto', label: '(GMT-5) Toronto' },
      { value: 'America/Vancouver', label: '(GMT-8) Vancouver' },
      { value: 'America/Sao_Paulo', label: '(GMT-3) São Paulo' },
    ],
  },
  {
    label: 'Europe',
    timezones: [
      { value: 'Europe/London', label: '(GMT+0) London' },
      { value: 'Europe/Paris', label: '(GMT+1) Paris' },
      { value: 'Europe/Berlin', label: '(GMT+1) Berlin' },
      { value: 'Europe/Rome', label: '(GMT+1) Rome' },
      { value: 'Europe/Madrid', label: '(GMT+1) Madrid' },
      { value: 'Europe/Amsterdam', label: '(GMT+1) Amsterdam' },
    ],
  },
  {
    label: 'Asia/Pacific',
    timezones: [
      { value: 'Asia/Tokyo', label: '(GMT+9) Tokyo' },
      { value: 'Asia/Shanghai', label: '(GMT+8) Shanghai' },
      { value: 'Asia/Singapore', label: '(GMT+8) Singapore' },
      { value: 'Asia/Dubai', label: '(GMT+4) Dubai' },
      { value: 'Australia/Sydney', label: '(GMT+11) Sydney' },
      { value: 'Asia/Seoul', label: '(GMT+9) Seoul' },
    ],
  },
] as const

type Timezone = typeof timezones[0]
const selectedTimezone = ref<Timezone['timezones'][number]>(timezones[0].timezones[0])
const selectedGroup = computed(() => timezones.find(group => group.timezones.find(tz => tz.value === selectedTimezone.value?.value)))
</script>

<template>
  <div class="flex w-full flex-wrap items-start gap-4">
    <Combobox v-model="value" by="label">
      <ComboboxAnchor as-child>
        <ComboboxTrigger as-child>
          <Button variant="outline" class="w-full justify-between md:w-[200px]">
            {{ value?.label ?? 'Select framework...' }}

            <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </ComboboxTrigger>
      </ComboboxAnchor>

      <ComboboxList>
        <ComboboxInput placeholder="Select framework..." />

        <ComboboxEmpty>
          No framework found.
        </ComboboxEmpty>

        <ComboboxGroup>
          <ComboboxItem
            v-for="framework in frameworks"
            :key="framework.value"
            :value="framework"
          >
            {{ framework.label }}

            <ComboboxItemIndicator>
              <Check />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxList>
    </Combobox>

    <Combobox v-model="selectedUser" by="username">
      <ComboboxAnchor as-child>
        <ComboboxTrigger as-child>
          <Button variant="outline" class="justify-between">
            <template v-if="selectedUser">
              <div class="flex items-center gap-2">
                <Avatar class="size-5">
                  <AvatarImage
                    :src="`https://github.com/${selectedUser.username}.png`"
                  />
                  <AvatarFallback>{{ selectedUser.username[0] }}</AvatarFallback>
                </Avatar>
                {{ selectedUser.username }}
              </div>
            </template>
            <template v-else>
              Select user...
            </template>

            <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </ComboboxTrigger>
      </ComboboxAnchor>

      <ComboboxList>
        <ComboboxInput placeholder="Select user..." />

        <ComboboxEmpty>
          No user found.
        </ComboboxEmpty>

        <ComboboxGroup>
          <ComboboxItem
            v-for="user in users"
            :key="user.id"
            :value="user"
          >
            <Avatar class="size-5">
              <AvatarImage
                :src="`https://github.com/${user.username}.png`"
              />
              <AvatarFallback>{{ user.username[0] }}</AvatarFallback>
            </Avatar>
            {{ user.username }}

            <ComboboxItemIndicator>
              <Check />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </ComboboxGroup>
        <ComboboxSeparator />
        <ComboboxGroup>
          <ComboboxItem :value="null">
            <PlusCircleIcon />
            Create user
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxList>
    </Combobox>

    <Combobox v-model="selectedTimezone" by="label">
      <ComboboxAnchor as-child>
        <ComboboxTrigger as-child>
          <Button variant="outline" class="h-12 justify-between px-2.5 w-[200px]">
            <template v-if="selectedTimezone">
              <div class="flex flex-col items-start gap-0.5">
                <span class="text-muted-foreground text-xs font-normal">
                  {{ selectedGroup?.label }}
                </span>
                <span>{{ selectedTimezone.label }}</span>
              </div>
            </template>
            <template v-else>
              Select timezone
            </template>

            <ChevronDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </ComboboxTrigger>
      </ComboboxAnchor>

      <ComboboxList class="w-72" :align="'start'">
        <ComboboxInput placeholder="Select timezone..." />

        <ComboboxViewport class="max-h-[260px]">
          <ComboboxEmpty>
            No timezone found.
          </ComboboxEmpty>

          <ComboboxGroup
            v-for="region in timezones"
            :key="region.label" :heading="region.label"
          >
            <ComboboxItem
              v-for="timezone in region.timezones" :key="timezone.value"
              :value="timezone"
            >
              {{ timezone.label }}

              <ComboboxItemIndicator>
                <Check />
              </ComboboxItemIndicator>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxViewport>

        <ComboboxSeparator />
        <ComboboxGroup class="bg-popover">
          <ComboboxItem :value="null">
            <PlusCircleIcon />
            Create timezone
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxList>
    </Combobox>

    <Combobox
      v-model="selectedFrameworks"
      multiple
      by="label"
    >
      <ComboboxAnchor as-child>
        <ComboboxTrigger as-child>
          <Button variant="outline" class="justify-between w-full">
            {{ selectedFrameworks?.length > 0
              ? selectedFrameworks.map((framework) => framework.label).join(", ")
              : "Select frameworks (multi-select)..." }}
            <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </ComboboxTrigger>
      </ComboboxAnchor>

      <ComboboxList class="w-[300px]" :align="'start'">
        <ComboboxInput placeholder="Select framework..." />

        <ComboboxEmpty>
          No framework found.
        </ComboboxEmpty>

        <ComboboxGroup>
          <ComboboxItem
            v-for="framework in frameworks"
            :key="framework.value"
            :value="framework"
          >
            <div
              class="border-input data-[selected=true]:border-primary data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground pointer-events-none size-4 shrink-0 rounded-[4px] border transition-all select-none *:[svg]:opacity-0 data-[selected=true]:*:[svg]:opacity-100"
              :data-selected="selectedFrameworks.some(
                (f) => f.value === framework.value,
              )"
            >
              <Check class="size-3.5 text-current" />
            </div>

            {{ framework.label }}
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxList>
    </Combobox>
  </div>
</template>
