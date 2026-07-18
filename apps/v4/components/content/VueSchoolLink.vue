<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { VideoIcon } from '@lucide/vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import {
  Alert,
  AlertTitle,
} from '@/registry/new-york-v4/ui/alert'

const props = withDefaults(defineProps<{
  lesson?: string
  placement: string
  href?: string
  utmMedium?: string
  friend?: string
  utmSource?: string
  utmCampaign?: string
  class?: HTMLAttributes['class']
  target?: '_blank' | '_parent' | '_self' | '_top' | (string & object) | undefined
  rel?: string
}>(), {
  utmMedium: 'docs',
  friend: 'ZERNONIA',
  utmSource: 'SHADCNVUE',
  utmCampaign: 'affiliate',
  target: '_blank',
})

const route = useRoute()

const resolvedHref = computed(() => {
  const base = props.href ?? (props.lesson ? `https://vueschool.io/lessons/${props.lesson}` : '')
  if (!base)
    return ''

  try {
    const url = new URL(base)
    const params = url.searchParams

    if (props.friend && !params.has('friend')) {
      params.set('friend', props.friend)
    }
    if (props.utmSource && !params.has('utm_source')) {
      params.set('utm_source', props.utmSource)
    }
    if (props.utmMedium && !params.has('utm_medium')) {
      params.set('utm_medium', props.utmMedium)
    }
    if (props.utmCampaign && !params.has('utm_campaign')) {
      params.set('utm_campaign', props.utmCampaign)
    }
    if (props.placement && !params.has('utm_content')) {
      params.set('utm_content', `${route.path}_${props.placement}`)
    }

    url.search = params.toString()
    return url.toString()
  }
  catch {
    return ''
  }
})
</script>

<template>
  <Alert
    :class="cn(
      'mt-6 w-auto rounded-xl border-surface bg-surface text-surface-foreground md:-mx-1 **:[code]:border',
      props.class,
    )"
  >
    <VideoIcon />
    <AlertTitle>
      <a
        :href="resolvedHref"
        :target="props.target"
        :rel="props.rel"
        class="font-medium"
      >
        <slot v-if="$slots.default" />
      </a>
    </AlertTitle>
  </Alert>
</template>
