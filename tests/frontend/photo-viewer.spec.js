import {shallowMount, createLocalVue } from '@vue/test-utils'
import PhotoViewer from './../../src/frontend/photo-viewer.vue'


let sut
const localVue = createLocalVue()
const setup = () =>{
  sut = shallowMount(PhotoViewer,{
    localVue
  })
}

describe('photo-viewer', ()=>{
  beforeEach(setup)
  it('photos is a empty array by default', ()=>{
    expect(Array.isArray(sut.vm.photos)).toBeTruthy()
    expect(sut.vm.photos.length).toBe(0)
  })
})
