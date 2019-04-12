import users from './user.js'
import menu from './menu.js'

import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    strict: false,
    modules: {
      users,
      menu
    }
  })
}

export default createStore
