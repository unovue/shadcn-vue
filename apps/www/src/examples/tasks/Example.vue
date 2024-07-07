<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import type { VNode } from 'vue'
import { h } from 'vue'
import tasks from './data/tasks.json'
import DataTable from './components/DataTable.vue'
import UserNav from './components/UserNav.vue'
import { columns } from './components/columns'
import type { Task } from './data/schema'
import User from './components/DataTableUser.vue'

function renderSubComponent(row: Row<Task>): VNode {
  return h(User, { row })
}
</script>

<template>
  <div class="md:hidden">
    <VPImage
      alt="Tasks"
      width="1280"
      height="1214" class="block" :image="{
        dark: '/examples/tasks-dark.png',
        light: '/examples/tasks-light.png',
      }"
    />
  </div>

  <div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Welcome back!
        </h2>
        <p class="text-muted-foreground">
          Here&apos;s a list of your tasks for this month!
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <UserNav />
      </div>
    </div>
    <DataTable :data="tasks" :columns="columns" :render-sub-component="renderSubComponent" />
  </div>
</template>
