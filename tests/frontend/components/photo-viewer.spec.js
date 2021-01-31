import {shallowMount, createLocalVue } from '@vue/test-utils'
import Photo from './../../../src/shared_models/Photo'
import PhotoViewer from  './../../../src/frontend/components/photo-viewer.vue'
import LoginResponse from './../../../src/shared_models/LoginResponse'

let sut
const localVue = createLocalVue()
const setup = () =>{
  sut = shallowMount(PhotoViewer,{
    mocks:{
      photo:Photo.getFake(),
      $store:{
        state:{
          loginResponse:LoginResponse.getFake()
        }
      }
    },
    localVue
  })
}

describe('photo-viewer', ()=>{
  beforeEach(setup)


  it('PhotoViewer is isVisible when loggedin and a photo is loaded', async ()=>{
    sut.vm.photo = Photo.getFake()
    sut.vm.$store.state.loginResponse = LoginResponse.getFake()
    await sut.vm.$nextTick()
    const photo = sut.find('#photo-holder')
    expect(photo.exists()).toBeTruthy()
  })


  it('getNextPhoto() => fetches the next photo with data about the current one.',()=>{
    const curPhotoData = {}
    const url = {}
    sut.vm.getNextPhotoURL = jest.fn(() => url)
    global.fetch = jest.fn()
    sut.vm.getNextPhoto()

    expect(sut.vm.getNextPhotoURL).toHaveBeenCalled()
    expect(global.fetch).toHaveBeenCalledWith(url)
  })


  it('showPhoto(response) wraps the photo', async ()=>{
    const response = {
      json:() => Promise.resolve(Photo.getRaw())
    }
    await sut.vm.showPhoto(response)
    expect(sut.vm.photo instanceof Photo).toBeTruthy()
  })

  it('loadFirstPhoto() calls fetch with a url containing the current user id', async ()=>{
    const response = {ok:true}
    global.fetch = jest.fn(() => response)
    sut.vm.showPhoto = jest.fn()
    await sut.vm.loadFirstPhoto()

    expect(sut.vm.showPhoto).toHaveBeenCalledWith(response)
  })

  it('hides everything when loggedIn == false', ()=>{
    const wrapper = sut.find('.photo-holder')
    expect(wrapper.exists()).toBeFalsy()
  })


})
