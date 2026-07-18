<script setup lang="ts">
import QRCode from "qrcode"
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"

const svgData = ref("")

onMounted(async () => {
  svgData.value = await QRCode.toString("https://shadcn-vue.com", {
    type: "svg",
    margin: 0,
  })
})
</script>

<template>
  <Card>
    <CardContent class="flex justify-center pt-6">
      <div class="rounded-xl border bg-white p-4 dark:bg-black dark:invert">
        <div
          v-if="svgData"
          class="size-40 [&_svg]:size-full"
          v-html="svgData"
        />
        <div v-else class="size-40 animate-pulse rounded-sm bg-muted" />
      </div>
    </CardContent>
    <CardHeader class="text-center">
      <CardTitle>Scan to connect your mobile device</CardTitle>
      <CardDescription>
        Open the Ledger mobile app and scan this code to link your device.
      </CardDescription>
    </CardHeader>
    <CardFooter>
      <Button variant="secondary" class="w-full">
        Got it
      </Button>
    </CardFooter>
  </Card>
</template>
