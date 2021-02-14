
import SelectableUser from './../../src/shared_models/SelectableUser'

describe('SelectableUser', ()=>{

  let sut
  const setup = ()=>{
    sut = SelectableUser.getFake()
  }
  beforeEach(setup)

  it('returns the first name of the user when getName() is called',()=>{
    expect(sut.getName()).toBe('Chris')
  })

  it('has isSelected() == false by default', ()=>{
      expect(sut.isSelected()).toBeFalsy()
  })

  it('makes isSelected() == true after select() is executed.', ()=>{
    sut.select()
    expect(sut.isSelected()).toBeTruthy()
  })

  it('extends User', ()=>{
    expect(Object.getPrototypeOf(sut.constructor).name).toBe('User')
  })
})
