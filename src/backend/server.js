const fs = require('fs')
const port = 3000;
const express = require('express');
const app = express();
const Shuffle = require('./algorithms/Shuffle')
const htmlPath = __dirname + '/../../dist'
const photoDir = __dirname + '/../../photos'
const DB = require('./DatabaseAccessObject')


//listen and respond to heartbeat request from supervisor
process.on('message', (message) => {
  if(message && message.request === 'heartbeat') {
    process.send({heartbeat: 'thump'});
  }
});


app.use(express.static(htmlPath));
app.use(express.static(photoDir))

app.get('/photos', async (req, res) => {
  const filenames = await DB.getPhotoFileNames()
  Shuffle.shuffle(filenames)
  res.json(filenames)
})

app.get('/subjects', async(req, res)=>{
  const subjects = await DB.getSubjects()
  res.json(subjects)
})

app.get('/login', async (req, res) =>{

  const token = Date.now()
  const id = req.params.id
  const user = await DB.getUserById()
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
