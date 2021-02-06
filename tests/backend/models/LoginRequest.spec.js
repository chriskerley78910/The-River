import LoginRequest from './../../../src/backend/models/LoginRequest'

describe('LoginRequest', ()=>{

    let sut
    const setup = () =>{
      sut = LoginRequest.getFake()
    }
    beforeEach(setup)

    it('toSQLArgs() == [id, lat, lon]', ()=>{
      const actual = sut.getSQLArgs()
      const expected = [1,50.0,60.1]
      expect(actual).toEqual(expected)
    })

    it('setLatitude() throws if not between -90 and 90.', ()=>{
      expect(()=>{
        sut.setLatitude({latitude:90.001})
      }).toThrowError('latitude must be between -90 and 90 degrees.')
    })



    it('getLatitude() == a floating point number', ()=>{
      expect(sut.getLatitude()).toBe(50.0)
    })

    it('setLongtitude() throws if it is outside the -180 to 180 range', ()=>{
      expect(()=>{
        sut.setLongtitude({longtitude:180.1})
      }).toThrowError('longtitude must between -180 and 180 degrees.')
    })

    it('getLongtitude() == a number', ()=>{
      expect(sut.getLongtitude()).toBe(60.1)
    })
})
