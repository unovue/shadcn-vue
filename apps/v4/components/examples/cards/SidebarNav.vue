<script setup lang="ts">
import {
  ActivityIcon,
  Analytics01Icon,
  AnalyticsUpIcon,
  ArrowDataTransferHorizontalIcon,
  BankIcon,
  BookOpen02Icon,
  Calendar03Icon,
  ChartBarLineIcon,
  CreditCardIcon,
  File02Icon,
  Globe02Icon,
  HelpCircleIcon,
  Message01Icon,
  Notification03Icon,
  PaintBoardIcon,
  PieChartIcon,
  ShieldIcon,
  Target02Icon,
  UserIcon,
  Wallet01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/vue'

import { cn } from '@/lib/utils'
import { Card } from '@/styles/reka-rhea/ui/card'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/styles/reka-rhea/ui/sidebar'

const sections = [
  {
    label: 'Overview',
    className: 'xl:col-start-1 xl:row-start-2',
    items: [
      { icon: Analytics01Icon, label: 'Analytics', isActive: true },
      { icon: ArrowDataTransferHorizontalIcon, label: 'Transactions' },
      { icon: AnalyticsUpIcon, label: 'Investments' },
      { icon: BankIcon, label: 'Accounts' },
      { icon: PieChartIcon, label: 'Spending' },
    ],
  },
  {
    label: 'Planning',
    className: 'xl:col-start-1 xl:row-start-1',
    items: [
      { icon: File02Icon, label: 'Documents' },
      { icon: Wallet01Icon, label: 'Budget' },
      { icon: ChartBarLineIcon, label: 'Reports' },
      { icon: Target02Icon, label: 'Goals' },
      { icon: Calendar03Icon, label: 'Calendar' },
    ],
  },
  {
    label: 'Support',
    className: 'flex xl:col-start-2 xl:row-start-1',
    items: [
      { icon: HelpCircleIcon, label: 'Help Center' },
      { icon: BookOpen02Icon, label: 'Docs' },
      { icon: Message01Icon, label: 'Contact Us' },
      { icon: ActivityIcon, label: 'Status' },
      { icon: Globe02Icon, label: 'Community' },
    ],
  },
  {
    label: 'Account',
    className: 'flex xl:col-start-2 xl:row-start-2',
    items: [
      { icon: UserIcon, label: 'Profile' },
      { icon: CreditCardIcon, label: 'Billing', isActive: true },
      { icon: Notification03Icon, label: 'Notifications' },
      { icon: ShieldIcon, label: 'Security' },
      { icon: PaintBoardIcon, label: 'Appearance' },
    ],
  },
]
</script>

<template>
  <div class="grid w-full grid-cols-2 gap-4 xl:gap-6">
    <Card
      v-for="section in sections"
      :key="section.label"
      :class="cn('w-full overflow-hidden rounded-3xl py-0', section.className)"
    >
      <SidebarProvider class="min-h-0">
        <Sidebar collapsible="none" class="w-full bg-transparent">
          <SidebarContent class="gap-0 overflow-hidden">
            <SidebarGroup>
              <SidebarGroupLabel>{{ section.label }}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu class="gap-1">
                  <SidebarMenuItem v-for="item in section.items" :key="item.label">
                    <SidebarMenuButton :is-active="item.isActive">
                      <HugeiconsIcon :icon="item.icon" :stroke-width="2" />
                      {{ item.label }}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </Card>
  </div>
</template>
