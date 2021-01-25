import {shallowMount, createLocalVue } from '@vue/test-utils'
import Root from './../../src/frontend/root.vue'

let sut
const localVue = createLocalVue()
const setup = () =>{
  sut = shallowMount(Root,{
    localVue
  })
}

describe('root', ()=>{
  beforeEach(setup)
  it('loggedIn == false by default', ()=>{
    expect(sut.vm.loggedIn).toBe(false)
  })
})
