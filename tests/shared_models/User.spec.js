
import User from './../../src/shared_models/User'

describe('User', ()=>{

  let sut
  const setup = ()=>{
    sut = User.getFake()
  }
  beforeEach(setup)

  it('setId() works', ()=>{
    expect(sut.getId()).toBe(1)
  })

  it('setLastInteractionTime()', ()=>{
    const expectedLength = "1611816392976".length
    const actualLength = String(sut.getLastInteractionTime()).length
    expect(actualLength).toBe(expectedLength)
  })

  it('getFake() == an instance of User', ()=>{
    expect(User.getFake() instanceof User).toBeTruthy()
  })
})
