import {shallowMount, createLocalVue } from '@vue/test-utils'
import LoginScreen from './../../../src/frontend/components/login-screen.vue'
import LoginResponse from './../../../src/shared_models/LoginResponse'

let sut
const localVue = createLocalVue()
const setup = () =>{
  sut = shallowMount(LoginScreen,{
    mocks:{
      $store:{
        state:{
          loginResponse:LoginResponse.getFake()
        }
      }
    },
    localVue
  })
}

describe('login-screen', ()=>{
  beforeEach(setup)

  it('loadSubjects() throws if the response is not ok', async ()=>{
    global.fetch = () => Promise.resolve({ ok: false})
    window.alert = jest.fn()
    await sut.vm.loadSubjects()
    expect(window.alert).toHaveBeenCalled()
  })
})
