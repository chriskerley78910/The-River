import DB from './../../src/backend/DatabaseAccessObject'


describe('DatabaseAccessObject', ()=>{

    let sut
    const setup = () =>{
      sut = new DB()
    }
    beforeEach(setup)



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
      const userId = 3
      const result = await sut.insertUserLogin(userId)
      expect(result).toBe(insertId)
    })

    it('insertUserLogin(id) throws if id is not a postive integer. ', async ()=>{
      const userId = -1
      await expect(sut.insertUserLogin(userId)).rejects.toThrowError('userId must be a positive integer.')
    })

})
