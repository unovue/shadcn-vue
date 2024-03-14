import { type VNode, cloneVNode, defineComponent } from 'vue'
import { useConfigStore } from '@/stores/config'

export default defineComponent(
  (props, { slots }) => {
    const { codeConfig } = useConfigStore()

    return () => {
      const clonedVNode = slots.default?.()?.[0] ? cloneVNode(slots.default?.()?.[0]) : undefined
      // @ts-expect-error  cloneVNode
      const preVNode = [...clonedVNode?.children].find((node: VNode) => node.type === 'pre') as VNode
      // @ts-expect-error  cloneVNode
      const codeVNode = preVNode.children?.at(0) as VNode
      if (codeVNode) {
        // @ts-expect-error  cloneVNode
        [...codeVNode.children]
          .filter((node: VNode) => node.type === 'span')
          .forEach((node: VNode) => {
            if (node.children) {
              // @ts-expect-error  cloneVNode
              [...node.children].forEach((childNode: VNode) => {
                if (typeof childNode.children === 'string') {
                  childNode.children = childNode.children.replaceAll('@/components', codeConfig.value.componentsPath)
                  childNode.children = childNode.children.replaceAll('@/libs', codeConfig.value.utilsPath)
                }
              })
            }
          })

        return clonedVNode
      }
      else {
        return slots.default?.()
      }
    }
  },
)
