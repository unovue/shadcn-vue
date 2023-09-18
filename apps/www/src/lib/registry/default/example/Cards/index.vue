<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown, Minus, Plus, Send } from 'lucide-vue-next'
import { addDays, startOfToday } from 'date-fns'
import {
  months,
  payments,
  roles,
  teamMembers,
  years,
} from './utils/data'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/registry/default/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/lib/registry/default/ui/avatar'
import { Button } from '@/lib/registry/default/ui/button'
import { Textarea } from '@/lib/registry/default/ui/textarea'
import { Calendar } from '@/lib/registry/default/ui/calendar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/lib/registry/default/ui/dropdown-menu'
import { Label } from '@/lib/registry/default/ui/label'
import { Switch } from '@/lib/registry/default/ui/switch'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/registry/default/ui/select'
import { Input } from '@/lib/registry/default/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/lib/registry/default/ui/tooltip'
import { Separator } from '@/lib/registry/default/ui/separator'
import RadixIconsGithubLogo from '~icons/radix-icons/github-logo'
import RiGoogleLine from '~icons/ri/google-line'

const strictlyNecessarySwitch = ref<boolean>(true)
const functionalCookiesSwitch = ref<boolean>(false)
const performanceCookiesSwitch = ref<boolean>(false)
const selectedArea = ref('Billing')
const selectedSecurity = ref('Medium')
const selectedMonth = ref<string>(months[0])
const selectedYear = ref<string>(years[0])
const selectedPayment = ref(payments[0])
const goal = ref(350)

function switchPayment(payment: any) {
  selectedPayment.value = payment
}

const range = ref({
  start: startOfToday(),
  end: addDays(startOfToday(), 8),
})
</script>

<template>
  <div className="md:grids-col-2 grid md:gap-4 lg:grid-cols-10 xl:grid-cols-11 xl:gap-4">
    <div className="space-y-4 lg:col-span-4 xl:col-span-6 xl:space-y-4">
      <CardsStats />
      <div className="grid gap-1 sm:grid-cols-[280px_1fr] md:hidden">
        <CardsCalendar />
        <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-4">
          <CardsActivityGoal />
        </div>
        <div className="pt-3 sm:col-span-2 xl:pt-4">
          <CardsMetric />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div className="space-y-4 xl:space-y-4">
          <CardsTeamMembers />
          <CardsCookieSettings />
          <CardsPaymentMethod />
        </div>
        <div className="space-y-4 xl:space-y-4">
          <CardsChat />
          <CardsCreateAccount />
          <div className="hidden xl:block">
            <CardsReportIssue />
          </div>
        </div>
      </div>
    </div>
    <div className="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4">
      <div className="hidden gap-1 sm:grid-cols-[280px_1fr] md:grid">
        <CardsCalendar />
        <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-3">
          <CardsActivityGoal />
        </div>
        <div className="pt-3 sm:col-span-2 xl:pt-3">
          <CardsMetric />
        </div>
      </div>
      <div className="hidden md:block">
        <CardsDataTable />
      </div>
      <CardsShare />
      <div className="xl:hidden">
        <CardsReportIssue />
      </div>
    </div>
  </div>
</template>
