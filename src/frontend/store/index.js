import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

  state:{
    loginResponse:null
  },

  mutations:{
    login(state, response){
      state.loginResponse = response
    }
  }
})
