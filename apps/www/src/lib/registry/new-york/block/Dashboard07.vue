<script lang="ts">
export const description = 'A product details page.'
export const iframeHeight = '780px'
export const containerClass = 'w-full h-full'
</script>

<script setup lang="ts">
import {
  ChevronLeft,
  CircleUser,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from 'lucide-vue-next'

import { Badge } from '@/lib/registry/new-york/ui/badge'
import { Button } from '@/lib/registry/new-york/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/lib/registry/new-york/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/lib/registry/new-york/ui/dropdown-menu'
import { Input } from '@/lib/registry/new-york/ui/input'
import { Textarea } from '@/lib/registry/new-york/ui/textarea'
import { Label } from '@/lib/registry/new-york/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/lib/registry/new-york/ui/toggle-group'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/lib/registry/new-york/ui/breadcrumb'
import { Sheet, SheetContent, SheetTrigger } from '@/lib/registry/new-york/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/lib/registry/new-york/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/registry/new-york/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/lib/registry/new-york/ui/tooltip'
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
        <a
          href="#"
          class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
          <span class="sr-only">Acme Inc</span>
        </a>
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="#"
              class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Home class="h-5 w-5" />
              <span class="sr-only">Dashboard</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">
            Dashboard
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="#"
              class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <ShoppingCart class="h-5 w-5" />
              <span class="sr-only">Orders</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">
            Orders
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="#"
              class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Package class="h-5 w-5" />
              <span class="sr-only">Products</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">
            Products
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="#"
              class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Users2 class="h-5 w-5" />
              <span class="sr-only">Customers</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">
            Customers
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="#"
              class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <LineChart class="h-5 w-5" />
              <span class="sr-only">Analytics</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">
            Analytics
          </TooltipContent>
        </Tooltip>
      </nav>
      <nav class="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger as-child>
            <a
              href="#"
              class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings class="h-5 w-5" />
              <span class="sr-only">Settings</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right">
            Settings
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger as-child>
            <Button size="icon" variant="outline" class="sm:hidden">
              <PanelLeft class="h-5 w-5" />
              <span class="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="sm:max-w-xs">
            <nav class="grid gap-6 text-lg font-medium">
              <a
                href="#"
                class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
                <span class="sr-only">Acme Inc</span>
              </a>
              <a
                href="#"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home class="h-5 w-5" />
                Dashboard
              </a>
              <a
                href="#"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <ShoppingCart class="h-5 w-5" />
                Orders
              </a>
              <a
                href="#"
                class="flex items-center gap-4 px-2.5 text-foreground"
              >
                <Package class="h-5 w-5" />
                Products
              </a>
              <a
                href="#"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Users2 class="h-5 w-5" />
                Customers
              </a>
              <a
                href="#"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LineChart class="h-5 w-5" />
                Settings
              </a>
            </nav>
          </SheetContent>
        </Sheet>
        <Breadcrumb class="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <a href="#">Dashboard</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <a href="#">Products</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div class="relative ml-auto flex-1 md:grow-0">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <CircleUser class="h-5 w-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div class="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div class="flex items-center gap-4">
            <Button variant="outline" size="icon" class="h-7 w-7">
              <ChevronLeft class="h-4 w-4" />
              <span class="sr-only">Back</span>
            </Button>
            <h1 class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Pro Controller
            </h1>
            <Badge variant="outline" class="ml-auto sm:ml-0">
              In stock
            </Badge>
            <div class="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">
                Save Product
              </Button>
            </div>
          </div>
          <div class="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="grid gap-6">
                    <div class="grid gap-3">
                      <Label html-for="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        class="w-full"
                        default-value="Gamer Gear Pro Controller"
                      />
                    </div>
                    <div class="grid gap-3">
                      <Label html-for="description">Description</Label>
                      <Textarea
                        id="description"
                        default-value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                        class="min-h-32"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Stock</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead class="w-[100px]">
                          SKU
                        </TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead class="w-[100px]">
                          Size
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell class="font-semibold">
                          GGPC-001
                        </TableCell>
                        <TableCell>
                          <Label html-for="stock-1" class="sr-only">
                            Stock
                          </Label>
                          <Input
                            id="stock-1"
                            type="number"
                            default-value="100"
                          />
                        </TableCell>
                        <TableCell>
                          <Label html-for="price-1" class="sr-only">
                            Price
                          </Label>
                          <Input
                            id="price-1"
                            type="number"
                            default-value="99.99"
                          />
                        </TableCell>
                        <TableCell>
                          <ToggleGroup
                            type="single"
                            default-value="s"
                            variant="outline"
                          >
                            <ToggleGroupItem value="s">
                              S
                            </ToggleGroupItem>
                            <ToggleGroupItem value="m">
                              M
                            </ToggleGroupItem>
                            <ToggleGroupItem value="l">
                              L
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell class="font-semibold">
                          GGPC-002
                        </TableCell>
                        <TableCell>
                          <Label html-for="stock-2" class="sr-only">
                            Stock
                          </Label>
                          <Input
                            id="stock-2"
                            type="number"
                            default-value="143"
                          />
                        </TableCell>
                        <TableCell>
                          <Label html-for="price-2" class="sr-only">
                            Price
                          </Label>
                          <Input
                            id="price-2"
                            type="number"
                            default-value="99.99"
                          />
                        </TableCell>
                        <TableCell>
                          <ToggleGroup
                            type="single"
                            default-value="m"
                            variant="outline"
                          >
                            <ToggleGroupItem value="s">
                              S
                            </ToggleGroupItem>
                            <ToggleGroupItem value="m">
                              M
                            </ToggleGroupItem>
                            <ToggleGroupItem value="l">
                              L
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell class="font-semibold">
                          GGPC-003
                        </TableCell>
                        <TableCell>
                          <Label html-for="stock-3" class="sr-only">
                            Stock
                          </Label>
                          <Input
                            id="stock-3"
                            type="number"
                            default-value="32"
                          />
                        </TableCell>
                        <TableCell>
                          <Label html-for="price-3" class="sr-only">
                            Stock
                          </Label>
                          <Input
                            id="price-3"
                            type="number"
                            default-value="99.99"
                          />
                        </TableCell>
                        <TableCell>
                          <ToggleGroup
                            type="single"
                            default-value="s"
                            variant="outline"
                          >
                            <ToggleGroupItem value="s">
                              S
                            </ToggleGroupItem>
                            <ToggleGroupItem value="m">
                              M
                            </ToggleGroupItem>
                            <ToggleGroupItem value="l">
                              L
                            </ToggleGroupItem>
                          </ToggleGroup>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter class="justify-center border-t p-4">
                  <Button size="sm" variant="ghost" class="gap-1">
                    <PlusCircle class="h-3.5 w-3.5" />
                    Add Variant
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Product Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="grid gap-6 sm:grid-cols-3">
                    <div class="grid gap-3">
                      <Label html-for="category">Category</Label>
                      <Select>
                        <SelectTrigger
                          id="category"
                          aria-label="Select category"
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clothing">
                            Clothing
                          </SelectItem>
                          <SelectItem value="electronics">
                            Electronics
                          </SelectItem>
                          <SelectItem value="accessories">
                            Accessories
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div class="grid gap-3">
                      <Label html-for="subcategory">
                        Subcategory (optional)
                      </Label>
                      <Select>
                        <SelectTrigger
                          id="subcategory"
                          aria-label="Select subcategory"
                        >
                          <SelectValue placeholder="Select subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="t-shirts">
                            T-Shirts
                          </SelectItem>
                          <SelectItem value="hoodies">
                            Hoodies
                          </SelectItem>
                          <SelectItem value="sweatshirts">
                            Sweatshirts
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div class="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="grid gap-6">
                    <div class="grid gap-3">
                      <Label html-for="status">Status</Label>
                      <Select>
                        <SelectTrigger id="status" aria-label="Select status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">
                            Draft
                          </SelectItem>
                          <SelectItem value="published">
                            Active
                          </SelectItem>
                          <SelectItem value="archived">
                            Archived
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card class="overflow-hidden">
                <CardHeader>
                  <CardTitle>Product imgs</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div class="grid gap-2">
                    <img
                      alt="Product image"
                      class="aspect-square w-full rounded-md object-cover"
                      height="300"
                      src="/placeholder.svg"
                      width="300"
                    >
                    <div class="grid grid-cols-3 gap-2">
                      <button>
                        <img
                          alt="Product image"
                          class="aspect-square w-full rounded-md object-cover"
                          height="84"
                          src="/placeholder.svg"
                          width="84"
                        >
                      </button>
                      <button>
                        <img
                          alt="Product image"
                          class="aspect-square w-full rounded-md object-cover"
                          height="84"
                          src="/placeholder.svg"
                          width="84"
                        >
                      </button>
                      <button class="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                        <Upload class="h-4 w-4 text-muted-foreground" />
                        <span class="sr-only">Upload</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Archive Product</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div />
                  <Button size="sm" variant="secondary">
                    Archive Product
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <div class="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">
              Save Product
            </Button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
