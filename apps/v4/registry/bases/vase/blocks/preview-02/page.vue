<script setup lang="ts">
import AccountAccess from "./components/AccountAccess.vue"
import CardOverview from "./components/CardOverview.vue"
import ClaimableBalance from "./components/ClaimableBalance.vue"
import ContributionHistory from "./components/ContributionHistory.vue"
import CoverArt from "./components/CoverArt.vue"
import DividendIncome from "./components/DividendIncome.vue"
import EmptyConnectBank from "./components/EmptyConnectBank.vue"
import EmptyDistributeTrack from "./components/EmptyDistributeTrack.vue"
import EmptyExploreCatalog from "./components/EmptyExploreCatalog.vue"
import Faq from "./components/Faq.vue"
import FrontDoor from "./components/FrontDoor.vue"
import IndexInvesting from "./components/IndexInvesting.vue"
import KitchenIsland from "./components/KitchenIsland.vue"
import LoadingCard from "./components/LoadingCard.vue"
import NewMilestone from "./components/NewMilestone.vue"
import NotificationSettings from "./components/NotificationSettings.vue"
import Payments from "./components/Payments.vue"
import PayoutThreshold from "./components/PayoutThreshold.vue"
import PowerUsage from "./components/PowerUsage.vue"
import Preferences from "./components/Preferences.vue"
import QrConnect from "./components/QrConnect.vue"
import ReceivingMethod from "./components/ReceivingMethod.vue"
import RecentTransactions from "./components/RecentTransactions.vue"
import ReleaseCatalog from "./components/ReleaseCatalog.vue"
import RollerShades from "./components/RollerShades.vue"
import SavingsProgress from "./components/SavingsProgress.vue"
import SavingsTargets from "./components/SavingsTargets.vue"
import SidebarNav from "./components/SidebarNav.vue"
import SocialLinks from "./components/SocialLinks.vue"
import StockPerformance from "./components/StockPerformance.vue"
import SyncingState from "./components/SyncingState.vue"
import TransferFunds from "./components/TransferFunds.vue"
import UpcomingPayments from "./components/UpcomingPayments.vue"
</script>

<template>
  <div class="overflow-x-auto overflow-y-hidden bg-muted contain-[paint] [--gap:--spacing(4)] 3xl:[--gap:--spacing(12)] md:[--gap:--spacing(10)] dark:bg-background style-lyra:md:[--gap:--spacing(6)] style-mira:md:[--gap:--spacing(6)]">
    <div class="flex w-full min-w-max justify-center">
      <div
        class="grid w-[2400px] grid-cols-7 items-start gap-(--gap) bg-muted p-(--gap) md:w-[3000px] dark:bg-background style-lyra:md:w-[2600px] style-mira:md:w-[2600px] *:[div]:gap-(--gap)"
        data-slot="capture-target"
      >
        <div class="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <ContributionHistory />
          <EmptyDistributeTrack />
          <QrConnect />
          <DividendIncome />
          <IndexInvesting />
          <SyncingState />
        </div>
        <div class="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <PayoutThreshold />
          <ClaimableBalance />
          <Preferences />
          <SavingsProgress />
          <KitchenIsland />
        </div>
        <div class="col-span-2 flex flex-col p-1 [contain-intrinsic-size:760px_1200px] [content-visibility:auto]">
          <SavingsTargets />
          <RecentTransactions />
          <div class="grid grid-cols-2 items-start gap-(--gap)">
            <div class="flex flex-col gap-(--gap)">
              <SidebarNav />
              <Faq />
            </div>
            <div class="flex flex-col gap-(--gap)">
              <Payments />
              <FrontDoor />
            </div>
          </div>
          <ReleaseCatalog />
        </div>
        <div class="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <AccountAccess />
          <CardOverview />
          <TransferFunds />
          <CoverArt />
          <LoadingCard />
        </div>
        <div class="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <ReceivingMethod />
          <PowerUsage />
          <EmptyConnectBank />
          <UpcomingPayments />
          <RollerShades />
        </div>
        <div class="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <StockPerformance />
          <EmptyExploreCatalog />
          <NewMilestone />
          <SocialLinks />
          <NotificationSettings />
        </div>
      </div>
    </div>
  </div>
</template>
