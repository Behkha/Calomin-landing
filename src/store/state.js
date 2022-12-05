// https://vuex.vuejs.org/en/state.html
import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

export default  {
  status: localStorage.hasOwnProperty('user_token_parsport'), // true : logged in , false : failed , 'activation' : not activated
  loading: false,
  failed: false,
  name: localStorage.getItem('name'),
  username: localStorage.getItem('username'),
  token: localStorage.getItem('user_token_parsport'),
}
