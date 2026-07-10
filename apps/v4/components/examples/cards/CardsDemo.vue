<script setup lang="ts">
import MessageScrollerDemo from '@/components/demo/MessageScrollerDemo.vue'
import AccountAccess from '@/components/examples/cards/AccountAccess.vue'
import AnalyticsCard from '@/components/examples/cards/AnalyticsCard.vue'
import ClaimableBalance from '@/components/examples/cards/ClaimableBalance.vue'
import ContributionHistory from '@/components/examples/cards/ContributionHistory.vue'
import DividendIncome from '@/components/examples/cards/DividendIncome.vue'
import EmptyDistributeTrack from '@/components/examples/cards/EmptyDistributeTrack.vue'
import NewMilestone from '@/components/examples/cards/NewMilestone.vue'
import NotificationSettings from '@/components/examples/cards/NotificationSettings.vue'
import Payments from '@/components/examples/cards/Payments.vue'
import PayoutThreshold from '@/components/examples/cards/PayoutThreshold.vue'
import PowerUsage from '@/components/examples/cards/PowerUsage.vue'
import QrConnect from '@/components/examples/cards/QrConnect.vue'
import SavingsTargets from '@/components/examples/cards/SavingsTargets.vue'
import SidebarNav from '@/components/examples/cards/SidebarNav.vue'
import UiElements from '@/components/examples/cards/UiElements.vue'
</script>

<template>
  <div
    data-slot="demo"
    class="theme-neutral bg-muted dark:bg-background relative flex w-full max-w-none flex-col gap-(--gap) overflow-hidden p-12 pb-0! [--gap:--spacing(8)] lg:p-6 lg:[--gap:--spacing(6)] 3xl:[--gap:--spacing(8)] min-[1900px]:p-12 min-[1900px]:[--gap:--spacing(10)]!"
  >
    <div
      class="relative z-10 mx-auto grid gap-(--gap) md:max-w-3xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3 xl:max-w-[1600px] 2xl:max-w-[1900px] min-[1400px]:grid-cols-4! min-[1900px]:grid-cols-5! **:data-[slot=card]:w-full"
    >
      <div class="flex flex-col items-start gap-(--gap)">
        <UiElements />
        <SidebarNav />
        <SavingsTargets />
      </div>
      <div class="hidden flex-col gap-(--gap) lg:flex">
        <ContributionHistory />
        <ClaimableBalance />
        <DividendIncome />
      </div>
      <div class="hidden flex-col gap-(--gap) min-[1400px]:flex">
        <NewMilestone />
        <PayoutThreshold />
        <AccountAccess />
      </div>
      <div class="hidden flex-col gap-(--gap) md:flex">
        <QrConnect />
        <div class="**:[.text-center.text-xs]:hidden">
          <MessageScrollerDemo />
        </div>
        <Payments />
      </div>
      <div class="hidden flex-col gap-(--gap) min-[1900px]:flex">
        <EmptyDistributeTrack />
        <AnalyticsCard />
        <NotificationSettings />
        <PowerUsage />
      </div>
    </div>
    <div
      class="from-background via-muted absolute inset-x-0 top-0 z-1 h-120 bg-linear-to-b to-transparent dark:hidden"
    />
    <div
      class="from-background via-muted/80 dark:via-background/80 absolute inset-x-0 bottom-0 z-20 h-48 bg-linear-to-t to-transparent lg:h-80 xl:h-64"
    />
  </div>
</template>
