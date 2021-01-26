import {shallowMount, createLocalVue } from '@vue/test-utils'
import Users from './../../../src/frontend/components/users.vue'

let sut
const localVue = createLocalVue()
const setup = () =>{
  sut = shallowMount(Users,{
    propsData:{
      subjects:[]
    },
    localVue
  })
}

describe('users', ()=>{
  beforeEach(setup)

  it('loginUser(user) => fetch(/login, user)', ()=>{
    const user = {}
    global.fetch = jest.fn()
    sut.vm.loginUser(user)
    expect(fetch).toHaveBeenCalledWith('/login', expect.any(Object))
  })
})
