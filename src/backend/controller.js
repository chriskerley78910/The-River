const DatabaseAccessObject = require('./DatabaseAccessObject')
const LoginRequest = require('./models/LoginRequest')
const photoBasePath = __dirname + '/../../photos'

class Controller {

  constructor(db){
    if(db instanceof DatabaseAccessObject == false)
      throw new Error('db must be an instance of DatabaseAccessObject')
    this.db = db
    this.login = this.login.bind(this)
    this.parsePositiveIntegerProp = this.parsePositiveIntegerProp.bind(this)
    this.getFirstPhoto = this.getFirstPhoto.bind(this)
    this.getNextPhoto = this.getNextPhoto.bind(this)
    this.getParticipants = this.getParticipants.bind(this)
    this.savePhoto = this.savePhoto.bind(this)
    this.drainStream = this.drainStream.bind(this)
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

  async getParticipants(req, res){
    const participants = await this.db.getParticipants()
    res.json(participants)
  }

  async login(req, res){
    const request = new LoginRequest(req)
    const insertId = await this.db.insertUserLogin(request)
    const timestamp = await this.db.getTimeStamp(insertId)
    const loginResponse = {id:request.getUserId(), timestamp:timestamp}
    res.json(loginResponse)
  }


  async savePhoto(req, res){
    let photoId = null
    try {
      const data = await this.drainStream(req);
      photoId = await this.db.createPhotoRecord()
      const relativePath = await this.storePhoto(data, photoId)
      this.db.storePhotoPath(photoId, relativePath)
      res.end()
    } catch(err) {
      // console.log(err)
      if(err.message == photoId)
        await this.db.deletePhotoRecord(photoId)
      res.status(500)
      res.end(err.message)
    }
  }

  storePhoto(buffer, photoId){
    return new Promise((resolve, reject) =>{
      const fs = require('fs');
      const relativePath = `${photoId}.jpg`
      fs.writeFile(photoBasePath + `/${relativePath}` , buffer, err => {
        if (err) reject(photoId)
        resolve(relativePath)
      });
    })
  }

  drainStream(stream){
    return new Promise((resolve, reject) => {
        let dataParts = [Buffer.alloc(0)];
        // this is so Buffer.concat doesn’t error if nothing comes;
        stream.on('data', d => dataParts.push(d));
        stream.on('error', reject);
        stream.on('end',() => {
          resolve(Buffer.concat(dataParts));
        })
      });
  }



}
module.exports = Controller
