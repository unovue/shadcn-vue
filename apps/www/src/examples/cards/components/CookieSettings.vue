<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/registry/default/ui/card'
import { Label } from '@/lib/registry/default/ui/label'
import { Switch } from '@/lib/registry/default/ui/switch'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Cookie Settings</CardTitle>
      <CardDescription>Manage your cookie settings here.</CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
      <div class="flex items-center justify-between space-x-2">
        <Label for="necessary" class="flex flex-col space-y-1">
          <span>Strictly Necessary</span>
          <span class="font-normal leading-snug text-muted-foreground">
            These cookies are essential in order to use the website and use
            its features.
          </span>
        </Label>
        <Switch id="necessary" default-checked />
      </div>
      <div class="flex items-center justify-between space-x-2">
        <Label for="functional" class="flex flex-col space-y-1">
          <span>Functional Cookies</span>
          <span class="font-normal leading-snug text-muted-foreground">
            These cookies allow the website to provide personalized
            functionality.
          </span>
        </Label>
        <Switch id="functional" />
      </div>
      <div class="flex items-center justify-between space-x-2">
        <Label for="performance" class="flex flex-col space-y-1">
          <span>Performance Cookies</span>
          <span class="font-normal leading-snug text-muted-foreground">
            These cookies help to improve the performance of the website.
          </span>
        </Label>
        <Switch id="performance" />
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" class="w-full">
        Save preferences
      </Button>
    </CardFooter>
  </Card>
</template>
