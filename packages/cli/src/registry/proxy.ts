import { ProxyAgent } from "undici"

// Shared by every registry fetch so we only build one agent per process.
export const agent = process.env.https_proxy
  ? new ProxyAgent(process.env.https_proxy)
  : undefined
