import {shallowMount, createLocalVue } from '@vue/test-utils'
import Root from './../../../src/frontend/components/root.vue'

let sut
const localVue = createLocalVue()
const setup = () =>{
  sut = shallowMount(Root,{
    localVue
  })
}

describe('root', ()=>{
  beforeEach(setup)
  it('app holder exists', ()=>{
    const wrapper = sut.find('#app')
    expect(wrapper.exists()).toBeTruthy()
  })
})
