import {shallowMount, createLocalVue } from '@vue/test-utils'
import LoginScreen from './../../src/frontend/login-screen.vue'

let sut
const localVue = createLocalVue()
const setup = () =>{
  sut = shallowMount(LoginScreen,{
    propsData:{
      loggedIn:false
    },
    localVue
  })
}

describe('login-screen', ()=>{
  beforeEach(setup)
  it('loggedIn == false by default', ()=>{
    expect(sut.vm.loggedIn).toBe(false)
  })

  it('loginUser(user) => fetch(/login, user)', ()=>{
    const user = {}
    global.fetch = jest.fn()
    sut.vm.loginUser(user)
    expect(fetch).toHaveBeenCalledWith('/login', expect.any(Object))
  })
})
