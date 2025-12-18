import type { IconLibraryName } from "shadcn-vue/icons"
import type { Component, SVGAttributes } from "vue"
import { HugeiconsIcon } from "@hugeicons/vue"
import { defineComponent, h, ref, watchEffect } from "vue"

const iconPromiseCaches = new Map<string, Map<string, Promise<any>>>()

function getCache(libraryName: string) {
  if (!iconPromiseCaches.has(libraryName)) {
    iconPromiseCaches.set(libraryName, new Map())
  }
  return iconPromiseCaches.get(libraryName)!
}

function isIconData(data: any): data is unknown[] {
  return Array.isArray(data)
}

export function createIconLoader(libraryName: IconLibraryName) {
  const cache = getCache(libraryName)

  return defineComponent({
    name: `Icon${libraryName.charAt(0).toUpperCase() + libraryName.slice(1)}Loader`,
    props: {
      name: {
        type: String,
        required: true,
      },
      strokeWidth: {
        type: Number,
        default: 2,
      },
    },
    setup(props, { attrs }) {
      const iconData = ref<Component | unknown[] | null>(null)
      const isLoading = ref(true)

      watchEffect(async () => {
        const iconName = props.name

        if (!cache.has(iconName)) {
          const promise = import(`./__${libraryName}__.ts`).then((mod) => {
            const icon = mod[iconName as keyof typeof mod]
            return icon || null
          })
          cache.set(iconName, promise)
        }

        try {
          iconData.value = await cache.get(iconName)!
          isLoading.value = false
        }
        catch {
          iconData.value = null
          isLoading.value = false
        }
      })

      return () => {
        if (isLoading.value || !iconData.value) {
          return null
        }

        if (isIconData(iconData.value)) {
          return h(HugeiconsIcon, {
            icon: iconData.value,
            strokeWidth: props.strokeWidth,
            ...attrs,
          })
        }

        const IconComponent = iconData.value as Component
        return h(IconComponent, attrs as SVGAttributes)
      }
    },
  })
}
