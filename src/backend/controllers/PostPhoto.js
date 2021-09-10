const photoBasePath = __dirname + '/../../photos'

class PostPhoto {

  constructor(db){
    this.db = db
  }

  async handle(req, res){
    let photoId = null
    try {
      const data = await this.drainStream(req);
      photoId = await this.db.createPhotoRecord()
      const relativePath = await this.storePhoto(data, photoId)
      this.db.storePhotoPath(photoId, relativePath)
      res.end()
    } catch(err) {
      // console.log(err)
      err.photoId = photoId
      this.handleErr(err, res)
    }
  }

  /**
    Checks if error involved saving ther photo.  If there
    was it removes the id from the database.  In all
    cases 500 status is set.
  */
  async handleErr(err, res){
    if(err.message == err.photoId)
      await this.db.deletePhotoRecord(err.photoId)
    res.status(500)
    res.end(err.message)
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
  /**
    @arg {ReadableStream} stream - The stream of data for the photo to be saved.
    @return {Promise} - A Promise that resolves to the uploaded photo data.
  */
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
module.exports = PostPhoto
