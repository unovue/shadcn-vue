<script setup lang="ts">
import DataTable from './components/DataTable.vue'
import { columns } from './components/columns'

const response = await fetch('https://api.json-generator.com/templates/NttPDOzDwSsS/data?access_token=xi78iyv3ez1qwmm9pgou7r5mbqxfxrfmdzcps0hm')
const tasks = await response.json()
</script>

<template>
  <DataTable :data="tasks" :columns="columns" />
</template>
