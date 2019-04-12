import Vue from 'vue'
import {Vue2Dragula} from 'vue2-dragula'

if (process.BROWSER_BUILD) {
  Vue.use(Vue2Dragula, {
    logging: {
      service: true
    }
  })
}
