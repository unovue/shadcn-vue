<script setup lang="ts">
import { columns } from '@/components/examples/tasks/components/columns'
import DataTable from '@/components/examples/tasks/components/DataTable.vue'
import UserNav from '@/components/examples/tasks/components/UserNav.vue'
import tasks from '@/components/examples/tasks/data/tasks.json'

useSeoMeta({
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.',
})
</script>

<template>
  <div class="md:hidden">
    <NuxtImg
      src="/examples/tasks-light.png"
      width="1280"
      height="998"
      alt="Tasks"
      class="block dark:hidden"
    />
    <NuxtImg
      src="/examples/tasks-dark.png"
      width="1280"
      height="998"
      alt="Tasks"
      class="hidden dark:block"
    />
  </div>

  <div class="hidden h-full flex-1 flex-col gap-8 p-8 md:flex">
    <div class="flex items-center justify-between gap-2">
      <div class="flex flex-col gap-1">
        <h2 class="text-2xl font-semibold tracking-tight">
          Welcome back!
        </h2>
        <p class="text-muted-foreground">
          Here's a list of your tasks for this month.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <UserNav />
      </div>
    </div>
    <DataTable :data="tasks" :columns="columns" />
  </div>
</template>
