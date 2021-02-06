import Controller from './../../src/backend/controller'
import DB from './../../src/backend/DatabaseAccessObject'
import LoginRequest from './../../src/backend/models/LoginRequest'

describe('Controller', ()=>{

  let sut
  let req
  let res
  const setup = () =>{
    sut = new Controller(new DB())
  }
  beforeEach(setup)

  const getFakePhotoRequest = (userId) => {
    return {
      query:{
        id:1,
      }
    }
  }

  const getFakePhotoResponse = () => {
    return {
      json:jest.fn()
    }
  }

  it('getNextPhoto(req, res) validates the id param', async ()=>{
    const req = getFakePhotoRequest()
    const res = getFakePhotoResponse()
    sut.parsePositiveIntegerProp = jest.fn()
    sut.getPhotoSample = jest.fn()
    sut.db.updateGetPhotoRecord = jest.fn()
    sut.db.getSampleUserId = jest.fn()
    await sut.getNextPhoto(req, res)
    expect(sut.parsePositiveIntegerProp).toHaveBeenCalledWith(req.query,'id')
  })

  it('getFirstPhoto(req, res) throws if the params id is not a positive integer.', async ()=>{
    const req = getFakePhotoRequest()
    const res = getFakePhotoResponse()
    req.query.id = -1
    sut.getPhotoSample = jest.fn()
    await expect(sut.getFirstPhoto(req, res)).rejects.toThrowError('id must be a positive integer.')
  })

  it('login(req, res) => wraps the request', async ()=>{

    sut.db.insertUserLogin = jest.fn()
    sut.db.getTimeStamp = jest.fn(() => 1)
    const req = LoginRequest.getRaw()
    const res = getFakePhotoResponse()
    await sut.login(req, res)

    expect(sut.db.insertUserLogin).toHaveBeenCalledWith(expect.any(LoginRequest))
    expect(sut.db.getTimeStamp).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalled()
  })

  it('getFirstPhoto(req, res)', async ()=>{
    const req = getFakePhotoRequest()
    const res = getFakePhotoResponse()
    sut.getPhotoSample = jest.fn()
    await sut.getFirstPhoto(req, res)
    expect(sut.getPhotoSample).toHaveBeenCalledWith(expect.any(Number))
    expect(res.json).toHaveBeenCalled()
  })

  it('aggregates the db instance', ()=>{
    expect(sut.db instanceof DB).toBeTruthy()
  })

  it('controller(db) throws if db is not an DB instance', ()=>{
    expect(()=>{
      new Controller({})
    }).toThrowError('db must be an instance of DatabaseAccessObject')
  })
})
