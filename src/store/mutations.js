// https://vuex.vuejs.org/en/mutations.html
import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)

export default {
  //
  onLoad(state){
    state.loading = true;
  },
  afterLoad(state){
    state.loading = false
  },
  inLogin(state){
    state.loading = true
  },
  setToken(state, token){
    localStorage.setItem('user_token_parsport', token)
    state.token = token
  },setUser (state, name) {
      localStorage.setItem('parsport_user_name', name)
      // localStorage.name = payload.data.last_name
      // console.log(localStorage.name);
      // console.log(localStorage.getItem('name'))
      // console.log(JSON.stringify(localStorage.getItem('name')))
      // alert(localStorage.grtItem('name'))

      // storage.setItem('name', payload.data.last_name)
      // alert(storage.getItem('name'))
        // state.name = paylod.last_name
        // state.usernam = payload.username
        // state.privileges = payload.privileges.toString()
        // console.log(payload.data);
        // alert(localStorage.getItem('name'))
        // localStorage.setItem('username', payload.username)
        // localStorage.setItem('privileges', payload.roles)
    },
  loggedIn(state){
    state.loading = false,
    state.failed = false,
    state.status = true
 },
 failed(state){
   state.failed = true,
   state.loading = false
 },

 loggedOut (state) {
        localStorage.removeItem('user_token_parsport')
        localStorage.removeItem('parsport_user_name')
        state.status = false
        state.name = null
        state.username = null
    }
}
