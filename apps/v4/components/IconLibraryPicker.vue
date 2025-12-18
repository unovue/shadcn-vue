<script setup lang="ts">
import type { IconLibraryName } from '@/registry/config'
import { Item, ItemContent, ItemTitle } from '@/registry/bases/reka/ui/item'
import {
  iconLibraries,

} from '@/registry/config'

const props = defineProps<{
  isMobile: boolean
  anchorRef: HTMLDivElement | null
}>()

const IconLucide = defineAsyncComponent(() =>
  import('@/registry/icons/icon-lucide').then(mod => mod.IconLucide),
)

const IconTabler = defineAsyncComponent(() =>
  import('@/registry/icons/icon-tabler').then(mod => mod.IconTabler),
)

const IconHugeicons = defineAsyncComponent(() =>
  import('@/registry/icons/icon-hugeicons').then(mod => mod.IconHugeicons),
)

const PREVIEW_ICONS = {
  lucide: [
    'CopyIcon',
    'CircleAlertIcon',
    'TrashIcon',
    'ShareIcon',
    'ShoppingBagIcon',
    'MoreHorizontalIcon',
    'Loader2Icon',
    'PlusIcon',
    'MinusIcon',
    'ArrowLeftIcon',
    'ArrowRightIcon',
    'CheckIcon',
    'ChevronDownIcon',
    'ChevronRightIcon',
  ],
  tabler: [
    'IconCopy',
    'IconExclamationCircle',
    'IconTrash',
    'IconShare',
    'IconShoppingBag',
    'IconDots',
    'IconLoader',
    'IconPlus',
    'IconMinus',
    'IconArrowLeft',
    'IconArrowRight',
    'IconCheck',
    'IconChevronDown',
    'IconChevronRight',
  ],
  hugeicons: [
    'Copy01Icon',
    'AlertCircleIcon',
    'Delete02Icon',
    'Share03Icon',
    'ShoppingBag01Icon',
    'MoreHorizontalCircle01Icon',
    'Loading03Icon',
    'PlusSignIcon',
    'MinusSignIcon',
    'ArrowLeft02Icon',
    'ArrowRight02Icon',
    'Tick02Icon',
    'ArrowDown01Icon',
    'ArrowRight01Icon',
  ],
}

const logos = {
  lucide: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        d="M14 12a4 4 0 0 0-8 0 8 8 0 1 0 16 0 11.97 11.97 0 0 0-4-8.944"
      />
      <path
        stroke="currentColor"
        d="M10 12a4 4 0 0 0 8 0 8 8 0 1 0-16 0 11.97 11.97 0 0 0 4.063 9"
      />
    </svg>
  `,
  tabler: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="M31.288 7.107A8.83 8.83 0 0 0 24.893.712a55.9 55.9 0 0 0-17.786 0A8.83 8.83 0 0 0 .712 7.107a55.9 55.9 0 0 0 0 17.786 8.83 8.83 0 0 0 6.395 6.395c5.895.95 11.89.95 17.786 0a8.83 8.83 0 0 0 6.395-6.395c.95-5.895.95-11.89 0-17.786"
      />
      <path
        fill="#fff"
        d="m17.884 9.076 1.5-2.488 6.97 6.977-2.492 1.494zm-7.96 3.127 7.814-.909 3.91 3.66-.974 7.287-9.582 2.159a3.06 3.06 0 0 1-2.17-.329l5.244-4.897c.91.407 2.003.142 2.587-.626.584-.77.488-1.818-.226-2.484s-1.84-.755-2.664-.21c-.823.543-1.107 1.562-.67 2.412l-5.245 4.89a2.53 2.53 0 0 1-.339-2.017z"
      />
    </svg>
  `,
  hugeicons: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="128"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M2 9.5H22" stroke="currentColor"></path>
      <path
        d="M20.5 9.5H3.5L4.23353 15.3682C4.59849 18.2879 4.78097 19.7477 5.77343 20.6239C6.76589 21.5 8.23708 21.5 11.1795 21.5H12.8205C15.7629 21.5 17.2341 21.5 18.2266 20.6239C19.219 19.7477 19.4015 18.2879 19.7665 15.3682L20.5 9.5Z"
        stroke="currentColor"
      ></path>
      <path
        d="M5 9C5 5.41015 8.13401 2.5 12 2.5C15.866 2.5 19 5.41015 19 9"
        stroke="currentColor"
      ></path>
    </svg>
  `,
}

const params = useDesignSystemSearchParams()
const currentIconLibrary = computed(
  () => iconLibraries[params.iconLibrary.value as keyof typeof iconLibraries],
)
</script>

<template>
  <div class="group/picker relative">
    <Picker>
      <PickerTrigger>
        <div class="flex flex-col justify-start text-left">
          <div class="text-muted-foreground text-xs">
            Icon Library
          </div>
          <div class="text-foreground text-sm font-medium">
            {{ currentIconLibrary?.title }}
          </div>
        </div>
        <div
          class="text-foreground *:[svg]:text-foreground! pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none"
          v-html="logos[currentIconLibrary?.name as keyof typeof logos]"
        />
      </PickerTrigger>
      <PickerContent
        :anchor="isMobile ? anchorRef : undefined"
        :side="isMobile ? 'top' : 'right'"
        :align="isMobile ? 'center' : 'start'"
      >
        <PickerRadioGroup
          :model-value="currentIconLibrary?.name"
          @update:model-value="(value) => {
            params.iconLibrary.value = value as IconLibraryName
          }"
        >
          <PickerGroup>
            <template v-for="(iconLibrary, index) in Object.values(iconLibraries)" :key="iconLibrary.name">
              <PickerRadioItem
                :value="iconLibrary.name"
                class="pr-2 *:data-[slot=dropdown-menu-radio-item-indicator]:hidden"
              >
                <Item size="xs">
                  <ItemContent class="gap-1">
                    <ItemTitle class="text-muted-foreground text-xs font-medium">
                      {{ iconLibrary.title }}
                    </ItemTitle>
                    <!-- <IconLibraryPreview iconLibrary={iconLibrary.name} /> -->

                    <Suspense>
                      <div class="-mx-1 grid w-full grid-cols-7 gap-2">
                        <div
                          v-for="iconName in PREVIEW_ICONS[iconLibrary.name]"
                          :key="iconName"
                          class="flex size-6 items-center justify-center *:[svg]:size-5"
                        >
                          <component :is="IconLucide" v-if="iconLibrary.name === 'lucide'" :name="iconName" />
                          <component :is="IconTabler" v-else-if="iconLibrary.name === 'tabler'" :name="iconName" />
                          <component :is="IconHugeicons" v-else :name="iconName" />
                        </div>
                      </div>

                      <template #fallback>
                        <div class="-mx-1 grid w-full grid-cols-7 gap-2">
                          <div
                            v-for="iconName in PREVIEW_ICONS[iconLibrary.name]"
                            :key="iconName"
                            class="bg-muted size-6 animate-pulse rounded"
                          />
                        </div>
                      </template>
                    </Suspense>
                  </ItemContent>
                </Item>
              </PickerRadioItem>

              <PickerSeparator v-if="index < Object.values(iconLibraries).length - 1" class="opacity-50" />
            </template>
          </PickerGroup>
        </PickerRadioGroup>
      </PickerContent>
    </Picker>
    <LockButton
      param="iconLibrary"
      class="absolute top-1/2 right-10 -translate-y-1/2"
    />
  </div>
</template>
