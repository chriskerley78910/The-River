
class Photo {

  constructor(raw){
    this.setId(raw)
    this.setURL(raw)
  }

  setURL(raw){
    this.url = raw['url']
  }

  getURL(){
      return this.url
  }

  setId(raw){
    this.id = raw['id']
  }

  getId(){
    return this.id
  }

  static getFake(){
    return new Photo(Photo.getRaw())
  }

  static getRaw(){
    return {
      id:1,
      url:'1.jpg'
    }
  }


}
module.exports = Photo
