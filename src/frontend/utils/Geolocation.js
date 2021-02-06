class Geolocation {

  static async getLocation() {
    if (Geolocation.browserHasGeolocation())
        return await Geolocation.getNativeGeolocation()
    else
      throw new Error("Geolocation is not supported by this browser.")
  }

  static browserHasGeolocation(){
    return navigator.geolocation
  }


  static getNativeGeolocation(){
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
