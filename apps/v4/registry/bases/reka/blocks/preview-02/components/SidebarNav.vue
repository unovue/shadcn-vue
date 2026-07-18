<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Card } from "@/registry/bases/reka/ui/card"
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
  SidebarSeparator,
} from "@/registry/bases/reka/ui/sidebar"
</script>

<template>
  <div class="grid grid-cols-2 items-start gap-6">
    <Card class="overflow-hidden py-0">
      <SidebarProvider class="min-h-0">
        <Sidebar collapsible="none" class="w-full bg-transparent">
          <SidebarContent class="gap-0">
            <SidebarGroup class="pb-1">
              <SidebarGroupLabel>Overview</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton :is-active="true">
                      <IconPlaceholder
                        lucide="LayoutDashboardIcon"
                        tabler="IconLayoutDashboard"
                        hugeicons="DashboardSquare01Icon"
                        phosphor="SquaresFourIcon"
                        remixicon="RiDashboardLine"
                      />
                      Dashboard
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconPlaceholder
                        lucide="ArrowLeftRightIcon"
                        tabler="IconArrowsLeftRight"
                        hugeicons="ArrowDataTransferHorizontalIcon"
                        phosphor="ArrowsLeftRightIcon"
                        remixicon="RiArrowLeftRightLine"
                      />
                      Transactions
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconPlaceholder
                        lucide="TrendingUpIcon"
                        tabler="IconTrendingUp"
                        hugeicons="AnalyticsUpIcon"
                        phosphor="TrendUpIcon"
                        remixicon="RiLineChartLine"
                      />
                      Investments
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator class="w-auto!" />
            <SidebarGroup class="pt-1">
              <SidebarGroupLabel>Planning</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconPlaceholder
                        lucide="TargetIcon"
                        tabler="IconTarget"
                        hugeicons="Target02Icon"
                        phosphor="TargetIcon"
                        remixicon="RiFocus3Line"
                      />
                      Goals
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconPlaceholder
                        lucide="WalletIcon"
                        tabler="IconWallet"
                        hugeicons="Wallet01Icon"
                        phosphor="WalletIcon"
                        remixicon="RiWalletLine"
                      />
                      Budget
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconPlaceholder
                        lucide="FileBarChartIcon"
                        tabler="IconReportAnalytics"
                        hugeicons="ChartBarLineIcon"
                        phosphor="ChartBarIcon"
                        remixicon="RiBarChartLine"
                      />
                      Reports
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconPlaceholder
                        lucide="FileTextIcon"
                        tabler="IconFileText"
                        hugeicons="File02Icon"
                        phosphor="FileTextIcon"
                        remixicon="RiFileTextLine"
                      />
                      Documents
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </Card>
    <Card class="overflow-hidden py-0">
      <SidebarProvider class="min-h-0">
        <Sidebar collapsible="none" class="w-full bg-transparent">
          <SidebarContent class="gap-0">
            <SidebarGroup class="pb-1">
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconPlaceholder
                        lucide="UserIcon"
                        tabler="IconUser"
                        hugeicons="UserIcon"
                        phosphor="UserIcon"
                        remixicon="RiUserLine"
                      />
                      Profile
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton :is-active="true">
                      <IconPlaceholder
                        lucide="CreditCardIcon"
                        tabler="IconCreditCard"
                        hugeicons="CreditCardIcon"
                        phosphor="CreditCardIcon"
                        remixicon="RiBankCardLine"
                      />
                      Billing
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconPlaceholder
                        lucide="BellIcon"
                        tabler="IconBell"
                        hugeicons="Notification03Icon"
                        phosphor="BellIcon"
                        remixicon="RiBellLine"
                      />
                      Notifications
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconPlaceholder
                        lucide="ShieldIcon"
                        tabler="IconShield"
                        hugeicons="ShieldIcon"
                        phosphor="ShieldIcon"
                        remixicon="RiShieldLine"
                      />
                      Security
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator class="w-auto!" />
            <SidebarGroup class="pt-1">
              <SidebarGroupLabel>Support</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconPlaceholder
                        lucide="CircleHelpIcon"
                        tabler="IconHelp"
                        hugeicons="HelpCircleIcon"
                        phosphor="QuestionIcon"
                        remixicon="RiQuestionLine"
                      />
                      Help Center
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconPlaceholder
                        lucide="MessageSquareIcon"
                        tabler="IconMessage"
                        hugeicons="Message01Icon"
                        phosphor="ChatIcon"
                        remixicon="RiChat1Line"
                      />
                      Contact Us
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconPlaceholder
                        lucide="ActivityIcon"
                        tabler="IconActivity"
                        hugeicons="ActivityIcon"
                        phosphor="ActivityIcon"
                        remixicon="RiPulseLine"
                      />
                      Status
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
