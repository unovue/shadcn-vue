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
import { Input } from '@/registry/new-york-v4/ui/input'
import { Label } from '@/registry/new-york-v4/ui/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/registry/new-york-v4/ui/tabs'
import { AppWindowIcon, CodeIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col gap-6">
    <Tabs default-value="account" class="max-w-[400px]">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="account">
          Account
        </TabsTrigger>
        <TabsTrigger value="password">
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're
              done.
            </CardDescription>
          </CardHeader>
          <CardContent class="grid gap-6">
            <div class="grid gap-3">
              <Label for="tabs-demo-name">Name</Label>
              <Input id="tabs-demo-name" default-value="Pedro Duarte" />
            </div>
            <div class="grid gap-3">
              <Label for="tabs-demo-username">Username</Label>
              <Input id="tabs-demo-username" default-value="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent class="grid gap-6">
            <div class="grid gap-3">
              <Label for="tabs-demo-current">Current password</Label>
              <Input id="tabs-demo-current" type="password" />
            </div>
            <div class="grid gap-3">
              <Label for="tabs-demo-new">New password</Label>
              <Input id="tabs-demo-new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    <Tabs default-value="home">
      <TabsList>
        <TabsTrigger value="home">
          Home
        </TabsTrigger>
        <TabsTrigger value="settings">
          Settings
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <Tabs default-value="home">
      <TabsList>
        <TabsTrigger value="home">
          Home
        </TabsTrigger>
        <TabsTrigger value="settings" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <Tabs default-value="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <AppWindowIcon />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <CodeIcon />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</template>
