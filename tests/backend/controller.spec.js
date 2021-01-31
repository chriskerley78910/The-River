import Controller from './../../src/backend/controller'
import DB from './../../src/backend/DatabaseAccessObject'




describe('Controller', ()=>{

  let sut
  const setup = () =>{
    sut = new Controller(new DB())
  }
  beforeEach(setup)

  it('aggregates the db instance', ()=>{
    expect(sut.db instanceof DB).toBeTruthy()
  })

  it('controller(db) throws if db is not an DB instance', ()=>{
    expect(()=>{
      new Controller({})
    }).toThrowError('db must be an instance of DatabaseAccessObject')
  })


})
