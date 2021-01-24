const fs = require('fs')
const port = 3000;
const express = require('express');
const app = express();
const mysql = require('mysql')
const htmlPath = __dirname + '/../../dist'
const photoDir = __dirname + '/../../photos'

app.use(express.static(htmlPath));
app.use(express.static(photoDir))

const getConnection = () =>{
  return mysql.createConnection({
    host:'localhost',
    user:'chris',
    password:'devpassword',
    database:'river'
  });
}


const insertPhotos = ()=>{
  let getAllPhotosSQL =  `INSERT INTO photos (filename) VALUES `
  for(let i = 1; i < 741; i++)
  getAllPhotosSQL += `('${i}.jpg'),`
  const sql = getAllPhotosSQL.slice(0, -1)
}

const getPhotosFileNamesSQL = ()=>{
  return `SELECT * from photos`
}

const getPhotosFileNames = () =>{
  return new Promise((resolve, reject)=>{
    const con = getConnection()
    con.connect(function(err) {
      if (err){
        con.end()
        throw err
      }
      con.query(getPhotosFileNamesSQL(), function (err, results) {
        if (err) throw err;
        con.end()
        resolve(results)
      });
    });
  })
}

const prefixDirectory = (filenames) =>{
  const join  = (obj) =>{
    obj.filename = `${photoDir}/${obj.filename}`
    return obj
  }
  return filenames.map(join)
}

app.get('/photos', async (req, res) => {
  const filenames = await getPhotosFileNames()
  res.json(filenames)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
