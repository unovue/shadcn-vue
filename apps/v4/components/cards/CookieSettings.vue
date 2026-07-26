<script setup lang="ts">
import { Button } from '@/registry/new-york-v4/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/new-york-v4/ui/card'
import { Label } from '@/registry/new-york-v4/ui/label'
import { Switch } from '@/registry/new-york-v4/ui/switch'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Cookie Settings</CardTitle>
      <CardDescription>Manage your cookie settings here.</CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
      <div class="flex items-center justify-between gap-4">
        <Label for="necessary" class="flex flex-col items-start">
          <span>Strictly Necessary</span>
          <span class="text-muted-foreground leading-snug font-normal">
            These cookies are essential in order to use the website and use
            its features.
          </span>
        </Label>
        <Switch id="necessary" :default-value="true" aria-label="Necessary" />
      </div>
      <div class="flex items-center justify-between gap-4">
        <Label for="functional" class="flex flex-col items-start">
          <span>Functional Cookies</span>
          <span class="text-muted-foreground leading-snug font-normal">
            These cookies allow the website to provide personalized
            functionality.
          </span>
        </Label>
        <Switch id="functional" aria-label="Functional" />
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" class="w-full">
        Save preferences
      </Button>
    </CardFooter>
  </Card>
</template>
