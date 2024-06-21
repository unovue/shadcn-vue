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
}
