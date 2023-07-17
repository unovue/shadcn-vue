<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "radix-vue";
import { Icon } from "@iconify/vue";
import { AccordionClass, type AccordionClassProps } from "./cva"

interface AccordionProps {
  variant: AccordionClassProps["variant"];
  data: {
    value: string,
    title: string,
    content: string,
  }[],
  defaultValue: string,
  type: string,
  collapsible: boolean,
}

withDefaults(defineProps<AccordionProps>(),{
  variant: 'default',
  type: 'single',
  collapsible: true,
});
</script>

<template>
  <AccordionRoot
    :class="AccordionClass({ variant, component: 'root' })"
    :default-value="defaultValue"
    :type="type"
    :collapsible="collapsible"
  >
    <template v-for="item in data" :key="item.value">
      <AccordionItem
        :class="AccordionClass({ variant, component: 'item' })"
        :value="item.value"
      >
        <AccordionHeader :class="AccordionClass({ variant, component: 'header' })">
          <AccordionTrigger :class="AccordionClass({ variant, component: 'trigger' })"
            ><span>{{ item.title }}</span>
            <Icon
              icon="radix-icons:chevron-down"
              class="text-green10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent :class="AccordionClass({ variant, component: 'content' })">
          <div class="px-5 py-4">{{ item.content }}</div>
        </AccordionContent>
      </AccordionItem>
    </template>
  </AccordionRoot>
</template>
