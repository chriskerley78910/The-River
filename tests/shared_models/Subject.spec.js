
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

  it('throws if setId(raw) is called and id is not a positive integer.', ()=>{
    expect(()=>{
      sut.setId({})
    }).toThrowError('id must be a positive integer.')
  })

  it('throws if setFirstName(raw) is called where first_name is not a non-empty string.', ()=>{
    expect(()=>{
      sut.setFirstName({})
    }).toThrowError('first_name must be a non-empty string.')
  })

  it('returns the first name of the subject when getFirstName() is called.', ()=>{
    expect(sut.getFirstName()).toBe('Chris')
  })

  it('getFake() == an instance of Subject', ()=>{
    expect(Subject.getFake() instanceof Subject).toBeTruthy()
  })
})
