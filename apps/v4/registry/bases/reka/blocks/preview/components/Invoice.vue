<script setup lang="ts">
import { Badge } from "@/registry/bases/reka/ui/badge"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/bases/reka/ui/table"

const INVOICE_ITEMS = [
  { item: "Design System License", qty: 1, unitPrice: 499 },
  { item: "Priority Support", qty: 12, unitPrice: 99 },
  { item: "Custom Components", qty: 3, unitPrice: 250 },
]

const subtotal = INVOICE_ITEMS.reduce((sum, row) => sum + row.qty * row.unitPrice, 0)
const tax = 0
const totalDue = subtotal + tax

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value)
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Invoice #INV-2847</CardTitle>
      <CardDescription>Due March 30, 2026</CardDescription>
      <CardAction>
        <Badge variant="secondary">
          Pending
        </Badge>
      </CardAction>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead class="text-right">
              Qty
            </TableHead>
            <TableHead class="text-right">
              Rate
            </TableHead>
            <TableHead class="text-right">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="row in INVOICE_ITEMS"
            :key="row.item"
          >
            <TableCell>{{ row.item }}</TableCell>
            <TableCell class="text-right tabular-nums">
              {{ row.qty }}
            </TableCell>
            <TableCell class="text-right tabular-nums">
              {{ formatCurrency(row.unitPrice) }}
            </TableCell>
            <TableCell class="text-right tabular-nums">
              {{ formatCurrency(row.qty * row.unitPrice) }}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell :colspan="3" class="text-right">
              Subtotal
            </TableCell>
            <TableCell class="text-right tabular-nums">
              {{ formatCurrency(subtotal) }}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell :colspan="3" class="text-right">
              Tax
            </TableCell>
            <TableCell class="text-right tabular-nums">
              $0.00
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell :colspan="3" class="text-right">
              Total Due
            </TableCell>
            <TableCell class="text-right tabular-nums">
              {{ formatCurrency(totalDue) }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm">
        Download PDF
      </Button>
      <Button size="sm" class="ml-auto">
        Pay Now
      </Button>
    </CardFooter>
  </Card>
</template>
