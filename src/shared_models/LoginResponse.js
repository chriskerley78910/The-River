
class LoginResponse {
  constructor(raw){
    this.setUserId(raw)
    this.setTimestamp(raw)
  }
  static getFake(){
    return new LoginResponse(LoginResponse.getRaw())
  }

  static getRaw(){
    return {
      id:5,
      timestamp:'2000-01-14T13:42Z'
    }
  }

  setUserId(raw){
    this.userId = raw['id']
  }

  getUserId(){
    return this.userId
  }

  setTimestamp(raw){
    this.loginTime = new Date(raw['timestamp'])
  }

  getTimeStamp(){
    return this.loginTime
  }
}
module.exports = LoginResponse
