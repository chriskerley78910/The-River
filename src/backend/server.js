const port = 3000;
const express = require('express');
const app = express();
const htmlPath = __dirname + '/../../dist'
const photoDir = __dirname + '/../../photos'
const db = new (require('./DatabaseAccessObject'))()

//listen and respond to heartbeat request from supervisor
process.on('message', (message) => {
  if(message && message.request === 'heartbeat') {
    process.send({heartbeat: 'thump'});
  }
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(htmlPath));
app.use(express.static(photoDir))

app.get('/nextPhoto',controller.getNextPhoto)
app.get('/firstPhoto',controller.getFirstPhoto)
app.get('/subjects',controller.getSubjects)
app.post('/login', controller.login)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
