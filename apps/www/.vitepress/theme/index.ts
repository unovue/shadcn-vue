/* eslint-disable vue/component-definition-name-casing */
// https://vitepress.dev/guide/custom-theme
import { createPinia } from 'pinia'
import { PiniaSharedState } from 'pinia-shared-state'

import Layout from './layout/MainLayout.vue'
import DocsLayout from './layout/DocsLayout.vue'
import ExamplesLayout from './layout/ExamplesLayout.vue'
import * as components from './components'
import './style.css'
import './styles/vp-doc.css'
import './styles/shiki.css'
import './styles/themes.css'

const pinia = createPinia()
pinia.use(PiniaSharedState({
  enable: false,
  type: 'native',
}))

export default {
  Layout,
  enhanceApp({ app }) {
    app.use(pinia)
    // ...
    app.component('docs', DocsLayout)
    app.component('examples', ExamplesLayout)

    for (const component of Object.keys(components))
      app.component(component, components[component])
  },
}
