<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/bases/reka/ui/accordion"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/registry/bases/reka/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/bases/reka/ui/tabs"

const GENERAL_QUESTIONS = [
  {
    q: "How secure is my financial data with Ledger?",
    a: "We use bank-level AES-256 encryption, SOC 2 Type II certified infrastructure, and never store your credentials. All connections use read-only access tokens. We are a SEC registered investment advisor.",
  },
  {
    q: "How do I connect my bank or investment accounts?",
    a: "Go to Settings > Linked Accounts and search for your institution. We support over 12,000 banks and brokerages via Plaid and MX.",
  },
  {
    q: "Can I export my data for tax purposes?",
    a: "Yes. Navigate to Reports > Tax Export to download a CSV or PDF summary of your transactions, dividends, and capital gains for any tax year.",
  },
]

const BILLING_QUESTIONS = [
  {
    q: "What is the difference between Basic and Pro pricing tiers?",
    a: "Basic includes budgeting, goal tracking, and up to 3 linked accounts. Pro adds unlimited accounts, dividend tracking, portfolio analysis, and priority support.",
  },
  {
    q: "How do I cancel my subscription?",
    a: "Go to Settings > Billing > Manage Plan and click Cancel. Your access continues until the end of your current billing period.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes. All new accounts start with a 14-day Pro trial. No credit card required.",
  },
]

const GOALS_QUESTIONS = [
  {
    q: "How do I set up a custom financial goal?",
    a: "Click New Goal from the Savings Targets card. Choose a category, set a target amount and date, and we'll calculate the monthly contribution needed.",
  },
  {
    q: "Can I track multiple goals at once?",
    a: "Yes. Pro accounts can track unlimited goals. Basic accounts support up to 3 active goals.",
  },
  {
    q: "How are monthly contributions calculated?",
    a: "We divide the remaining amount by the number of months until your target date, adjusted for your current savings rate and any auto-transfer schedules.",
  },
]
</script>

<template>
  <Card>
    <CardContent>
      <Tabs default-value="general">
        <TabsList class="w-full">
          <TabsTrigger value="general" class="flex-1">
            General
          </TabsTrigger>
          <TabsTrigger value="billing" class="flex-1">
            Billing
          </TabsTrigger>
          <TabsTrigger value="goals" class="flex-1">
            Goals
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Accordion :default-value="['item-0']">
            <AccordionItem
              v-for="(item, index) in GENERAL_QUESTIONS"
              :key="index"
              :value="`item-${index}`"
            >
              <AccordionTrigger>{{ item.q }}</AccordionTrigger>
              <AccordionContent>{{ item.a }}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="billing">
          <Accordion :default-value="['item-0']">
            <AccordionItem
              v-for="(item, index) in BILLING_QUESTIONS"
              :key="index"
              :value="`item-${index}`"
            >
              <AccordionTrigger>{{ item.q }}</AccordionTrigger>
              <AccordionContent>{{ item.a }}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        <TabsContent value="goals">
          <Accordion :default-value="['item-0']">
            <AccordionItem
              v-for="(item, index) in GOALS_QUESTIONS"
              :key="index"
              :value="`item-${index}`"
            >
              <AccordionTrigger>{{ item.q }}</AccordionTrigger>
              <AccordionContent>{{ item.a }}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </CardContent>
    <CardFooter>
      <Button variant="outline" class="w-full">
        Contact Support
      </Button>
      <Button variant="link" class="w-full">
        Learn More
      </Button>
    </CardFooter>
  </Card>
</template>
