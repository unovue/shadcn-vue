import type { DesignSystemSearchParams } from '@/composables/useDesignSystemSearchParams'

type ParentToIframeMessage
  = | {
    type: 'design-system-params'
    data: DesignSystemSearchParams
  }
  | {
    type: 'color-mode-sync'
    data: { colorMode: string }
  }

function isInIframe() {
  if (typeof window === 'undefined') {
    return false
  }
  return window.self !== window.top
}

export function useIframeMessageListener<
  Message extends ParentToIframeMessage,
  MessageType extends Message['type'],
>(
  messageType: MessageType,
  onMessage: (data: Extract<Message, { type: MessageType }>['data']) => void,
) {
  onMounted(() => {
    if (!isInIframe()) {
      return
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === messageType) {
        onMessage(event.data.data)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  })
}

export function sendToIframe<
  Message extends ParentToIframeMessage,
  MessageType extends Message['type'],
>(
  iframe: HTMLIFrameElement | null,
  messageType: MessageType,
  data: Extract<Message, { type: MessageType }>['data'],
) {
  if (!iframe?.contentWindow) {
    return
  }

  iframe.contentWindow.postMessage(
    {
      type: messageType,
      data,
    },
    '*',
  )
}
