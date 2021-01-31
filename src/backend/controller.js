const DatabaseAccessObject = require('./DatabaseAccessObject')

class Controller {

  constructor(db){
    if(db instanceof DatabaseAccessObject == false)
      throw new Error('db must be an instance of DatabaseAccessObject')
    this.db = db
  }

  assertPositiveIntegerProp(obj, name){
    return obj[name]
  }

  async getNextPhoto(req, res){
    const curSampleId = req.params.id
    await db.updateGetPhotoRecord(sampleId)
    const photo = await db.getPhoto()
    const nextSampleId = await db.insertGetPhotoRecord(userId, photo.id)
    photo.id = nextSampleId
    res.json(photo)
  }

  async getFirstPhoto(req, res){
    const userId = req.params.id
    const photo = await db.getPhoto()
    const sampleId = await db.insertGetPhotoRecord(userId, photo.id)
    photo.sample_id = sampleId
    res.json(photo)
  }

  async getSubjects(req, res){
    const subjects = await db.getSubjects()
    res.json(subjects)
  }

  async login(req, res){
    const id = this.assertPositiveIntegerProp(req.body,'id')
    const insertId = await db.insertUserLogin(id)
    const timestamp = await db.getTimeStamp(insertId)
    const loginResponse = {id:id, timestamp:timestamp}
    res.json(loginResponse)
  }
}
module.exports = Controller
