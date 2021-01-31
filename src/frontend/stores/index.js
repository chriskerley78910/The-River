import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA = {

  state:{
    loginResponse:null
  },

  mutations:{
    login(state, response){
      state.loginResponse = response
    }
  }
}




export const store = new Vuex.Store(moduleA)
