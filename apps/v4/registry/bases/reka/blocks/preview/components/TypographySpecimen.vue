<script setup lang="ts">
import { Button } from "@/registry/bases/reka/ui/button"
import { Card, CardContent, CardFooter } from "@/registry/bases/reka/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/bases/reka/ui/dialog"
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

// Static values (no Next.js search params)
const headingLabel = "Inherit"
const bodyLabel = "Default"
</script>

<template>
  <Card>
    <CardContent class="flex flex-col gap-2">
      <div class="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {{ headingLabel }} - {{ bodyLabel }}
      </div>
      <p class="cn-font-heading text-2xl font-medium">
        Designing with rhythm and hierarchy.
      </p>
      <p class="text-sm leading-relaxed text-muted-foreground">
        A strong body style keeps long-form content readable and balances the
        visual weight of headings.
      </p>
      <p class="text-sm leading-relaxed text-muted-foreground">
        Thoughtful spacing and cadence help paragraphs scan quickly without
        feeling dense.
      </p>
    </CardContent>
    <CardFooter>
      <Dialog>
        <DialogTrigger :as-child="true">
          <Button variant="outline" class="w-full">
            Share Feedback
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Feedback</DialogTitle>
            <DialogDescription>
              Let us know how we can improve your experience.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <div class="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel for="feedback-name">
                  Name
                </FieldLabel>
                <Input id="feedback-name" placeholder="Your name" />
              </Field>
              <Field>
                <FieldLabel for="feedback-email">
                  Email
                </FieldLabel>
                <Input
                  id="feedback-email"
                  type="email"
                  placeholder="you@example.com"
                />
              </Field>
            </div>
            <Field>
              <FieldLabel for="feedback-category">
                Category
              </FieldLabel>
              <Select default-value="general">
                <SelectTrigger id="feedback-category" class="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="general">
                      General
                    </SelectItem>
                    <SelectItem value="bug">
                      Bug Report
                    </SelectItem>
                    <SelectItem value="feature">
                      Feature Request
                    </SelectItem>
                    <SelectItem value="improvement">
                      Improvement
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel for="feedback-message">
                Message
              </FieldLabel>
              <Textarea
                id="feedback-message"
                placeholder="Tell us what's on your mind..."
                class="min-h-24 resize-none"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose :as-child="true">
              <Button variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </CardFooter>
  </Card>
</template>
