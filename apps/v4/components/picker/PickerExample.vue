<script setup lang="ts">
import { ref } from 'vue'
import {
  Picker,
  PickerCheckboxItem,
  PickerContent,
  PickerGroup,
  PickerItem,
  PickerLabel,
  PickerRadioGroup,
  PickerRadioItem,
  PickerSeparator,
  PickerShortcut,
  PickerSub,
  PickerSubContent,
  PickerSubTrigger,
  PickerTrigger,
} from './index'

const showStatusBar = ref(true)
const showActivityBar = ref(false)
const showPanel = ref(false)
const position = ref('bottom')
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <!-- Basic Picker -->
    <Picker>
      <PickerTrigger>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">Options</span>
        </div>
      </PickerTrigger>
      <PickerContent>
        <PickerGroup>
          <PickerLabel>My Account</PickerLabel>
          <PickerItem>
            Profile
            <PickerShortcut>⇧⌘P</PickerShortcut>
          </PickerItem>
          <PickerItem>
            Billing
            <PickerShortcut>⌘B</PickerShortcut>
          </PickerItem>
          <PickerItem>
            Settings
            <PickerShortcut>⌘S</PickerShortcut>
          </PickerItem>
        </PickerGroup>
        <PickerSeparator />
        <PickerItem variant="destructive">
          Delete
        </PickerItem>
      </PickerContent>
    </Picker>

    <!-- Picker with Checkboxes -->
    <Picker>
      <PickerTrigger>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">Appearance</span>
        </div>
      </PickerTrigger>
      <PickerContent class="w-56">
        <PickerGroup>
          <PickerLabel>Appearance</PickerLabel>
          <PickerCheckboxItem v-model:checked="showStatusBar">
            Status Bar
          </PickerCheckboxItem>
          <PickerCheckboxItem v-model:checked="showActivityBar" :disabled="true">
            Activity Bar
          </PickerCheckboxItem>
          <PickerCheckboxItem v-model:checked="showPanel">
            Panel
          </PickerCheckboxItem>
        </PickerGroup>
      </PickerContent>
    </Picker>

    <!-- Picker with Radio Group -->
    <Picker>
      <PickerTrigger>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">Position</span>
        </div>
      </PickerTrigger>
      <PickerContent class="w-56">
        <PickerLabel inset>
          Panel Position
        </PickerLabel>
        <PickerRadioGroup v-model="position">
          <PickerRadioItem value="top">
            Top
          </PickerRadioItem>
          <PickerRadioItem value="bottom">
            Bottom
          </PickerRadioItem>
          <PickerRadioItem value="right" :disabled="true">
            Right
          </PickerRadioItem>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>

    <!-- Picker with Submenu -->
    <Picker>
      <PickerTrigger>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">More Options</span>
        </div>
      </PickerTrigger>
      <PickerContent>
        <PickerGroup>
          <PickerItem>New Tab</PickerItem>
          <PickerItem>New Window</PickerItem>
          <PickerSeparator />
          <PickerSub>
            <PickerSubTrigger>Share</PickerSubTrigger>
            <PickerSubContent>
              <PickerItem>Email</PickerItem>
              <PickerItem>Message</PickerItem>
              <PickerSeparator />
              <PickerItem>More...</PickerItem>
            </PickerSubContent>
          </PickerSub>
        </PickerGroup>
        <PickerSeparator />
        <PickerItem>Print</PickerItem>
      </PickerContent>
    </Picker>
  </div>
</template>
