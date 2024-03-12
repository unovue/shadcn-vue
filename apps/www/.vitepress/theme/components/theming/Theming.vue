<script setup lang="ts">
import { ref } from 'vue'
import { addDays, startOfToday } from 'date-fns'
import ThemingLayout from './../../layout/ThemingLayout.vue'

import CookieSettings from '@/examples/cards/components/CookieSettings.vue'
import CreateAccount from '@/examples/cards/components/CreateAccount.vue'
import PaymentMethod from '@/examples/cards/components/PaymentMethod.vue'
import ReportAnIssue from '@/examples/cards/components/ReportAnIssue.vue'
import ShareDocument from '@/examples/cards/components/ShareDocument.vue'
import TeamMembers from '@/examples/cards/components/TeamMembers.vue'

import CardChat from '@/lib/registry/new-york/example/CardChat.vue'
import ActivityGoal from '@/lib/registry/new-york/example/Cards/ActivityGoal.vue'
import Metric from '@/lib/registry/new-york/example/Cards/Metric.vue'
import DataTable from '@/lib/registry/new-york/example/Cards/DataTable.vue'
import CardStats from '@/lib/registry/new-york/example/CardStats.vue'

import { Card } from '@/lib/registry/new-york/ui/card'
import { Calendar } from '@/lib/registry/new-york/ui/calendar'

const range = ref({
  start: startOfToday(),
  end: addDays(startOfToday(), 8),
})
</script>

<template>
  <ThemingLayout>
    <div
      class="items-start justify-center gap-6 rounded-lg md:grids-col-2 grid md:gap-4 lg:grid-cols-10 xl:grid-cols-11 xl:gap-4"
    >
      <div class="space-y-4 lg:col-span-4 xl:col-span-6 xl:space-y-4">
        <CardStats />

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div class="space-y-4">
            <TeamMembers />
            <CookieSettings />
            <PaymentMethod />
          </div>

          <div class="space-y-4">
            <CardChat />
            <CreateAccount />
            <ReportAnIssue />
          </div>
        </div>
      </div>
      <div class="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4">
        <div class="hidden gap-1 sm:grid-cols-[280px_1fr] md:grid">
          <Card class="max-w-[280px]">
            <Calendar v-model.range="range" />
          </Card>

          <div class="pt-3 sm:pl-2 sm:pt-0 xl:pl-3">
            <ActivityGoal />
          </div>
          <div class="pt-3 sm:col-span-2 xl:pt-3">
            <Metric />
          </div>
          <div class="pt-3 sm:col-span-2 xl:pt-3">
            <DataTable />
          </div>

          <div class="pt-3 sm:col-span-2 xl:pt-3">
            <ShareDocument />
          </div>
        </div>
      </div>
    </div>
  </ThemingLayout>
</template>
