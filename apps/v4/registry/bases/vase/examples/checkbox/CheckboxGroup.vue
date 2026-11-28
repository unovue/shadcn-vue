<script setup lang="ts">
import { Checkbox } from "@/registry/bases/vase/ui/checkbox"
import { Field, FieldLabel } from "@/registry/bases/vase/ui/field"
import { Example } from "~/registry/bases/vase/components/example"
</script>

<template>
  <Example title="Group">
    <Field>
      <FieldLabel>Show these items on the desktop:</FieldLabel>
      <Field orientation="horizontal">
        <Checkbox id="finder-pref-9k2-hard-disks-ljj" />
        <FieldLabel
          for="finder-pref-9k2-hard-disks-ljj"
          class="font-normal"
        >
          Hard disks
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="finder-pref-9k2-external-disks-1yg" />
        <FieldLabel
          for="finder-pref-9k2-external-disks-1yg"
          class="font-normal"
        >
          External disks
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="finder-pref-9k2-cds-dvds-fzt" />
        <FieldLabel
          for="finder-pref-9k2-cds-dvds-fzt"
          class="font-normal"
        >
          CDs, DVDs, and iPods
        </FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="finder-pref-9k2-connected-servers-6l2" />
        <FieldLabel
          for="finder-pref-9k2-connected-servers-6l2"
          class="font-normal"
        >
          Connected servers
        </FieldLabel>
      </Field>
    </Field>
  </Example>
</template>
