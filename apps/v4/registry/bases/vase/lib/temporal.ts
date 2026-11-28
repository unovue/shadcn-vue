import { installImplementation } from "temporal-polyfill/shim"

export function installTemporal() {
  if (!("Temporal" in globalThis)) {
    installImplementation()
  }
}
