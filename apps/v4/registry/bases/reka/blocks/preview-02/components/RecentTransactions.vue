<script setup lang="ts">
import IconPlaceholder from "@/components/IconPlaceholder.vue"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/bases/reka/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/registry/bases/reka/ui/table"

const transactions = [
  {
    id: "coffee",
    icon: { lucide: "CoffeeIcon", tabler: "IconCoffee", hugeicons: "Coffee01Icon", phosphor: "CoffeeIcon", remixicon: "RiCupLine" },
    name: "Blue Bottle Coffee",
    category: "Food & Drink",
    date: "Today, 10:24 AM",
    amount: "-$6.50",
    amountClass: "text-sm font-semibold tabular-nums",
  },
  {
    id: "groceries",
    icon: { lucide: "ShoppingCartIcon", tabler: "IconShoppingCart", hugeicons: "ShoppingCart01Icon", phosphor: "ShoppingCartIcon", remixicon: "RiShoppingCartLine" },
    name: "Whole Foods Market",
    category: "Groceries",
    date: "Yesterday",
    amount: "-$142.30",
    amountClass: "text-sm font-semibold tabular-nums",
  },
  {
    id: "stripe",
    icon: { lucide: "WalletIcon", tabler: "IconWallet", hugeicons: "Wallet01Icon", phosphor: "WalletIcon", remixicon: "RiWalletLine" },
    name: "Stripe Payout",
    category: "Income",
    date: "Oct 12",
    amount: "+$4,200.00",
    amountClass: "text-sm font-semibold text-emerald-500 tabular-nums",
  },
  {
    id: "uber",
    icon: { lucide: "CarIcon", tabler: "IconCar", hugeicons: "Car01Icon", phosphor: "CarIcon", remixicon: "RiCarLine" },
    name: "Uber Technologies",
    category: "Transport",
    date: "Oct 11",
    amount: "-$24.10",
    amountClass: "text-sm font-semibold tabular-nums",
  },
  {
    id: "netflix",
    icon: { lucide: "TvIcon", tabler: "IconDeviceTv", hugeicons: "Tv01Icon", phosphor: "TelevisionIcon", remixicon: "RiTvLine" },
    name: "Netflix Subscription",
    category: "Entertainment",
    date: "Oct 10",
    amount: "-$19.99",
    amountClass: "text-sm font-semibold tabular-nums",
  },
]
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Recent Transactions</CardTitle>
      <CardDescription>Your latest account activity.</CardDescription>
      <CardAction>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <Table>
        <TableBody>
          <TableRow v-for="tx in transactions" :key="tx.id">
            <TableCell class="w-10">
              <div class="flex size-10 items-center justify-center rounded-lg bg-muted">
                <IconPlaceholder
                  class="size-4 shrink-0"
                  :lucide="tx.icon.lucide"
                  :tabler="tx.icon.tabler"
                  :hugeicons="tx.icon.hugeicons"
                  :phosphor="tx.icon.phosphor"
                  :remixicon="tx.icon.remixicon"
                />
              </div>
            </TableCell>
            <TableCell>
              <div class="flex flex-col">
                <span class="font-medium">{{ tx.name }}</span>
                <span class="text-sm text-muted-foreground">{{ tx.category }}</span>
              </div>
            </TableCell>
            <TableCell class="text-sm text-muted-foreground">
              {{ tx.date }}
            </TableCell>
            <TableCell class="text-right">
              <span :class="tx.amountClass">{{ tx.amount }}</span>
            </TableCell>
            <TableCell class="w-8">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="icon-sm">
                    <IconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDotsVertical"
                      hugeicons="MoreVerticalCircle01Icon"
                      phosphor="DotsThreeIcon"
                      remixicon="RiMore2Line"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Add note</DropdownMenuItem>
                  <DropdownMenuItem>Categorize</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Dispute</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</template>
