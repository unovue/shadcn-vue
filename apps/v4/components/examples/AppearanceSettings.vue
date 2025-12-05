<script setup lang="ts">
import { IconMinus, IconPlus } from '@tabler/icons-vue'

import { Button } from '@/registry/new-york-v4/ui/button'
import { ButtonGroup } from '@/registry/new-york-v4/ui/button-group'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/registry/new-york-v4/ui/field'
import { Input } from '@/registry/new-york-v4/ui/input'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/registry/new-york-v4/ui/radio-group'
import { Switch } from '@/registry/new-york-v4/ui/switch'

const gpuCount = ref(8)

function handleGpuAdjustment(adjustment: number) {
  gpuCount.value = Math.max(1, Math.min(99, gpuCount.value + adjustment))
}
function handleGpuInputChange(e: InputEvent) {
  const target = e.target as HTMLInputElement
  const value = Number.parseInt(target.value, 10)
  if (!Number.isNaN(value) && value >= 1 && value <= 99) {
    gpuCount.value = (value)
  }
  target.value = `${gpuCount.value}`
}
</script>

<template>
  <FieldSet>
    <FieldGroup>
      <FieldSet>
        <FieldLegend>Compute Environment</FieldLegend>
        <FieldDescription>
          Select the compute environment for your cluster.
        </FieldDescription>
        <RadioGroup default-value="kubernetes">
          <FieldLabel for="kubernetes-r2h">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Kubernetes</FieldTitle>
                <FieldDescription>
                  Run GPU workloads on a K8s configured cluster. This is the
                  default.
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem
                id="kubernetes-r2h"
                value="kubernetes"
                aria-label="Kubernetes"
              />
            </Field>
          </FieldLabel>
          <FieldLabel for="vm-z4k">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Virtual Machine</FieldTitle>
                <FieldDescription>
                  Access a VM configured cluster to run workloads. (Coming
                  soon)
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem
                id="vm-z4k"
                value="vm"
                aria-label="Virtual Machine"
              />
            </Field>
          </FieldLabel>
        </RadioGroup>
      </FieldSet>
      <FieldSeparator />
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel for="number-of-gpus-f6l">
            Number of GPUs
          </FieldLabel>
          <FieldDescription>You can add more later.</FieldDescription>
        </FieldContent>
        <ButtonGroup>
          <Input
            id="number-of-gpus-f6l"
            :model-value="gpuCount"
            :size="3"
            class="h-8 !w-14 font-mono"
            :max-length="3"
            @input="handleGpuInputChange"
          />
          <Button
            variant="outline"
            size="icon-sm"
            type="button"
            aria-label="Decrement"
            :disabled="gpuCount <= 1"
            @click="handleGpuAdjustment(-1)"
          >
            <IconMinus />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            type="button"
            aria-label="Increment"
            :disabled="gpuCount >= 99"
            @click="handleGpuAdjustment(1)"
          >
            <IconPlus />
          </Button>
        </ButtonGroup>
      </Field>
      <FieldSeparator />
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel for="tinting">
            Wallpaper Tinting
          </FieldLabel>
          <FieldDescription>
            Allow the wallpaper to be tinted.
          </FieldDescription>
        </FieldContent>
        <Switch id="tinting" :default-value="true" />
      </Field>
    </FieldGroup>
  </FieldSet>
</template>
