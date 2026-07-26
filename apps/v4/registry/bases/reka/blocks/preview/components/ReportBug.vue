<script setup lang="ts">
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/registry/bases/reka/ui/field"
import { Input } from "@/registry/bases/reka/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bases/reka/ui/select"
import { Textarea } from "@/registry/bases/reka/ui/textarea"
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Report Bug</CardTitle>
      <CardDescription>Help us fix issues faster.</CardDescription>
    </CardHeader>
    <CardContent>
      <FieldGroup>
        <Field>
          <FieldLabel for="bug-title">
            Title
          </FieldLabel>
          <Input
            id="bug-title"
            placeholder="Brief description of the issue"
          />
        </Field>
        <div class="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel for="bug-severity">
              Severity
            </FieldLabel>
            <Select default-value="medium">
              <SelectTrigger id="bug-severity" class="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="critical">
                    Critical
                  </SelectItem>
                  <SelectItem value="high">
                    High
                  </SelectItem>
                  <SelectItem value="medium">
                    Medium
                  </SelectItem>
                  <SelectItem value="low">
                    Low
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel for="bug-component">
              Component
            </FieldLabel>
            <Select default-value="dashboard">
              <SelectTrigger id="bug-component" class="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="dashboard">
                    Dashboard
                  </SelectItem>
                  <SelectItem value="auth">
                    Auth
                  </SelectItem>
                  <SelectItem value="api">
                    API
                  </SelectItem>
                  <SelectItem value="billing">
                    Billing
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field>
          <FieldLabel for="bug-steps">
            Steps to reproduce
          </FieldLabel>
          <Textarea
            id="bug-steps"
            placeholder="1. Go to&#10;2. Click on&#10;3. Observe..."
            class="min-h-24 resize-none"
          />
        </Field>
      </FieldGroup>
    </CardContent>
    <CardFooter>
      <Field orientation="horizontal" class="justify-end">
        <Button variant="outline">
          Attach File
        </Button>
        <Button>Submit Bug</Button>
      </Field>
    </CardFooter>
  </Card>
</template>
