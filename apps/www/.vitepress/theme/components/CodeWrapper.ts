import { type VNode, type VNodeArrayChildren, cloneVNode, defineComponent } from 'vue'
import { useConfigStore } from '@/stores/config'

function crawlSpan(children: VNodeArrayChildren, cb: (vnode: VNode) => void) {
  children.forEach((childNode) => {
    if (!Array.isArray(childNode) && typeof childNode === 'object') {
      if (typeof childNode?.children === 'string')
        cb(childNode)
      else
        crawlSpan(childNode?.children as VNodeArrayChildren ?? [], cb)
    }
  })
}

export default defineComponent(
  (props, { slots }) => {
    const { codeConfig } = useConfigStore()

    return () => {
      const clonedVNode = slots.default?.()?.[0]
        ? cloneVNode(slots.default?.()?.[0], {
          key: JSON.stringify(codeConfig.value),
        })
        : undefined

      // @ts-expect-error  cloneVNode
      const preVNode = [...clonedVNode?.children].find((node: VNode) => node.type === 'pre') as VNode
      // @ts-expect-error  cloneVNode
      const codeVNode = preVNode.children?.at(0) as VNode

      if (codeVNode) {
        crawlSpan(codeVNode.children as VNodeArrayChildren, (vnode) => {
          if (typeof vnode.children === 'string') {
            vnode.children = vnode.children.replaceAll('@/components', codeConfig.value.componentsPath)
            vnode.children = vnode.children.replaceAll('@/libs', codeConfig.value.utilsPath)
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
