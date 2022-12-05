import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default {
    axios(state, getters) {
        return Axios.create({
            baseURL: `http://kalomin.test.api.ratin.cloud/api`,
            // baseURL: `your api`,
            headers: {
                Authorization: 'Bearer ' + getters.getToken,
                device:"browser"
            }
        })
    },
    isLoggedIn: (state) => {
        return state.status
    },
    getUser: (state) => {
        return 'jshhs'
    },
        isPending: (state) => {
        return state.pending
    },
        getToken: state => {
        return state.token
    },
        getName: state => {
        return state.name
    },

        getUserName: state => {
        return state.username
      },
        isFailed: state => {
        return state.failed
    },
      onLoad: (state) => {
      return state.loading
  },
}
