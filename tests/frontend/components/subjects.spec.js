import {shallowMount, createLocalVue } from '@vue/test-utils'
import Participants from './../../../src/frontend/components/participants.vue'
import Subject from './../../../src/shared_models/Subject'
import Geolocation from './../../../src/frontend/utils/Geolocation'

let sut
const localVue = createLocalVue()
const setup = () =>{
  sut = shallowMount(Participants,{
    propsData:{
      participants:[]
    },
    mocks:{
      $store:{
        commit:jest.fn()
      }
    },
    localVue
  })
}

describe('users', ()=>{

    beforeEach(setup)

    it('geo is instantited upon being mounted', ()=>{
      expect(sut.vm.geo instanceof Geolocation).toBeTruthy()
    })

    it('loginSubject => updateSubjectState(respose)', async ()=>{
      const response = { ok: true }
      global.fetch = ()=> Promise.resolve(response)
      const user = Subject.getFake()
      sut.vm.updateSubjectState = jest.fn()
      sut.vm.geo.getLocation = jest.fn(() => {})

      await sut.vm.loginSubject(user)
      expect(sut.vm.updateSubjectState).toHaveBeenCalledWith(response)
    })

    it('updateSubjectState(user) => commit to store.', async ()=>{
      const rawSubject = Subject.getRaw()
      const response = {
          ok:true,
          json: () => Promise.resolve(rawSubject)
      }
      await sut.vm.updateSubjectState(response)
      expect(sut.vm.$store.commit).toHaveBeenCalledWith('login', expect.any(Object))
    })
})
