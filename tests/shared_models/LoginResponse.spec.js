
import LoginResponse from './../../src/shared_models/LoginResponse'

describe('LoginResponse', ()=>{

  let sut
  const setup = ()=>{
    sut = LoginResponse.getFake()
  }
  beforeEach(setup)

  it('setLoginResponseId() works', ()=>{
    expect(sut.getUserId()).toBe(5)
  })

  it('setTimestamp() works', ()=>{
    expect(sut.getTimeStamp() instanceof Date).toBeTruthy()
  })


})
