<script setup lang="ts">
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/lib/registry/default/ui/avatar'
import { Button } from '@/lib/registry/default/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/registry/default/ui/card'
import { Input } from '@/lib/registry/default/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/registry/default/ui/select'
import { Separator } from '@/lib/registry/default/ui/separator'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Share this document</CardTitle>
      <CardDescription>
        Anyone with the link can view this document.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex space-x-2">
        <Input value="http://example.com/link/to/document" read-only />
        <Button variant="secondary" class="shrink-0">
          Copy Link
        </Button>
      </div>
      <Separator class="my-4" />
      <div class="space-y-4">
        <h4 class="text-sm font-medium">
          People with access
        </h4>
        <div class="grid gap-6">
          <div class="flex items-center justify-between space-x-4">
            <div class="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/03.png" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div>
                <p class="text-sm font-medium leading-none">
                  Olivia Martin
                </p>
                <p class="text-sm text-muted-foreground">
                  m@example.com
                </p>
              </div>
            </div>
            <Select default-value="edit">
              <SelectTrigger class="ml-auto w-[110px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="edit">
                  Can edit
                </SelectItem>
                <SelectItem value="view">
                  Can view
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-center justify-between space-x-4">
            <div class="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/05.png" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <div>
                <p class="text-sm font-medium leading-none">
                  Isabella Nguyen
                </p>
                <p class="text-sm text-muted-foreground">
                  b@example.com
                </p>
              </div>
            </div>
            <Select default-value="view">
              <SelectTrigger class="ml-auto w-[110px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="edit">
                  Can edit
                </SelectItem>
                <SelectItem value="view">
                  Can view
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex items-center justify-between space-x-4">
            <div class="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div>
                <p class="text-sm font-medium leading-none">
                  Sofia Davis
                </p>
                <p class="text-sm text-muted-foreground">
                  p@example.com
                </p>
              </div>
            </div>
            <Select default-value="view">
              <SelectTrigger class="ml-auto w-[110px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="edit">
                  Can edit
                </SelectItem>
                <SelectItem value="view">
                  Can view
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
