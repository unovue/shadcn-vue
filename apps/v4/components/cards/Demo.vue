<script setup lang="ts">
</script>

<template>
  <div class="md:grids-col-2 grid **:data-[slot=card]:shadow-none md:gap-4 lg:grid-cols-10 xl:grid-cols-11">
    <div class="grid gap-4 lg:col-span-4 xl:col-span-6">
      <CardsStats />
      <div class="grid gap-1 sm:grid-cols-[auto_1fr] md:hidden">
        <CardsCalendar />
        <div class="pt-3 sm:pt-0 sm:pl-2 xl:pl-4">
          <CardsActivityGoal />
        </div>
        <!-- <div class="pt-3 sm:col-span-2 xl:pt-4">
          <CardsExerciseMinutes />
        </div> -->
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div class="flex flex-col gap-4">
          <CardsForms />
          <CardsTeamMembers />
          <CardsCookieSettings />
        </div>
        <div class="flex flex-col gap-4">
          <CardsCreateAccount />
          <CardsChat />
          <div class="hidden xl:block">
            <CardsReportIssue />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4 lg:col-span-6 xl:col-span-5">
      <div class="hidden gap-1 sm:grid-cols-[auto_1fr] md:grid">
        <CardsCalendar />
        <div class="pt-3 sm:pt-0 sm:pl-2 xl:pl-3">
          <CardsActivityGoal />
        </div>
        <div class="pt-3 sm:col-span-2 xl:pt-3">
          <CardsExerciseMinutes />
        </div>
      </div>
      <div class="hidden md:block">
        <CardsPayments />
      </div>
      <CardsShare />
      <div class="xl:hidden">
        <CardsReportIssue />
      </div>
    </div>
  </div>
</template>
