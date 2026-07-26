<script setup lang="ts">
import { ref } from "vue"
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/registry/bases/reka/ui/item"
import { Slider } from "@/registry/bases/reka/ui/slider"
import { Switch } from "@/registry/bases/reka/ui/switch"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/bases/reka/ui/toggle-group"

const SCENES = {
  cooking: { brightness: [90], colorTemp: [70], volume: [30], fade: [0] },
  dining: { brightness: [50], colorTemp: [40], volume: [20], fade: [60] },
  nightlight: { brightness: [15], colorTemp: [20], volume: [0], fade: [80] },
  focus: { brightness: [100], colorTemp: [85], volume: [0], fade: [0] },
} as const

const enabled = ref(true)
const scene = ref("cooking")
const brightness = ref([90])
const colorTemp = ref([70])
const volume = ref([30])
const fade = ref([0])

function handleSceneChange(value: unknown) {
  const arr = Array.isArray(value) ? value as string[] : [value as string]
  const v = arr[0]
  if (!v)
    return
  scene.value = v
  const preset = SCENES[v as keyof typeof SCENES]
  brightness.value = [...preset.brightness]
  colorTemp.value = [...preset.colorTemp]
  volume.value = [...preset.volume]
  fade.value = [...preset.fade]
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Kitchen Island</CardTitle>
      <CardDescription>Hue Color Ambient</CardDescription>
      <CardAction>
        <Switch v-model:checked="enabled" />
      </CardAction>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <span class="sr-only">Scenes</span>
        <ToggleGroup
          :model-value="[scene]"
          variant="outline"
          :spacing="1"
          class="flex-wrap"
          @update:model-value="handleSceneChange"
        >
          <ToggleGroupItem value="cooking" :disabled="!enabled">
            Cooking
          </ToggleGroupItem>
          <ToggleGroupItem value="dining" :disabled="!enabled">
            Dining
          </ToggleGroupItem>
          <ToggleGroupItem value="nightlight" :disabled="!enabled">
            Nightlight
          </ToggleGroupItem>
          <ToggleGroupItem value="focus" :disabled="!enabled">
            Focus
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <ItemGroup>
        <Item size="sm" variant="outline">
          <ItemMedia variant="icon">
            <IconPlaceholder
              lucide="SunIcon"
              tabler="IconSun"
              hugeicons="Sun03Icon"
              phosphor="SunIcon"
              remixicon="RiSunLine"
            />
          </ItemMedia>
          <ItemContent class="flex-row items-center gap-3">
            <ItemTitle class="shrink-0">
              Brightness
            </ItemTitle>
          </ItemContent>
          <ItemActions class="flex-1">
            <Slider
              v-model="brightness"
              :max="100"
              :disabled="!enabled"
              class="w-full"
            />
          </ItemActions>
        </Item>
        <Item size="sm" variant="outline">
          <ItemMedia variant="icon">
            <IconPlaceholder
              lucide="ThermometerIcon"
              tabler="IconThermometer"
              hugeicons="ThermometerWarmIcon"
              phosphor="ThermometerIcon"
              remixicon="RiThermometerLine"
            />
          </ItemMedia>
          <ItemContent class="flex-row items-center gap-3">
            <ItemTitle class="shrink-0">
              Color Temp
            </ItemTitle>
          </ItemContent>
          <ItemActions class="flex-1">
            <Slider
              v-model="colorTemp"
              :max="100"
              :disabled="!enabled"
            />
          </ItemActions>
        </Item>
        <Item size="sm" variant="outline">
          <ItemMedia variant="icon">
            <IconPlaceholder
              lucide="Volume2Icon"
              tabler="IconVolume"
              hugeicons="VolumeHighIcon"
              phosphor="SpeakerHighIcon"
              remixicon="RiVolumeUpLine"
            />
          </ItemMedia>
          <ItemContent class="flex-row items-center gap-3">
            <ItemTitle class="shrink-0">
              Volume
            </ItemTitle>
          </ItemContent>
          <ItemActions class="flex-1">
            <Slider
              v-model="volume"
              :max="100"
              :disabled="!enabled"
            />
          </ItemActions>
        </Item>
        <Item size="sm" variant="outline">
          <ItemMedia variant="icon">
            <IconPlaceholder
              lucide="TimerIcon"
              tabler="IconClock"
              hugeicons="Clock03Icon"
              phosphor="TimerIcon"
              remixicon="RiTimerLine"
            />
          </ItemMedia>
          <ItemContent class="flex-row items-center gap-3">
            <ItemTitle class="shrink-0">
              Fade
            </ItemTitle>
          </ItemContent>
          <ItemActions class="flex-1">
            <Slider
              v-model="fade"
              :max="100"
              :disabled="!enabled"
            />
          </ItemActions>
        </Item>
      </ItemGroup>
    </CardContent>
  </Card>
</template>
