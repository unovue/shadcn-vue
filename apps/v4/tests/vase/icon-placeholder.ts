import { defineComponent, h } from 'vue'

export const IconPlaceholder = defineComponent({
  name: 'IconPlaceholder',
  props: ['lucide', 'tabler', 'hugeicons', 'phosphor', 'remixicon'],
  setup: () => () => h('svg', { 'data-icon-placeholder': '', 'aria-hidden': 'true' }),
})

export default IconPlaceholder
