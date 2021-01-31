
import Photo from './../../src/shared_models/Photo'

describe('Photo', ()=>{

  let sut
  const setup = ()=>{
    sut = Photo.getFake()
  }
  beforeEach(setup)

  it('getURL() works', ()=>{
    expect(sut.getURL()).toBe('1.jpg')
  })

  it('setId() works', ()=>{
    expect(sut.getId()).toBe(1)
  })

  it('getFake() == an instance of Photo', ()=>{
    expect(Photo.getFake() instanceof Photo).toBeTruthy()
  })
})
