import users from './user.js'

import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    strict: false,
    modules: {
      users
    }
  })
}

export default createStore
