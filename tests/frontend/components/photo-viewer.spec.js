import {shallowMount, createLocalVue } from '@vue/test-utils'
import PhotoViewer from './../../../src/frontend/components/photo-viewer.vue'

let sut
const localVue = createLocalVue()
const setup = () =>{
  sut = shallowMount(PhotoViewer,{
    propsData: {
      loggedIn: false
    },
    localVue
  })
}

describe('photo-viewer', ()=>{
  beforeEach(setup)

  it('hides everything when loggedIn == false', ()=>{
    const wrapper = sut.find('.photo-holder')
    expect(wrapper.exists()).toBeFalsy()
  })

  it('photos is a empty array by default', ()=>{
    expect(Array.isArray(sut.vm.photos)).toBeTruthy()
    expect(sut.vm.photos.length).toBe(0)
  })
})
