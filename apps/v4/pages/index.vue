<script setup lang="ts">
</script>

<template>
  <div class="@container grid flex-1 gap-4 p-4">
    <ComponentWrapper name="Accordion">
      <LazyAccordionDemo />
    </ComponentWrapper>
    <ComponentWrapper name="Alert">
      <LazyAlertDemo />
    </ComponentWrapper>
    <ComponentWrapper name="AlertDialog">
      <LazyAlertDialogDemo />
    </ComponentWrapper>
    <ComponentWrapper name="AspectRatio">
      <LazyAspectRatioDemo />
    </ComponentWrapper>
    <ComponentWrapper name="Avatar">
      <LazyAvatarDemo />
    </ComponentWrapper>
    <ComponentWrapper name="Badge">
      <LazyBadgeDemo />
    </ComponentWrapper>
    <ComponentWrapper name="Button">
      <LazyButtonDemo />
    </ComponentWrapper>
    <ComponentWrapper name="Card">
      <LazyCardDemo />
    </ComponentWrapper>
  </div>
</template>
