import {shallowMount, createLocalVue } from '@vue/test-utils'
import LoginScreen from './../../../src/frontend/components/login-screen.vue'

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

  it('loadSubjects() throws if the response is not ok', async ()=>{
    global.fetch = () => Promise.resolve({ ok: false})
    window.alert = jest.fn()
    await sut.vm.loadSubjects()
    expect(window.alert).toHaveBeenCalled()
  })

})
