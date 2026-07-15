<script setup lang="ts">
import ActivateAgentDialog from "./components/ActivateAgentDialog.vue"
import AnalyticsCard from "./components/AnalyticsCard.vue"
import AnomalyAlert from "./components/AnomalyAlert.vue"
import BarChartCard from "./components/BarChartCard.vue"
import BookAppointment from "./components/BookAppointment.vue"
import CodespacesCard from "./components/CodespacesCard.vue"
import ContributionsActivity from "./components/ContributionsActivity.vue"
import Contributors from "./components/Contributors.vue"
import EnvironmentVariables from "./components/EnvironmentVariables.vue"
import FeedbackForm from "./components/FeedbackForm.vue"
import FileUpload from "./components/FileUpload.vue"
import GithubProfile from "./components/GithubProfile.vue"
import IconPreviewGrid from "./components/IconPreviewGrid.vue"
import InviteTeam from "./components/InviteTeam.vue"
import Invoice from "./components/Invoice.vue"
import LiveWaveformCard from "./components/LiveWaveform.vue"
import NoTeamMembers from "./components/NoTeamMembers.vue"
import NotFound from "./components/NotFound.vue"
import ObservabilityCard from "./components/ObservabilityCard.vue"
import PieChartCard from "./components/PieChartCard.vue"
import ReportBug from "./components/ReportBug.vue"
import ShippingAddress from "./components/ShippingAddress.vue"
import Shortcuts from "./components/Shortcuts.vue"
import SkeletonLoading from "./components/SkeletonLoading.vue"
import SleepReport from "./components/SleepReport.vue"
import StyleOverview from "./components/StyleOverview.vue"
import TypographySpecimen from "./components/TypographySpecimen.vue"
import UIElements from "./components/UIElements.vue"
import UsageCard from "./components/UsageCard.vue"
import Visitors from "./components/Visitors.vue"
import WeeklyFitnessSummary from "./components/WeeklyFitnessSummary.vue"
</script>

<template>
  <div class="overflow-x-auto overflow-y-hidden bg-muted contain-[paint] [--gap:--spacing(4)] 3xl:[--gap:--spacing(12)] md:[--gap:--spacing(10)] dark:bg-background style-lyra:md:[--gap:--spacing(6)] style-mira:md:[--gap:--spacing(6)]">
    <div class="flex w-full min-w-max justify-center">
      <div
        class="grid w-[2400px] grid-cols-7 items-start gap-(--gap) bg-muted p-(--gap) md:w-[3000px] dark:bg-background style-lyra:md:w-[2600px] style-mira:md:w-[2600px] *:[div]:gap-(--gap)"
        data-slot="capture-target"
      >
        <div class="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <StyleOverview />
          <TypographySpecimen />
          <div class="md:hidden">
            <UIElements />
          </div>
          <CodespacesCard />
          <Invoice />
        </div>
        <div class="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <IconPreviewGrid />
          <div class="hidden w-full md:flex">
            <UIElements />
          </div>
          <ObservabilityCard />
          <ShippingAddress />
        </div>
        <div class="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <EnvironmentVariables />
          <BarChartCard />
          <InviteTeam />
          <ActivateAgentDialog />
        </div>
        <div class="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <SkeletonLoading />
          <PieChartCard />
          <NoTeamMembers />
          <ReportBug />
          <Contributors />
        </div>
        <div class="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <FeedbackForm />
          <BookAppointment />
          <SleepReport />
          <GithubProfile />
        </div>
        <div class="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <WeeklyFitnessSummary />
          <FileUpload />
          <AnalyticsCard />
          <UsageCard />
          <Shortcuts />
        </div>
        <div class="flex flex-col p-px [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
          <AnomalyAlert />
          <LiveWaveformCard />
          <Visitors />
          <ContributionsActivity />
          <NotFound />
        </div>
      </div>
    </div>
  </div>
</template>
