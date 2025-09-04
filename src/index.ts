import type { App } from 'vue'
import FunnelGraph from './components/FunnelGraph.vue'
import type { FunnelData, FunnelConfig, FunnelGraphProps } from './types'

// Export types
export type {
  FunnelData,
  FunnelConfig,
  FunnelGraphProps
}

// Export component
export { FunnelGraph }

// Plugin install function
const install = (app: App): void => {
  app.component('FunnelGraph', FunnelGraph)
}

// Default export for use as plugin
export default {
  install
}

// Auto-install when included via script tag
if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue)
}