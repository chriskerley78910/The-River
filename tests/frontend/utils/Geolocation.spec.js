
import Geolocation from './../../../src/frontend/utils/Geolocation'

  describe('Geolocation', () => {

      const expected = {
        coords:{
          latitude:50.0,
          longitude:60.1
        }
      }
    let sut;

    beforeEach(()=>{
      sut = new Geolocation()
      sut.browserHasGeolocation = jest.fn(()=>true)
      sut.getNativeGeolocation = jest.fn(() => expected)
    })

    it('getLocation() throws if geolocation is not supported.', async ()=>{
      sut.browserHasGeolocation = () => false
      await expect(sut.getLocation()).rejects.toThrowError('Geolocation is not supported by this browser.')
    })

    it('getLocation() == a promise that resolves to the position.', async ()=>{
      const position = await sut.getLocation()
      expect(position).toBe(expected)
    })

})
