import loadConfigVue from './vue/config'
import initVue from './vue/init'
import addVue from './vue/add'
import diffVue from './vue/diff'

export default {
  vue: {
    loadConfig: loadConfigVue,
    init: initVue,
    add: addVue,
    diff: diffVue,
  },
  // For now we run the same commands for Nuxt as for Vue
  // TODO: replace with Nuxt-specific commands when required
  nuxt: {
    loadConfig: loadConfigVue,
    init: initVue,
    add: addVue,
    diff: diffVue,
  },
}
