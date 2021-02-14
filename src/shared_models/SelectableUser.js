
const User = require('./User')

class SelectableUser extends User {
  constructor(raw){
    super(raw)
    this.unselect()
    this.setName(raw)
  }

  setName(raw){
    this.name = raw['name']
  }

  getName(){
    return this.name
  }

  select(){
    this.selected = true
  }

  unselect(){
    this.selected = false
  }

  isSelected(){
    return this.selected
  }

  static getFake(){
    const raw = SelectableUser.getRaw()
    return new SelectableUser(raw)
  }

  static getRaw(){
    const raw = User.getRaw()
    raw.name = 'Chris'
    return raw
  }
}
module.exports = SelectableUser
