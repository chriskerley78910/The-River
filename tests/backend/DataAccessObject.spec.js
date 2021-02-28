import DB from './../../src/backend/DatabaseAccessObject'
import LoginRequest from './../../src/backend/models/LoginRequest'

describe('DatabaseAccessObject', ()=>{

    let sut
    const setup = () =>{
      sut = new DB()
    }
    beforeEach(setup)



    it('deletePhotoRecord(photoId)', async ()=>{
      const photoId = 1
      sut.query = jest.fn()
      await sut.deletePhotoRecord(photoId)
      expect(sut.query).toHaveBeenCalledWith(expect.any(String),[photoId])
    })

    it('storePhotoPath(photoId, relativePath)', async ()=>{
      sut.query = jest.fn()
      const relativePath = {}
      const id = {}
      sut.storePhotoPath(relativePath, id)
      await sut.storePhotoPath(relativePath, id)

      expect(sut.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array))
    })

    it('createPhotoRecord() return the photoId', async () => {
      const expected = 1
      sut.query = () => Promise.resolve({insertId:expected})
      const photoId = await sut.createPhotoRecord()
      expect(photoId).toBe(expected)
    })

    it('insertGetPhotoRecord(userId, photoId)', async ()=>{
      const insertId = 2
      const userId = 1
      const photoId = 3
      sut.query = () => {
        return {insertId:insertId}
      }
      const actual = await sut.insertGetPhotoRecord(userId, photoId)

      expect(actual).toBe(insertId)
    })

    it('getTimeStamp() == the timestamp for that row', async ()=>{
      const timestamp = new Date()
      sut.query = () => [{timestamp:timestamp}]
      const insertId = 1
      const result = await sut.getTimeStamp(insertId)
      expect(result).toBe(timestamp)
    })

    it('getTimeStamp(insertId) throwsif insertId is not a positive integer', async()=>{
      sut.assertPositiveInteger = jest.fn()
      sut.query = () => [1]
      await sut.getTimeStamp()
      expect(sut.assertPositiveInteger).toHaveBeenCalled()
    })

    it('insertUserLogin(userId) == the insertId', async()=>{
      const insertId = 2
      sut.query = () => Promise.resolve({insertId:insertId})
      const request = LoginRequest.getFake()
      const result = await sut.insertUserLogin(request)
      expect(result).toBe(insertId)
    })

    it('insertUserLogin(id) throws if id is not a postive integer. ', async ()=>{
      const userId = -1
      await expect(sut.insertUserLogin(userId)).rejects.toThrowError('Expected LoginRequest instance.')
    })

})
