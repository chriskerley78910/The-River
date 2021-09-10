const port = 3000;
require('dotenv').config() // loads all .env variables.
const express = require('express');
const app = express();
const htmlPath = __dirname + '/../../dist'
const photoDir = __dirname + '/../../photos'
const db = new (require('./DatabaseAccessObject'))()
const controller = new (require('./controller'))(db)
const postPhoto = new (require('./controllers/PostPhoto'))(db)

//listen and respond to heartbeat request from supervisor
process.on('message', (message) => {
  if(message && message.request === 'heartbeat') {
    process.send({heartbeat: 'thump'});
  }
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  process.exit(1)
  // application specific logging, throwing an error, or other logic here
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(htmlPath));
app.use(express.static(photoDir))

app.get('/nextPhoto',controller.getNextPhoto)
app.get('/firstPhoto',controller.getFirstPhoto)
app.get('/participants',controller.getParticipants)
app.post('/login', controller.login)
app.post('/savePhoto', postPhoto.handle)

app.listen(port, () => {
  console.log(`River node server listening at http://localhost:${port}`)
})
