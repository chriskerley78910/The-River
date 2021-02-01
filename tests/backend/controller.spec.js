import Controller from './../../src/backend/controller'
import DB from './../../src/backend/DatabaseAccessObject'

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
      params:{
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
    expect(sut.parsePositiveIntegerProp).toHaveBeenCalledWith(req.params,'id')
  })

  it('getFirstPhoto(req, res) throws if the params id is not a positive integer.', async ()=>{
    const req = getFakePhotoRequest()
    const res = getFakePhotoResponse()
    req.params.id = -1
    sut.getPhotoSample = jest.fn()
    await expect(sut.getFirstPhoto(req, res)).rejects.toThrowError('id must be a positive integer.')
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