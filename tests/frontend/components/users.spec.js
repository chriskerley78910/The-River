import {shallowMount, createLocalVue } from '@vue/test-utils'
import Users from './../../../src/frontend/components/users.vue'
import User from './../../../src/shared_models/User'
import Geolocation from './../../../src/frontend/utils/Geolocation'

let sut
const localVue = createLocalVue()
const setup = () =>{
  sut = shallowMount(Users,{
    propsData:{
      subjects:[]
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

    it('loginUser => updateUserState(respose)', async ()=>{
      const response = { ok: true }
      global.fetch = ()=> Promise.resolve(response)
      const user = User.getFake()
      sut.vm.updateUserState = jest.fn()
      sut.vm.geo.getLocation = jest.fn(() => {})

      await sut.vm.loginUser(user)
      expect(sut.vm.updateUserState).toHaveBeenCalledWith(response)
    })

    it('updateUserState(user) => commit to store.', async ()=>{
      const rawUser = User.getRaw()
      const response = {
          ok:true,
          json: () => Promise.resolve(rawUser)
      }
      await sut.vm.updateUserState(response)
      expect(sut.vm.$store.commit).toHaveBeenCalledWith('login', expect.any(Object))
    })
})
