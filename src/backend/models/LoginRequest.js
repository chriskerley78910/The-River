class LoginRequest{

  static getFake(){
    const raw = LoginRequest.getRaw()
    return new LoginRequest(raw)
  }

  static getRaw(){
    return {
      body:{
        id:1,
        latitude:50.0,
        longtitude:60.1,
        timestamp:1234
      }
    }
  }

  getSQLArgs(){
    return [
      this.getUserId(),
      this.getLatitude(),
      this.getLongtitude()
    ]
  }

  constructor(raw){
    const body = raw.body
    this.setUserId(body)
    this.setLocation(body)
  }

  setUserId(raw){
    this.id = raw['id']
  }

  getUserId(){
    return this.id
  }

  setLocation(raw){
    this.setLatitude(raw)
    this.setLongtitude(raw)
  }

  setLatitude(raw){
    let tmp = raw['latitude']
    if(isNaN(tmp) || tmp < -90.0 || tmp > 90.0)
      throw new Error('latitude must be between -90 and 90 degrees.')
    this.latitude = tmp
  }

  getLatitude(){
    return this.latitude
  }
  
  setLongtitude(raw){
    const tmp = raw['longtitude']
    if(isNaN(tmp) || tmp < -180.0 || tmp > 180.0)
      throw new Error('longtitude must between -180 and 180 degrees.')
    this.longtitude = tmp
  }

  getLongtitude(){
    return this.longtitude
  }
}

module.exports = LoginRequest
