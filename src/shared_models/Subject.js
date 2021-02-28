
/**
  Represents a subject in the experiment.
*/
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
    const prop = 'id'
    if(!Number.isInteger(raw[prop]) || raw[prop] < 1)
      throw new Error(prop + ' must be a positive integer.')
    this.id = raw[prop]
  }

  getId(){
    return this.id
  }

  setFirstName(raw){
    const prop = 'first_name'
    if(typeof raw[prop] != 'string' || raw[prop].length < 1)
      throw new Error(prop + ' must be a non-empty string.')
    this.firstName = raw[prop]
  }

  getFirstName(){
    return this.firstName
  }
}
module.exports = Subject
