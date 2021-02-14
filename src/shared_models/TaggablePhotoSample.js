const PhotoSample = require('./PhotoSample')
const SelectableUser = require('./SelectableUser')

class TaggablePhotoSample extends PhotoSample{
  constructor(raw){
    super(raw)
    this.setSelectableUsers(raw)
  }

  setSelectableUsers(raw){
    if(Array.isArray(raw['users']) == false)
      throw new Error('users was expected to be an Array.')
    this.users = raw['users'].map(u => new SelectableUser(u))
  }

  getSelectableUsers(){
    return this.users
  }

  static getFake(){
    const raw = TaggablePhotoSample.getRaw()
    return new TaggablePhotoSample(raw)
  }

  static getRaw(){
    const parentRaw = PhotoSample.getRaw()
    parentRaw.users = [SelectableUser.getRaw()]
    return parentRaw
  }
}
module.exports = TaggablePhotoSample
