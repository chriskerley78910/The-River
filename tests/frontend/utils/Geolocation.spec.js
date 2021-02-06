
import Geolocation from './../../../src/frontend/utils/Geolocation'

  describe('Geolocation', () => {

      const expected = {
        coords:{
          latitude:50.0,
          longitude:60.1
        }
      }

    beforeEach(()=>{
      Geolocation.browserHasGeolocation = jest.fn(()=>true)
      Geolocation.getCurrentLocation = jest.fn(() => expected)
    })

    it('getLocation() == a promise that resolves to the position.', async ()=>{
      const position = await Geolocation.getLocation()
      expect(position).toBe(expected.coords)
    })

})
