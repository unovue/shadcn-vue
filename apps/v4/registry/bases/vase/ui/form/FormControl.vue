<script lang="ts">
import type { VNode } from "vue"
import { cloneVNode, Comment, defineComponent, Fragment, mergeProps } from "vue"
import { useFormField } from "./useFormField"

function firstElement(nodes: VNode[]): VNode | undefined {
  for (const node of nodes) {
    if (node.type === Comment)
      continue
    if (node.type === Fragment && Array.isArray(node.children)) {
      const nested = firstElement(node.children as VNode[])
      if (nested)
        return nested
      continue
    }
    return node
  }
}

export default defineComponent({
  name: "FormControl",
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return () => {
      const child = firstElement(slots.default?.() ?? [])
      if (!child)
        return null

      // A prop that the child sets itself wins.
      const own = child.props ?? {}
      const control: Record<string, unknown> = {
        "id": formItemId,
        "data-slot": "form-control",
        "aria-describedby": !error.value ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
        "aria-invalid": !!error.value,
      }
      for (const key of Object.keys(control)) {
        if (key in own)
          delete control[key]
      }

      return cloneVNode(child, mergeProps(attrs, control), true)
    }
  },
})
</script>
