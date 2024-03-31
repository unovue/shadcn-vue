<script lang="ts">
export const description
  = 'A sign up form with first name, last name, email and password inside a card. There\'s an option to sign up with GitHub and a link to login if you already have an account'
export const iframeHeight = '600px'
export const containerClass = 'w-full h-screen flex items-center justify-center px-4'
</script>

<script setup lang="ts">
import { Button } from '@/lib/registry/default/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/registry/default/ui/card'
import { Input } from '@/lib/registry/default/ui/input'
import { Label } from '@/lib/registry/default/ui/label'
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-xl">
        Sign Up
      </CardTitle>
      <CardDescription>
        Enter your information to create an account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <Label for="first-name">First name</Label>
            <Input id="first-name" placeholder="Max" required />
          </div>
          <div class="grid gap-2">
            <Label for="last-name">Last name</Label>
            <Input id="last-name" placeholder="Robinson" required />
          </div>
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <Button type="submit" class="w-full">
          Create an account
        </Button>
        <Button variant="outline" class="w-full">
          Sign up with GitHub
        </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <a href="#" class="underline">
          Sign in
        </a>
      </div>
    </CardContent>
  </Card>
</template>
