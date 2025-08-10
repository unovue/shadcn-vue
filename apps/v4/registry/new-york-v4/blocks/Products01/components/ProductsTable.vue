<script setup lang="ts">
import {
  ArrowUpDownIcon,
  EllipsisVerticalIcon,
  ListFilterIcon,
  PlusIcon,
} from "lucide-vue-next"

import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york-v4/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/new-york-v4/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york-v4/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/registry/new-york-v4/ui/tabs"

const props = defineProps<{
  products: {
    id: string
    name: string
    price: number
    stock: number
    dateAdded: string
    status: string
  }[]
}>()
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <div class="flex items-center justify-between gap-4">
      <Tabs default-value="all">
        <TabsList>
          <TabsTrigger value="all">
            All Products
          </TabsTrigger>
          <TabsTrigger value="in-stock">
            In Stock
          </TabsTrigger>
          <TabsTrigger value="low-stock">
            Low Stock
          </TabsTrigger>
          <TabsTrigger value="archived">
            Archived
          </TabsTrigger>
          <TabsTrigger value="add-product" as-child>
            <button>
              <PlusIcon />
            </button>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div class="flex items-center gap-2 **:data-[slot=button]:size-8 **:data-[slot=select-trigger]:h-8">
        <Select default-value="all">
          <SelectTrigger>
            <span class="text-muted-foreground text-sm">Category:</span>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              All
            </SelectItem>
            <SelectItem value="in-stock">
              In Stock
            </SelectItem>
            <SelectItem value="low-stock">
              Low Stock
            </SelectItem>
            <SelectItem value="archived">
              Archived
            </SelectItem>
          </SelectContent>
        </Select>
        <Select default-value="all">
          <SelectTrigger>
            <span class="text-muted-foreground text-sm">Price:</span>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              $100-$200
            </SelectItem>
            <SelectItem value="in-stock">
              $200-$300
            </SelectItem>
            <SelectItem value="low-stock">
              $300-$400
            </SelectItem>
            <SelectItem value="archived">
              $400-$500
            </SelectItem>
          </SelectContent>
        </Select>
        <Select default-value="all">
          <SelectTrigger>
            <span class="text-muted-foreground text-sm">Status:</span>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              In Stock
            </SelectItem>
            <SelectItem value="in-stock">
              Low Stock
            </SelectItem>
            <SelectItem value="low-stock">
              Archived
            </SelectItem>
            <SelectItem value="archived">
              Archived
            </SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <ListFilterIcon />
        </Button>
        <Button variant="outline" size="icon">
          <ArrowUpDownIcon />
        </Button>
      </div>
    </div>
    <div class="rounded-lg">
      <Table>
        <TableHeader class="bg-muted/50">
          <TableRow class="!border-0">
            <TableHead class="w-12 rounded-l-lg px-4">
              <Checkbox />
            </TableHead>
            <TableHead>Product</TableHead>
            <TableHead class="text-right">
              Price
            </TableHead>
            <TableHead class="text-right">
              Stock
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Added</TableHead>
            <TableHead class="rounded-r-lg" />
          </TableRow>
        </TableHeader>
        <TableBody class="**:data-[slot=table-cell]:py-2.5">
          <TableRow v-for="product in products" :key="product.id">
            <TableCell class="px-4">
              <Checkbox />
            </TableCell>
            <TableCell class="font-medium">
              {{ product.name }}
            </TableCell>
            <TableCell class="text-right">
              ${{ product.price.toFixed(2) }}
            </TableCell>
            <TableCell class="text-right">
              {{ product.stock }}
            </TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                :class="
                  product.status === 'Low Stock'
                    ? 'border-orange-500 bg-transparent text-orange-500 dark:border-orange-500 dark:bg-transparent dark:text-orange-500'
                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                "
              >
                {{ product.status }}
              </Badge>
            </TableCell>
            <TableCell>
              {{ new Date(product.dateAdded).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }) }}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="icon" class="size-6">
                    <EllipsisVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <div class="flex justify-end">
      <Pagination :items-per-page="10">
        <PaginationContent>
          <PaginationPrevious href="#" />
          <PaginationItem :value="1">
            1
          </PaginationItem>
          <PaginationItem :value="2">
            2
          </PaginationItem>
          <PaginationItem :value="3">
            3
          </PaginationItem>

          <PaginationEllipsis />

          <PaginationNext href="#" />
        </PaginationContent>
      </Pagination>
    </div>
  </div>
</template>
