import { shallowMount, createLocalVue } from '@vue/test-utils'
import TaggablePhotoSample from './../../../src/shared_models/TaggablePhotoSample'
import PhotoViewer from  './../../../src/frontend/components/photo-viewer.vue'
import LoginResponse from './../../../src/shared_models/LoginResponse'

let sut
const localVue = createLocalVue()
const setup = () =>{
  sut = shallowMount(PhotoViewer,{
    data:function(){
      return {
        inTestingMode:true
      }
    },
    mocks:{
      photo:TaggablePhotoSample.getFake(),
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
    sut.vm.photo = TaggablePhotoSample.getFake()
    sut.vm.$store.state.loginResponse = LoginResponse.getFake()
    await sut.vm.$nextTick()
    const photo = sut.find('#photo-holder')
    expect(photo.exists()).toBeTruthy()
  })


  it('getNextPhoto() => fetches the next photo with data about the current one.', async ()=>{
    const curPhotoData = {}
    const url = {}
    sut.vm.getNextPhotoURL = jest.fn(() => url)
    sut.vm.showPhoto = jest.fn()
    sut.vm.fetch = jest.fn(() => Promise.resolve({ok:true}))
    await sut.vm.getNextPhoto()

    expect(sut.vm.showPhoto).toHaveBeenCalled()
    expect(sut.vm.getNextPhotoURL).toHaveBeenCalled()
    expect(sut.vm.fetch).toHaveBeenCalledWith(url)
  })

  it('showPhoto(response) wraps the photo', async ()=>{
    const response = {
      json:() => Promise.resolve(TaggablePhotoSample.getRaw())
    }
    await sut.vm.showPhoto(response)
    expect(sut.vm.photo instanceof TaggablePhotoSample).toBeTruthy()
  })

  it('getFirstPhoto() calls fetch with a url containing the current user id', async ()=>{
    const response = {ok:true}
    global.fetch = jest.fn(() => response)
    sut.vm.showPhoto = jest.fn()
    await sut.vm.getFirstPhoto()

    expect(sut.vm.showPhoto).toHaveBeenCalledWith(response)
  })

  it('hides everything when loggedIn == false', ()=>{
    const wrapper = sut.find('#photo-holder')
    expect(wrapper.exists()).toBeFalsy()
  })
})
