
import Subject from './../../src/shared_models/Subject'

describe('Subject', ()=>{

  let sut
  const setup = ()=>{
    sut = Subject.getFake()
  }
  beforeEach(setup)

  it('setId() works', ()=>{
    expect(sut.getId()).toBe(1)
  })

  it('returns the first name of the subject when getFirstName() is called.', ()=>{
    expect(sut.getFirstName()).toBe('Chris')
  })

  it('getFake() == an instance of Subject', ()=>{
    expect(Subject.getFake() instanceof Subject).toBeTruthy()
  })
})
