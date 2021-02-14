class Geolocation {

  async getLocation() {
    if (this.browserHasGeolocation())
        return await this.getNativeGeolocation()
    else
      throw new Error("Geolocation is not supported by this browser.")
  }

  browserHasGeolocation(){
    return navigator.geolocation
  }


  getNativeGeolocation(){
    return new Promise((resolve, reject) =>{
      navigator.geolocation.getCurrentPosition((position) =>{
        resolve({
          latitude:position.coords.latitude,
          longtitude:position.coords.longitude,
        })
      });
    })
  }
}
module.exports = Geolocation
