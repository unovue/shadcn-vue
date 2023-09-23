<script setup lang="ts">
import { Button } from '@/lib/registry/new-york/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/lib/registry/new-york/ui/card'
import { Input } from '@/lib/registry/new-york/ui/input'
import { Label } from '@/lib/registry/new-york/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/registry/new-york/ui/select'
import { Textarea } from '@/lib/registry/new-york/ui/textarea'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Report an issue</CardTitle>
      <CardDescription>
        What area are you having problems with?
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="area">Area</Label>
          <Select default-value="billing">
            <SelectTrigger id="area">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="team">
                Team
              </SelectItem>
              <SelectItem value="billing">
                Billing
              </SelectItem>
              <SelectItem value="account">
                Account
              </SelectItem>
              <SelectItem value="deployments">
                Deployments
              </SelectItem>
              <SelectItem value="support">
                Support
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label for="security-level">Security Level</Label>
          <Select default-value="2">
            <SelectTrigger
              id="security-level"
              class="line-clamp-1 w-full truncate"
            >
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">
                Severity 1 (Highest)
              </SelectItem>
              <SelectItem value="2">
                Severity 2
              </SelectItem>
              <SelectItem value="3">
                Severity 3
              </SelectItem>
              <SelectItem value="4">
                Severity 4 (Lowest)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div class="grid gap-2">
        <Label for="subject">Subject</Label>
        <Input id="subject" placeholder="I need help with..." />
      </div>
      <div class="grid gap-2">
        <Label for="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Please include all information relevant to your issue."
        />
      </div>
    </CardContent>
    <CardFooter class="justify-between space-x-2">
      <Button variant="ghost">
        Cancel
      </Button>
      <Button>Submit</Button>
    </CardFooter>
  </Card>
</template>
