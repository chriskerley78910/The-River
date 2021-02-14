import SelectableUser from './../../src/shared_models/SelectableUser'
import TaggablePhotoSample from './../../src/shared_models/TaggablePhotoSample'

describe('TaggablePhotoSample', ()=>{

  let sut
  const setup = ()=>{
    sut = TaggablePhotoSample.getFake()
  }
  beforeEach(setup)

  it('setSelectableUsers(raw) throws if raw.users is not an array.', ()=>{
    const raw = {
      users:{}
    }
    expect(()=>{
      sut.setSelectableUsers(raw)
    }).toThrowError('users was expected to be an Array.')

  })

  it('sets the selectable users on construction.', ()=>{
    expect(sut.getSelectableUsers().length).toBe(1)
  })

  it('sets all the selectable users when setSelectableUsers(obj) is called', ()=>{
    const obj = {
      users:[SelectableUser.getRaw(),
             SelectableUser.getRaw()]
    }
    sut.setSelectableUsers(obj)
    const users = sut.getSelectableUsers()
    expect(users.length).toBe(2)
    users.forEach(u =>{
      expect(u instanceof SelectableUser).toBeTruthy()
    })
  })

  it('returns an array of users when getSelectableUsers() is called.', ()=>{
    const users = sut.getSelectableUsers()
    const isArray = Array.isArray(users)
    expect(isArray).toBeTruthy()
  })

  it('extends PhotoSample', ()=>{
    const parentName = Object.getPrototypeOf(Object.getPrototypeOf(sut)).constructor.name;
    expect(parentName).toBe('PhotoSample')
  })
})
