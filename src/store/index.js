 // * Vuex
 // *
 // * @library
 // *
 // * https://vuex.vuejs.org/en/
 // */

// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'

// Store functionality
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex)

// Create a new store
const store ={
  actions,
  getters,
  mutations,
  state
}

export default new Vuex.Store(store)
