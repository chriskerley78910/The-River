
import PhotoSample from './../../src/shared_models/PhotoSample'

describe('PhotoSample', ()=>{

  let sut
  const setup = ()=>{
    sut = PhotoSample.getFake()
  }
  beforeEach(setup)

  it('getURL() works', ()=>{
    expect(sut.getURL()).toBe('1.jpg')
  })

  it('setSampleId() works', ()=>{
    expect(sut.getSampleId()).toBe(2)
  })

  it('getFake() == an instance of PhotoSample', ()=>{
    expect(PhotoSample.getFake() instanceof PhotoSample).toBeTruthy()
  })
})
