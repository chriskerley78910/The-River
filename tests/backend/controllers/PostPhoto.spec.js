import SUT from './../../../src/backend/controllers/PostPhoto'
import DB from './../../../src/backend/DatabaseAccessObject'

describe('PostPhoto', ()=>{

  let sut
  let req
  let res
  beforeEach(() => sut = new SUT(new DB()))

  it('handle(req, res)', async () =>{

    const req = {}
    const res = {end:jest.fn()}
    const imgBuffer = {}
    const photoId = {}
    const relativePath = {}

    sut.drainStream = jest.fn(() => imgBuffer)
    sut.db.createPhotoRecord = jest.fn(() => photoId)
    sut.storePhoto = jest.fn(() => relativePath)
    sut.db.storePhotoPath = jest.fn()
    await sut.handle(req, res)

    expect(sut.drainStream).toHaveBeenCalledWith(req)
    expect(sut.db.createPhotoRecord).toHaveBeenCalled()
    expect(sut.storePhoto).toHaveBeenCalledWith(imgBuffer, photoId)
    expect(sut.db.storePhotoPath).toHaveBeenCalledWith(photoId, relativePath)
  })

  it('handle(), err => res.end(error message)', async ()=>{
    const res = {end:jest.fn(), status:jest.fn()}
    const message = 'err'
    sut.drainStream = () => {throw new Error(message)}
    await sut.handle(req, res)

    expect(res.end).toHaveBeenCalledWith(message)
    expect(res.status).toHaveBeenCalledWith(500)
  })

})
