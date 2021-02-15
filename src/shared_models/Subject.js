class Subject {

  constructor(raw){
    this.setId(raw)
    this.setFirstName(raw)
  }

  static getFake(){
    const raw = Subject.getRaw()
    return new Subject(raw)
  }

  static getRaw(){
    return {
      id:1,
      first_name:'Chris'
    }
  }

  setId(raw){
    this.id = raw['id']
  }

  getId(){
    return this.id
  }

  setFirstName(raw){
    this.firstName = raw['first_name']
  }

  getFirstName(){
    return this.firstName
  }
}
module.exports = Subject
