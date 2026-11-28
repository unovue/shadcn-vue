<script setup lang="ts">
import { CheckIcon, ChevronDownIcon, PlusCircleIcon } from '@lucide/vue'
import { computed, ref } from 'vue'
import { Button } from '@/styles/vase-vega/ui/button'
import {
  Combobox,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxViewport,
} from '@/styles/vase-vega/ui/combobox'

const timezones = [
  {
    label: 'Americas',
    items: [
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
    items: [
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
    items: [
      { value: 'Asia/Tokyo', label: '(GMT+9) Tokyo' },
      { value: 'Asia/Shanghai', label: '(GMT+8) Shanghai' },
      { value: 'Asia/Singapore', label: '(GMT+8) Singapore' },
      { value: 'Asia/Dubai', label: '(GMT+4) Dubai' },
      { value: 'Australia/Sydney', label: '(GMT+11) Sydney' },
      { value: 'Asia/Seoul', label: '(GMT+9) Seoul' },
    ],
  },
]

const createTimezone = { value: 'create', label: 'Create timezone' }
const groups = [...timezones, { items: [createTimezone] }]

const selectedTimezone = ref<(typeof timezones)[number]['items'][number] | undefined>(
  timezones[0]!.items[0],
)

const selectedGroup = computed(() =>
  timezones.find(group =>
    group.items.find(tz => tz.value === selectedTimezone.value?.value),
  ),
)
</script>

<template>
  <Combobox
    :model-value="selectedTimezone"
    :items="groups"
    @update:model-value="(timezone) => selectedTimezone = timezone === createTimezone ? undefined : timezone ?? undefined"
  >
    <ComboboxTrigger>
      <template #element="{ props, elementRef }">
        <Button
          v-bind="props"
          :ref="elementRef"
          variant="outline"
          class="h-12 w-[200px] justify-between px-2.5"
        >
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
          <ChevronDownIcon class="text-muted-foreground" />
        </Button>
      </template>
    </ComboboxTrigger>

    <ComboboxList class="w-72" align="start">
      <ComboboxInput placeholder="Search timezone..." />
      <ComboboxEmpty>No timezone found.</ComboboxEmpty>
      <ComboboxViewport class="max-h-[260px]">
        <template #item="{ item: group, index }">
          <ComboboxGroup :heading="group.label">
            <ComboboxItem
              v-for="timezone in group.items"
              :key="timezone.value"
              :value="timezone"
            >
              <template v-if="timezone === createTimezone">
                <PlusCircleIcon />
                {{ timezone.label }}
              </template>
              <template v-else>
                {{ timezone.label }}
                <ComboboxItemIndicator>
                  <CheckIcon />
                </ComboboxItemIndicator>
              </template>
            </ComboboxItem>
          </ComboboxGroup>
          <ComboboxSeparator v-if="index < groups.length - 1" />
        </template>
      </ComboboxViewport>
    </ComboboxList>
  </Combobox>
</template>
