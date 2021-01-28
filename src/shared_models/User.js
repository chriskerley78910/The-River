class User {

  constructor(raw){
    this.setId(raw)
    this.setLastInteractionTime(raw)
  }

  static getFake(){
    const raw = User.getRaw()
    return new User(raw)
  }

  static getRaw(){
    return {
      id:1,
      last_interaction:Date.now()
    }
  }

  setId(raw){
    this.id = raw['id']
  }

  getId(){
    return this.id
  }

  setLastInteractionTime(raw){
    const ms = raw['last_interaction']
    if(Number.isInteger(ms) == false || ms < 1)
      throw new Error('last_interaction must be a postive integer.')
    this.lastInteration = ms
  }

  getLastInteractionTime(){
    return this.lastInteration
  }

}
module.exports = User
