const AbstractModel = require('./AbstractModel')

class PhotoSample extends AbstractModel {

  constructor(raw){
    super()
    this.setSampleId(raw)
    this.setURL(raw)
  }

  setURL(raw){
    this.url = raw['url']
  }

  getURL(){
      return this.url
  }

  setSampleId(raw){
    this.id = raw['sample_id']
  }

  getSampleId(){
    return this.id
  }

  static getFake(){
    return new PhotoSample(PhotoSample.getRaw())
  }

  static getRaw(){
    return {
      sample_id:2,
      url:'1.jpg'
    }
  }
}
module.exports = PhotoSample
