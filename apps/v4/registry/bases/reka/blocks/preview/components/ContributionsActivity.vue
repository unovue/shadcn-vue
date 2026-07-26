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
import { Checkbox } from "@/registry/bases/reka/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/registry/bases/reka/ui/field"
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Contributions &amp; Activity</CardTitle>
      <CardDescription>
        Manage your contributions and activity visibility.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form id="contributions-activity">
        <FieldGroup>
          <FieldSet>
            <FieldLegend class="sr-only">
              Contributions &amp; activity
            </FieldLegend>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox id="activity-private-profile" />
                <FieldContent>
                  <FieldLabel for="activity-private-profile">
                    Make profile private and hide activity
                  </FieldLabel>
                  <FieldDescription>
                    Enabling this will hide your contributions and activity
                    from your GitHub profile and from social features like
                    followers, stars, feeds, leaderboards and releases.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </CardContent>
    <CardFooter>
      <Button form="contributions-activity">
        Save Changes
      </Button>
    </CardFooter>
  </Card>
</template>
