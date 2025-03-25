<script setup lang="ts">
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/registry/new-york-v4/ui/avatar'
import { Badge } from '@/registry/new-york-v4/ui/badge'

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
import { BathIcon, BedIcon, LandPlotIcon } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div class="flex flex-col gap-6">
            <div class="grid gap-2">
              <Label html-for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div class="grid gap-2">
              <div class="flex items-center">
                <Label html-for="password">Password</Label>
                <a
                  href="#"
                  class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter class="flex-col gap-2">
        <Button type="submit" class="w-full">
          Login
        </Button>
        <Button variant="outline" class="w-full">
          Login with Google
        </Button>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <a href="#" class="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </CardFooter>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Meeting Notes</CardTitle>
        <CardDescription>
          Transcript from the meeting with the client.
        </CardDescription>
      </CardHeader>
      <CardContent class="text-sm">
        <p>
          Client requested dashboard redesign with focus on mobile
          responsiveness.
        </p>
        <ol class="mt-4 flex list-decimal flex-col gap-2 pl-6">
          <li>New analytics widgets for daily/weekly metrics</li>
          <li>Simplified navigation menu</li>
          <li>Dark mode support</li>
          <li>Timeline: 6 weeks</li>
          <li>Follow-up meeting scheduled for next Tuesday</li>
        </ol>
      </CardContent>
      <CardFooter>
        <div class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </div>
      </CardFooter>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Is this an image?</CardTitle>
        <CardDescription>This is a card with an image.</CardDescription>
      </CardHeader>
      <CardContent class="px-0">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          class="aspect-video object-cover"
          width="500"
          height="500"
        >
      </CardContent>
      <CardFooter class="flex items-center gap-2">
        <Badge variant="outline">
          <BedIcon /> 4
        </Badge>
        <Badge variant="outline">
          <BathIcon /> 2
        </Badge>
        <Badge variant="outline">
          <LandPlotIcon /> 350m²
        </Badge>
        <div class="ml-auto font-medium tabular-nums">
          $135,000
        </div>
      </CardFooter>
    </Card>
    <div class="flex w-full flex-wrap items-start gap-8 md:*:data-[slot=card]:basis-1/4">
      <Card>
        <CardContent class="text-sm">
          Content Only
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Header Only</CardTitle>
          <CardDescription>
            This is a card with a header and a description.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Header and Content</CardTitle>
          <CardDescription>
            This is a card with a header and a content.
          </CardDescription>
        </CardHeader>
        <CardContent class="text-sm">
          Content
        </CardContent>
      </Card>
      <Card>
        <CardFooter class="text-sm">
          Footer Only
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Header + Footer</CardTitle>
          <CardDescription>
            This is a card with a header and a footer.
          </CardDescription>
        </CardHeader>
        <CardFooter class="text-sm">
          Footer
        </CardFooter>
      </Card>
      <Card>
        <CardContent class="text-sm">
          Content
        </CardContent>
        <CardFooter class="text-sm">
          Footer
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Header + Footer</CardTitle>
          <CardDescription>
            This is a card with a header and a footer.
          </CardDescription>
        </CardHeader>
        <CardContent class="text-sm">
          Content
        </CardContent>
        <CardFooter class="text-sm">
          Footer
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
