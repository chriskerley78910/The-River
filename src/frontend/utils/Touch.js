
class Touch{

  constructor(element){
    this.touchsurface = element
    this.startX;
    this.startY
    this.dist;
    this.threshold = 150; //required min distance traveled to be considered swipe
    this.allowedTime = 200; // maximum time allowed to travel that distance
    this.elapsedTime;
    this.startTime;

     this.touchsurface.addEventListener('touchstart', this.onTouchStart, false)
     this.touchsurface.addEventListener('touchmove', this.onTouchMove, false)
     this.touchsurface.addEventListener('touchend', this.onTouchEnd, false)
  }

  onTouchStart(e){
    touchsurface.innerHTML = ''
    var touchobj = e.changedTouches[0]
    this.dist = 0
    this.startX = touchobj.pageX
    this.startY = touchobj.pageY
    this.startTime = new Date().getTime() // record time when finger first makes contact with surface
    e.preventDefault()
  }


 handleswipe(isrightswipe){
     if (isrightswipe)
         this.touchsurface.innerHTML = 'Congrats, you\'ve made a <span style="color:red">right swipe!</span>'
     else{
        this.touchsurface.innerHTML = 'Condition for right swipe not met yet'
     }
 }

 onTouchMove(e){
     e.preventDefault() // prevent scrolling when inside DIV
 }

 onTouchEnd(e){
     var touchobj = e.changedTouches[0]
     this.dist = touchobj.pageX - this.startX // get total dist traveled by finger while in contact with surface
     this.elapsedTime = new Date().getTime() - this.startTime // get time elapsed
     // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
     var swiperightBol = this.isSwipe()
     this.handleswipe(swiperightBol)
     e.preventDefault()
 }

 isSwipe(){
   const isQuickEnough = this.elapsedTime <= this.allowedTime
   const isFarEnough = this.dist >= this.threshold
   const isHorizontalEnough = Math.abs(touchobj.pageY - this.startY) <= 100
   return (isQuickEnough && isFarEnough && isHorizontalEnough)
 }



}
module.exports = Touch
