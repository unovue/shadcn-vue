<script setup lang="ts">
const props = defineProps({
  title: String,
  description: String,
})
</script>

<template>
  <div
    class="flex h-full w-full bg-black text-white"
    :style="{ fontFamily: 'Geist' }"
  >
    <div class="flex border absolute border-stone-700 border-dashed inset-y-0 left-16 w-[1px]" />
    <div class="flex border absolute border-stone-700 border-dashed inset-y-0 right-16 w-[1px]" />
    <div class="flex border absolute border-stone-700 inset-x-0 h-[1px] top-16" />
    <div class="flex border absolute border-stone-700 inset-x-0 h-[1px] bottom-16" />
    <div class="flex absolute flex-row bottom-24 right-24 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width="48"
        height="48"
        style="color: #41B883"
      >
        <rect width="256" height="256" fill="none" />
        <line
          x1="208"
          y1="128"
          x2="128"
          y2="208"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
        />
        <line
          x1="192"
          y1="40"
          x2="40"
          y2="192"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
        />
      </svg>
    </div>
    <div class="flex flex-col absolute w-[896px] justify-center top-32 bottom-32 left-32 right-32">
      <div
        class="tracking-tight flex-grow-1 flex flex-col justify-center leading-[1.1]"
        :style="{
          textWrap: 'balance',
          fontWeight: 600,
          fontSize: title && title.length > 20 ? 64 : 80,
          letterSpacing: '-0.04em',
        }"
      >
        {{ title }}
      </div>
      <div
        class="text-[40px] leading-[1.5] flex-grow-1 text-stone-400"
        :style="{
          fontWeight: 400,
          textWrap: 'balance',
        }"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>
