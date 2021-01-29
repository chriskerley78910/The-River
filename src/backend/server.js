const fs = require('fs')
const port = 3000;
const express = require('express');
const app = express();
const Shuffle = require('./algorithms/Shuffle')
const htmlPath = __dirname + '/../../dist'
const photoDir = __dirname + '/../../photos'
const db = new (require('./DatabaseAccessObject'))()


//listen and respond to heartbeat request from supervisor
process.on('message', (message) => {
  if(message && message.request === 'heartbeat') {
    process.send({heartbeat: 'thump'});
  }
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(htmlPath));
app.use(express.static(photoDir))

app.get('/photos', async (req, res) => {
  const filenames = await db.getPhotoFileNames()
  Shuffle.shuffle(filenames)
  res.json(filenames)
})

app.get('/subjects', async(req, res)=>{
  const subjects = await db.getSubjects()
  res.json(subjects)
})

const assertPositiveIntegerProp = (obj, name) =>{
  return obj[name]
}

app.post('/login', async (req, res) =>{
  const id = getPositiveIntegerProp(req.body,'id')
  const insertId = await db.insertUserLogin(id)
  const timestamp = await db.getTimeStamp(insertId)
  const loginResponse = {id:id, timestamp:timestamp}
  res.json(loginResponse)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
