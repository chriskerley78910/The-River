const cv = require('opencv4nodejs');
const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
  //  https://medium.com/@muehler.v/node-js-opencv-for-face-recognition-37fa7cb860e8
  //https://github.com/justadudewhohacks/opencv4nodejs
class FaceAPI{


    async train(){
      const photoPath = __dirname + '/../../../photos/1.jpg'
      const faces = await this.getRectangles(photoPath)
      console.log(faces)
      // populate the photo_members table with the photo_id and face
      /**
        e.g:
        photo_id, x, y, w, h
        1,        123,  2,  444, 444
      */
    }

    async getRectangles(photoPath){
      const img = await cv.imreadAsync(photoPath);
      const grayImg = await img.bgrToGrayAsync();
      const scaleFactor = 1.3
      const minNeighbors = 5
      return await classifier.detectMultiScaleAsync(grayImg, scaleFactor, minNeighbors);
    }
}
const a = new FaceAPI()
a.train()
