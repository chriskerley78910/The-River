import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA = {

  state:{
    loginResponse:null,
    previousPhoto:{},
    nextPhoto:{}
  },

  mutations:{
    login(state, response){
      state.loginResponse = response
    },
    previousPhoto(state){
      state.previousPhoto = {}
    },
    nextPhoto(state){
      state.nextPhoto = {}
    }
  }
}




export const store = new Vuex.Store(moduleA)
