import * as components from './components'
import DocsLayout from './layout/DocsLayout.vue'
import ExamplesLayout from './layout/ExamplesLayout.vue'
// https://vitepress.dev/guide/custom-theme
import Layout from './layout/MainLayout.vue'
import './style.css'
import './styles/vp-doc.css'
import './styles/shiki.css'
import './styles/themes.css'

export default {
  Layout,
  enhanceApp({ app }) {
    // ...
    app.component('docs', DocsLayout)
    app.component('examples', ExamplesLayout)

    for (const component of Object.keys(components))
      app.component(component, components[component])
  },
}
