
import AbstractModel from './../../src/shared_models/AbstractModel'

describe('AbstractModel', ()=>{
  let sut
  beforeEach(()=>{
    sut = new AbstractModel()
  })

  it('parsePositiveIntegerProp() returns the value if it is a positive integer.', ()=>{
    const raw = {val:2}
    const actual = sut.parsePositiveIntegerProp(raw, 'val')
    expect(actual).toBe(2)
  })
  it('parsePositiveIntegerProp() if the prop is not a positive integer.', ()=>{
    expect(()=>{
        const raw = {val:-1}
        sut.parsePositiveIntegerProp(raw, 'val')
    }).toThrowError('val must be a positive integer.')
  })
})
