import { shallowMount, createLocalVue } from '@vue/test-utils'
import PhotoUploader from  './../../../src/frontend/components/photo-uploader.vue'

describe('photo-uploader', ()=>{

  let sut
  const localVue = createLocalVue()
  const setup = () => sut = shallowMount(PhotoUploader,{localVue})
  beforeEach(setup)

  it('has the photo-uploader element',  ()=>{
    const e = sut.find('#photo-uploader')
    expect(e.exists()).toBe(true)
  })

  it('hides the submit button initially', ()=>{
    expect(sut.vm.photoLoaded).toBeFalsy()
    expect(sut.find('#submit-button').exists()).toBeFalsy()
  })

  it('shows the submit button when photoLoaded is true', async ()=>{
    sut.vm.photoLoaded = true
    await sut.vm.$nextTick()
    expect(sut.find('#submit-button').exists()).toBeTruthy()
  })

  it('uploadFile(event) => sets the photoLoaded',()=>{
    const file = {}
    const event = {
      target:{
        files:[
            file
    ]}}
    sut.vm.uploadFile(event)
    expect(sut.vm.photoLoaded).toBe(file)
  })

  it('submit() => handleResponse(response)', async()=>{
    sut.vm.handleResponse = jest.fn()
    global.fetch = jest.fn()
    const e = {preventDefault:jest.fn()}
    await sut.vm.submit(e)
    expect(sut.vm.handleResponse).toHaveBeenCalled()
    expect(e.preventDefault).toHaveBeenCalled()
  })

  it('submit(), no server response => alert(err)', async ()=>{
    global.fetch = () => {throw new Error('err')}
    global.alert = jest.fn()
    const e = {preventDefault:jest.fn()}
    await sut.vm.submit(e)
    expect(global.alert).toHaveBeenCalled()
  })

  it('response.ok == false => alert(error)', async ()=>{
    const response = {ok:false, text:()=>Promise.resolve('err')}
    global.alert = jest.fn()
    await sut.vm.handleResponse(response)
    expect(global.alert).toHaveBeenCalledWith('err')
  })

  it('response.ok => alert(success)', async ()=>{
    const response = {ok:true}
    global.alert = jest.fn()
    await sut.vm.handleResponse(response)
    expect(global.alert).toHaveBeenCalledWith('Success')
  })

})
