const fs = require('fs')
const port = 3000;
const express = require('express');
const app = express();

const htmlPath = __dirname + '/../../dist'
const photoDir = __dirname + '/../../photos'
const DB = require('./DatabaseAccessObject')
app.use(express.static(htmlPath));
app.use(express.static(photoDir))



// Fisher Yates Shuffle
// O(n) randomized shuffle of images.
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const insertPhotos = ()=>{
  let getAllPhotosSQL =  `INSERT INTO photos (filename) VALUES `
  for(let i = 1; i < 741; i++)
  getAllPhotosSQL += `('${i}.jpg'),`
  const sql = getAllPhotosSQL.slice(0, -1)
}


app.get('/photos', async (req, res) => {
  const filenames = await DB.getPhotoFileNames()
  shuffle(filenames)
  res.json(filenames)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
