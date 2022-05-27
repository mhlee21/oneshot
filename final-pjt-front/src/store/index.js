import Vue from 'vue'
import Vuex from 'vuex'

import movies from './modules/movies'
import shots from './modules/shots'
import accounts from './modules/accounts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { movies, accounts, shots }
})
