import {shallowMount, createLocalVue } from '@vue/test-utils'
import LoginScreen from './../../../src/frontend/components/login-screen.vue'
import LoginResponse from './../../../src/shared_models/LoginResponse'

let sut
const localVue = createLocalVue()
const setup = () => {

  sut = shallowMount(LoginScreen,{
    data(){
      return {
        inTestMode:true,
      }
    },
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

  it('handleError(response) => alert', async () => {
    const text = 'error message'
    const response = {ok:false, text:()=>Promise.resolve(text)}
    window.alert = jest.fn()
    await sut.vm.handleError(response)

    expect(window.alert).toHaveBeenCalledWith(text)
  })


  it('loadParticipants() => fetch, handleResponse', async()=>{
    const response = {}
    sut.vm.fetch = () => Promise.resolve(response)
    sut.vm.handleResponse = jest.fn()
    await sut.vm.loadParticipants()

    expect(sut.vm.handleResponse).toHaveBeenCalledWith(response)
  })

  it('handleResponse(response), ok => setParticipants(response)', async ()=>{
    sut.vm.setParticipants = jest.fn()
    const response = {ok:true}
    await sut.vm.handleResponse(response)
    expect(sut.vm.setParticipants).toHaveBeenCalledWith(response)
  })

  it('loadParticipants(response), !ok => handleError(response)', async ()=>{
    sut.vm.handleError = jest.fn()
    const obj = {ok:false}
    sut.vm.fetch = jest.fn(() => Promise.resolve(obj))
    await sut.vm.loadParticipants()
    expect(sut.vm.handleError).toHaveBeenCalled()
  })
})
