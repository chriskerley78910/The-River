const DatabaseAccessObject = require('./DatabaseAccessObject')
const LoginRequest = require('./models/LoginRequest')


class Controller {

  constructor(db){
    if(db instanceof DatabaseAccessObject == false)
      throw new Error('db must be an instance of DatabaseAccessObject')
    this.db = db
    this.login = this.login.bind(this)
    this.parsePositiveIntegerProp = this.parsePositiveIntegerProp.bind(this)
    this.getFirstPhoto = this.getFirstPhoto.bind(this)
    this.getNextPhoto = this.getNextPhoto.bind(this)
    this.getSubjects = this.getSubjects.bind(this)
  }

  parsePositiveIntegerProp(obj, name){
    const val = Number(obj[name])
    if(!Number.isInteger(val) || val < 1)
      throw new Error(`${name} must be a positive integer.`)
    return val
  }

  async getFirstPhoto(req, res){
    const userId = this.parsePositiveIntegerProp(req.query,'id')
    const photo = await this.getPhotoSample(userId)
    res.json(photo)
  }

  async getNextPhoto(req, res){
    const sampleId = this.parsePositiveIntegerProp(req.query, 'id')
    await this.db.updateGetPhotoRecord(sampleId)
    const userId = await this.db.getSampleUserId(sampleId)
    const photo = await this.getPhotoSample(userId)
    res.json(photo)
  }

  async getPhotoSample(userId){
    const photo = await this.db.getPhoto()
    const sampleId = await this.db.insertGetPhotoRecord(userId, photo.id)
    photo.sample_id = sampleId
    return photo
  }

  async getSubjects(req, res){
    const subjects = await this.db.getSubjects()
    res.json(subjects)
  }

  async login(req, res){
    const request = new LoginRequest(req)
    const insertId = await this.db.insertUserLogin(request)
    const timestamp = await this.db.getTimeStamp(insertId)
    const loginResponse = {id:request.getUserId(), timestamp:timestamp}
    res.json(loginResponse)
  }
}
module.exports = Controller
